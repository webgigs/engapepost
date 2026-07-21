import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import SectionHeading from "../Components/SectionHeading";
import Icon from "../Components/Icon";

import siteConfig from "../siteConfig";
import { involvementOptions, programmes } from "../Data";

const GetInvolved = () => (
  <>
    <PageHero
      imageKey="wideInvolved"
      kicker="Get Involved"
      title="There is room in this work for you"
      text="Give, volunteer, partner or pass the word on. Every one of those makes the next season of work possible."
      crumbs={[{ label: "Home", to: "/" }, { label: "Get Involved" }]}
    />

    {/* Ways to help */}
    <section className="involve-section">
      <div className="container">
        <SectionHeading
          kicker="Ways to help"
          heading="Four ways in"
          text="Money matters, but it is not the only thing we are short of. Skills, time and attention all move the work forward."
        />

        <div className="involve-grid">
          {involvementOptions.map((opt, i) => (
            <motion.div
              className="involve-card"
              key={opt.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <span className="involve-icon">
                <Icon name={opt.icon} />
              </span>
              <h3>{opt.title}</h3>
              <p>{opt.text}</p>
              <Link to="/contact-us" className="involve-action">
                {opt.action} <FiArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Where support goes */}
    <section className="support-section">
      <div className="container">
        <SectionHeading
          kicker="Where support goes"
          heading="What your help actually pays for"
          text="We would rather describe the running costs honestly than dress them up. These are the things that keep programmes moving."
        />

        <div className="support-grid">
          {programmes.map((p, i) => (
            <motion.div
              className={`support-card accent-${p.accent}`}
              key={p.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.06 }}
            >
              <span className="support-icon">
                <Icon name={p.icon} />
              </span>
              <div>
                <h3>{p.navLabel}</h3>
                <p>{p.short}</p>
                <Link to={`/programmes/${p.slug}`} className="support-link">
                  About this programme <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Giving */}
    <section className="giving-section">
      <div className="container giving-inner">
        <div className="giving-copy">
          <p className="section-kicker">Making a contribution</p>
          <h2>How to give</h2>
          <p>
            We do not process donations through this website. Contributions are arranged
            directly with us, so that we can confirm the details, issue a receipt, and tell
            you afterwards what your support paid for.
          </p>
          <p>
            If you would like your contribution to go to a particular programme — the
            library, seedlings, sanitary supplies, school feeding — say so and we will keep
            it separate and account for it.
          </p>

          <div className="giving-actions">
            <a href={`mailto:${siteConfig.contact.email}`} className="btn btn-primary">
              <FiMail aria-hidden="true" /> Email us about giving
            </a>
            <a href={`tel:${siteConfig.contact.phoneHref}`} className="btn btn-outline">
              <FiPhone aria-hidden="true" /> {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        <aside className="giving-aside">
          <h3>Before you give</h3>
          <ul>
            <li>Ask us for registration documents — we will send them.</li>
            <li>Ask what a specific amount would fund. We will tell you plainly.</li>
            <li>Ask for an account of it afterwards. That is a reasonable request.</li>
            <li>
              Never send funds to an individual's personal account on our behalf. Confirm
              details with us directly first.
            </li>
          </ul>
        </aside>
      </div>
    </section>

    {/* Volunteering */}
    <section className="volunteer-section">
      <div className="container volunteer-inner">
        <div>
          <p className="section-kicker">Volunteering</p>
          <h2>Skills we can always use</h2>
          <p>
            Our first preference is always to build capacity within the community itself. But
            there are gaps we cannot always fill locally, and skilled help is genuinely
            useful in these areas:
          </p>
          <ul className="volunteer-list">
            <li>Reading helpers and library support</li>
            <li>Mentors for girls' clubs</li>
            <li>Agricultural and agroforestry training</li>
            <li>Health, counselling and safeguarding expertise</li>
            <li>Monitoring, record keeping and report writing</li>
            <li>Photography, film and communications</li>
          </ul>
          <Link to="/contact-us" className="btn btn-primary">
            Offer your time
          </Link>
        </div>

        <div className="volunteer-note">
          <h3>A note on visiting</h3>
          <p>
            We welcome visitors, but visits need arranging in advance and with the
            community's agreement — particularly anywhere children are involved. We ask
            everyone who spends time around children to agree to our safeguarding
            expectations first.
          </p>
          <p>
            Please do not arrive unannounced, and please do not photograph children without
            asking us and their guardians.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default GetInvolved;
