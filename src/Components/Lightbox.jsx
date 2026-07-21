import React, { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import CdnImage from "./CdnImage";

/**
 * Full-screen photograph viewer.
 *
 * `index` is the position within `items`; pass -1 (or null) to close.
 */
const Lightbox = ({ items = [], index, onClose, onNavigate }) => {
  const open = index !== null && index >= 0 && index < items.length;
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  const next = useCallback(() => {
    if (items.length) onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const prev = useCallback(() => {
    if (items.length) onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  /* Keyboard: escape closes, arrows move. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, next, prev]);

  /* Lock the page behind the overlay, and return focus where it came from. */
  useEffect(() => {
    if (!open) return undefined;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [open]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            ref={closeRef}
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close"
          >
            <FiX />
          </button>

          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-nav prev"
              aria-label="Previous photograph"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <FiChevronLeft />
            </button>
          )}

          <motion.figure
            className="lightbox-figure"
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Opened deliberately, so it loads eagerly — and the full frame
                is kept uncropped, unlike the square thumbnail in the grid. */}
            <CdnImage
              imageKey={item.id}
              alt={item.caption}
              loading="eager"
              fetchPriority="high"
              widths={[768, 1100, 1500, 2000]}
              sizes="(max-width: 900px) 95vw, 85vw"
            />
            <figcaption>
              <span>{item.caption}</span>
              <small>
                {index + 1} of {items.length}
              </small>
            </figcaption>
          </motion.figure>

          {items.length > 1 && (
            <button
              type="button"
              className="lightbox-nav next"
              aria-label="Next photograph"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <FiChevronRight />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
