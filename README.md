# Laashmith Sanjay — Portfolio Website

A clean, warm-white "glassmorphism" portfolio site built for a VLSI /
digital design engineer — soft orange (signal) and circuit-green accents
on frosted glass panels. Plain HTML, CSS and JavaScript — no build tools,
no frameworks, nothing to install.

This README is written for someone with **almost zero web development
experience**. Read it top to bottom once, and you'll be able to update
every part of this site yourself.

---

## Table of contents

1. [What's in this project](#1-whats-in-this-project)
2. [How to view the site](#2-how-to-view-the-site)
3. [The golden rule: one file for content](#3-the-golden-rule-one-file-for-content)
4. [How to edit each part of the site](#4-how-to-edit-each-part-of-the-site)
   - [Your name, role and tagline](#your-name-role-and-tagline)
   - [Your profile photo](#your-profile-photo)
   - [Your résumé](#your-résumé)
   - [Highlights (CGPA, internship, etc.)](#highlights)
   - [Areas of interest](#areas-of-interest)
   - [Education](#education)
   - [Experience](#experience)
   - [Projects](#projects)
   - [Skills](#skills)
   - [Contact info & social links](#contact-info--social-links)
   - [Navigation menu](#navigation-menu)
5. [How to change colors and fonts](#5-how-to-change-colors-and-fonts)
6. [How to deploy the site (put it online)](#6-how-to-deploy-the-site-put-it-online)
7. [Common mistakes](#7-common-mistakes)
8. [FAQ](#8-faq)
9. [What this project deliberately avoids](#9-what-this-project-deliberately-avoids)

---

## 1. What's in this project

```
├── index.html               → The page structure (rarely needs editing)
├── css/
│   ├── variables.css         → Colors, fonts, spacing — edit this to re-theme
│   └── style.css             → Layout & component styles (commented, numbered sections)
├── js/
│   ├── portfolio-data.js     → ALL your content lives here — edit this most often
│   └── main.js                → Reads portfolio-data.js and builds the page
├── assets/
│   └── resume/                → Your résumé PDF
├── images/                    → Put your profile photo (or any images) here
└── README.md                  → You are here
```

**The short version:** to change what the site *says*, edit
`js/portfolio-data.js`. To change what the site *looks like*, edit
`css/variables.css`. You will rarely need to touch anything else.

---

## 2. How to view the site

You don't need to install anything to look at the site.

**Easiest way:** double-click `index.html`. It opens directly in your
browser.

**Recommended way** (avoids a few browser quirks with local files):
1. Install the free [VS Code](https://code.visualstudio.com/) editor.
2. Open this folder in VS Code.
3. Install the "Live Server" extension (search for it in the Extensions
   panel on the left).
4. Right-click `index.html` → **Open with Live Server**.

Either way, every time you save a change to a file, refresh the browser
tab to see it.

---

## 3. The golden rule: one file for content

Almost every word, date, link and skill on this site comes from a single
file: **`js/portfolio-data.js`**.

Open it and you'll see a big JavaScript object with clearly labeled
sections and comments above every field explaining what it controls.
`main.js` reads this file automatically and builds the HTML for you — so
adding a new project, for example, means adding one new entry to a list,
not writing any HTML.

A few formatting rules to keep in mind while editing:

- Keep text wrapped in quotes: `"like this"` or `'like this'`.
- Keep a comma after every item in a list, except the very last one.
- Never delete a `{`, `}`, `[` or `]` — only edit what's *inside* them.
- If you're ever unsure, copy the file somewhere safe before you start
  editing, so you can always undo everything at once.

---

## 4. How to edit each part of the site

All of the fields below live in `js/portfolio-data.js` unless stated
otherwise.

### Your name, role and tagline

```js
personal: {
  fullName: "Dulipudi Laashmith Sanjay",
  firstName: "Laashmith",
  initials: "LS",
  role: "Electronics & Communication Engineer",
  tagline: "From transistors to timing closure — ...",
  summary: "Electronics and Communication Engineering graduate...",
  ...
}
```
Edit the text between the quotes. `role` shows above your name in the
hero section and in the footer. `tagline` is the one-line pitch under
your name. `summary` is the paragraph in the About section.

### Your profile photo

By default the hero shows your initials (`"LS"`) inside a glass chip
instead of a photo. To use a real photo:

1. Add your image file to the `images/` folder — for example
   `images/profile.jpg`.
2. In `portfolio-data.js`, find:
   ```js
   photo: "",
   ```
   and change it to:
   ```js
   photo: "images/profile.jpg",
   ```
3. Save and refresh. The photo will automatically replace the initials.

Use a square-ish image for the best fit (it gets cropped to a square).

### Your résumé

Replace the file at `assets/resume/DULIPUDI_LAASHMITH_SANJAY_RESUME.pdf`
with your updated PDF. If you rename the file, also update this line in
`portfolio-data.js`:

```js
resumeFile: "assets/resume/DULIPUDI_LAASHMITH_SANJAY_RESUME.pdf",
```

Both "Download Résumé" / "Resume" buttons on the site use this one line.

### Highlights

The small fact pills near the top of the hero (CGPA, internship, etc.):

```js
highlights: [
  { label: "CGPA", value: "8.35 / 10" },
  { label: "MeitY C2S", value: "VLSI Design Intern" },
  { label: "IETE", value: "Vice President" },
],
```
Add, remove or edit entries. Keep these short and factual.

### Areas of interest

The tags under your tagline and in the About section (also used for the
four floating labels around the hero chip graphic — only the first four
are used there):

```js
interests: ["RTL Design", "Digital Design", "Physical Design", "ASIC", "Semiconductors", "VLSI"],
```

### Education

```js
education: [
  {
    degree: "B.Tech — Electronics and Communication Engineering",
    school: "Vasireddy Venkatadri Institute of Technology",
    location: "Guntur, India",
    period: "2022 – 2026",
    detail: "CGPA: 8.35",
    coursework: ["Digital & Analog Electronics", "CMOS VLSI Design", ...],
  },
],
```
To add a second degree, copy the whole `{ ... }` block (including the
comma after it) and edit the copy.

### Experience

```js
experience: [
  {
    role: "VLSI Design Intern",
    org: "ChipIN Centre — C2S Programme, MeitY (Govt. of India)",
    location: "Vijayawada, India",
    period: "May 2025 – Jun 2025",
    points: [
      "Gained hands-on experience across analog IC design...",
      "Developed and verified Verilog RTL modules...",
    ],
  },
  ...
],
```
Entries are shown in the order you list them (most recent first is
typical). Each bullet in `points` becomes one line in the timeline card.
Copy a whole `{ ... }` block to add a new role.

### Projects

```js
projects: [
  {
    title: "64-Tap FIR Filter",
    subtitle: "RTL Design, Synthesis & Verification",
    period: "May – Jun 2025",
    description: "A digital signal processing project...",
    tags: ["Verilog", "Synopsys DC", "Verdi", "Digital Design", "DSP"],
    icon: "filter",
    link: "",
  },
  ...
],
```
- `tags` show as small pills under the description — list the tools/
  languages used.
- `link` is optional. Leave it as `""` to hide the "View project" button,
  or set it to a GitHub URL to show it.
- `icon` picks a small icon for the card. Available icons: `"filter"`
  and `"opamp"`. To add more icons, see the `ICONS` object near the top
  of `js/main.js` and add a new entry following the same pattern (an SVG
  string), then reference its name here.

To add a new project, copy one whole `{ ... }` block above the closing
`]` and edit the copy.

### Skills

```js
skills: {
  languages: ["Verilog", "C", "Python", "MATLAB / Simulink"],
  tools: ["Cadence Virtuoso", "Synopsys Design Compiler", ...],
  technical: ["CMOS Circuit Analysis", ...],
},
```
Each list becomes its own panel on the Skills section. Add or remove
items freely — no need to keep the lists the same length.

### Contact info & social links

```js
personal: {
  ...
  email: "sanjaydulipudi@gmail.com",
  phone: "+91 83410 17777",
  location: "Guntur, India",
  linkedin: "https://www.linkedin.com/in/laashmithsanjay2005",
  github: "https://github.com/Sanjaydulipudi",
},

socials: [
  { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/laashmithsanjay2005" },
  { name: "GitHub", icon: "github", url: "https://github.com/Sanjaydulipudi" },
  { name: "Email", icon: "mail", url: "mailto:sanjaydulipudi@gmail.com" },
],
```
The Contact section cards use `personal.email`, `personal.phone` and
`personal.location`. The icon row in the header/hero/footer uses the
`socials` list — set a `url` to `""` to hide that icon.

> **Note:** the "Open Email Draft" button on the contact form has no
> server behind it — it opens the visitor's own email app with your
> address pre-filled. That's intentional: it keeps the site free to host
> anywhere with no backend to maintain.

### Navigation menu

```js
nav: [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  ...
],
```
`href` must match a section's `id` in `index.html` (e.g. `#projects`
matches `<section id="projects">`). Only add/remove/reorder items here
if you also add/remove the matching section in `index.html`.

---

## 5. How to change colors and fonts

Open **`css/variables.css`**. Everything is grouped and commented:

- **Colors** — 6 main values control the whole palette (background,
  two accent colors, and three text tones). Change `--color-accent` to
  swap the signal-orange color; change `--color-accent-2` to swap the
  circuit-green color.
- **Fonts** — three font "roles" (`--font-display`, `--font-body`,
  `--font-mono`). To use different Google Fonts, swap the font names
  here *and* update the `<link href="https://fonts.googleapis.com/...">`
  tag in the `<head>` of `index.html` to load the new font.
- **Spacing, radius, shadows, motion** — reusable scales used everywhere
  else in the CSS, so the whole site stays consistent if you nudge them.

You should not need to open `css/style.css` just to re-theme the site —
that file controls layout and structure, not raw colors/fonts.

---

## 6. How to deploy the site (put it online)

The site is 100% static files, so any static host works. Two easy, free
options:

**GitHub Pages**
1. Create a new GitHub repository and upload all the files in this
   folder to it.
2. Go to the repository's **Settings → Pages**.
3. Under "Source", choose the `main` branch and save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.

**Netlify**
1. Go to [netlify.com](https://www.netlify.com) and sign up (free).
2. Drag and drop this whole folder onto the "Deploy" area on your
   dashboard.
3. Netlify gives you a live URL immediately, and lets you connect a
   custom domain later if you want one.

---

## 7. Common mistakes

- **Forgot a comma** between two items in a list in `portfolio-data.js`
  → the whole page can stop rendering. If the site suddenly looks
  blank, open your browser's developer console (press `F12`) and look
  for a red error — it usually points at the exact line.
- **Deleted a quote mark** around a piece of text → same effect as above.
- **Renamed a file** (e.g. your résumé PDF) without updating the matching
  path in `portfolio-data.js` → the download button will 404.
- **Editing `index.html` to "add a project"** → don't. Add it to the
  `projects` list in `portfolio-data.js` instead; `index.html` doesn't
  contain project content at all.

---

## 8. FAQ

**Q: Do I need Node.js, npm, or any build step?**
No. Open `index.html` in a browser and it works. There's nothing to
compile.

**Q: Can I add a blog / testimonials / a dark-light theme toggle?**
You can, but they were intentionally left out of this version — a
recruiter-facing portfolio for VLSI/semiconductor roles benefits more
from a fast, focused page than extra sections with placeholder content.
If you want to add a section later, copy the pattern of an existing one
(a `<section>` in `index.html` with an empty container + a matching
`render...()` function in `main.js` + a new list in `portfolio-data.js`).

**Q: Why doesn't the contact form actually send an email?**
There's no backend/server in this project on purpose, so it can be
hosted for free anywhere (see [deployment](#6-how-to-deploy-the-site-put-it-online)).
The form opens a pre-filled email in your own mail app instead of
submitting anywhere.

**Q: The fonts look different than the screenshots.**
The site loads "Sora", "Inter" and "JetBrains Mono" from Google
Fonts over the internet. If you're offline, or a network blocks Google
Fonts, the browser falls back to a system font automatically — the site
still works, it just looks slightly different.

**Q: Can I use Bootstrap / React instead?**
This project deliberately does not use either — see the section below.

---

## 9. What this project deliberately avoids

This site replaces an older Bootstrap + jQuery template with plain
HTML/CSS/JS, on purpose:

- **No Bootstrap** — the layout uses native CSS Grid and Flexbox, which
  is simpler to read and edit than fighting Bootstrap's override
  classes, and it removes an entire dependency.
- **No jQuery / plugin stack** (the original template used jQuery,
  Waypoints, Stellar parallax, EasyPieChart and FlexSlider) — modern
  browsers support everything those did natively (`IntersectionObserver`
  for scroll effects, native `backdrop-filter` for glass panels), so all
  five were removed in favor of about 80 lines of plain JavaScript.
- **No icon font** — icons are small inline SVGs in `main.js`, so there's
  no extra font file to download and every icon can be recolored with
  plain CSS.
- **No React/Next.js/build tools** — a personal portfolio this size does
  not need a framework, and adding one would make it harder, not easier,
  for a beginner to maintain without help.

The result is a smaller, faster site with exactly one place to edit
content and one place to edit theme — no hidden configuration anywhere
else.
