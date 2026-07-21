import React from "react";

/**
 * Shown while a route's JavaScript chunk downloads.
 *
 * Reserves most of a screen on purpose. Without a height the footer would jump
 * up under the header and then back down as the page arrives — the same
 * content-shift discipline the photographs follow.
 *
 * Deliberately quiet. On a warm connection the chunk lands in a few hundred
 * milliseconds, and anything busier than this would only flash.
 */
const RouteFallback = () => (
  <div className="route-fallback" role="status" aria-live="polite">
    <span className="route-fallback-mark" aria-hidden="true" />
    <span className="sr-only">Loading</span>
  </div>
);

export default RouteFallback;
