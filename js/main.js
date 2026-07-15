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
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect x="3" y="3" width="18" height="18" rx="2"></rect> <path d="M8 10v7"></path> <circle cx="8" cy="7" r="1"></circle> <path d="M12 10v7"></path> <path d="M12 13c0-2 1.5-3 3.2-3 1.8 0 2.8 1.2 2.8 3v4"></path> </svg>`,
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

  // Every "Resume" / "View Resume" button opens the PDF in a new tab
  // rather than forcing a download.
  ["header-resume-btn", "hero-resume-btn", "about-resume-btn", "contact-resume-btn"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = path;
    el.target = "_blank";
    el.removeAttribute("download");
  });

  // "Download Resume" buttons keep the real download behavior.
  ["hero-resume-download", "footer-resume-btn"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = path;
    el.setAttribute("download", "");
    el.removeAttribute("target");
  });

}

/* Wraps each word of a name line in a ".word" span (so it can be
   clipped with overflow:hidden) containing an inner span that actually
   animates upward into view. Each word's animation-delay is staggered
   a little after the last, so the name reveals word-by-word rather
   than all at once. `startDelay` lets the second line begin slightly
   after the first finishes. */
function buildStaggerLine(text, startDelay) {
  const words = text.split(" ");
  return words
    .map((word, i) => {
      const delay = (startDelay + i * 0.12).toFixed(2);
      return `<span class="word"><span style="animation-delay:${delay}s">${word}</span></span>`;
    })
    .join(" ");
}

function renderHero() {

  const p = portfolioData.personal;

  document.getElementById("hero-name").innerHTML = `
        <span>${buildStaggerLine("DULIPUDI", 0.1)}</span>
        <span>${buildStaggerLine("LAASHMITH SANJAY", 0.34)}</span>
    `;

  document.getElementById("hero-role").textContent = p.role;

  document.getElementById("hero-tagline").textContent = p.tagline;

  renderChipPhotoOrInitials();

  document.getElementById("footer-tagline").textContent =
    `${p.role} — VLSI & Digital Design`;

  /* ==========================================
     RECENT ACHIEVEMENTS
  ========================================== */

  const heroAchievements = document.getElementById("hero-highlights");

  heroAchievements.innerHTML = `

<div class="hero-achievement glass-panel">

    <div class="hero-achievement__icon">

        📊

    </div>

    <div class="hero-achievement__value">

        8.35 / 10

    </div>

    <div class="hero-achievement__label">

        CGPA

    </div>

    <div class="hero-achievement__date">

        June 2026

    </div>

</div>

<div class="hero-achievement glass-panel">

    <div class="hero-achievement__icon">

        💻

    </div>

    <div class="hero-achievement__value">

        VLSI Design Intern

    </div>

    <div class="hero-achievement__label">

        MeitY C2S Programme

    </div>

    <div class="hero-achievement__date">

        May 2025 — June 2025

    </div>

</div>

<div class="hero-achievement glass-panel">

    <div class="hero-achievement__icon">

        🏆

    </div>

    <div class="hero-achievement__value">

        Vice President

    </div>

    <div class="hero-achievement__label">

        IETE Student Chapter

    </div>

    <div class="hero-achievement__date">

        June 2024 — May 2025

    </div>

</div>

`;

  renderHeroSocialCards();

  renderChipBadges();

  renderSocialRow("footer-socials");

}

function renderHeroSocialCards() {

  const container = document.getElementById("hero-social-cards");

  if (!container) return;

  const socials = portfolioData.socials.filter(item =>
    item.name === "LinkedIn" ||
    item.name === "GitHub"
  );

  container.innerHTML = socials.map(item => `

<a

class="hero-social-card glass-panel"

href="${item.url}"

target="_blank"

rel="noopener"

>

<div class="hero-social-card__icon">

${ICONS[item.icon]}

</div>

<div class="hero-social-card__title">

${item.name}

</div>

</a>

`).join("");

}

/* If personal.photo is set in portfolio-data.js, replace the initials
   monogram in the hero chip with an actual photo. Leaving photo empty
   keeps the initials — see the comment above that field in
   portfolio-data.js for instructions. */
function renderChipPhotoOrInitials() {

  const p = portfolioData.personal;

  const die = document.getElementById("chip-die");

  if (!die) return;

  if (p.photo) {

    die.innerHTML = `

