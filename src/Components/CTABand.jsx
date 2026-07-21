import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import CdnImage from "./CdnImage";

const CTABand = ({
  kicker = "Get involved",
  heading = "This work belongs to the community. There is room in it for you.",
  text = "Whether you give, volunteer, partner with us or simply pass the word on, you make the next season of work possible.",
  primary = { to: "/get-involved", label: "Get Involved" },
  secondary = { to: "/contact-us", label: "Contact Us" },
}) => (
  <section className="cta-band">
    <div className="cta-band-media">
      <CdnImage imageKey="ctaBand" sizes="100vw" />
      <div className="cta-band-scrim" />
    </div>

    <motion.div
      className="cta-band-inner"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <p className="section-kicker">{kicker}</p>
      <h2>{heading}</h2>
      <p className="cta-band-text">{text}</p>

      <div className="cta-band-actions">
        {primary && (
          <Link to={primary.to} className="btn btn-primary">
            {primary.label}
          </Link>
        )}
        {secondary && (
          <Link to={secondary.to} className="btn btn-ghost">
            {secondary.label}
          </Link>
        )}
      </div>
    </motion.div>
  </section>
);

export default CTABand;
