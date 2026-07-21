import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

import CdnImage from "./CdnImage";

/**
 * Banner used at the top of every interior page.
 *
 * `imageKey` names a photograph in src/cloudinaryAssets.js.
 * `crumbs` is an optional list of { label, to } — the last entry renders plain.
 */
const PageHero = ({ imageKey, kicker, title, text, crumbs = [], accent }) => (
  <section className={`page-hero ${accent ? `accent-${accent}` : ""}`}>
    <div className="page-hero-media">
      {imageKey && (
        <CdnImage
          imageKey={imageKey}
          // The banner is the largest thing above the fold on every interior
          // page, so it is almost always the LCP element — fetch it eagerly
          // rather than letting lazy-loading delay it.
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      )}
      <div className="page-hero-scrim" />
    </div>

    <motion.div
      className="page-hero-inner"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {kicker && <p className="page-hero-kicker">{kicker}</p>}
      <h1>{title}</h1>
      {text && <p className="page-hero-text">{text}</p>}

      {crumbs.length > 0 && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <React.Fragment key={`${c.label}-${i}`}>
                {last || !c.to ? (
                  <span aria-current={last ? "page" : undefined}>{c.label}</span>
                ) : (
                  <Link to={c.to}>{c.label}</Link>
                )}
                {!last && <FiChevronRight aria-hidden="true" />}
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </motion.div>
  </section>
);

export default PageHero;
