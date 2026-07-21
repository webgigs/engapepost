import React, { useState } from "react";

import {
  cdn,
  cdnSrcSet,
  cdnOriginal,
  cdnDimensions,
  BLANK_PIXEL,
  DEFAULT_WIDTHS,
} from "../cdn";

/**
 * A photograph served from Cloudinary.
 *
 * Renders a plain <img> with the class it was given, so every existing rule in
 * App.css keeps applying — the surrounding CSS decides the box, this decides
 * which bytes fill it.
 *
 * ──────────────────────────────────────────────────── why the error ladder ──
 *
 * Serving images from someone else's domain adds a way for the page to break
 * that a bundled import did not have. Rather than pretend that away, failure is
 * handled in three steps:
 *
 *   1. the requested size, format-negotiated  (the normal path)
 *   2. the untransformed original             (if a transformation fails —
 *                                              a bad crop, a quota on g_auto)
 *   3. a transparent pixel + .cdn-img-failed  (if Cloudinary is unreachable)
 *
 * Step 3 leaves a soft brand-coloured panel where the photograph would be. The
 * layout holds, the text stays readable, nothing shows a broken-image icon, and
 * no page ever fails to render because an image did not arrive.
 */
const CdnImage = ({
  imageKey,
  alt = "",
  sizes,
  widths = DEFAULT_WIDTHS,
  ar,
  className = "",
  loading = "lazy",
  fetchPriority,
  ...rest
}) => {
  // "cdn" → "original" → "failed". Each step is entered at most once, so a
  // persistently failing image settles instead of looping.
  const [stage, setStage] = useState("cdn");

  const dims = cdnDimensions(imageKey);

  let src;
  let srcSet;

  if (stage === "cdn") {
    src = cdn(imageKey, { width: widths[widths.length - 1], ar });
    srcSet = cdnSrcSet(imageKey, widths, ar ? { ar } : {});
  } else if (stage === "original") {
    src = cdnOriginal(imageKey);
  } else {
    src = BLANK_PIXEL;
  }

  const failed = stage === "failed";

  return (
    <img
      src={src}
      srcSet={failed ? undefined : srcSet}
      sizes={failed || !srcSet ? undefined : sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      // Intrinsic dimensions let the browser reserve the right space before the
      // response arrives. The CSS box still wins; this only prevents the jump.
      width={dims?.width}
      height={dims?.height}
      className={failed ? `${className} cdn-img-failed`.trim() : className}
      onError={() =>
        setStage((s) => (s === "cdn" ? "original" : s === "original" ? "failed" : s))
      }
      {...rest}
    />
  );
};

export default CdnImage;
