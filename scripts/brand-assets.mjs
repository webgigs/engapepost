/**
 * ENGAPE POST — brand asset generator.
 *
 * One source of truth for the identity: the client's logo artwork at
 * photo-masters/brand/logo-source.jpg. Every artifact the site needs is cut
 * from it, so the logo changes in exactly one place.
 *
 *   npm run brand
 *
 * ─────────────────────────────────────────────────────────── what it makes ──
 *
 *   src/Images/logo-mark.png    the emblem alone — header and footer
 *   src/Images/logo-full.png    the complete seal, background removed
 *   public/favicon.ico          16 / 32 / 48
 *   public/favicon-96x96.png
 *   public/apple-touch-icon.png
 *   public/web-app-manifest-192x192.png
 *   public/web-app-manifest-512x512.png
 *   public/web-app-manifest-512x512-maskable.png
 *   public/og-image.jpg         1200x630 social sharing card
 *
 * ──────────────────────────────────────────── why the emblem is re-composed ──
 *
 * The full seal carries the wordmark, four pillar badges and a curved tagline.
 * At the 50px the header renders, all of that collapses into noise — and the
 * header already sets "ENGAPE POST" and the tagline as live text beside the
 * mark, so a mark containing the wordmark would say it twice.
 *
 * So the emblem is composed, not merely cropped: the illustration is lifted out
 * (never below the ground line, where the wordmark starts), scaled into a disc,
 * and given back the seal's green ring. The result is recognisably the client's
 * logo and still legible at favicon size.
 *
 * Nothing here touches the site's palette. The logo is fitted into the existing
 * design rather than the design being repainted around the logo.
 *
 * The previous, hand-drawn logo system is kept at
 * photo-masters/brand/legacy-v1/ in case anything needs to be referred back to.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...segs) => path.join(root, ...segs);

const SOURCE = p("photo-masters/brand/logo-source.jpg");

/** Sampled from the artwork, not invented. */
const RING_GREEN = "#2f5d2a";
const CREAM = { r: 251, g: 248, b: 245, alpha: 1 };

/**
 * The illustration, in source pixels.
 *
 * Measured rather than guessed: the sun's arc tops out at y≈142 and the ground
 * line the figures stand on is y≈565. The ENGAPE wordmark begins at y≈609, so
 * the crop must never reach it.
 */
const SCENE = { left: 430, top: 180, width: 500, height: 388 };

/* ──────────────────────────────────────────────────────────── background ── */

/**
 * Make everything outside the seal transparent.
 *
 * A flood fill inward from the four corners, rather than a circular mask: the
 * ring is not perfectly circular and is broken by two dots, so a geometric mask
 * either clips the artwork or leaves white slivers behind. Filling from the
 * corners stops wherever the ink actually is, whatever shape that turns out to
 * be, and leaves the seal's own white interior untouched.
 */
