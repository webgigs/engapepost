import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";

import PageHero from "../Components/PageHero";
import SectionHeading from "../Components/SectionHeading";

import siteConfig from "../siteConfig";
import { faqs } from "../Data";

const FORM_NAME = "contact";

const encode = (data) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");

const Contact = () => {
  const { contact } = siteConfig;
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [openFaq, setOpenFaq] = useState(0);

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      /* Netlify Forms picks this up via the static copy in public/index.html. */
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, ...values }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const mailtoFallback = `mailto:${contact.email}?subject=${encodeURIComponent(
    values.subject || "Website enquiry"
  )}&body=${encodeURIComponent(values.message || "")}`;

  const details = [
    {
      Icon: FiMapPin,
      label: "Find us",
      value: contact.addressLines.map((l, i) => (
        <React.Fragment key={i}>
          {l}
          {i < contact.addressLines.length - 1 && <br />}
        </React.Fragment>
      )),
    },
    { Icon: FiPhone, label: "Call us", value: contact.phone, href: `tel:${contact.phoneHref}` },
    { Icon: FiMail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    { Icon: FiClock, label: "Office hours", value: contact.officeHours },
  ];

  return (
    <>
      <PageHero
        imageKey="wideContact"
        kicker="Contact Us"
        title="Talk to us"
        text="Questions about the programmes, an offer of help, a story to share, or a request to visit — all of it is welcome."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
      />

      <section className="contact-section">
        <div className="container contact-grid">
          {/* Details */}
          <motion.div
            className="contact-details"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-kicker">Get in touch</p>
            <h2>{siteConfig.name}</h2>
            <p className="contact-intro">{siteConfig.description}</p>

            <ul className="contact-list">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <span className="contact-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{label}</strong>
                    {href ? <a href={href}>{value}</a> : <span>{value}</span>}
                  </div>
                </li>
              ))}
            </ul>

            {contact.mapEmbedUrl ? (
              <div className="contact-map">
                <iframe
                  title="Our location"
                  src={contact.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="contact-map-placeholder">
                <FiMapPin aria-hidden="true" />
                <p>
                  Call or email us for directions — much of our work happens across scattered
                  homesteads and partner schools rather than at a single address.
                </p>
              </div>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {status === "sent" ? (
              <div className="form-success">
                <FiCheckCircle aria-hidden="true" />
                <h3>Thank you — your message is on its way</h3>
                <p>
                  We read everything that comes in and will reply as soon as we can. If it is
                  urgent, please call us on {contact.phone}.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <h3>Send us a message</h3>

                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="hidden-field">
                  <label>
                    Leave this field empty <input name="bot-field" tabIndex={-1} />
                  </label>
                </p>

                <div className="form-row">
                  <label htmlFor="name">
                    Your name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={values.name}
                    onChange={update}
                    autoComplete="name"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="email">
                    Email address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={update}
                    autoComplete="email"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={update}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="message">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={values.message}
                    onChange={update}
                  />
                </div>

                {status === "error" && (
                  <p className="form-error" role="alert">
                    Sorry — the message could not be sent from here. Please email us directly
                    at <a href={mailtoFallback}>{contact.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <FiSend aria-hidden="true" />
                </button>

                <p className="form-note">
                  We use your details only to reply to you. See our{" "}
                  <Link to="/privacy-policy">privacy policy</Link>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section">
        <div className="container">
          <SectionHeading kicker="Questions" heading="Things people ask us" />

          <div className="faq-list">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div className={`faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </button>
                  {open && (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