<img

class="chip-diagram__photo"

src="${p.photo}"

alt="${p.fullName}"

>

`;

  } else {

    die.innerHTML = `

<div class="chip-diagram__initials">

${p.initials}

</div>

`;

  }

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

/* ==========================================================================
   PROJECT CARD START
   ==========================================================================
   Renders one .project-card per entry in portfolioData.projects.
   Each card shows: icon, period, status pill, title, subtitle, description,
   a short "quick highlights" list, tech tags, then up to three actions —
   GitHub, Live Demo, and "View Case Study" (linking to that project's own
   page) — any of which are simply omitted if the matching data field is "".
========================================================================== */
function renderProjects() {
  const el = document.getElementById("project-grid");
  el.innerHTML = portfolioData.projects
    .map(
      (proj) => `
      <article class="project-card glass-panel">
        <div class="project-card__top">
          <div class="project-card__icon">${ICONS[proj.icon] || ICONS.filter}</div>
          ${proj.status ? `<span class="project-card__status">${proj.status}</span>` : ""}
        </div>

        <p class="project-card__period mono">${proj.period}</p>
        <h3 class="project-card__title">${proj.title}</h3>
        <p class="project-card__subtitle">${proj.subtitle}</p>
        <p class="project-card__desc">${proj.description}</p>

        ${proj.highlights && proj.highlights.length
          ? `<ul class="project-card__highlights">
              ${proj.highlights.map((h) => `<li>${h}</li>`).join("")}
            </ul>`
          : ""
        }

        <ul class="tag-list tag-list--small">
          ${proj.tags.map((t) => `<li class="tag tag--outline">${t}</li>`).join("")}
        </ul>

        <div class="project-card__actions">
          ${proj.caseStudyUrl
            ? `<a href="${proj.caseStudyUrl}" class="btn btn--primary btn--small">View Case Study</a>`
            : ""
          }
          ${proj.link
            ? `<a href="${proj.link}" class="project-card__link" target="_blank" rel="noopener">${ICONS.github} GitHub</a>`
            : ""
          }
          ${proj.demoLink
            ? `<a href="${proj.demoLink}" class="project-card__link" target="_blank" rel="noopener">Live Demo ${ICONS.arrow}</a>`
            : ""
          }
        </div>
      </article>`
    )
    .join("");
}
/* ==========================================================================
   PROJECT CARD END
========================================================================== */

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

/* A very light parallax drift on the hero's PCB-pattern background —
   moves at a fraction of scroll speed via a CSS custom property, so it
   reads as depth rather than motion. Capped so it never drifts far
   enough to become a distraction. */
function initializeHeroParallax() {
  const bg = document.querySelector(".hero__bg");
  if (!bg) return;

  const onScroll = () => {
    const offset = Math.min(window.scrollY * 0.08, 40);
    bg.style.setProperty("--parallax", offset.toFixed(1));
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Adds a subtle background to the header once the page has scrolled
   past the hero, so nav text stays readable over any section. */
function initializeHeaderScrollState() {

  const header = document.getElementById("site-header");

  let lastScroll = 0;

  const onScroll = () => {

    const current = window.scrollY;

    header.classList.toggle(
      "site-header--scrolled",
      current > 40
    );

    if (current <= 20) {

      header.classList.remove("site-header--hidden");

      lastScroll = current;

      return;

    }

    if (current > lastScroll && current > 120) {

      header.classList.add("site-header--hidden");

    } else {

      header.classList.remove("site-header--hidden");

    }

    lastScroll = current;

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

        } else {

          entry.target.classList.remove("is-visible");

        }

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px"
    }
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
  renderHeroSocialCards();
  renderChipBadges();
  renderAbout();
  renderEducation();
  renderExperience();
  renderProjects();
  renderSkills();
  renderContact();
  renderFooterYear();

  initializeMobileMenu();
  initializeHeaderScrollState();
  initializeHeroParallax();
  initializeScrollReveal();
  initializeActiveNavHighlighting();
  initializeContactForm();
});
