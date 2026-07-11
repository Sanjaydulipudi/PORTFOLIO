/* ============================================================================
   MAIN.JS
   ============================================================================
   This file does two jobs:
     1. RENDERING — takes the content from portfolio-data.js and turns it
        into HTML on the page (so you never have to hand-edit index.html
        just to add a project or update a skill).
     2. BEHAVIOR — small interactive touches: the mobile menu, the header
        that appears on scroll, scroll-reveal animations, the active nav
        link, "back to top", and the contact form.

   You generally do NOT need to edit this file to update your content —
   see portfolio-data.js for that. This file is here so a curious beginner
   can read it and understand how the page works, with plain descriptive
   function names and comments explaining WHY, not just WHAT.
============================================================================ */

/* A small set of inline icons (SVG strings) used throughout the page.
   Using inline SVG instead of an icon font/library keeps the project
   dependency-free and lets icons inherit the surrounding text color. */
const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.4c1 .3 2.1.5 3.2.5a1.5 1.5 0 0 1 1.5 1.5V20a1.5 1.5 0 0 1-1.5 1.5C10.6 21.5 2.5 13.4 2.5 3.5A1.5 1.5 0 0 1 4 2h3.2a1.5 1.5 0 0 1 1.5 1.5c0 1.1.2 2.2.5 3.2a1.5 1.5 0 0 1-.4 1.5Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.5 8.5h6.9V21H3.5V8.5Zm7-.4 6.5-.02c5.6 0 6.5 3.6 6.5 8.3V21H17V17c0-2.6-.05-6-3.6-6-3.6 0-4.14 2.8-4.14 5.7V21H3.5V8.1h6.5Z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12h3l2-6 3 12 2-8 2 4h8"/></svg>',
  opamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5v14l14-7L4 5Z"/><path d="M18 9v6M21 12h-3"/></svg>',
};

/* ---------------------------------------------------------------------
   RENDER FUNCTIONS
   Each function fills in one part of the page using data from
   portfolio-data.js. They all follow the same pattern: find the
   container by id, build an HTML string, drop it in.
--------------------------------------------------------------------- */

function renderSiteMeta() {
  document.title = portfolioData.meta.siteTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", portfolioData.meta.siteDescription);
}

function renderNavigation() {
  const list = document.getElementById("nav-list");
  list.innerHTML = portfolioData.nav
    .map((item) => `<li><a href="${item.href}" class="nav__link">${item.label}</a></li>`)
    .join("");
}

function renderResumeButtons() {
  const path = portfolioData.personal.resumeFile;
  const fileName = path.split("/").pop();
  document.querySelectorAll("#header-resume-btn, #hero-resume-btn").forEach((btn) => {
    btn.setAttribute("href", path);
    btn.setAttribute("download", fileName);
  });
}

function renderHero() {
  const p = portfolioData.personal;
  document.getElementById("hero-role").textContent = p.role;
  document.getElementById("hero-name").innerHTML =
    p.fullName.replace("Dulipudi ", "");
  document.getElementById("hero-tagline").textContent = p.tagline;
  document.getElementById("logo-initials").textContent = p.initials;
  document.getElementById("chip-initials").textContent = p.initials;
  document.getElementById("footer-initials").textContent = p.initials;
  renderChipPhotoOrInitials();
  document.getElementById("footer-tagline").textContent = `${p.role} — VLSI & Digital Design`;

  const highlightsList = document.getElementById("hero-highlights");
  highlightsList.innerHTML = portfolioData.highlights
    .map(
      (h) => `<li class="chip"><span class="chip__value">${h.value}</span><span class="chip__label">${h.label}</span></li>`
    )
    .join("");

  renderSocialRow("hero-socials");
  renderSocialRow("footer-socials");
  renderChipBadges();
}

/* If personal.photo is set in portfolio-data.js, replace the initials
   monogram in the hero chip with an actual photo. Leaving photo empty
   keeps the initials — see the comment above that field in
   portfolio-data.js for instructions. */
function renderChipPhotoOrInitials() {
  const p = portfolioData.personal;
  if (!p.photo) return;

  const die = document.getElementById("chip-die");
  die.innerHTML = `<img class="chip-diagram__photo" src="${p.photo}" alt="${p.fullName}" />`;
}

function renderSocialRow(containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = portfolioData.socials
    .filter((s) => s.url)
    .map(
      (s) =>
        `<li><a href="${s.url}" class="icon-btn" target="_blank" rel="noopener" aria-label="${s.name}">${ICONS[s.icon] || ""}</a></li>`
    )
    .join("");
}

function renderChipBadges() {
  const el = document.getElementById("chip-badges");
  const items = portfolioData.interests.slice(0, 4);
  el.innerHTML = items
    .map(
      (label, i) =>
        `<li class="chip-diagram__badge chip-diagram__badge--${i + 1} glass-panel"><span>${label}</span></li>`
    )
    .join("");
}

function renderAbout() {
  document.getElementById("about-summary").textContent = portfolioData.personal.summary;

  const tagList = document.getElementById("about-interests");
  tagList.innerHTML = portfolioData.interests.map((i) => `<li class="tag">${i}</li>`).join("");

  const workflow = document.getElementById("workflow-steps");
  workflow.innerHTML = portfolioData.workflow
    .map(
      (w) => `
      <div class="workflow__step glass-panel">
        <span class="workflow__number">${w.step}</span>
        <h3 class="workflow__title">${w.title}</h3>
        <p class="workflow__desc">${w.desc}</p>
      </div>`
    )
    .join('<div class="workflow__connector" aria-hidden="true"></div>');
}

