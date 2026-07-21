import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import Lightbox from "../Components/Lightbox";
import CTABand from "../Components/CTABand";

import CdnImage from "../Components/CdnImage";
import { galleryItems, galleryCategories } from "../Data";

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const visible = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const map = { all: galleryItems.length };
    galleryItems.forEach((g) => {
      map[g.category] = (map[g.category] || 0) + 1;
    });
    return map;
  }, []);

  const changeFilter = (id) => {
    setLightboxIndex(-1);
    setFilter(id);
  };

  return (
    <>
      <PageHero
        imageKey="wideGallery"
        kicker="Gallery"
        title="The work, photographed"
        text="Classrooms, kitchen gardens, community meetings and milestones — a record of what the days actually look like."
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="gallery-section">
        <div className="container">
          {/* Filters */}
          <div className="gallery-filters" role="tablist" aria-label="Filter photographs">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={filter === cat.id}
                className={`gallery-filter ${filter === cat.id ? "is-active" : ""}`}
                onClick={() => changeFilter(cat.id)}
              >
                {cat.label}
                <span className="gallery-filter-count">{counts[cat.id] || 0}</span>
              </button>
            ))}
          </div>

          <p className="gallery-count" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? "photograph" : "photographs"}
          </p>

          {/* Grid */}
          <motion.div className="gallery-grid" layout>
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <motion.button
                  type="button"
                  layout
                  key={item.id}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.32, delay: Math.min(i, 11) * 0.02 }}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View: ${item.caption}`}
                >
                  {/* Square crop, 4 columns down to 2 on a phone. */}
                  <CdnImage
                    imageKey={item.id}
                    alt={item.caption}
                    ar="1:1"
                    widths={[300, 450, 600, 900]}
                    sizes="(max-width: 520px) 50vw, (max-width: 1200px) 33vw, 295px"
                  />
                  <span className="gallery-item-overlay">
                    <FiMaximize2 aria-hidden="true" />
                    <span className="gallery-item-caption">{item.caption}</span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Lightbox
        items={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={setLightboxIndex}
      />

      <CTABand
        kicker="Use these photographs"
        heading="Want to feature our work?"
        text="Journalists, partners and supporters are welcome to use these images with credit. Get in touch and we will send higher resolution files."
        primary={{ to: "/contact-us", label: "Contact Us" }}
        secondary={{ to: "/get-involved", label: "Get Involved" }}
      />
    </>
  );
};

export default Gallery;
