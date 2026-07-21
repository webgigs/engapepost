import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import SectionHeading from "../Components/SectionHeading";
import TestimonialCarousel from "../Components/TestimonialCarousel";
import CTABand from "../Components/CTABand";

import { fieldNotes, testimonials } from "../Data";

const Stories = () => (
  <>
    <PageHero
      imageKey="wideStories"
      kicker="Stories"
      title="Notes from the work"
      text="What actually happens between the funding proposal and the annual report — written up as plainly as we can manage."
      crumbs={[{ label: "Home", to: "/" }, { label: "Stories" }]}
    />

    <section className="fieldnotes-section">
      <div className="container">
        <SectionHeading
          kicker="Field notes"
          heading="Small things that turned out to matter"
          text="None of these are dramatic. They are the moments that told us something was working."
        />

        <div className="fieldnotes-list">
          {fieldNotes.map((note, i) => (
            <motion.article
              className="fieldnote"
              key={note.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            >
              <p className="fieldnote-kicker">{note.kicker}</p>
              <h3>{note.title}</h3>
              <p className="fieldnote-text">{note.text}</p>
              <Link to={note.link} className="fieldnote-link">
                {note.linkText} <FiArrowRight aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="testimonial-section">
      <div className="container">
        <SectionHeading kicker="Voices" heading="What people tell us" light />
        <TestimonialCarousel items={testimonials} />
      </div>
    </section>

    <section className="share-story-section">
      <div className="container share-story-inner">
        <div>
          <p className="section-kicker">Have a story?</p>
          <h2>We would rather publish yours than write our own</h2>
          <p>
            If you have taken part in a programme — as a pupil, a parent, a farmer, a teacher
            or a volunteer — and you would be willing to have your experience written up, we
            would like to hear it. Nothing is published without your agreement, and you can
            ask us to keep your name out of it.
          </p>
        </div>
        <Link to="/contact-us" className="btn btn-primary">
          Share your story
        </Link>
      </div>
    </section>

    <CTABand />
  </>
);

export default Stories;
