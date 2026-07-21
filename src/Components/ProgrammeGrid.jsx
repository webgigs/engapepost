import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import Icon from "./Icon";
import CdnImage from "./CdnImage";
import { programmes } from "../Data";

const ProgrammeGrid = () => (
  <div className="programme-grid">
    {programmes.map((p, i) => (
      <motion.article
        className={`programme-card accent-${p.accent}`}
        key={p.slug}
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.1 }}
      >
        <Link to={`/programmes/${p.slug}`} className="programme-card-link">
          <div className="programme-card-media">
            {/* 3 columns, dropping to 2 at 900px and 1 at 520px. */}
            <CdnImage
              imageKey={p.cardImageKey}
              ar="4:3"
              sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 400px"
            />
            <span className="programme-card-icon">
              <Icon name={p.icon} />
            </span>
          </div>

          <div className="programme-card-body">
            <h3>{p.title}</h3>
            <p>{p.short}</p>
            <span className="programme-card-more">
              Read more <FiArrowRight aria-hidden="true" />
            </span>
          </div>
        </Link>
      </motion.article>
    ))}
  </div>
);

export default ProgrammeGrid;
