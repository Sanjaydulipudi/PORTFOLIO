/* ============================================================================
   PORTFOLIO DATA FILE
   ============================================================================
   This is the ONLY file you need to edit to change what shows up on your
   portfolio. Name, education, projects, skills, contact info... all of it
   lives here as plain JavaScript objects and lists.

   HOW IT WORKS
   ------------
   1. You edit the values below (inside the quotes, mostly).
   2. main.js reads this file when the page loads.
   3. main.js builds the HTML for you and drops it into the page.

   You should almost never need to touch index.html or main.js just to
   update your content. If you want a full walkthrough with screenshots
   of "where does this field show up", open README.md.

   RULES TO AVOID BREAKING THE PAGE
   ---------------------------------
   - Keep the quotes ' ' or " " around text.
   - Keep every comma between items in a list [ ... , ... ].
   - Don't delete the [ ] or { } brackets, only what's inside them.
   - To add a new project/skill/experience entry, copy an existing block
     (the whole { ... } including its comma) and edit the copy.
   - If you're not sure, copy this file somewhere safe before editing so
     you always have a working version to go back to.
============================================================================ */

const portfolioData = {

  /* ---------------------------------------------------------------------
     SITE META
     Shows up in the browser tab and search engines. Rarely needs editing.
  --------------------------------------------------------------------- */
  meta: {
    siteTitle: "Laashmith Sanjay — VLSI & Digital Design Engineer",
    siteDescription:
      "Portfolio of Dulipudi Laashmith Sanjay, an ECE graduate specializing in RTL design, physical design and analog IC design.",
  },

  /* ---------------------------------------------------------------------
     PERSONAL INFO
     The core facts about you. Used in the header, hero section, footer
     and contact section.
  --------------------------------------------------------------------- */
  personal: {
    fullName: "Dulipudi Laashmith Sanjay",
    firstName: "Laashmith",
    initials: "LS",
    role: "Electronics & Communication Engineer",
    tagline: "From transistors to timing closure — I design and verify the silicon building blocks inside tomorrow's chips.",
    summary:
      "Electronics and Communication Engineering graduate with a strong foundation in digital electronics, CMOS fundamentals and VLSI design principles. Hands-on experience in circuit design, simulation and Verilog-based digital system development, backed by practical exposure to industry-standard EDA tools. Looking to contribute to the electronics and semiconductor industry.",
    location: "Guntur, India",
    email: "sanjaydulipudi@gmail.com",
    phone: "+91 83410 17777",
    linkedin: "https://www.linkedin.com/in/laashmithsanjay2005",
    github: "https://github.com/Sanjaydulipudi",

    /* Path to your resume PDF. The "Download Resume" buttons use this. */
    resumeFile: "assets/resume/DULIPUDI_LAASHMITH_SANJAY_RESUME.pdf",

    /* Leave photo as an empty string "" to show your initials in a glass
       chip instead of a photo. To use a real photo:
         1. Add your image to the images/ folder, e.g. images/profile.jpg
         2. Change the line below to: photo: "images/profile.jpg" */
    photo: "NEW_PIC.jpg",
  },

  /* ---------------------------------------------------------------------
     QUICK HIGHLIGHTS
     Short factual chips shown near the top of the page. Keep these true
     and specific — avoid invented numbers.
  --------------------------------------------------------------------- */
  highlights: [
    { label: "CGPA", value: "8.35 / 10" },
    { label: "MeitY C2S", value: "VLSI Design Intern" },
    { label: "IETE", value: "Vice President" },
  ],

  /* Areas of interest, shown as tags under the hero tagline. */
  interests: [
    "RTL Design",
    "Digital Design",
    "Physical Design",
    "ASIC",
    "Semiconductors",
    "VLSI",
  ],

  /* ---------------------------------------------------------------------
     DESIGN FLOW STRIP
     A small 4-step visual reflecting the actual chip design flow you
     worked with during your internship. Edit wording if your flow changes.
  --------------------------------------------------------------------- */
  workflow: [
    {
      step: "01",
      title: "RTL Design",
      desc: "Verilog modules, FSMs and functional simulation.",
    },
    {
      step: "02",
      title: "Synthesis",
      desc: "Gate-level netlists, timing & area optimization.",
    },
    {
      step: "03",
      title: "Physical Design",
      desc: "Floorplanning, placement, CTS and routing.",
    },
    {
      step: "04",
      title: "Verification",
      desc: "Waveform debugging and sign-off in Verdi.",
    },
  ],

  /* ---------------------------------------------------------------------
     EDUCATION
     Add another { ... } block above the closing ] to list more degrees.
  --------------------------------------------------------------------- */
  education: [
    {
      degree: "B.Tech — Electronics and Communication Engineering",
      school: "Vasireddy Venkatadri Institute of Technology",
      location: "Guntur, India",
      period: "2022 – 2026",
      detail: "CGPA: 8.35",
      coursework: [
        "Digital & Analog Electronics",
        "CMOS VLSI Design",
        "Digital IC Design",
        "Semiconductor Devices",
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     EXPERIENCE
     Internships, jobs and leadership roles, most recent first.
  --------------------------------------------------------------------- */
  experience: [
    {
      role: "VLSI Design Intern",
      org: "ChipIN Centre — C2S Programme, MeitY (Govt. of India)",
      location: "Vijayawada, India",
      period: "May 2025 – Jun 2025",
      points: [
        "Gained hands-on experience across analog IC design, digital RTL design and physical design workflows using Cadence Virtuoso, Synopsys VCS / DC / ICC2 and Vivado.",
        "Developed and verified Verilog RTL modules — adders, multipliers, counters and finite state machines — with functional debugging through simulation and waveform analysis.",
        "Performed RTL synthesis, timing and area analysis, floorplanning, placement, clock tree synthesis (CTS) and routing as part of the digital physical design flow.",
      ],
    },
    {
      role: "Vice President",
      org: "The Institution of Electronics and Telecommunication Engineers (IETE)",
      location: "Guntur, India",
      period: "Jun 2024 – May 2025",
      points: [
        "Led the planning and execution of technical workshops, seminars, guest lectures and competitions in collaboration with faculty, industry professionals and student volunteers.",
        "Managed chapter operations by coordinating cross-functional teams and promoting student participation, strengthening leadership, communication and organizational skills.",
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     PROJECTS
     To add a project: copy one whole { ... } block and edit the copy.
     Leave "link" as an empty string "" if you don't have a public repo
     yet — the button will simply be hidden.
  --------------------------------------------------------------------- */
  projects: [
    {
      title: "64-Tap FIR Filter",
      subtitle: "RTL Design, Synthesis & Verification",
      period: "May – Jun 2025",
      description:
        "A digital signal processing project implementing a modular, parameterizable 64-tap FIR filter in Verilog RTL using custom multipliers and adders for high throughput. Synthesized to a gate-level netlist in Synopsys Design Compiler under timing constraints, verified with a self-checking testbench against a golden reference model, and debugged through waveform analysis in Synopsys Verdi.",
      tags: ["Verilog", "Synopsys DC", "Verdi", "Digital Design", "DSP"],
      icon: "filter",
      link: "",
    },
    {
      title: "Two-Stage CMOS Op-Amp",
      subtitle: "Analog & Layout Design",
      period: "May – Jun 2025",
      description:
        "A two-stage CMOS operational amplifier built in Cadence Virtuoso with a differential input stage, current-mirror load and a common-source stage with Miller compensation for high gain and stability. Verified gain, bandwidth, slew rate and phase margin through AC, DC and transient simulations, then carried the design through layout and post-layout simulation, resolving all DRC and LVS violations.",
      tags: ["Cadence Virtuoso", "Analog IC", "DRC / LVS", "Layout Design"],
      icon: "opamp",
      link: "",
    },
  ],

  /* ---------------------------------------------------------------------
     SKILLS
     Grouped into three lists. Add or remove entries freely.
  --------------------------------------------------------------------- */
  skills: {
    languages: ["Verilog", "C", "Python", "MATLAB / Simulink"],
    tools: [
      "Cadence Virtuoso",
      "Synopsys Design Compiler",
      "Synopsys Verdi",
      "Xilinx Vivado",
    ],
    technical: [
      "CMOS Circuit Analysis",
      "Combinational & Sequential Logic",
      "Circuit Design & Simulation",
      "HDL Implementation",
      "Low-Power Design Fundamentals",
      "Physical Design Basics (Floorplanning, Placement, Routing)",
    ],
  },

  /* ---------------------------------------------------------------------
     SOCIAL LINKS
     Shown in the header, hero and footer. Set "url" to "" to hide one.
  --------------------------------------------------------------------- */
  socials: [
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/laashmithsanjay2005" },
    { name: "GitHub", icon: "github", url: "https://github.com/Sanjaydulipudi" },
    { name: "Email", icon: "mail", url: "mailto:sanjaydulipudi@gmail.com" },
  ],

  /* ---------------------------------------------------------------------
     NAVIGATION
     The links shown in the top navigation bar.
  --------------------------------------------------------------------- */
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};
