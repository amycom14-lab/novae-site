/* =========================================================
   NOVAE — interactions du site
   ========================================================= */
(function () {
  "use strict";

  const WHATSAPP = "22393744951";
  const EMAIL = "contact.novae07@gmail.com";

  /* ---------- En-tête au défilement ---------- */
  const header = document.getElementById("header");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const nav = document.getElementById("nav");
  const menuBtn = document.querySelector(".menu-btn");
  let lockedScroll = 0;

  /* Verrouille le fond sans casser le défilement sur iOS */
  function lockScroll() {
    lockedScroll = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = "-" + lockedScroll + "px";
    document.body.classList.add("menu-open");
  }

  function unlockScroll() {
    if (!document.body.classList.contains("menu-open")) return;
    document.body.classList.remove("menu-open");
    document.body.style.top = "";

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, lockedScroll);
    root.style.scrollBehavior = previous;
  }

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Ouvrir le menu");
    unlockScroll();
  }

  if (nav && menuBtn) {
    menuBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
      if (isOpen) {
        lockScroll();
      } else {
        unlockScroll();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        menuBtn.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });

    window.addEventListener("orientationchange", function () {
      if (nav.classList.contains("open")) closeMenu();
    });
  }

  /* ---------- Apparition des blocs ---------- */
  const reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (element) {
      const siblings = element.parentElement
        ? Array.prototype.filter.call(element.parentElement.children, function (child) {
            return child.classList.contains("reveal");
          })
        : [];
      const index = siblings.indexOf(element);
      if (index > 0) {
        element.style.transitionDelay = Math.min(index, 5) * 70 + "ms";
      }
      observer.observe(element);
    });
  } else {
    reveals.forEach(function (element) {
      element.classList.add("in");
    });
  }

  /* ---------- Lien actif dans la navigation ---------- */
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('#nav a[href^="#"]'));
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const linkBySection = {};
    navLinks.forEach(function (link) {
      linkBySection[link.getAttribute("href").slice(1)] = link;
    });

    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.remove("active");
          });
          const current = linkBySection[entry.target.id];
          if (current) current.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------- Formulaire de devis ---------- */
  const form = document.getElementById("devis");
  const status = document.querySelector(".form-status");
  const emailLink = document.querySelector("[data-email]");

  function collect() {
    if (!form) return { nom: "", contact: "", projet: "", message: "" };
    const data = new FormData(form);
    return {
      nom: String(data.get("nom") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
      projet: String(data.get("projet") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
  }

  function buildMessage(fields) {
    return (
      "Bonjour NOVAE,\n\n" +
      "Je souhaite un devis.\n\n" +
      "Nom : " + fields.nom + "\n" +
      "Contact : " + fields.contact + "\n" +
      "Projet : " + fields.projet + "\n\n" +
      fields.message
    );
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = collect();
      const url =
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(buildMessage(fields));

      window.open(url, "_blank", "noopener");
      if (status) {
        status.textContent = "WhatsApp s'ouvre avec votre message prêt à envoyer.";
      }
    });
  }

  if (emailLink) {
    emailLink.addEventListener("click", function (event) {
      event.preventDefault();
      if (form && !form.reportValidity()) return;

      const fields = collect();
      const subject = "Demande de devis — " + (fields.projet || "Projet");
      const body = buildMessage(fields);
      window.location.href =
        "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- Bouton WhatsApp flottant ---------- */
  const waFloat = document.querySelector(".wa-float");
  const contactSection = document.getElementById("contact");
  const footer = document.querySelector(".site-footer");

  if (waFloat && contactSection && "IntersectionObserver" in window) {
    /* On masque le bouton dès que le contact ou le pied de page approche,
       pour ne jamais recouvrir un champ, un lien ou le copyright. */
    const visibleTargets = new Set();
    const floatObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visibleTargets.add(entry.target);
          } else {
            visibleTargets.delete(entry.target);
          }
        });
        waFloat.classList.toggle("is-hidden", visibleTargets.size > 0);
      },
      { threshold: 0 }
    );
    floatObserver.observe(contactSection);
    if (footer) floatObserver.observe(footer);
  }

  /* ---------- Année du pied de page ---------- */
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = String(year);
  });
})();
