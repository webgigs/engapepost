import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AUTOPLAY_MS = 8000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Quote carousel. Auto-advances, but pauses while the pointer is over it or
 * anything inside has keyboard focus, and does not auto-advance at all for
 * visitors who have asked for reduced motion.
 */
const TestimonialCarousel = ({ items = [] }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const count = items.length;

  const go = useCallback(
    (next) => {
      if (!count) return;
      setIndex((prev) => (next + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1 || prefersReducedMotion()) return undefined;
    timer.current = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer.current);
  }, [index, paused, count, go]);

  if (!count) return null;

  const active = items[index];

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="testimonial-viewport" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="testimonial-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>{active.quote}</blockquote>
            <figcaption>{active.role}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="testimonial-controls">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous quote">
            <FiChevronLeft />
          </button>

          <div className="testimonial-dots" role="tablist" aria-label="Choose a quote">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Quote ${i + 1} of ${count}`}
                className={i === index ? "is-active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button type="button" onClick={() => go(index + 1)} aria-label="Next quote">
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
