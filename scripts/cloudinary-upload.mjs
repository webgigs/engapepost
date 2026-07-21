/**
 * ENGAPE POST — photograph uploader.
 *
 * Moves the site's photographs off the repository and onto Cloudinary, then
 * writes src/cloudinaryAssets.js — a committed manifest of public IDs that the
 * app reads at build time. After this runs, `npm run build` no longer needs a
 * single JPEG on disk, so the heavy folders can stay out of git entirely.
 *
 *   npm run images:upload           upload anything missing, leave the rest
 *   npm run images:upload -- --force        re-upload and purge the CDN cache
 *   npm run images:upload -- --dry-run      print the plan, change nothing
 *
 * ─────────────────────────────────────────────────────────────── what moves ──
 *
 * Originals live in photo-masters/, which is gitignored and sits outside
 * public/ — anything under public/ is copied into build/ whether the site
 * references it or not.
 *
 *   photo-masters/site/*.jpg    → engape/site/<name>     page photography
 *   photo-masters/site/logo.png → engape/brand/logo      archived, unreferenced
 *   photo-masters/gallery/*.jpg → engape/gallery/<id>    the 54 gallery photos
 *
 * Gallery thumbnails are NOT uploaded. They were 700x700 square crops of the
 * same photographs, so Cloudinary derives them on the fly instead — see
 * galleryThumb() in src/cdn.js. One source file per photograph, and the old
 * crops are parked in photo-masters/gallery-thumbs-legacy/.
 *
 * ─────────────────────────────────────────────────────── what stays behind ──
 *
 *   src/Images/logo-*.svg     the header and footer mark. 4 KB, inlined into
 *                             the bundle by webpack — a network round trip
 *                             would make it slower, not faster.
 *   public/favicon.*          browsers demand these at the site's own origin.
 *   public/og-image.jpg       social scrapers need a stable absolute URL on
 *                             the canonical domain, and never load it in a
 *                             browser session anyway.
 *
 * ────────────────────────────────────────────────────────────── mechanics ──
 *
 * Credentials come from .env.local, which is gitignored. Nothing here is
 * bundled into the site: the browser only ever sees the cloud name and the
 * public IDs, both of which appear in the image URLs regardless.
 *
 * Uploads are idempotent. Public IDs are derived from filenames, so a second
 * run finds every asset already present and re-uses it rather than creating
 * duplicates. Only --force overwrites.
 *
 * Zero dependencies — Node's built-in fetch, FormData and crypto do all of it.
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...segs) => path.join(root, ...segs);

const FORCE = process.argv.includes("--force");
const DRY_RUN = process.argv.includes("--dry-run");
const CONCURRENCY = 6;
const MAX_ATTEMPTS = 3;

/* ─────────────────────────────────────────────────────────── credentials ── */

/**
 * Read .env.local without pulling in dotenv. Real environment variables win,
 * so CI or a shell export can override the file.
 */
