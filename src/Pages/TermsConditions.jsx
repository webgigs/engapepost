import React from "react";

import PageHero from "../Components/PageHero";
import siteConfig from "../siteConfig";

const TermsConditions = () => (
  <>
    <PageHero
      imageKey="wideGallery"
      kicker="Legal"
      title="Terms & Conditions"
      text="The terms on which this website is provided."
      crumbs={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]}
    />

    <section className="legal-section">
      <div className="container legal-body">
        <p className="legal-updated">
          These terms cover your use of this website, operated by {siteConfig.legalName}.
        </p>

        <h2>Using this site</h2>
        <p>
          You are welcome to read, share and link to anything here. Please do not use the site
          in a way that damages it, misrepresents us, or breaks the law.
        </p>

        <h2>Accuracy</h2>
        <p>
          We keep this site as accurate as we can, but programme details change with the
          seasons, funding and the communities we work with. Nothing here is a binding
          commitment to deliver a particular activity on a particular date. If a detail
          matters to a decision you are making, contact us and confirm it.
        </p>

        <h2>Photographs and content</h2>
        <p>
          Photographs and text on this site belong to {siteConfig.name} unless stated
          otherwise. Journalists, partners and supporters may use them to report on or promote
          our work, with credit to {siteConfig.name}. Please ask us first before using an
          image of an identifiable person in any other context — the people in these
          photographs gave permission for our use of them, not for anyone's.
        </p>

        <h2>Donations and support</h2>
        <p>
          This website does not process payments. Contributions are arranged directly with us
          so that we can confirm details and issue a receipt. Never send funds to a personal
          account claiming to represent us without confirming with us first, using the contact
          details on this site.
        </p>

        <h2>Links to other sites</h2>
        <p>
          Where we link out, we do so because we think it is useful. We are not responsible
          for the content or practices of sites we do not run.
        </p>

        <h2>Liability</h2>
        <p>
          This site is provided as it is. To the extent the law allows, we are not liable for
          loss arising from its use or from any interruption to it.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms should go to{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </p>

        <p className="legal-note">
          These terms are a plain-language starting point and not legal advice. Have them
          reviewed against the law that applies to you before relying on them.
        </p>
      </div>
    </section>
  </>
);

export default TermsConditions;
