/* ============================================================================
   CASE-STUDY.JS
   ============================================================================
   Loaded on every projects/*.html page, AFTER portfolio-data.js and
   AFTER that page's own inline <script> that defines `window.caseStudy`.

   This file does the same two jobs as js/main.js:
     1. RENDERING  — shared header/nav/footer (from portfolioData) plus
        the case-study-only sections (meta row, gallery, steps, results,
        references) from the page's `caseStudy` object.
     2. BEHAVIOR   — mobile menu, header show/hide on scroll, scroll
        reveal, back-to-top. Identical behavior to the homepage, just
        re-implemented here since this page doesn't share main.js's
        DOM ids for the hero/projects/skills sections.

   TO ADD A NEW PROJECT PAGE: copy an existing projects/*.html file,
   edit its `caseStudy` object, and update the matching project's
   `caseStudyUrl` in js/portfolio-data.js. This file never needs editing.
============================================================================ */

const CS_ICONS = {
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M8 10v7"></path><circle cx="8" cy="7" r="1"></circle><path d="M12 10v7"></path><path d="M12 13c0-2 1.5-3 3.2-3 1.8 0 2.8 1.2 2.8 3v4"></path></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
};

/* ==========================================================================
   SHARED CHROME — nav, resume button, footer
   (Same content as the homepage, just built independently since this
   page doesn't load js/main.js.)
========================================================================== */
function csRenderChrome() {
  document.title = `${caseStudy.title} — ${portfolioData.personal.fullName}`;

  const navList = document.getElementById("nav-list");
  if (navList) {
    navList.innerHTML = portfolioData.nav
      .map((item) => `<li><a href="../index.html${item.href}" class="nav__link">${item.label}</a></li>`)
      .join("");
  }

  const resumeBtn = document.getElementById("header-resume-btn");
  if (resumeBtn) {
    resumeBtn.href = `../${portfolioData.personal.resumeFile}`;
    resumeBtn.target = "_blank";
    resumeBtn.removeAttribute("download");
  }

  const footerInitials = document.getElementById("footer-initials");
  if (footerInitials) footerInitials.textContent = portfolioData.personal.initials;

  const footerTagline = document.getElementById("footer-tagline");
  if (footerTagline) footerTagline.textContent = `${portfolioData.personal.role} — VLSI & Digital Design`;

  const footerSocials = document.getElementById("footer-socials");
  if (footerSocials) {
    footerSocials.innerHTML = portfolioData.socials
      .filter((s) => s.url)
      .map((s) => `<li><a href="${s.url}" class="icon-btn" target="_blank" rel="noopener" aria-label="${s.name}">${CS_ICONS[s.icon] || ""}</a></li>`)
      .join("");
  }

  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = `© ${new Date().getFullYear()} ${portfolioData.personal.fullName}`;
}

/* ==========================================================================
   CASE STUDY CONTENT
========================================================================== */
function csRenderHero() {
  document.getElementById("cs-status").textContent = caseStudy.status;
  document.getElementById("cs-title").textContent = caseStudy.title;
  document.getElementById("cs-subtitle").textContent = caseStudy.subtitle;
  document.getElementById("cs-summary").textContent = caseStudy.summary;

  const actions = document.getElementById("cs-actions");
  const links = [];
  if (caseStudy.github) links.push(`<a href="${caseStudy.github}" class="btn btn--outline" target="_blank" rel="noopener">${CS_ICONS.github} GitHub</a>`);
  if (caseStudy.demo) links.push(`<a href="${caseStudy.demo}" class="btn btn--outline" target="_blank" rel="noopener">Live Demo ${CS_ICONS.arrow}</a>`);
  if (caseStudy.reportPdf) links.push(`<a href="${caseStudy.reportPdf}" class="btn btn--primary" target="_blank" rel="noopener">${CS_ICONS.download} Project Report</a>`);
  actions.innerHTML = links.join("");

  const banner = document.getElementById("cs-banner");
  if (banner) {
    banner.innerHTML = caseStudy.banner
      ? `<img src="${caseStudy.banner}" alt="${caseStudy.title} banner">`
      : `<div class="cs-gallery__placeholder">${CS_ICONS.image}<span>Add a hero banner image — drop the file in the images/ folder and set "banner" in this page's caseStudy object.</span></div>`;
  }
}

function csRenderMeta() {
  const el = document.getElementById("cs-meta");
  el.innerHTML = caseStudy.meta
    .map((m) => `<div class="cs-meta__item"><span class="cs-meta__label">${m.label}</span><span class="cs-meta__value">${m.value}</span></div>`)
    .join("");
}

