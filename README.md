# ENGAPE POST — friends of community

Website for ENGAPE POST, a community based organisation working alongside rural and
pastoralist communities on **education and literacy**, **gender based violence**, the
**eradication of FGM**, **environmental conservation**, and **livelihoods and food
security**.

Built with React 19, React Router 6 and Framer Motion (Create React App).

---

## ⚠ Before you publish — read this

Some content is deliberately **placeholder** and must be replaced or confirmed. Everything
listed here is marked with a `PLACEHOLDER` comment in the source.

| What | Where | Why it matters |
|---|---|---|
| Email, phone, postal address | `src/siteConfig.js` → `contact` | These are invented. Publishing them means nobody can reach the organisation. |
| Registered legal name | `src/siteConfig.js` → `legalName` | Shown on the About and legal pages. |
| Social media links | `src/siteConfig.js` → `social` | Empty by default; each icon stays hidden until you add a URL. |
| Testimonial quotes | `src/Data.js` → `testimonials` | **Illustrative examples, not real statements.** Replace with quotes you have gathered and have permission to publish, or delete the array to hide the section. |
| Impact figures | `src/siteConfig.js` → `impactStats` | **Switched off** (`enabled: false`). Turn on only with numbers the organisation can stand behind — unverified impact stats mislead donors. |
| Google Map | `src/siteConfig.js` → `contact.mapEmbedUrl` | Empty renders a tidy placeholder card. Paste a Maps embed URL to show a real map. |

Programme descriptions, mission, vision and values in `src/Data.js` were written to fit the
organisation's stated focus and its own photographs. **Read them through and correct
anything that misrepresents the work** before launch.

---

## Getting started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build into ./build
npm test         # unit tests
```

## Where things live

```
photo-masters/       ← the original photographs. GITIGNORED. Back this up.
  site/                page and programme photography
  gallery/             the 54 gallery photographs
public/
  index.html         meta tags + the static Netlify form registration
  favicon.*          must be served from the site's own origin
  og-image.jpg       social sharing card; needs a stable absolute URL
src/
  siteConfig.js      organisation identity and contact details
  Data.js            all page copy: programmes, values, stories, gallery captions, FAQs
  cdn.js             turns an image key into a Cloudinary URL
  cloudinaryAssets.js  GENERATED manifest of uploaded photographs — committed
  App.js             routes
  App.css            all styling (brand palette at the top)
  MediaQueries.css   responsive overrides
  Components/        Header, Footer, PageHero, CdnImage, Lightbox, …
  Pages/             one file per route
  Images/            the logo SVGs only — everything else is on the CDN
scripts/
  brand-assets.mjs      regenerates the logo, favicons and og-image
  cloudinary-upload.mjs uploads photographs and rewrites the manifest
  cloudinary-verify.mjs checks every image the site can request still serves
```

### Editing content

Almost all copy lives in `src/Data.js` and `src/siteConfig.js` — you rarely need to touch a
component. In particular:

- **Programme pages** are data-driven. All five render from the `programmes` array through a
  single `Pages/Programme.jsx` at `/programmes/:slug`. Add an object to the array and the
  page, the navigation dropdown and the footer links all pick it up.
- **Gallery** images come from Cloudinary. To add a photograph, drop it into
  `photo-masters/gallery/` as `<category>-<nn>.jpg`, add a caption to `galleryCaptions` in
  `Data.js`, then run `npm run images:upload`. No thumbnail needed — see *Photographs* below.
- **Events**: `upcomingEvents` is intentionally an empty array — the page shows a friendly
  empty state rather than invented dates. Add `{ title, date, location, text }` objects and
  the diary renders automatically.

### The logo

The mark is the client's artwork, kept at `photo-masters/brand/logo-source.jpg`. Every
derivative is generated from that one file:

```bash
npm run brand     # regenerates the mark, all favicons, and the sharing card
```

The full seal carries the wordmark, four pillar badges and a curved tagline — none of which
survives the 50px the header renders, and the header already sets the name and tagline as
live text beside it. So `npm run brand` **re-composes** the emblem rather than shrinking the
seal: it lifts out the illustration, seats it in a disc, and gives it back the seal's green
ring. That is what `src/Images/logo-mark.png` is, and it is the only brand file the bundle
imports — so it is also the only one git tracks. The complete seal is written to
`photo-masters/brand/derived/logo-full.png` for print and partner use.

There is no SVG favicon. The artwork is raster, and a hand-traced imitation would drift from
the real mark; the `.ico` and PNGs cover every current browser. The previous, hand-drawn logo
system is kept at `photo-masters/brand/legacy-v1/`.

### Brand colours

Defined as CSS variables at the top of `App.css`. **These predate the current logo and are
kept deliberately** — the 2026 mark was fitted into the existing design rather than the design
being repainted around it.

| Token | Hex | Used for |
|---|---|---|
| `--crimson` | `#cb2952` | primary accent — buttons, kickers, links |
| `--navy` | `#243656` | headings, header utility strip, footer |
| `--sky` | `#1ba3e3` | Education & Literacy accent |
| `--green` | `#3e7f3a` | Environment accent; closest to the logo's ring |
| `--gold` | `#c8801c` | Livelihoods accent |

