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

  // Contact details — REPLACE with official details when available
  address: {
    line1: "Add company address line 1",
    line2: "Add city, state, PIN code, country",
    full: "Add company address line 1, Add city, state, PIN code, country"
  },
  phone: {
    display: "+91 00000 00000",
    dial: "+910000000000"
  },
  email: "info@zeimoglobalventures.com",

  // WhatsApp — single configuration point.
  // Replace ONLY this number; every WhatsApp link on the site reads from here.
  whatsapp: {
    number: "910000000000", // digits only, country code first, no + or spaces
    defaultMessage: "Hello Zeimo Global Ventures, I would like to know more about your services."
  },

  // Social media — replace "#" with live profile URLs when available
  social: {
    linkedin: "#",
    facebook: "#",
    instagram: "#"
  },

  // Office hours (used in contact section)
  officeHours: "Monday – Saturday, 9:30 AM – 6:30 PM",

  // Business/registration line for footer (optional, safe placeholder)
  registeredOffice: "India"
};
