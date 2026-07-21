import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import SectionHeading from "../Components/SectionHeading";
import CTABand from "../Components/CTABand";
import Icon from "../Components/Icon";
import CdnImage from "../Components/CdnImage";

import { programmes, programmeBySlug } from "../Data";

/**
 * One component serves all five programme pages; the content comes from
 * `programmes` in Data.js, keyed by the :slug route parameter.
 */
const Programme = () => {
  const { slug } = useParams();
  const programme = programmeBySlug[slug];

  if (!programme) return <Navigate to="/" replace />;

  const others = programmes.filter((p) => p.slug !== programme.slug);

  return (
    <>
      <PageHero
        imageKey={programme.wideImageKey}
        kicker={programme.heroKicker}
        title={programme.title}
        text={programme.short}
        accent={programme.accent}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Programmes" },
          { label: programme.navLabel },
        ]}
      />

      {/* Intro */}
      <section className={`programme-intro accent-${programme.accent}`}>
        <div className="container programme-intro-inner">
          <div className="programme-intro-mark">
            <span>
              <Icon name={programme.icon} />
            </span>
          </div>
          <div className="programme-intro-copy">
            {programme.intro.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="programme-focus-section">
        <div className="container">
          <SectionHeading kicker="What we do" heading="In practice" />

          <div className="focus-grid">
            {programme.focus.map((f, i) => (
              <motion.div
                className={`focus-card accent-${programme.accent}`}
                key={f.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              >
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className={`programme-outcomes accent-${programme.accent}`}>
        <div className="container outcomes-inner">
          <motion.div
            className="outcomes-media"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <CdnImage
              imageKey={programme.cardImageKey}
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </motion.div>

          <div className="outcomes-body">
            <p className="section-kicker">What we are working towards</p>
            <h2>The change we are after</h2>
            <ul className="outcomes-list">
              {programme.outcomes.map((o, i) => (
                <motion.li
                  key={o}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <FiCheck aria-hidden="true" />
                  <span>{o}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/get-involved" className="btn btn-primary">
              Support this work
            </Link>
          </div>
        </div>
      </section>

      {/* Other programmes */}
      <section className="related-section">
        <div className="container">
          <SectionHeading kicker="Our programmes" heading="Explore the rest of the work" />

          <div className="related-grid">
            {others.map((p) => (
              <Link
                to={`/programmes/${p.slug}`}
                key={p.slug}
                className={`related-card accent-${p.accent}`}
              >
                <span className="related-icon">
                  <Icon name={p.icon} />
                </span>
                <h3>{p.navLabel}</h3>
                <p>{p.short}</p>
                <span className="related-more">
                  Read more <FiArrowRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
};

export default Programme;
