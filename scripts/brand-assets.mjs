/**
 * ENGAPE POST — brand asset generator.
 *
 * One source of truth for the identity. The emblem geometry is defined once,
 * below, and every artifact the site needs is derived from it:
 *
 *   src/Images/logo-mark.svg    the emblem alone (header, footer)
 *   src/Images/logo-full.svg    the emblem in a seal with arched wordmark
 *   src/Images/logo-icon.svg    a simplified emblem that survives 16px
 *   public/favicon.ico          16 / 32 / 48, from the simplified emblem
 *   public/favicon-96x96.png
 *   public/apple-touch-icon.png
 *   public/web-app-manifest-192x192.png
 *   public/web-app-manifest-512x512.png
 *   public/web-app-manifest-512x512-maskable.png
 *   public/og-image.jpg         1200x630 social sharing card
 *
 * Run it after changing anything here:
 *
 *   npm install --no-save sharp png-to-ico
 *   node scripts/brand-assets.mjs
 *
 * sharp and png-to-ico are build-time only and deliberately kept out of
 * package.json — the generated files are committed, so a normal `npm install`
 * and `npm run build` never need them.
 *
 * The four figures are load-bearing, not decoration: src/Data.js builds the
 * organisation's four brand pillars on them (the acacia, the water carrier,
 * the open book, the graduate) and src/App.css samples its palette from them.
 * Removing one silently breaks copy on the home and about pages.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...segs) => path.join(root, ...segs);

/* ─────────────────────────────────────────────────────────────── palette ──
 * Identical to the custom properties in src/App.css. Keep them in step.
 */
const C = {
  crimson: "#CB2952",
  crimsonDeep: "#B02244",
  navy: "#243656",
  sky: "#1BA3E3",
  skyLight: "#5FC4F0",
  green: "#3E7F3A",
  greenLight: "#56A64E",
  greenMid: "#4A9444",
  greenDeep: "#2C5F2A",
  gold: "#D98A1F",
  goldDeep: "#C07714",
  bark: "#96601F",
  barkDeep: "#7C4E18",
  white: "#FFFFFF",
  page: "#F2F4F8",
  rule: "#8CA0C0",
  mint: "#8FD6A0",
};

const SANS = "Roboto, Arial, Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/* ─────────────────────────────────────────────────────────────── emblem ──
 * Drawn in a 512x512 box, centred on (256,256). `id` namespaces the clip path
 * so several emblems can be inlined in one document without colliding.
 */