async function loadEnv() {
  try {
    const text = await fs.readFile(p(".env.local"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const [, key, rawValue] = m;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error(
      "\nMissing Cloudinary credentials.\n\n" +
        "Create .env.local in the project root with:\n\n" +
        "  CLOUDINARY_CLOUD_NAME=...\n" +
        "  CLOUDINARY_API_KEY=...\n" +
        "  CLOUDINARY_API_SECRET=...\n"
    );
    process.exit(1);
  }
  return { cloudName, apiKey, apiSecret };
}

/* ──────────────────────────────────────────────────────── asset registry ── */

/** `wide-about` → `wideAbout`. The key components use to ask for the image. */
const camel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

/**
 * Build the upload plan by walking the source folders, rather than keeping a
 * hand-written list that drifts out of date the first time a photograph is
 * added. Every entry is printed before anything uploads, so the derived keys
 * and public IDs stay reviewable.
 */
async function buildPlan() {
  const plan = [];

  const siteDir = p("photo-masters/site");
  const siteFiles = (await exists(siteDir))
    ? (await fs.readdir(siteDir))
        .filter((f) => IMAGE_RE.test(f) && !f.startsWith("logo."))
        .sort()
    : [];

  for (const file of siteFiles) {
    const base = file.replace(IMAGE_RE, "");
    plan.push({
      group: "site",
      key: camel(base),
      publicId: `engape/site/${base}`,
      file: path.join(siteDir, file),
    });
  }

  // The raster logo is unreferenced by the app but worth preserving off-disk
  // rather than deleting outright.
  const logoPng = p("photo-masters/site/logo.png");
  if (await exists(logoPng)) {
    plan.push({
      group: "brand",
      key: "logoRaster",
      publicId: "engape/brand/logo",
      file: logoPng,
    });
  }

  const galleryDir = p("photo-masters/gallery");
  if (await exists(galleryDir)) {
    const galleryFiles = (await fs.readdir(galleryDir))
      .filter((f) => IMAGE_RE.test(f))
      .sort();
    for (const file of galleryFiles) {
      const id = file.replace(IMAGE_RE, "");
      plan.push({
        group: "gallery",
        // Gallery IDs (`education-01`) are addressed by string from Data.js,
        // so they stay verbatim instead of being camel-cased.
        key: id,
        publicId: `engape/gallery/${id}`,
        file: path.join(galleryDir, file),
      });
    }
  }

  return plan;
}

const exists = (f) =>
  fs.access(f).then(
    () => true,
    () => false
  );

/* ─────────────────────────────────────────────────────────────── uploads ── */

/**
 * Cloudinary signs the alphabetically sorted parameter list, excluding the
 * file itself plus api_key, cloud_name and resource_type.
 */
function sign(params, apiSecret) {
  const canonical = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(canonical + apiSecret)
    .digest("hex");
}

async function upload(entry, creds) {
  const { cloudName, apiKey, apiSecret } = creds;

  const signed = {
    public_id: entry.publicId,
    timestamp: Math.floor(Date.now() / 1000),
    // Without overwrite, Cloudinary returns the asset already stored at this
    // public ID instead of erroring — which is what makes re-runs cheap.
    overwrite: FORCE ? "true" : "false",
    invalidate: FORCE ? "true" : "false",
  };

  const form = new FormData();
  const bytes = await fs.readFile(entry.file);
  form.append("file", new Blob([bytes]), path.basename(entry.file));
  for (const [k, v] of Object.entries(signed)) form.append(k, String(v));
  form.append("api_key", apiKey);
  form.append("signature", sign(signed, apiSecret));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `${res.status} ${body?.error?.message || res.statusText} (${entry.publicId})`
    );
  }
  return body;
}

async function uploadWithRetry(entry, creds) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await upload(entry, creds);
    } catch (err) {
      lastError = err;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, 400 * 2 ** (attempt - 1)));
      }
    }
  }
  throw lastError;
}

