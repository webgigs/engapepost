/**
 * ENGAPE POST — image URL builder.
 *
 * The photographs live on Cloudinary rather than in the repository. This is the
 * one place that turns a manifest key into a URL, so transformation policy is
 * decided once instead of being spelled out at every call site.
 *
 *   import { cdn, galleryThumb, galleryFull } from "../cdn";
 *
 *   cdn("hero", { width: 1200 })       →  a 1200px-wide hero
 *   galleryThumb("education-01")       →  a square, subject-aware crop
 *
 * Every URL carries `f_auto,q_auto`: Cloudinary negotiates AVIF or WebP against
 * the browser's Accept header and picks a quality level per image. That is
 * where most of the saving comes from — bigger than the move off the repo.
 *
 * See src/cloudinaryAssets.js for the manifest and scripts/cloudinary-upload.mjs
 * for how it is produced.
 */

import { CLOUD_NAME, assets } from "./cloudinaryAssets";

const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * A 1x1 transparent GIF. Used whenever a key cannot be resolved, so a mistake
 * in a key renders an empty box rather than a broken-image icon — and never
 * throws during render.
 */
export const BLANK_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Widths offered to the browser. It picks one using the `sizes` hint. */
export const DEFAULT_WIDTHS = [480, 768, 1100, 1500, 2000];

function resolve(key) {
  const asset = assets[key];
  if (!asset && process.env.NODE_ENV !== "production") {
    console.warn(
      `[cdn] Unknown image key "${key}". ` +
        `Add the file and run \`npm run images:upload\`.`
    );
  }
  return asset;
}

/**
 * Build a delivery URL.
 *
 * @param {string} key            manifest key, e.g. "hero" or "education-01"
 * @param {object} [opts]
 * @param {number} [opts.width]   target width in CSS pixels
 * @param {string} [opts.ar]      aspect ratio, e.g. "1:1" — implies a crop
 * @param {string} [opts.crop]    override the crop mode
 */
export function cdn(key, opts = {}) {
  const asset = resolve(key);
  if (!asset) return BLANK_PIXEL;

  const { width, ar, crop } = opts;
  const t = [];

  if (ar) {
    // g_auto asks Cloudinary to keep the subject of the photograph in frame
    // rather than trusting the centre of the image.
    t.push(`c_${crop || "fill"}`, "g_auto", `ar_${ar}`);
  } else if (crop) {
    t.push(`c_${crop}`);
  } else {
    // Never upscale past the original: c_limit caps at the source dimensions.
    t.push("c_limit");
  }

  if (width) t.push(`w_${width}`);
  t.push("f_auto", "q_auto");

  return `${BASE}/${t.join(",")}/v${asset.v}/${asset.id}.${asset.f}`;
}

/**
 * The `srcSet` companion to cdn(). Widths larger than the original are dropped,
 * so we never advertise a size Cloudinary would have to invent detail for.
 */
export function cdnSrcSet(key, widths = DEFAULT_WIDTHS, opts = {}) {
  const asset = resolve(key);
  if (!asset) return undefined;

  const usable = widths.filter((w) => w <= asset.w);
  if (!usable.includes(asset.w)) usable.push(asset.w);

  return usable
    .sort((a, b) => a - b)
    .map((w) => `${cdn(key, { ...opts, width: w })} ${w}w`)
    .join(", ");
}

/** The untransformed original. The last resort when a transformation fails. */
export function cdnOriginal(key) {
  const asset = resolve(key);
  if (!asset) return BLANK_PIXEL;
  return `${BASE}/v${asset.v}/${asset.id}.${asset.f}`;
}

/** Intrinsic dimensions, for reserving layout space before the image loads. */
export function cdnDimensions(key) {
  const asset = resolve(key);
  return asset ? { width: asset.w, height: asset.h } : null;
}

/* ─────────────────────────────────────────────────────────────── gallery ── */

/**
 * Gallery thumbnails are square crops derived on demand.
 *
 * The repository used to carry a second 700x700 JPEG for every photograph.
 * Cloudinary crops from the full-size original instead, which removes 54 files
 * and delivers a thumbnail sized to the grid rather than to the largest case.
 */
export const galleryThumb = (id, width = 600) =>
  cdn(id, { width, ar: "1:1" });

export const galleryThumbSrcSet = (id) =>
  cdnSrcSet(id, [300, 450, 600, 900], { ar: "1:1" });

/** Sized for the lightbox, which is bounded by the viewport. */
export const galleryFull = (id, width = 1500) => cdn(id, { width });

export const galleryFullSrcSet = (id) =>
  cdnSrcSet(id, [768, 1100, 1500, 2000]);