const emblem = (id) => `
  <defs><clipPath id="${id}"><circle cx="256" cy="256" r="242"/></clipPath></defs>
  <circle cx="256" cy="256" r="256" fill="${C.crimson}"/>
  <circle cx="256" cy="256" r="242" fill="${C.navy}"/>
  <g clip-path="url(#${id})">
    <path d="M -8 404 Q 256 378 520 404 L 520 520 L -8 520 Z" fill="${C.greenDeep}"/>

    <path d="M 64 244 C 62 206, 88 176, 124 164 C 128 138, 158 124, 188 130
             C 206 108, 242 100, 268 112 C 298 98, 336 108, 348 132
             C 386 130, 416 154, 420 182 C 452 194, 466 220, 458 244
             C 416 218, 344 206, 256 206 C 168 206, 106 218, 64 244 Z"
          fill="${C.greenDeep}" transform="translate(0,12)"/>
    <path d="M 60 236 C 58 198, 84 168, 120 156 C 124 130, 154 116, 184 122
             C 202 100, 238 92, 264 104 C 294 90, 332 100, 344 124
             C 382 122, 412 146, 416 174 C 448 186, 462 212, 454 236
             C 412 210, 340 198, 252 198 C 164 198, 102 210, 60 236 Z"
          fill="${C.green}"/>
    <path d="M 184 122 C 202 100, 238 92, 264 104 C 276 116, 262 140, 232 144
             C 202 148, 180 138, 184 122 Z" fill="${C.greenLight}"/>
    <path d="M 120 156 C 124 130, 154 116, 184 122 C 186 140, 170 158, 144 164
             C 130 166, 120 162, 120 156 Z" fill="${C.greenMid}"/>
    <path d="M 344 124 C 382 122, 412 146, 416 174 C 398 180, 366 168, 350 148
             C 342 138, 340 128, 344 124 Z" fill="${C.greenMid}"/>

    <path d="M 238 392 C 240 344, 244 292, 246 210 L 268 210
             C 270 292, 274 344, 276 392 C 268 396, 246 396, 238 392 Z" fill="${C.bark}"/>
    <path d="M 252 250 C 232 240, 210 226, 196 210 C 214 218, 238 230, 256 236 Z" fill="${C.bark}"/>
    <path d="M 262 250 C 282 240, 304 226, 318 210 C 300 218, 276 230, 258 236 Z" fill="${C.bark}"/>
    <path d="M 226 392 C 232 372, 236 356, 238 340 L 238 392 Z" fill="${C.barkDeep}"/>

    <rect x="96" y="326" width="34" height="26" rx="6" fill="${C.gold}"/>
    <rect x="96" y="356" width="34" height="26" rx="6" fill="${C.goldDeep}"/>
    <circle cx="136" cy="300" r="16" fill="${C.crimson}"/>
    <path d="M 124 318 C 110 346, 100 374, 98 398 L 172 398 C 168 370, 158 342, 150 318 Z" fill="${C.crimson}"/>
    <path d="M 128 324 C 117 334, 111 343, 109 353" stroke="${C.crimsonDeep}"
          stroke-width="12" stroke-linecap="round" fill="none"/>

    <path d="M 396 322 L 420 296" stroke="${C.sky}" stroke-width="14" stroke-linecap="round" fill="none"/>
    <rect x="410" y="276" width="12" height="30" rx="5" fill="${C.gold}" transform="rotate(24 416 291)"/>
    <circle cx="380" cy="302" r="16" fill="${C.sky}"/>
    <path d="M 368 320 C 356 348, 350 374, 348 398 L 418 398 C 414 372, 404 344, 394 320 Z" fill="${C.sky}"/>
    <path d="M 344 288 L 380 274 L 416 288 L 380 302 Z" fill="${C.skyLight}"/>
    <path d="M 414 289 L 418 312" stroke="${C.gold}" stroke-width="6" stroke-linecap="round" fill="none"/>
    <circle cx="419" cy="316" r="6" fill="${C.gold}"/>

    <path d="M 256 368 C 236 350, 204 342, 174 346 L 174 392 C 204 388, 236 396, 256 410 Z" fill="${C.white}"/>
    <path d="M 256 368 C 276 350, 308 342, 338 346 L 338 392 C 308 388, 276 396, 256 410 Z" fill="${C.page}"/>
    <path d="M 256 368 C 236 350, 204 342, 174 346 L 174 392 C 204 388, 236 396, 256 410
             C 276 396, 308 388, 338 392 L 338 346 C 308 342, 276 350, 256 368 Z"
          fill="none" stroke="${C.navy}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M 256 368 L 256 410" stroke="${C.navy}" stroke-width="9" stroke-linecap="round"/>
    <path d="M 196 362 L 232 370 M 196 378 L 232 386" stroke="${C.rule}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 280 370 L 316 362 M 280 386 L 316 378" stroke="${C.rule}" stroke-width="6" stroke-linecap="round"/>
  </g>`;

/* Simplified emblem — the acacia and the book only, at heavier weight, so the
 * silhouette still reads when the browser paints it 16 pixels wide.
 *
 * The greens run brighter than the full emblem's on purpose. At 16px the
 * canopy is only a few pixels of flat colour, and #3E7F3A against the navy
 * field is too close in value to separate at that size.
 */
const emblemIcon = (id) => `
  <defs><clipPath id="${id}"><circle cx="256" cy="256" r="238"/></clipPath></defs>
  <circle cx="256" cy="256" r="256" fill="${C.crimson}"/>
  <circle cx="256" cy="256" r="238" fill="${C.navy}"/>
  <g clip-path="url(#${id})">
    <path d="M -8 400 Q 256 372 520 400 L 520 520 L -8 520 Z" fill="#3E7F3A"/>
    <path d="M 40 246 C 36 196, 74 152, 132 138 C 158 96, 226 76, 276 96
             C 336 78, 410 108, 424 164 C 466 184, 484 216, 472 246
             C 414 208, 340 192, 256 192 C 172 192, 98 208, 40 246 Z" fill="#5FB457"/>
    <path d="M 132 138 C 158 96, 226 76, 276 96 C 292 120, 262 156, 208 160
             C 158 164, 126 154, 132 138 Z" fill="#78C96E"/>
    <path d="M 230 404 C 232 340, 238 280, 240 196 L 272 196
             C 274 280, 280 340, 282 404 Z" fill="#C08A34"/>
    <path d="M 256 370 C 230 346, 190 336, 152 342 L 152 400 C 190 394, 230 404, 256 422 Z"
          fill="${C.white}" stroke="${C.navy}" stroke-width="16" stroke-linejoin="round"/>
    <path d="M 256 370 C 282 346, 322 336, 360 342 L 360 400 C 322 394, 282 404, 256 422 Z"
          fill="${C.white}" stroke="${C.navy}" stroke-width="16" stroke-linejoin="round"/>
  </g>`;

