/**
 * ENGAPE POST — CDN health check.
 *
 *   npm run images:verify
 *
 * Requests every image the site can ask for, exactly as a browser would, and
 * reports anything that does not come back 200. Run it after an upload, before
 * a deploy, or when a photograph looks wrong in production — it answers "is the
 * CDN actually serving what the manifest claims?" without opening a browser.
 *
 * It checks both shapes the site uses: the plain wide delivery for page
 * photography, and the square subject-aware crop the gallery grid asks for.
 *
 * Needs no credentials. These are public URLs.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const CONCURRENCY = 8;

/**
 * Read the generated manifest without a bundler, so this script cannot drift
 * from what the site actually ships.
 *
 * It is imported through a data: URL rather than by path because the manifest
 * lives under src/ with a .js extension, and package.json has no "type" field —
 * importing it directly makes Node warn about reparsing it as ESM. A data: URL
 * is unambiguously a module.
 */
const manifestSource = await fs.readFile(
  path.join(root, "src/cloudinaryAssets.js"),
  "utf8"
);
const { CLOUD_NAME, assets } = await import(
  `data:text/javascript;base64,${Buffer.from(manifestSource).toString("base64")}`
);

const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

const checks = [];
for (const [key, a] of Object.entries(assets)) {
  const isGallery = a.id.startsWith("engape/gallery/");
  checks.push({
    key,
    label: isGallery ? "square crop" : "wide",
    url: isGallery
      ? `${BASE}/c_fill,g_auto,ar_1:1,w_600,f_auto,q_auto/v${a.v}/${a.id}.${a.f}`
      : `${BASE}/c_limit,w_1500,f_auto,q_auto/v${a.v}/${a.id}.${a.f}`,
  });
  // The gallery also serves uncropped frames in the lightbox.
  if (isGallery) {
    checks.push({
      key,
      label: "lightbox",
      url: `${BASE}/c_limit,w_1500,f_auto,q_auto/v${a.v}/${a.id}.${a.f}`,
    });
  }
}

async function pool(items, limit, worker) {
  let cursor = 0;
  const out = new Array(items.length);
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        out[i] = await worker(items[i]);
      }
    })
  );
  return out;
}

console.log(`\nChecking ${checks.length} delivery URLs on "${CLOUD_NAME}"…\n`);

let bytes = 0;
const failures = [];

const results = await pool(checks, CONCURRENCY, async (c) => {
  try {
    const res = await fetch(c.url, {
      // Ask as a modern browser does, so we measure what visitors receive
      // rather than the JPEG fallback.
      headers: { Accept: "image/avif,image/webp,image/*,*/*" },
    });
    const buf = await res.arrayBuffer();
    if (!res.ok) {
      failures.push({ ...c, status: res.status });
      return null;
    }
    bytes += buf.byteLength;
    return { ...c, type: res.headers.get("content-type"), size: buf.byteLength };
  } catch (err) {
    failures.push({ ...c, status: err.message });
    return null;
  }
});

const ok = results.filter(Boolean);
const formats = ok.reduce((acc, r) => {
  acc[r.type] = (acc[r.type] || 0) + 1;
  return acc;
}, {});

console.log(`  ${ok.length}/${checks.length} served`);
for (const [type, n] of Object.entries(formats)) {
  console.log(`  ${String(n).padStart(4)}  ${type}`);
}
console.log(`  ${(bytes / 1024 / 1024).toFixed(1)} MB total across every image the site can request`);

if (failures.length) {
  console.error(`\n  ${failures.length} FAILED:`);
  for (const f of failures) console.error(`    [${f.status}] ${f.key} (${f.label})`);
  console.error("");
  process.exit(1);
}

console.log("\n  All images resolve.\n");
