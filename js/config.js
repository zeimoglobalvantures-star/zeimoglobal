/**
 * ============================================================
 *  ZEIMO GLOBAL VENTURES — SITE CONFIGURATION
 * ============================================================
 *  This is the SINGLE SOURCE OF TRUTH for all contact details,
 *  the WhatsApp number, and social links used across the site.
 *
 *  Edit the values below and they will automatically update
 *  everywhere they appear (header, footer, contact section,
 *  floating WhatsApp button, structured data) — no need to
 *  search through HTML files.
 *
 *  IMPORTANT: Keep this file loaded BEFORE js/main.js in every
 *  page's <script> order.
 * ============================================================
 */

window.ZEIMO_CONFIG = {
  // Company identity
  companyName: "Zeimo Global Ventures Private Limited",
  companyShortName: "Zeimo Global Ventures",
  tagline: "Smarter Customer Acquisition & Business Operations",

  // Contact details
  address: {
    line1: "Lone Complex, First Floor, Shop No. 3, Sopernaghama",
    line2: "Qaziabad – 193302, Near Hassan Sumo Stand",
    full: "Lone Complex, First Floor, Shop No. 3, Sopernaghama, Qaziabad – 193302, Near Hassan Sumo Stand"
  },
  phone: {
    display: "+91 60056 80415",
    dial: "+916005680415"
  },
  email: "contact@zeimo.in",

  // WhatsApp — single configuration point.
  // Replace ONLY this number; every WhatsApp link on the site reads from here.
  whatsapp: {
    number: "916005680415", // digits only, country code first, no + or spaces
    defaultMessage: "Hello Zeimo Global Ventures, I would like to know more about your services."
  },

  // Social media — replace "#" with live profile URLs when available
  social: {
    linkedin: "https://www.linkedin.com/company/zeimo-global-ventures-pvt-ltd",
    facebook: "#",
    instagram: "#"
  },

  // Office hours (used in contact section)
  officeHours: "Monday – Saturday, 9:30 AM – 6:30 PM",

  // Business/registration line for footer (optional, safe placeholder)
  registeredOffice: "India",

  // Legal / registration identifiers shown in the footer.
  // Leave either value as "" to hide that line automatically.
  cin: "U82200JK2026PTC019793",
  gstin: "01AADCZ1469L1Z6"
};