async function removeSurround(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  const isBackdrop = (k) => {
    const i = k * C;
    return data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238;
  };

  const seen = new Uint8Array(W * H);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const k = y * W + x;
    if (seen[k]) return;
    seen[k] = 1;
    if (isBackdrop(k)) stack.push(k);
  };

  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }

  while (stack.length) {
    const k = stack.pop();
    data[k * C + 3] = 0;
    const x = k % W;
    const y = (k / W) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  return sharp(data, { raw: { width: W, height: H, channels: C } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/* ───────────────────────────────────────────────────────────── the emblem ── */

/** Compose the round emblem at `box` pixels. */
async function emblem(box = 800) {
  const R = box / 2 - box * 0.018;
  const scene = await sharp(SOURCE).extract(SCENE).toBuffer();

  // Fill the disc generously, but leave headroom so the mother's head does not
  // collide with the ring.
  const scaled = await sharp(scene)
    .resize({ width: Math.round(R * 1.78) })
    .toBuffer();
  const meta = await sharp(scaled).metadata();

  const svg = (inner) => Buffer.from(`<svg width="${box}" height="${box}">${inner}</svg>`);
  const disc = svg(`<circle cx="${box / 2}" cy="${box / 2}" r="${R}" fill="#ffffff"/>`);
  const mask = svg(`<circle cx="${box / 2}" cy="${box / 2}" r="${R}" fill="#fff"/>`);
  const ring = svg(
    `<circle cx="${box / 2}" cy="${box / 2}" r="${R}" fill="none" ` +
      `stroke="${RING_GREEN}" stroke-width="${box * 0.027}"/>`
  );

  const laid = await sharp({
    create: {
      width: box,
      height: box,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: disc },
      {
        input: scaled,
        left: Math.round((box - meta.width) / 2),
        // Seat the ground line low in the disc so the figures stand on it
        // rather than floating in the middle.
        top: Math.round(box / 2 - meta.height * 0.5),
      },
    ])
    .png()
    .toBuffer();

  const clipped = await sharp(laid)
    .composite([{ input: mask, blend: "dest-in" }])
    .toBuffer();

  return sharp(clipped)
    .composite([{ input: ring }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/* ────────────────────────────────────────────────────────────────── build ── */

/**
 * Resize and write a PNG.
 *
 * Palette-quantised, which matters more here than it looks: the emblem is flat
 * illustration, so 256 colours are visually indistinguishable from truecolour
 * while the files come out three to twenty times smaller. The 512px manifest
 * icon drops from 293 kB to a few tens of kB on this alone.
 *
 * 256 rather than 128: the sun behind the figures is a gradient, and it bands
 * visibly below 256.
 */
const resize = (buf, size, background) => {
  let pipe = sharp(buf).resize(size, size, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (background) pipe = pipe.flatten({ background });
  return pipe
    .png({ palette: true, colors: 256, compressionLevel: 9, effort: 10 })
    .toBuffer();
};

const write = async (rel, buf) => {
  await fs.writeFile(p(rel), buf);
  console.log(`  ${rel.padEnd(46)} ${(buf.length / 1024).toFixed(1)} kB`);
};

async function main() {
  try {
    await fs.access(SOURCE);
  } catch {
    console.error(
      `\nMissing ${path.relative(root, SOURCE)}.\n\n` +
        `The logo artwork is this script's only input, and photo-masters/ is\n` +
        `gitignored — on a fresh clone you have to restore it first.\n`
    );
    process.exit(1);
  }

  console.log(`\nENGAPE POST brand assets — from ${path.relative(root, SOURCE)}\n`);

  const mark = await emblem(800);
  const seal = await removeSurround(await sharp(SOURCE).png().toBuffer());
  const sealTrimmed = await sharp(seal)
    .trim()
    .png({ palette: true, colors: 256, compressionLevel: 9, effort: 10 })
    .toBuffer();
  const sealMeta = await sharp(sealTrimmed).metadata();

  console.log("logo");
  // 160px covers the 50px header mark at 3x device pixel ratio. This is the
  // only brand file the bundle imports, and so the only one git tracks.
  await write("src/Images/logo-mark.png", await resize(mark, 160));

  // The complete seal is a deliverable for the client — letterheads, print,
  // partner decks — not something the site loads. It lives with the masters
  // rather than in src/, so it is never mistaken for a bundle asset.
  await fs.mkdir(p("photo-masters/brand/derived"), { recursive: true });
  await write("photo-masters/brand/derived/logo-full.png", sealTrimmed);

  console.log("icons");
  await write("public/favicon-96x96.png", await resize(mark, 96));
  await write("public/apple-touch-icon.png", await resize(mark, 180, CREAM));
  await write("public/web-app-manifest-192x192.png", await resize(mark, 192, CREAM));
  await write("public/web-app-manifest-512x512.png", await resize(mark, 512, CREAM));

  // Launchers crop maskable icons to a circle of roughly 80% width, so the
  // artwork is inset and the bleed filled with the seal's own green.
  const maskable = await sharp({
    create: { width: 512, height: 512, channels: 4, background: RING_GREEN },
  })
    .composite([{ input: await resize(mark, 400), top: 56, left: 56 }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await write("public/web-app-manifest-512x512-maskable.png", maskable);

  await write(
    "public/favicon.ico",
    await pngToIco([
      await resize(mark, 16, CREAM),
      await resize(mark, 32, CREAM),
      await resize(mark, 48, CREAM),
    ])
  );

  console.log("sharing card");
  // The seal already carries the organisation's name and its tagline, so the
  // card is the logo on a clean field rather than the logo plus a caption
  // repeating it.
  const cardLogo = await sharp(sealTrimmed).resize({ height: 548, fit: "inside" }).toBuffer();
  const logoMeta = await sharp(cardLogo).metadata();

  const card = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: CREAM },
  })
    .composite([
      {
        input: cardLogo,
        left: Math.round((1200 - logoMeta.width) / 2),
        top: Math.round((630 - logoMeta.height) / 2),
      },
    ])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await write("public/og-image.jpg", card);

  console.log(`\n  seal ${sealMeta.width}x${sealMeta.height} after background removal\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