function renderEducation() {
  const el = document.getElementById("education-list");
  el.innerHTML = portfolioData.education
    .map(
      (ed) => `
      <div class="education-card glass-panel">
        <h4 class="education-card__degree">${ed.degree}</h4>
        <p class="education-card__school">${ed.school}</p>
        <p class="education-card__meta"><span>${ed.location}</span><span class="dot" aria-hidden="true">·</span><span class="mono">${ed.period}</span></p>
        <p class="education-card__detail">${ed.detail}</p>
        <ul class="tag-list tag-list--small">
          ${ed.coursework.map((c) => `<li class="tag tag--outline">${c}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");
}

function renderExperience() {
  const el = document.getElementById("experience-list");
  el.innerHTML = portfolioData.experience
    .map(
      (exp) => `
      <li class="timeline__item">
        <div class="timeline__marker" aria-hidden="true"></div>
        <div class="timeline__content glass-panel">
          <p class="timeline__period mono">${exp.period}</p>
          <h4 class="timeline__role">${exp.role}</h4>
          <p class="timeline__org">${exp.org} · ${exp.location}</p>
          <ul class="timeline__points">
            ${exp.points.map((pt) => `<li>${pt}</li>`).join("")}
          </ul>
        </div>
      </li>`
    )
    .join("");
}

function renderProjects() {
  const el = document.getElementById("project-grid");
  el.innerHTML = portfolioData.projects
    .map(
      (proj) => `
      <article class="project-card glass-panel">
        <div class="project-card__icon">${ICONS[proj.icon] || ICONS.filter}</div>
        <p class="project-card__period mono">${proj.period}</p>
        <h3 class="project-card__title">${proj.title}</h3>
        <p class="project-card__subtitle">${proj.subtitle}</p>
        <p class="project-card__desc">${proj.description}</p>
        <ul class="tag-list tag-list--small">
          ${proj.tags.map((t) => `<li class="tag tag--outline">${t}</li>`).join("")}
        </ul>
        ${proj.link
          ? `<a href="${proj.link}" class="project-card__link" target="_blank" rel="noopener">View project ${ICONS.arrow}</a>`
          : ""
        }
      </article>`
    )
    .join("");
}

function renderSkills() {
  const el = document.getElementById("skills-grid");
  const groups = [
    { title: "Languages", items: portfolioData.skills.languages },
    { title: "Tools & EDA Software", items: portfolioData.skills.tools },
    { title: "Technical Skills", items: portfolioData.skills.technical },
  ];
  el.innerHTML = groups
    .map(
      (g) => `
      <div class="skills-panel glass-panel">
        <h3 class="skills-panel__title">${g.title}</h3>
        <ul class="tag-list">
          ${g.items.map((s) => `<li class="tag">${s}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");
}

function renderContact() {
  const p = portfolioData.personal;
  const cards = [
    { icon: "mail", label: "Email", value: p.email, href: `mailto:${p.email}` },
    { icon: "phone", label: "Phone", value: p.phone, href: `tel:${p.phone.replace(/\s+/g, "")}` },
    { icon: "pin", label: "Location", value: p.location, href: "" },
  ];
  const el = document.getElementById("contact-cards");
  el.innerHTML = cards
    .map((c) => {
      const inner = `<span class="contact-card__icon">${ICONS[c.icon]}</span><span><span class="contact-card__label">${c.label}</span><span class="contact-card__value">${c.value}</span></span>`;
      return `<li>${c.href
        ? `<a class="contact-card glass-panel" href="${c.href}">${inner}</a>`
        : `<div class="contact-card glass-panel">${inner}</div>`
        }</li>`;
    })
    .join("");
}

function renderFooterYear() {
  document.getElementById("footer-year").textContent = `© ${new Date().getFullYear()} ${portfolioData.personal.fullName}`;
}

/* ---------------------------------------------------------------------
   BEHAVIOR
--------------------------------------------------------------------- */

/* Opens/closes the mobile navigation menu and keeps the hamburger
   icon's aria-expanded attribute in sync for screen readers. */
function initializeMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.classList.toggle("nav-toggle--active", isOpen);
  });

  // Close the menu after tapping a link (mobile users expect this)
  nav.addEventListener("click", (event) => {
    if (event.target.matches(".nav__link")) {
      nav.classList.remove("nav--open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("nav-toggle--active");
    }
  });
}

/* Adds a subtle background to the header once the page has scrolled
   past the hero, so nav text stays readable over any section. */
function initializeHeaderScrollState() {
  const header = document.getElementById("site-header");
  const onScroll = () => {
    header.classList.toggle("site-header--scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Fades + slides each major block into view the first time it enters
   the viewport. Respects users who have asked for reduced motion. */
function initializeScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(
    ".section, .hero__content, .hero__visual, .project-card, .workflow__step, .education-card, .timeline__item, .skills-panel"
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* Highlights the nav link that matches whichever section is currently
   in view, so visitors always know where they are on the page. */
function initializeActiveNavHighlighting() {
  const sections = [...document.querySelectorAll("main .section, main .hero")];
  const links = [...document.querySelectorAll(".nav__link")];
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle("nav__link--active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* The contact form has no backend, so "submitting" it opens the
   visitor's email client with a pre-filled message instead. */
function initializeContactForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
  });
}

/* ---------------------------------------------------------------------
   STARTUP
   Runs once the HTML is parsed. Render first, then wire up behavior,
   so event listeners always attach to elements that already exist.
--------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSiteMeta();
  renderNavigation();
  renderResumeButtons();
  renderHero();
  renderAbout();
  renderEducation();
  renderExperience();
  renderProjects();
  renderSkills();
  renderContact();
  renderFooterYear();

  initializeMobileMenu();
  initializeHeaderScrollState();
  initializeScrollReveal();
  initializeActiveNavHighlighting();
  initializeContactForm();
});