const svgDoc = (size, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" ` +
  `width="${size}" height="${size}" role="img" aria-label="${label}">` +
  `<title>${label}</title>${body}</svg>\n`;

/* ───────────────────────────────────────────────────────────────── seal ──
 * The emblem set in a crimson band carrying the arched wordmark. 640x640.
 *
 * The lettering is placed one glyph at a time rather than with <textPath>:
 * resvg — which libvips uses to rasterise SVG, and therefore what generates
 * every PNG here — ignores textPath entirely and drops the text on the floor.
 * Per-glyph placement renders the same in every renderer, browsers included.
 *
 * Advance widths are Helvetica's, in units of 1/1000 em, which is why the seal
 * asks for Arial ahead of Roboto: the metrics have to match what is measured
 * here or the tracking drifts.
 */
const WIDTH_BOLD = { E: 667, N: 722, G: 778, A: 722, P: 667, O: 778, S: 667, T: 611, " ": 278 };
const WIDTH_ITALIC = {
  f: 337, r: 421, i: 262, e: 452, n: 528, d: 527, s: 394, o: 495,
  c: 424, m: 780, u: 528, t: 313, y: 460, " ": 240,
};

/**
 * Set `text` around a circle centred on (320,320).
 * `bottom` runs the glyphs along the underside, upright and reading
 * left-to-right, which is the conventional setting for a seal's tagline.
 */
const arcText = ({ text, r, size, widths, tracking = 0, bottom = false, attrs }) => {
  const chars = [...text];
  const adv = chars.map((ch) => ((widths[ch] ?? 500) / 1000) * size + tracking);
  const total = adv.reduce((a, b) => a + b, 0);
  const deg = Math.PI / 180;

  let cursor = -total / 2;
  return chars
    .map((ch, i) => {
      const angle = ((cursor + adv[i] / 2) / r) / deg;
      cursor += adv[i];
      if (ch === " ") return "";
      const x = 320 + r * Math.sin(angle * deg);
      const y = bottom ? 320 + r * Math.cos(angle * deg) : 320 - r * Math.cos(angle * deg);
      const spin = bottom ? -angle : angle;
      return (
        `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" ${attrs} text-anchor="middle" ` +
        `transform="rotate(${spin.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})">${ch}</text>`
      );
    })
    .join("\n  ");
};

const seal = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640"
     role="img" aria-label="ENGAPE POST — friends of community">
  <title>ENGAPE POST — friends of community</title>

  <circle cx="320" cy="320" r="320" fill="${C.crimson}"/>
  <circle cx="320" cy="320" r="262" fill="${C.white}"/>
  <!-- 512-box emblem scaled to r=254, leaving an 8px white ring inside the band -->
  <g transform="translate(66,66) scale(0.9921875)">${emblem("sealDisc")}</g>

  ${arcText({
    text: "ENGAPE POST",
    r: 268,
    size: 56,
    widths: WIDTH_BOLD,
    tracking: 6,
    attrs: `font-family="Arial, Helvetica, ${SANS}" font-size="56" font-weight="700" fill="${C.white}"`,
  })}

  ${arcText({
    text: "friends of community",
    r: 302,
    size: 34,
    widths: WIDTH_ITALIC,
    tracking: 3,
    bottom: true,
    attrs: `font-family="${SERIF}" font-size="34" font-style="italic" fill="${C.white}"`,
  })}

  <circle cx="26" cy="320" r="9" fill="${C.white}"/>
  <circle cx="614" cy="320" r="9" fill="${C.white}"/>
</svg>
`;

/* ───────────────────────────────────────────────────────── sharing card ──
 * 1200x630. The photograph runs full bleed; a navy gradient falls away to the
 * right so the children stay visible instead of sitting under a slab of text.
 */
const ogOverlay = (emblemPx, url) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"    stop-color="${C.navy}" stop-opacity="0.97"/>
      <stop offset="0.46" stop-color="${C.navy}" stop-opacity="0.90"/>
      <stop offset="0.72" stop-color="${C.navy}" stop-opacity="0.55"/>
      <stop offset="1"    stop-color="${C.navy}" stop-opacity="0.20"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#scrim)"/>
  <rect x="0" y="0" width="1200" height="10" fill="${C.crimson}"/>
  <rect x="0" y="620" width="1200" height="10" fill="${C.crimson}"/>

  <g transform="translate(74,66) scale(${emblemPx / 512})">${emblem("ogDisc")}</g>

  <text x="74" y="322" font-family="${SANS}" font-size="86" font-weight="700"
        letter-spacing="2" fill="${C.white}">ENGAPE POST</text>
  <text x="76" y="380" font-family="${SERIF}" font-size="40" font-style="italic"
        fill="${C.mint}">friends of community</text>

  <rect x="76" y="416" width="120" height="6" rx="3" fill="${C.crimson}"/>

  <text x="76" y="480" font-family="${SANS}" font-size="30" fill="#DCE3EE">
    Education · Dignity · A living environment
  </text>
  <text x="76" y="524" font-family="${SANS}" font-size="30" fill="#DCE3EE">
    Alongside rural and pastoralist communities in Kenya.
  </text>

  <text x="76" y="586" font-family="${SANS}" font-size="27" font-weight="700"
        letter-spacing="1" fill="#9FB0C9">${url}</text>
</svg>
`;

/* ──────────────────────────────────────────────────────────────── build ── */

const DENSITY = 900; // rasterise the 512-box artwork well above target size

const png = (svg, size, background) => {
  let pipe = sharp(Buffer.from(svg), { density: DENSITY }).resize(size, size);
  if (background) pipe = pipe.flatten({ background });
  return pipe.png({ compressionLevel: 9 }).toBuffer();
};

const write = async (rel, buf) => {
  await fs.writeFile(p(rel), buf);
  console.log(`  ${rel.padEnd(46)} ${(buf.length / 1024).toFixed(1)} kB`);
};

async function main() {
  const url = process.env.SITE_URL ?? "engapepost.org";

  const markSvg = svgDoc(512, emblem("markDisc"), "ENGAPE POST emblem");
  const iconSvg = svgDoc(512, emblemIcon("iconDisc"), "ENGAPE POST");
  const fullSvg = seal();

  console.log("vector");
  await write("src/Images/logo-mark.svg", Buffer.from(markSvg));
  await write("src/Images/logo-icon.svg", Buffer.from(iconSvg));
  await write("src/Images/logo-full.svg", Buffer.from(fullSvg));

  console.log("icons");
  // Browsers that support it prefer the vector favicon and scale it crisply;
  // the .ico and .png below remain for those that do not.
  await write("public/favicon.svg", Buffer.from(iconSvg));
  await write("public/favicon-96x96.png", await png(markSvg, 96));
  await write("public/apple-touch-icon.png", await png(markSvg, 180, C.white));
  await write("public/web-app-manifest-192x192.png", await png(markSvg, 192, C.white));
  await write("public/web-app-manifest-512x512.png", await png(markSvg, 512, C.white));

  // Maskable icons are cropped to a safe circle of ~80% width by the launcher,
  // so the artwork is inset and the bleed is filled with the brand navy.
  const maskable = await sharp({
    create: { width: 512, height: 512, channels: 4, background: C.navy },
  })
    .composite([{ input: await png(markSvg, 410), top: 51, left: 51 }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await write("public/web-app-manifest-512x512-maskable.png", maskable);

  await write(
    "public/favicon.ico",
    await pngToIco([await png(iconSvg, 16), await png(iconSvg, 32), await png(iconSvg, 48)])
  );

  console.log("sharing card");
  // Rasterise the overlay to exactly 1200x630 first: composite() rejects an
  // input larger than the base, and the SVG renders at DENSITY otherwise.
  const overlay = await sharp(Buffer.from(ogOverlay(190, url)), { density: 192 })
    .resize(1200, 630)
    .png()
    .toBuffer();

  const card = await sharp(p("src/Images/cta-band.jpg"))
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await write("public/og-image.jpg", card);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
