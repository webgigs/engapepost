import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiPhone } from "react-icons/fi";

import logo from "../Images/logo-mark.svg";
import siteConfig from "../siteConfig";
import { programmes } from "../Data";

const Header = () => {
  const [programmesOpen, setProgrammesOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Close every menu whenever the route changes. */
  useEffect(() => {
    setProgrammesOpen(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  /* Shrink the header once the page has been scrolled. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while the mobile drawer is open. */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  /* Escape closes the drawer and the dropdown. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setProgrammesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const programmeActive = location.pathname.startsWith("/programmes");

  const Brand = ({ onClick }) => (
    <Link to="/" className="brand" onClick={onClick} aria-label={`${siteConfig.name} — home`}>
      <img src={logo} alt="" className="brand-mark" />
      <span className="brand-text">
        <span className="brand-name">{siteConfig.name}</span>
        <span className="brand-tagline">{siteConfig.tagline}</span>
      </span>
    </Link>
  );

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        {/* Utility strip */}
        <div className="header-utility">
          <div className="header-utility-inner">
            <span className="utility-tagline">
              A community based organisation — education, dignity and a living environment
            </span>
            <a className="utility-phone" href={`tel:${siteConfig.contact.phoneHref}`}>
              <FiPhone aria-hidden="true" /> {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        <div className="header-container">
          <Brand />

          {/* Desktop navigation */}
          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/" end className="nav-item">
              Home
            </NavLink>
            <NavLink to="/about-us" className="nav-item">
              About Us
            </NavLink>

            <div
              className={`dropdown ${programmesOpen ? "show" : ""}`}
              onMouseEnter={() => window.innerWidth > 1100 && setProgrammesOpen(true)}
              onMouseLeave={() => window.innerWidth > 1100 && setProgrammesOpen(false)}
            >
              <button
                type="button"
                className={`nav-item dropdown-toggle ${programmeActive ? "active" : ""}`}
                onClick={() => setProgrammesOpen((v) => !v)}
                aria-expanded={programmesOpen}
                aria-haspopup="true"
              >
                Our Programmes
                <FiChevronDown aria-hidden="true" />
              </button>

              <AnimatePresence>
                {programmesOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {programmes.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/programmes/${p.slug}`}
                        className={`dropdown-link accent-${p.accent}`}
                      >
                        <span className="dropdown-dot" aria-hidden="true" />
                        <span>
                          <strong>{p.navLabel}</strong>
                          <small>{p.short}</small>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/gallery" className="nav-item">
              Gallery
            </NavLink>
            <NavLink to="/stories" className="nav-item">
              Stories
            </NavLink>
            <NavLink to="/events" className="nav-item">
              Events
            </NavLink>
            <NavLink to="/contact-us" className="nav-item">
              Contact
            </NavLink>

            <Link to="/get-involved" className="nav-cta">
              Get Involved
            </Link>
          </nav>

          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              aria-label="Mobile navigation"
            >
              <div className="sidebar-head">
                <Brand onClick={() => setSidebarOpen(false)} />
                <button
                  type="button"
                  className="sidebar-close"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              <nav className="sidebar-nav" aria-label="Mobile">
                <NavLink to="/" end>
                  Home
                </NavLink>
                <NavLink to="/about-us">About Us</NavLink>

                <p className="sidebar-group-label">Our Programmes</p>
                {programmes.map((p) => (
                  <NavLink
                    key={p.slug}
                    to={`/programmes/${p.slug}`}
                    className={`sidebar-sub accent-${p.accent}`}
                  >
                    {p.navLabel}
                  </NavLink>
                ))}

                <p className="sidebar-group-label">More</p>
                <NavLink to="/gallery">Gallery</NavLink>
                <NavLink to="/stories">Stories</NavLink>
                <NavLink to="/events">Events &amp; Activities</NavLink>
                <NavLink to="/contact-us">Contact Us</NavLink>

                <Link to="/get-involved" className="sidebar-cta">
                  Get Involved
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="header-spacer" />
    </>
  );
};

export default Header;
