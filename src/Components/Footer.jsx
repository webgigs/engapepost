import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { FaFacebookF, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6";

import logo from "../Images/logo-mark.svg";
import siteConfig from "../siteConfig";
import { programmes } from "../Data";

const Footer = () => {
  const { contact, social } = siteConfig;

  const socialLinks = [
    { key: "facebook", href: social.facebook, label: "Facebook", Icon: FaFacebookF },
    { key: "youtube", href: social.youtube, label: "YouTube", Icon: FaYoutube },
    { key: "instagram", href: social.instagram, label: "Instagram", Icon: FaInstagram },
    { key: "x", href: social.x, label: "X", Icon: FaXTwitter },
  ].filter((s) => s.href);

  const exploreLinks = [
    { name: "About Us", link: "/about-us" },
    { name: "Gallery", link: "/gallery" },
    { name: "Stories", link: "/stories" },
    { name: "Events & Activities", link: "/events" },
    { name: "Get Involved", link: "/get-involved" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  const col = (delay) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay },
  });

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand */}
        <motion.div className="footer-col footer-about" {...col(0)}>
          <div className="footer-brand">
            <img src={logo} alt="" className="footer-mark" />
            <span>
              <strong>{siteConfig.name}</strong>
              <small>{siteConfig.tagline}</small>
            </span>
          </div>
          <p>{siteConfig.description}</p>

          {socialLinks.length > 0 && (
            <div className="footer-social">
              {socialLinks.map(({ key, href, label, Icon }) => (
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Programmes */}
        <motion.div className="footer-col" {...col(0.08)}>
          <h3>Our Programmes</h3>
          <ul>
            {programmes.map((p) => (
              <li key={p.slug}>
                <Link to={`/programmes/${p.slug}`}>{p.navLabel}</Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Explore */}
        <motion.div className="footer-col" {...col(0.16)}>
          <h3>Explore</h3>
          <ul>
            {exploreLinks.map((item) => (
              <li key={item.link}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div className="footer-col" {...col(0.24)}>
          <h3>Get in Touch</h3>
          <ul className="footer-contact">
            <li>
              <FiMapPin aria-hidden="true" />
              <span>
                {contact.addressLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < contact.addressLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            </li>
            <li>
              <FiPhone aria-hidden="true" />
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </li>
            <li>
              <FiMail aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <FiClock aria-hidden="true" />
              <span>{contact.officeHours}</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.tagline}. All rights
          reserved.
        </p>
        <p className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms-conditions">Terms &amp; Conditions</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
