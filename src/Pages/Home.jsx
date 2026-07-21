import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import Information from "../Components/Information";
import SectionHeading from "../Components/SectionHeading";
import ProgrammeGrid from "../Components/ProgrammeGrid";
import TestimonialCarousel from "../Components/TestimonialCarousel";
import CTABand from "../Components/CTABand";
import Icon from "../Components/Icon";

import CdnImage from "../Components/CdnImage";

import siteConfig from "../siteConfig";
import { brandPillars, testimonials, galleryItems } from "../Data";

/* A handful of gallery photographs for the home page preview strip. */
const previewIds = [
  "education-01",
  "environment-02",
  "health-01",
  "milestones-01",
  "schools-08",
  "community-01",
];
const previewItems = previewIds
  .map((id) => galleryItems.find((g) => g.id === id))
  .filter(Boolean);

const Home = () => {
  const stats = siteConfig.impactStats;

  return (
    <>
      {/* ───────────────────────────────────────────────────────────── HERO ── */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="hero-eyebrow">Community Based Organisation</p>

            <h1>
              Friends of <span>community</span>
            </h1>

            <p className="hero-lede">
              We work alongside rural and pastoralist families to keep children in school,
              to end gender based violence and FGM, and to restore the land that everything
              else depends on.
            </p>

            <div className="hero-buttons">
              <Link to="/get-involved" className="btn btn-primary">
                Get Involved
              </Link>
              <Link to="/about-us" className="btn btn-outline">
                Who We Are <FiArrowRight aria-hidden="true" />
              </Link>
            </div>

            <ul className="hero-tags">
              <li>Education</li>
              <li>Gender based violence</li>
              <li>Ending FGM</li>
              <li>Environment</li>
            </ul>
          </motion.div>

          <motion.div
            className="hero-media"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            <span className="hero-media-block" aria-hidden="true" />
            {/* The home page LCP element — never lazy, always first in line. */}
            <CdnImage
              imageKey="hero"
              alt="Two pupils sharing a tablet in the community library"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 560px"
            />
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── PILLARS ── */}
      <section className="pillars-section">
        <div className="container">
          <SectionHeading
            kicker="What we stand for"
            heading="Four figures in our logo, four commitments in our work"
            text="The acacia, the open book, the graduate and the neighbour carrying water are not decoration. They are the four things we turn up to protect."
          />

          <div className="pillar-grid">
            {brandPillars.map((pillar, i) => (
              <motion.div
                className="pillar-card"
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="pillar-icon">
                  <Icon name={pillar.icon} />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional headline figures — switched on from siteConfig once verified. */}
      {stats.enabled && (
        <section className="stat-strip">
          <div className="container stat-grid">
            {stats.items.map((s, i) => (
              <motion.div
                className="stat-item"
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────── WELCOME ── */}
      <Information
        imageKey="welcome"
        subheading={`Welcome to ${siteConfig.name}`}
        heading="Neighbours, not visitors"
        paragraphs={[
          "ENGAPE POST is a community based organisation. That description matters: the work is designed, led and carried by people who live with its results, rather than delivered from a distance and reported on from further away still.",
          "It also shapes what we take on. A girl kept out of school by the cost of a uniform, a household whose harvest failed, a woman with nowhere to report violence, a hillside stripped of the trees that once held its soil — these arrive as one connected problem, so we treat them as one.",
        ]}
        linkText="More about us"
        linkTo="/about-us"
        imagePosition="right"
      />

      {/* ────────────────────────────────────────────────────── PROGRAMMES ── */}
      <section className="programmes-section">
        <div className="container">
          <SectionHeading
            kicker="Our programmes"
            heading="Five strands of one piece of work"
            text="Each programme stands on its own, and each one props up the others. Progress on any single front tends to depend on quiet progress on the rest."
          />
          <ProgrammeGrid />
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── LIBRARY ── */}
      <section className="spotlight-section">
        <div className="container spotlight-inner">
          <motion.div
            className="spotlight-media"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CdnImage
              imageKey="spotlightLibrary"
              alt="Pupils reading at the desks in the community library"
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </motion.div>

          <motion.div
            className="spotlight-body"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="section-kicker">Flagship project</p>
            <h2>The community library</h2>
            <p>
              For a child who has never owned a book, a room with several hundred of them is
              not a small thing. The library gives pupils somewhere quiet to work after
              class, a shelf of graded readers to grow through, and a bank of shared tablets
              for the material that print cannot reach.
            </p>
            <p>
              It is open to the wider community too — parents, out-of-school youth and adults
              returning to reading. A building the community helped raise, doing work the
              community asked for.
            </p>

            <ul className="spotlight-list">
              <li>Graded readers, story books and reference shelves</li>
              <li>Shared tablets with curriculum-aligned material</li>
              <li>Quiet study desks open after the school day</li>
              <li>Reading sessions for pupils and adults alike</li>
            </ul>

            <Link to="/programmes/education" className="btn btn-primary">
              Education &amp; Literacy
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────── GALLERY ── */}
      <section className="gallery-preview-section">
        <div className="container">
          <SectionHeading
            kicker="From the field"
            heading="Photographs from the work"
            text="Classrooms and kitchen gardens, tree planting and handovers — a look at what the days actually consist of."
          />

          <div className="gallery-preview-grid">
            {previewItems.map((item, i) => (
              <motion.div
                className="gallery-preview-item"
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              >
                {/* A 6-across strip of square crops, 2 across on a phone. */}
                <CdnImage
                  imageKey={item.id}
                  alt={item.caption}
                  ar="1:1"
                  widths={[200, 300, 450, 600]}
                  sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 190px"
                />
              </motion.div>
            ))}
          </div>

          <div className="section-actions">
            <Link to="/gallery" className="btn btn-outline">
              See the full gallery <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── VOICES ── */}
      <section className="testimonial-section">
        <div className="container">
          <SectionHeading
            kicker="Voices"
            heading="What people tell us"
            light
          />
          <TestimonialCarousel items={testimonials} />
          <div className="section-actions">
            <Link to="/stories" className="btn btn-ghost">
              Read more stories
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
};

export default Home;