The logo's own colours — a `#2f5d2a` ring, a brown wordmark, and the food/water/education/
dignity badge set — are not wired into the site. If the organisation ever wants the palette
brought into line with the mark, that block in `App.css` is where to start.

Each programme carries an accent (`accent-sky`, `accent-crimson`, `accent-rose`,
`accent-green`, `accent-gold`) which re-points `--accent` for that page.

## Contact form

The form posts to [Netlify Forms](https://docs.netlify.com/forms/setup/). Netlify's build bot
only detects forms present in the static HTML, so a hidden copy is registered in
`public/index.html` — **keep its field names in sync** with `src/Pages/Contact.jsx`.

On any other host the POST fails gracefully and the form shows an error with a `mailto:`
fallback. To use a different provider, replace the `fetch` call in `handleSubmit`.

## Deployment

The build is a static SPA. `public/_redirects` contains the catch-all rewrite
(`/* /index.html 200`) needed so deep links like `/programmes/end-fgm` resolve — keep it, or
add the equivalent rule for your host.

## Accessibility notes

Keyboard and screen-reader support is wired up and worth preserving when editing: the gallery
lightbox traps focus and restores it on close, responds to arrow keys and Escape; the
testimonial carousel pauses on hover and focus and does not auto-advance under
`prefers-reduced-motion`; all decorative images use empty `alt` text while gallery images
carry real captions.

## Photographs

All photography is the organisation's own. Do not publish images of identifiable people —
children especially — without consent, and follow the commitments set out on the About and
Privacy pages.

### How images are served

The photographs are **not in this repository**. They live on Cloudinary, under `engape/`, and
the site resolves them at build time from `src/cloudinaryAssets.js` — a generated manifest
that *is* committed. A fresh clone therefore builds a complete site with no photographs on
disk. This took the deployed build from **28 MB to 7.6 MB**.

Every URL carries `f_auto,q_auto`, so Cloudinary negotiates AVIF or WebP against the visitor's
browser and picks a quality level per image, and `<CdnImage>` requests a width that suits
where the image is actually rendered rather than shipping one size for every screen.

The masters stay in `photo-masters/`, which is gitignored. **It is the only copy outside
Cloudinary — back it up.** It deliberately sits outside `public/`, because anything under
`public/` is copied into `build/` whether the site references it or not.

### Adding or replacing a photograph

```bash
# 1. put the file in photo-masters/site/ or photo-masters/gallery/
npm run images:upload             # uploads anything new, rewrites the manifest
npm run images:upload -- --force  # re-upload changed files and purge the CDN cache
npm run images:verify             # check every image the site can request still serves
```

Credentials live in `.env.local` (gitignored) as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`
and `CLOUDINARY_API_SECRET`. They are needed **only** to upload — never to build or deploy, and
they are never bundled into the site. Commit the regenerated `src/cloudinaryAssets.js`.

Gallery thumbnails are no longer stored: Cloudinary derives a square, subject-aware crop from
the full photograph on request, so there is one file per photograph rather than two.

### When Cloudinary is unreachable

Serving from another domain adds a failure mode that a bundled import did not have, so
`<CdnImage>` handles it in three steps: the requested size, then the untransformed original if
a transformation fails, then a transparent pixel with a `.cdn-img-failed` class that fills the
box with a soft brand wash. Layout holds and text stays readable — a missing photograph reads
as a quiet empty panel, never a broken page.

`src/cdn.test.js` guards the whole arrangement: it fails if any rendered page loads a
photograph from anywhere other than the CDN, or if any content key has no uploaded image.

## Credits

Originally derived from the MIT-licensed *EduHub* React template by
[Themixly](https://themixly.com); see `LICENSE`. The design, content, structure and styling
have since been rewritten for ENGAPE POST.
