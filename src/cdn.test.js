import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { cdn, cdnSrcSet, BLANK_PIXEL } from "./cdn";
import { assets, CLOUD_NAME } from "./cloudinaryAssets";
import { galleryItems, programmes } from "./Data";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Programme from "./Pages/Programme";

/**
 * Guards the CDN migration.
 *
 * The photographs are no longer imported by webpack, which means a broken key
 * or a stale local path fails silently at runtime instead of loudly at build
 * time. These tests put that check back.
 */

const renderAt = (path, element, routePath = path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={routePath} element={element} />
      </Routes>
    </MemoryRouter>
  );

describe("cdn url builder", () => {
  it("asks Cloudinary to negotiate format and quality", () => {
    const url = cdn("hero", { width: 1200 });
    expect(url).toContain(`res.cloudinary.com/${CLOUD_NAME}/image/upload/`);
    expect(url).toContain("f_auto");
    expect(url).toContain("q_auto");
    expect(url).toContain("w_1200");
    expect(url).toContain("engape/site/hero");
  });

  it("crops to the subject when an aspect ratio is requested", () => {
    const url = cdn("education-01", { width: 600, ar: "1:1" });
    expect(url).toContain("c_fill");
    expect(url).toContain("g_auto");
    expect(url).toContain("ar_1:1");
  });

  it("pins a version so a re-upload busts the cache", () => {
    expect(cdn("hero")).toContain(`/v${assets.hero.v}/`);
  });

  it("never advertises a width larger than the original", () => {
    const srcSet = cdnSrcSet("progEducation");
    const widths = [...srcSet.matchAll(/ (\d+)w/g)].map((m) => Number(m[1]));
    expect(widths.length).toBeGreaterThan(0);
    expect(Math.max(...widths)).toBeLessThanOrEqual(assets.progEducation.w);
  });

  it("returns a blank pixel rather than throwing on an unknown key", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    expect(cdn("no-such-image")).toBe(BLANK_PIXEL);
    console.warn.mockRestore();
  });
});

describe("content keys resolve", () => {
  it("every programme names photographs that exist", () => {
    for (const p of programmes) {
      expect(assets[p.cardImageKey]).toBeDefined();
      expect(assets[p.wideImageKey]).toBeDefined();
    }
  });

  it("every gallery item has an uploaded photograph", () => {
    expect(galleryItems.length).toBeGreaterThan(0);
    for (const item of galleryItems) {
      expect(assets[item.id]).toBeDefined();
    }
  });
});

describe("rendered pages load photographs from the CDN", () => {
  // Queried by tag rather than by ARIA role on purpose: the decorative
  // photographs carry alt="", which makes their role `presentation`. Those are
  // precisely the ones worth checking.
  const sources = (container) =>
    [...container.querySelectorAll("img")]
      .map((img) => img.getAttribute("src"))
      // The logo mark is an inlined SVG data URI and stays that way.
      .filter((src) => !src.startsWith("data:"));

  // The whole point of the migration: nothing may resolve to a bundled asset
  // or a path under public/. If one slips back in, the build silently grows.
  it.each([
    ["home", "/", <Home />],
    ["about", "/about-us", <About />],
    ["gallery", "/gallery", <Gallery />],
  ])("%s", (_name, path, element) => {
    const { container } = renderAt(path, element);
    const srcs = sources(container);

    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(src).toContain("res.cloudinary.com");
  });

  it("programme pages resolve their photographs by slug", () => {
    const { container } = renderAt(
      "/programmes/education",
      <Programme />,
      "/programmes/:slug"
    );
    const srcs = sources(container);

    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(src).toContain("res.cloudinary.com");
    expect(srcs.some((s) => s.includes("engape/site/prog-education"))).toBe(true);
    expect(srcs.some((s) => s.includes("engape/site/wide-education"))).toBe(true);
  });
});
