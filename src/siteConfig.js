/**
 * ENGAPE POST — central site configuration.
 *
 * Everything a non-developer is likely to change lives here: the organisation's
 * name, contact details and social links. Nothing below is hard-coded anywhere
 * else in the app.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠  ITEMS MARKED "PLACEHOLDER" ARE NOT REAL. Replace them before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const siteConfig = {
  name: "ENGAPE POST",
  tagline: "friends of community",
  legalName: "Engape Post Community Based Organisation", // PLACEHOLDER — confirm the registered name
  description:
    "ENGAPE POST is a community based organisation working alongside rural and pastoralist communities on education, gender based violence, the eradication of FGM, and environmental conservation.",

  /**
   * Canonical origin, no trailing slash.
   *
   * Social networks refuse relative image paths, so the sharing tags in
   * public/index.html spell this origin out in full. Change it here AND there
   * if the domain ever moves.
   */
  url: "https://engapepost.org",

  contact: {
    email: "engape2024@gmail.com",
    phone: "+254 712 002180",
    phoneHref: "+254712002180",
    addressLines: [
      "ENGAPE POST",
      "P.O. Box 231",
      "Kiserian, Kajiado County",
      "Kenya",
    ],
    officeHours: "Monday – Friday, 8.00am – 5.00pm",
    /**
     * Paste a Google Maps "Embed a map" src URL here to switch the map on.
     * Leaving it empty renders a tidy placeholder card instead of a wrong map.
     */
    mapEmbedUrl: "",
  },

  /** Leave a value empty and its icon is hidden automatically. */
  social: {
    facebook: "", // PLACEHOLDER
    youtube: "", // PLACEHOLDER
    instagram: "", // PLACEHOLDER
    x: "", // PLACEHOLDER
  },

  /**
   * Headline figures for the home page.
   *
   * These are switched OFF deliberately: publishing unverified impact numbers
   * on a real organisation's site misleads donors and partners. Fill in figures
   * the organisation can stand behind, then set `enabled: true`.
   */
  impactStats: {
    enabled: false,
    items: [
      { value: "0", label: "Children reached with books and learning" },
      { value: "0", label: "Community dialogue sessions held" },
      { value: "0", label: "Tree seedlings planted and tended" },
      { value: "0", label: "Households growing kitchen gardens" },
    ],
  },
};

export default siteConfig;