/** Run tasks with a fixed number of workers so we don't open 77 sockets. */
async function pool(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

/* ────────────────────────────────────────────────────────────── manifest ── */

const MANIFEST_HEADER = `/**
 * ENGAPE POST — Cloudinary asset manifest.
 *
 * ⚠ GENERATED FILE. Do not edit by hand.
 *   Regenerate with \`npm run images:upload\` (scripts/cloudinary-upload.mjs).
 *
 * This file is committed deliberately. It is the reason the build no longer
 * needs the photographs on disk: every image the site renders is resolved from
 * the public IDs below, so \`src/Images/*.jpg\` and \`public/gallery/\` can stay
 * gitignored while Netlify still builds a complete site.
 *
 * Nothing secret lives here. A cloud name and a public ID are both visible in
 * any image URL the browser requests; the API secret stays in .env.local.
 */
`;

/**
 * The manifest records dimensions alongside each ID. Components use them to
 * reserve layout space before the image arrives, which is what keeps the CDN
 * migration from introducing content shift.
 */
function renderManifest({ cloudName, assets, galleryIds, generatedAt }) {
  const lines = [];
  lines.push(MANIFEST_HEADER);
  lines.push(`export const CLOUD_NAME = ${JSON.stringify(cloudName)};`);
  lines.push("");
  lines.push(`/** Uploaded ${assets.length} assets — ${generatedAt}. */`);
  lines.push("export const assets = {");
  for (const a of assets) {
    const key = /^[A-Za-z_$][\w$]*$/.test(a.key) ? a.key : JSON.stringify(a.key);
    lines.push(
      `  ${key}: { id: ${JSON.stringify(a.publicId)}, v: ${a.version}, ` +
        `w: ${a.width}, h: ${a.height}, f: ${JSON.stringify(a.format)} },`
    );
  }
  lines.push("};");
  lines.push("");
  lines.push(
    "/** Gallery photograph IDs, in upload order. Data.js pairs these with captions. */"
  );
  lines.push(
    `export const galleryIds = ${JSON.stringify(galleryIds, null, 2).replace(/\n/g, "\n")};`
  );
  lines.push("");
  return lines.join("\n");
}

/* ────────────────────────────────────────────────────────────────── main ── */

async function main() {
  const creds = await loadEnv();
  const plan = await buildPlan();

  if (!plan.length) {
    console.error("No source images found. Nothing to do.");
    process.exit(1);
  }

  const totalBytes = (
    await Promise.all(plan.map((e) => fs.stat(e.file).then((s) => s.size)))
  ).reduce((a, b) => a + b, 0);

  console.log(`\nENGAPE POST → Cloudinary "${creds.cloudName}"`);
  console.log(
    `${plan.length} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MB` +
      `${FORCE ? "  (--force: overwriting)" : ""}${DRY_RUN ? "  (--dry-run)" : ""}\n`
  );

  const width = Math.max(...plan.map((e) => e.key.length));
  for (const e of plan) {
    console.log(`  ${e.key.padEnd(width)}  →  ${e.publicId}`);
  }
  console.log("");

  if (DRY_RUN) {
    console.log("Dry run — nothing uploaded.");
    return;
  }

  let done = 0;
  let reused = 0;
  const failures = [];

  const results = await pool(plan, CONCURRENCY, async (entry) => {
    try {
      const res = await uploadWithRetry(entry, creds);
      done++;
      // Cloudinary echoes the stored asset when overwrite is off; an unchanged
      // etag across a re-run means nothing new was billed or stored.
      if (res.existing) reused++;
      process.stdout.write(
        `\r  uploaded ${done}/${plan.length}${" ".repeat(20)}`
      );
      return {
        key: entry.key,
        group: entry.group,
        publicId: res.public_id,
        version: res.version,
        width: res.width,
        height: res.height,
        format: res.format,
      };
    } catch (err) {
      failures.push({ entry, message: err.message });
      return null;
    }
  });

  process.stdout.write("\n\n");

  if (failures.length) {
    console.error(`${failures.length} upload(s) failed:`);
    for (const f of failures) console.error(`  ${f.entry.publicId}: ${f.message}`);
    console.error(
      "\nManifest NOT written — a partial manifest would ship a broken site.\n" +
        "Fix the errors above and re-run; successful uploads are re-used.\n"
    );
    process.exit(1);
  }

  const assets = results.filter(Boolean);
  const galleryIds = assets
    .filter((a) => a.group === "gallery")
    .map((a) => a.key)
    .sort();

  await fs.writeFile(
    p("src/cloudinaryAssets.js"),
    renderManifest({
      cloudName: creds.cloudName,
      assets,
      galleryIds,
      generatedAt: new Date().toISOString().slice(0, 10),
    }),
    "utf8"
  );

  console.log(`  ${assets.length} assets on Cloudinary (${reused} already present)`);
  console.log(`  ${galleryIds.length} gallery photographs`);
  console.log(`  manifest written → src/cloudinaryAssets.js\n`);
}

main().catch((err) => {
  console.error("\nUpload failed:", err);
  process.exit(1);
});