/* Fills any .cs-section__body element by id with a plain string, and
   skips (hides the parent <section>) if that content wasn't provided —
   this is what lets each case study omit sections that don't apply. */
function csRenderText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!value) {
    el.closest(".cs-section")?.remove();
    return;
  }
  el.textContent = value;
}

function csRenderSteps() {
  const el = document.getElementById("cs-steps");
  if (!caseStudy.steps || !caseStudy.steps.length) {
    el.closest(".cs-section")?.remove();
    return;
  }
  el.innerHTML = caseStudy.steps
    .map((s) => `
      <div class="cs-step glass-panel">
        <div class="cs-step__number" aria-hidden="true"></div>
        <div>
          <h3 class="cs-step__title">${s.title}</h3>
          <p class="cs-step__desc">${s.desc}</p>
        </div>
      </div>`)
    .join("");
}

/* ==========================================================================
   MEDIA GALLERY START
   Renders one card per entry in caseStudy.gallery. Entries with no
   "src" yet render as a labeled dashed placeholder instead of a
   broken image, so you can list every screenshot you PLAN to add
   before you actually have the files.
========================================================================== */
function csRenderGallery() {
  const el = document.getElementById("cs-gallery");
  if (!caseStudy.gallery || !caseStudy.gallery.length) {
    el.closest(".cs-section")?.remove();
    return;
  }
  el.innerHTML = caseStudy.gallery
    .map((g) => `
      <figure class="cs-gallery__item glass-panel">
        <div class="cs-gallery__frame">
          ${g.src
            ? `<img src="${g.src}" alt="${g.caption}" loading="lazy">`
            : `<div class="cs-gallery__placeholder">${CS_ICONS.image}<span>${g.caption} — image coming soon</span></div>`
          }
        </div>
        <figcaption class="cs-gallery__caption"><strong>${g.category}</strong>${g.caption}</figcaption>
      </figure>`)
    .join("");
}
/* ==========================================================================
   MEDIA GALLERY END
========================================================================== */

function csRenderResults() {
  const el = document.getElementById("cs-results");
  if (!caseStudy.results || !caseStudy.results.length) {
    el.closest(".cs-section")?.remove();
    return;
  }
  el.innerHTML = caseStudy.results
    .map((r) => `<div class="cs-result-card glass-panel"><div class="cs-result-card__value">${r.value}</div><div class="cs-result-card__label">${r.label}</div></div>`)
    .join("");
}

function csRenderList(id, items) {
  const el = document.getElementById(id);
  if (!items || !items.length) {
    el.closest(".cs-section")?.remove();
    return;
  }
  el.innerHTML = items.map((i) => `<li>${i}</li>`).join("");
}

function csRenderReferences() {
  const el = document.getElementById("cs-references");
  if (!caseStudy.references || !caseStudy.references.length) {
    el.closest(".cs-section")?.remove();
    return;
  }
  el.innerHTML = caseStudy.references
    .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.label}</a></li>`)
    .join("");
}

function csRenderNextProject() {
  const el = document.getElementById("cs-next");
  if (!caseStudy.nextProject) {
    el.remove();
    return;
  }
  el.href = caseStudy.nextProject.url;
  el.querySelector(".cs-next__title").textContent = caseStudy.nextProject.title;
}

/* ==========================================================================
   BEHAVIOR — same interactions as the homepage (main.js), reimplemented
   here since this page loads independently of main.js.
========================================================================== */
function csInitializeBehavior() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.classList.toggle("nav-toggle--active", isOpen);
    });
  }

  const header = document.getElementById("site-header");
  let lastScroll = 0;
  const onScroll = () => {
    const current = window.scrollY;
    header.classList.toggle("site-header--scrolled", current > 40);
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

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".cs-section, .cs-hero__banner, .cs-meta");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  csRenderChrome();
  csRenderHero();
  csRenderMeta();
  csRenderText("cs-overview", caseStudy.overview);
  csRenderText("cs-problem", caseStudy.problem);
  csRenderText("cs-objective", caseStudy.objective);
  csRenderText("cs-architecture", caseStudy.architecture);
  csRenderText("cs-workflow", caseStudy.workflow);
  csRenderSteps();
  csRenderGallery();
  csRenderResults();
  csRenderList("cs-challenges", caseStudy.challenges);
  csRenderList("cs-learnings", caseStudy.learnings);
  csRenderList("cs-future", caseStudy.future);
  csRenderReferences();
  csRenderNextProject();
  csInitializeBehavior();
});
