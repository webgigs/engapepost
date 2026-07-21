import React from "react";

import PageHero from "../Components/PageHero";
import siteConfig from "../siteConfig";

const PrivacyPolicy = () => (
  <>
    <PageHero
      imageKey="wideAbout"
      kicker="Legal"
      title="Privacy Policy"
      text="What we collect, why we collect it, and what we will never do with it."
      crumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
    />

    <section className="legal-section">
      <div className="container legal-body">
        <p className="legal-updated">
          This policy applies to {siteConfig.legalName} and to this website.
        </p>

        <h2>The short version</h2>
        <p>
          We collect as little as possible. We use it only to reply to you or to run our
          programmes. We do not sell it, and we do not share it with anyone else except where
          the law requires it or where safeguarding a child or a survivor of violence demands
          it.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>What you send us.</strong> If you use the contact form or email us, we
            receive your name, email address and whatever you choose to write.
          </li>
          <li>
            <strong>Basic site analytics.</strong> Our hosting provider may record standard
            technical information such as pages requested, approximate location and browser
            type. This is not used to identify individuals.
          </li>
          <li>
            <strong>Programme records.</strong> Where you take part in a programme, we may
            keep records needed to run and report on it. These are held separately from this
            website.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your message or request.</li>
          <li>To administer programmes and account to funders for how support was used.</li>
          <li>To send updates, only where you have asked to receive them.</li>
        </ul>

        <h2>Photographs and stories</h2>
        <p>
          We publish photographs and accounts of our work. We seek permission before
          photographing identifiable individuals, and consent from a parent or guardian for
          children. We do not identify survivors of gender based violence, and we do not
          publish a story that could put someone at risk — regardless of its fundraising
          value.
        </p>
        <p>
          If a photograph of you or your child appears on this site and you would like it
          removed, contact us at{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> and we
          will take it down.
        </p>

        <h2>Keeping it safe</h2>
        <p>
          We keep personal information no longer than we need it, restrict access to those who
          need it to do their work, and take reasonable steps to protect it. No system is
          perfectly secure, and we will tell you promptly if something goes wrong that affects
          you.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us what we hold about you, ask us to correct it, ask us to delete it, or
          withdraw consent for its use. Write to us and we will act on it.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy should go to{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or{" "}
          <a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phone}</a>.
        </p>

        <p className="legal-note">
          This policy is a plain-language summary and not legal advice. Have it reviewed
          against the data protection law that applies to you before relying on it.
        </p>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
