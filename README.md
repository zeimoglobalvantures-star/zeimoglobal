# Zeimo Global Ventures — Corporate Website

A fast, dependency-free, fully responsive one-page corporate website built with
plain HTML, CSS and vanilla JavaScript (no frameworks, no build step required).

## File structure

```
zeimo-global-ventures/
├── index.html            All page content and sections
├── css/
│   └── style.css         Full design system and responsive styles
├── js/
│   ├── config.js         ⭐ Single source of truth for contact/WhatsApp/social info
│   └── main.js           Interactions (nav, scroll effects, form, reveal animation)
├── assets/img/
│   ├── favicon.svg       Site favicon
│   └── og-image.png      Social share preview image
├── robots.txt
├── sitemap.xml
└── README.md
```

## How to update content

### 1. Contact details, phone & WhatsApp number (do this first)

Open `js/config.js`. Every value in that file is read once and applied
across the entire site (header, footer, contact section, floating WhatsApp
button, JSON-LD structured data reference) — so you only ever edit it in
**one place**:

- `phone.display` / `phone.dial` — shown phone number and the `tel:` link
- `email` — shown email and the `mailto:` link
- `address.full` — office address shown in the footer and contact section
- `whatsapp.number` — digits only, country code first, no `+` or spaces
  (e.g. `919876543210`). This is the number the floating WhatsApp button
  links to via `wa.me`.
- `social.linkedin` / `social.facebook` / `social.instagram` — replace `"#"`
  with the live profile URLs when ready.

### 2. Director's message

In `index.html`, find the `<section ... id="director">` block. Replace:
- The placeholder name/title text (`Director Name Placeholder`)
- The message inside the `<blockquote>` tag
- The placeholder avatar graphic can be swapped for a real photo by
  replacing the inline `<svg>` with an `<img>` tag pointing to the
  photo file (remember to add descriptive `alt` text).

### 3. Testimonials

In `index.html`, find `<section ... id="testimonials">`. Each
`.testimonial-card` has the quote text, client name and company name —
simply edit the text directly. Keep this section to 1–2 testimonials as
designed.

### 4. Services, "Why Choose Us" and process steps

Each service/benefit/step is a self-contained card inside `index.html`
(`#services`, `#why-choose`, `#how-we-work`). Copy an existing `<article>`
or `<div>` block, edit the icon reference (`<use href="#icon-...">`,
see the icon sprite at the top of `<body>` for available icons) and text.

### 5. SEO basics

- Update `<title>`, meta description and Open Graph tags in the `<head>`
  of `index.html` once the final domain is confirmed.
- Update the domain in `sitemap.xml`, `robots.txt` and the `og:url` /
  `canonical` tags (currently placeholders using
  `https://www.zeimoglobalventures.com/`).
- Replace `assets/img/og-image.png` with an official brand image if
  desired (recommended size 1200×630).

## Performance notes

- No external JS frameworks or icon-font libraries — icons are a single
  inline SVG sprite, loaded once with the page.
- Fonts are loaded from Google Fonts with `preconnect` + `font-display: swap`
  to avoid blocking first paint.
- All illustrations are inline SVG (crisp at any size, no image requests).
- Scroll-reveal animations use `IntersectionObserver` and respect
  `prefers-reduced-motion`.
- The contact form currently handles submission client-side only (shows a
  success message). Connect it to your email service, CRM, or backend API
  by editing the `submit` handler in `js/main.js` (`initForm` function).

## Deployment

This is a static site — it can be deployed as-is to any static host
(Netlify, Vercel, GitHub Pages, S3 + CloudFront, or a standard web server).
No build step is required. Simply upload the contents of this folder.
