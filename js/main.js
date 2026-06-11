// ============================================================
// Paris Smith — parissmith.com
// Nav behavior, scroll reveal animations, contact form stub
// ============================================================

(function () {
  "use strict";

  // ---------- Sticky nav background on scroll ----------
  const nav = document.getElementById("nav");

  function onScroll() {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // ---------- Reveal-on-scroll animations ----------
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ---------- Contact form (stubbed) ----------
  //
  // TODO: Hook up a real email service. Two easy options:
  //
  //   1. Formspree — set the form's action to your Formspree endpoint
  //      and replace the handler below with a fetch() POST.
  //      https://formspree.io
  //
  //   2. A backend endpoint — POST the FormData to your API and send
  //      the email server-side.
  //
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in your name, email, and message.";
      status.className = "form__status form__status--error";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.className = "form__status form__status--error";
      return;
    }

    // Stub: pretend the message was sent successfully.
    status.textContent = "Thanks, " + name + "! Your message has been received.";
    status.className = "form__status form__status--success";
    form.reset();
  });

  // ---------- Footer year ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
