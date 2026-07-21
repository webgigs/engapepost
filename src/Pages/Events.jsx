import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import SectionHeading from "../Components/SectionHeading";
import CTABand from "../Components/CTABand";
import Icon from "../Components/Icon";

import siteConfig from "../siteConfig";
import { activityTypes, upcomingEvents } from "../Data";

const Events = () => (
  <>
    <PageHero
      imageKey="wideEvents"
      kicker="Events & Activities"
      title="What we run, and when"
      text="Most of our work happens in regular, unglamorous activity — meetings, planting days, reading sessions and outreach. Here is what that calendar consists of."
      crumbs={[{ label: "Home", to: "/" }, { label: "Events & Activities" }]}
    />

    {/* Recurring activities */}
    <section className="activities-section">
      <div className="container">
        <SectionHeading
          kicker="Regular activities"
          heading="The rhythm of the work"
          text="These run through the year, timed around school terms, the rains and the harvest."
        />

        <div className="activities-grid">
          {activityTypes.map((a, i) => (
            <motion.div
              className="activity-card"
              key={a.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <span className="activity-icon">
                <Icon name={a.icon} />
              </span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Diary */}
    <section className="diary-section">
      <div className="container">
        <SectionHeading kicker="Coming up" heading="Upcoming dates" />

        {upcomingEvents.length > 0 ? (
          <div className="diary-list">
            {upcomingEvents.map((e, i) => (
              <motion.article
                className="diary-item"
                key={`${e.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className="diary-date">
                  <FiCalendar aria-hidden="true" />
                  <span>{e.date}</span>
                </div>
                <div className="diary-body">
                  <h3>{e.title}</h3>
                  {e.location && (
                    <p className="diary-location">
                      <FiMapPin aria-hidden="true" /> {e.location}
                    </p>
                  )}
                  {e.text && <p>{e.text}</p>}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="diary-empty">
            <FiCalendar aria-hidden="true" />
            <h3>No dates published at the moment</h3>
            <p>
              Activities are usually arranged with the schools and community groups involved
              rather than announced far in advance. If you would like to attend something, or
              to be told when the next planting day or library open day is set, get in touch
              and we will let you know.
            </p>
            <div className="diary-empty-actions">
              <Link to="/contact-us" className="btn btn-primary">
                Ask about upcoming dates
              </Link>
              <a href={`mailto:${siteConfig.contact.email}`} className="btn btn-outline">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>

    <CTABand
      kicker="Join in"
      heading="Come and see the work for yourself"
      text="Visits are welcome, with a little notice and the community's agreement. Tell us what you would like to see and we will arrange it."
      primary={{ to: "/contact-us", label: "Arrange a visit" }}
      secondary={{ to: "/gallery", label: "Browse the gallery" }}
    />
  </>
);

export default Events;
