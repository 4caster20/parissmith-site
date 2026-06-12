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

  // ---------- Contact form ----------
  //
  // Submissions are sent to Web3Forms, which forwards them by email to
  // psconsulting07@gmail.com. The destination is controlled by the
  // `access_key` hidden field in index.html — get a free key tied to that
  // inbox at https://web3forms.com and paste it in there.
  //
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async function (e) {
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

    // Until a Web3Forms access key is added (see index.html), fall back to the
    // visitor's email client so messages can still reach the inbox.
    const accessKey = form.elements.access_key.value;
    if (!accessKey || accessKey.indexOf("REPLACE_WITH") === 0) {
      const subj = encodeURIComponent(
        form.elements.subject.value.trim() || "Message from parissmith.com"
      );
      const body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\n" + message
      );
      window.location.href =
        "mailto:psconsulting07@gmail.com?subject=" + subj + "&body=" + body;
      status.textContent = "Opening your email app to send your message…";
      status.className = "form__status form__status--success";
      return;
    }

    const formData = new FormData(form);
    if (!String(formData.get("subject") || "").trim()) {
      formData.set("subject", "New message from parissmith.com");
    }

    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    status.textContent = "";
    status.className = "form__status";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        status.textContent = "Thanks, " + name + "! Your message has been sent.";
        status.className = "form__status form__status--success";
        form.reset();
      } else {
        status.textContent =
          "Sorry, something went wrong. Please email psconsulting07@gmail.com directly.";
        status.className = "form__status form__status--error";
      }
    } catch (err) {
      status.textContent =
        "Network error. Please try again, or email psconsulting07@gmail.com directly.";
      status.className = "form__status form__status--error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });

  // ---------- Footer year ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
