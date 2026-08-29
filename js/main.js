/**
 * Zeimo Global Ventures — main.js
 * Lightweight, dependency-free interactions:
 *  1. Config injection (contact details, WhatsApp, social links)
 *  2. Sticky header shrink-on-scroll
 *  3. Mobile navigation toggle
 *  4. Smooth-scroll nav (closes mobile menu on click)
 *  5. Scroll-reveal animation (IntersectionObserver)
 *  6. Contact form handling (client-side only — no backend wired yet)
 *  7. Footer year
 */
(function () {
  "use strict";

  var cfg = window.ZEIMO_CONFIG || {};

  /* ---------- 1. Config injection ---------- */
  function applyConfig() {
    // WhatsApp floating button
    var wa = document.getElementById("whatsappFloat");
    if (wa && cfg.whatsapp && cfg.whatsapp.number) {
      var msg = encodeURIComponent(cfg.whatsapp.defaultMessage || "");
      wa.href = "https://wa.me/" + cfg.whatsapp.number + (msg ? "?text=" + msg : "");
    }

    // Address
    document.querySelectorAll('[data-config="addressFull"]').forEach(function (el) {
      if (cfg.address && cfg.address.full) el.textContent = cfg.address.full;
    });

    // Phone (href + visible text)
    document.querySelectorAll('[data-config="phoneHref"]').forEach(function (el) {
      if (cfg.phone && cfg.phone.dial) el.setAttribute("href", "tel:" + cfg.phone.dial);
      if (cfg.phone && cfg.phone.display) el.textContent = cfg.phone.display;
    });

    // Email (href + visible text)
    document.querySelectorAll('[data-config="emailHref"]').forEach(function (el) {
      if (cfg.email) {
        el.setAttribute("href", "mailto:" + cfg.email);
        el.textContent = cfg.email;
      }
    });

    // Office hours
    document.querySelectorAll('[data-config="officeHours"]').forEach(function (el) {
      if (cfg.officeHours) el.textContent = cfg.officeHours;
    });

    // Legal / registration identifiers (footer). Hidden automatically if empty.
    var legalEl = document.getElementById("footerLegalIds");
    if (legalEl) {
      var parts = [];
      if (cfg.cin) parts.push("CIN: " + cfg.cin);
      if (cfg.gstin) parts.push("GSTIN: " + cfg.gstin);
      legalEl.textContent = parts.length ? " · " + parts.join(" · ") : "";
    }

    // Social links
    if (cfg.social) {
      document.querySelectorAll('[data-config="social-linkedin"]').forEach(function (el) {
        el.setAttribute("href", cfg.social.linkedin || "#");
      });
      document.querySelectorAll('[data-config="social-facebook"]').forEach(function (el) {
        el.setAttribute("href", cfg.social.facebook || "#");
      });
      document.querySelectorAll('[data-config="social-instagram"]').forEach(function (el) {
        el.setAttribute("href", cfg.social.instagram || "#");
      });
    }
  }

  /* ---------- 2. Sticky header shrink-on-scroll ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------- 3 & 4. Mobile nav toggle + smooth scroll close ---------- */
  function initNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    function toggleNav() {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", toggleNav);

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- 5. Scroll-reveal animation ----------
     IntersectionObserver is the primary mechanism. A lightweight,
     throttled scroll/resize fallback — plus a final timeout — makes sure
     no section can ever stay invisible, whatever a particular browser's
     observer timing does. */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });

    // Manual fallback: catches anything the observer may have missed.
    var ticking = false;
    function revealInView() {
      var vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < vh + 100 && rect.bottom > -100) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
      ticking = false;
    }

    function onScrollOrResize() {
      if (!ticking) {
        window.requestAnimationFrame(revealInView);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("load", revealInView);
    revealInView();

    // Final safety net: never leave content hidden indefinitely.
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 3000);
  }

  /* ---------- 6. Contact form handling ---------- */
  function initForm() {
    var form = document.getElementById("enquiryForm");
    var success = document.getElementById("formSuccess");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // NOTE: No backend is wired up yet. Replace this block with a fetch()
      // call to your form endpoint / CRM API when one is available.
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      form.reset();
    });
  }

  /* ---------- 7. Footer year ---------- */
  function initYear() {
    var el = document.getElementById("currentYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initHeaderScroll();
    initNav();
    initReveal();
    initForm();
    initYear();
  });
})();
