import React from "react";
import { motion } from "framer-motion";

const rise = (delay) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.55, delay },
});

const SectionHeading = ({ kicker, heading, text, align = "center", light = false }) => (
  <div className={`section-heading-block align-${align} ${light ? "on-dark" : ""}`}>
    {kicker && (
      <motion.p className="section-kicker" {...rise(0)}>
        {kicker}
      </motion.p>
    )}
    {heading && (
      <motion.h2 className="section-heading" {...rise(0.08)}>
        {heading}
      </motion.h2>
    )}
    {text && (
      <motion.p className="section-text" {...rise(0.16)}>
        {text}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
