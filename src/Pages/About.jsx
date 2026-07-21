import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiEye } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import SectionHeading from "../Components/SectionHeading";
import Information from "../Components/Information";
import CTABand from "../Components/CTABand";
import Icon from "../Components/Icon";

import CdnImage from "../Components/CdnImage";

import siteConfig from "../siteConfig";
import { brandPillars, approachSteps } from "../Data";

const About = () => (
  <>
    <PageHero
      imageKey="wideAbout"
      kicker="About Us"
      title="Friends of community"
      text="ENGAPE POST is a community based organisation working where education, safety, food and the environment meet — because for the families we work with, they have never been separate problems."
      crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
    />

    <Information
      imageKey="aboutStory"
      subheading="Who we are"
      heading="Rooted in the community we serve"
      paragraphs={[
        "ENGAPE POST grew out of its own community rather than arriving in it. Our members are neighbours to the households we work with — people who know which families are struggling to keep a daughter in school, which water point has failed, and which subjects are difficult to raise in public.",
        "That proximity is our main asset. It means we hear about problems early, we are told the truth about what is not working, and we are still here long after a project cycle has closed. It also holds us accountable in the most direct way possible: we answer to people we see every week.",
        "We work through the structures that already carry authority — elders, head teachers, chiefs, health workers and women's groups — because change announced by trusted local voices outlasts change imposed from outside.",
      ]}
      imagePosition="right"
    />

    {/* Mission & vision */}
    <section className="mission-section">
      <div className="container mission-grid">
        <motion.div
          className="mission-card"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <span className="mission-icon">
            <FiTarget aria-hidden="true" />
          </span>
          <h2>Our mission</h2>
          <p>
            To walk alongside rural and pastoralist communities as friends and partners —
            widening access to education, protecting women and girls from violence and
            harmful practice, and restoring the environment that sustains community life.
          </p>
        </motion.div>

        <motion.div
          className="mission-card"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <span className="mission-icon">
            <FiEye aria-hidden="true" />
          </span>
          <h2>Our vision</h2>
          <p>
            Communities where every girl and boy learns in safety, where every woman lives
            free from violence and the fear of the blade, and where the land still provides
            for the generations coming after us.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="values-section">
      <div className="container">
        <SectionHeading
          kicker="Our values"
          heading="What the logo commits us to"
          text="The four figures in the ENGAPE POST mark are a summary of the work: the acacia, the open book, the graduate, and the neighbour carrying water."
        />

        <div className="values-grid">
          {brandPillars.map((v, i) => (
            <motion.div
              className="value-card"
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="value-icon">
                <Icon name={v.icon} />
              </span>
              <div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How we work */}
    <section className="approach-section">
      <div className="container approach-inner">
        <div className="approach-copy">
          <SectionHeading kicker="How we work" heading="Four habits we hold to" align="left" />

          <ol className="approach-steps">
            {approachSteps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="approach-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          className="approach-media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <CdnImage
            imageKey="aboutApproach"
            alt="A community learning session held in the shade of a tree"
            sizes="(max-width: 900px) 100vw, 480px"
          />
        </motion.div>
      </div>
    </section>

    {/* Governance */}
    <section className="governance-section">
      <div className="container">
        <SectionHeading
          kicker="Accountability"
          heading="How we account for what we do"
          text="We would rather be asked hard questions than avoid them."
        />

        <div className="governance-grid">
          <div className="governance-card">
            <h3>Registration</h3>
            <p>
              {siteConfig.legalName} is a registered community based organisation.
              Documentation is available on request — please get in touch.
            </p>
          </div>
          <div className="governance-card">
            <h3>Use of funds</h3>
            <p>
              Contributions are applied to programme costs — books, seedlings, supplies,
              transport and the running of the library. We are happy to explain what any
              particular contribution paid for.
            </p>
          </div>
          <div className="governance-card">
            <h3>Consent and dignity</h3>
            <p>
              We photograph and tell stories with permission, and we do not identify
              survivors of violence. Where a story is sensitive it stays private, whatever it
              might be worth to us in fundraising terms.
            </p>
          </div>
        </div>
      </div>
    </section>

    <CTABand />
  </>
);

export default About;
