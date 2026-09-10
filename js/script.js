/* =========================================================
   TANJIMA ABBAS PINKE — PORTFOLIO SCRIPT
   Modules:
   1. Theme (dark/light, persisted, respects system preference)
   2. Mobile navigation
   3. Active section highlighting
   4. Scroll reveal animations
   5. Back to top button
   6. Contact form validation
   7. Footer year
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. THEME ---------- */
  function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById("theme-toggle");
    const STORAGE_KEY = "portfolio-theme";

    function applyTheme(theme) {
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        toggle?.setAttribute("aria-label", "Switch to light theme");
        toggle?.setAttribute("aria-pressed", "true");
      } else {
        root.removeAttribute("data-theme");
        toggle?.setAttribute("aria-label", "Switch to dark theme");
        toggle?.setAttribute("aria-pressed", "false");
      }
    }

    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      stored = null;
    }

    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }

    toggle?.addEventListener("click", function () {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* localStorage unavailable — theme still applies for this session */
      }
    });
  }

  /* ---------- 2. MOBILE NAVIGATION ---------- */
  function initMobileNav() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    if (!menuToggle || !navLinks) return;

    function closeMenu() {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
      navLinks.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
    }

    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!navLinks.classList.contains("open")) return;
      const clickedInsideNav = e.target.closest(".nav");
      if (!clickedInsideNav) closeMenu();
    });
  }

  /* ---------- 3. ACTIVE SECTION HIGHLIGHTING ---------- */
  function initActiveSection() {
    const navLinks = document.querySelectorAll("[data-nav]");
    if (!navLinks.length || !("IntersectionObserver" in window)) return;

    const sections = Array.from(navLinks)
      .map(function (link) {
        const id = link.getAttribute("href");
        return id ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    function setActive(id) {
      navLinks.forEach(function (link) {
        const match = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", match);
        if (match) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- 4. SCROLL REVEAL ---------- */
  function initRevealAnimations() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 5. BACK TO TOP ---------- */
  function initBackToTop() {
    const button = document.getElementById("back-to-top");
    if (!button) return;

    function toggleVisibility() {
      button.classList.toggle("visible", window.scrollY > 480);
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 6. CONTACT FORM VALIDATION ---------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("name-error"),
        validate: function (value) {
          return value.trim().length > 0 ? "" : "Please enter your name.";
        },
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("email-error"),
        validate: function (value) {
          if (!value.trim()) return "Please enter your email.";
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value.trim()) ? "" : "Please enter a valid email address.";
        },
      },
      message: {
        input: document.getElementById("message"),
        error: document.getElementById("message-error"),
        validate: function (value) {
          return value.trim().length > 0 ? "" : "Please enter a message.";
        },
      },
    };

    const successEl = document.getElementById("form-success");

    function validateField(key) {
      const field = fields[key];
      if (!field.input) return true;
      const message = field.validate(field.input.value);
      field.error.textContent = message;
      field.input.closest(".form-field")?.classList.toggle("field-invalid", Boolean(message));
      field.input.setAttribute("aria-invalid", message ? "true" : "false");
      return !message;
    }

    Object.keys(fields).forEach(function (key) {
      const input = fields[key].input;
      if (!input) return;
      input.addEventListener("blur", function () {
        validateField(key);
      });
      input.addEventListener("input", function () {
        if (input.closest(".form-field")?.classList.contains("field-invalid")) {
          validateField(key);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (successEl) successEl.textContent = "";

      const results = Object.keys(fields).map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        const firstInvalid = form.querySelector(".field-invalid input, .field-invalid textarea");
        firstInvalid?.focus();
        return;
      }

      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const message = fields.message.input.value.trim();

      try {
        const subject = encodeURIComponent("Portfolio contact from " + name);
        const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
        const mailtoLink = "mailto:tanjimapinke2004@gmail.com?subject=" + subject + "&body=" + body;
        window.location.href = mailtoLink;

        if (successEl) {
          successEl.textContent = "Thanks, " + name + " — your email app should now be open to send the message.";
        }
        form.reset();
      } catch (err) {
        if (successEl) {
          successEl.textContent = "Something went wrong opening your email app. Please email tanjimapinke2004@gmail.com directly.";
        }
      }
    });
  }

  /* ---------- 7. FOOTER YEAR ---------- */
  function initFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMobileNav();
    initActiveSection();
    initRevealAnimations();
    initBackToTop();
    initContactForm();
    initFooterYear();
  });
})();
