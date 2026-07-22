/* ------------------------------------------------------------------
   app.js
   UI wiring + guide generation for the Teacher Onboarding Agent.

   Four entry paths from the choice screen, each its own destination:
     Standards          -> grade/subject picker -> pacing suggestions
     Veracross           -> platform walkthrough
     First-Week Checklist -> same for every teacher
     Atlas Curriculum Maps -> same for every teacher
------------------------------------------------------------------- */

const VERA_CROSS_STEPS = [
  {
    title: "Log in & find your classes",
    detail: "Log in at your school's Veracross portal with your staff credentials. From the dashboard, open \"My Classes\" to confirm your class list/rosters match your schedule.",
  },
  {
    title: "Take attendance",
    detail: "Open a class period, select \"Attendance,\" and mark students present/absent/tardy. Submit before the daily attendance deadline set by your school office.",
  },
  {
    title: "Enter grades",
    detail: "Go to \"Gradebook,\" select the assignment (or create a new one), and enter scores per student. Set assignment weight/category so it calculates correctly into the term grade.",
  },
  {
    title: "Communicate with families",
    detail: "Use the \"Message Center\" or portal comments to share progress notes. Report cards and progress reports pull directly from your gradebook, so keep entries current.",
  },
  {
    title: "Get help",
    detail: "If something looks wrong (missing roster, locked gradebook, sync issue), contact your school's Veracross admin/registrar rather than troubleshooting alone — most issues are account/permission related.",
  },
];

const FIRST_WEEK_CHECKLIST = [
  "Confirm Veracross login works and class rosters are accurate",
  "Take and submit attendance successfully at least once before Day 1",
  "Set up gradebook categories/weights for your grade level and subject",
  "Locate and bookmark your grade/subject curriculum maps in Atlas",
  "Review the pacing suggestions below and compare against your team's shared pacing guide",
  "Meet your grade-level/subject team lead and identify your onboarding point of contact",
  "Locate emergency procedures (fire drill, lockdown, health office) and classroom-specific logistics",
  "Confirm access to shared drives, printer/copier codes, and any classroom supply request process",
  "Set up your classroom management system and communicate it to families in your first note home",
];

const ATLAS_SECTIONS = [
  {
    heading: "Unit Planning",
    intro: "Customized for your curriculum journey - built to support backward design or a content-first approach, with templates that evolve as your process does.",
    bullets: [
      "Browse your whole school and district curriculum in one click, filtered by grade, subject, or course. \"Map Type\" lets the school manage different design types for the same course.",
      "Course at a Glance shows your Unit Calendar for the year - slide the unit-length bar to adjust duration.",
      "Personalize your Atlas landing page with drag-and-drop panels and dashboards built around what you use most.",
      "Global Search finds any keyword across your entire written curriculum - standards, units, resources - with pie/bar charts showing where a concept is addressed, and filters to narrow results.",
      "Standards Alignment draws from the most comprehensive standards collection in the industry, with a searchable, drill-able menu, and tracks what's been targeted and assessed, and how often.",
      "Track Learning Goals - SLOs, 21st Century skills, life and career skills - with icons marking essential vs. supporting standards, built right into the unit planner.",
      "Assessment Planning lets the school customize its assessment method list, see how methods are used by grade/subject via charts, and snapshot reports to track changes over time.",
    ],
  },
  {
    heading: "Lesson Planning",
    intro: "Bridges the gap between planning and practice.",
    bullets: [
      "See how different teachers implement the same unit plan in their own classrooms.",
      "Manage your own lesson templates, or use a uniform template the school has built for everyone.",
      "Select target standards straight from the unit and attach resources to each lesson.",
      "Send lesson plans from Atlas directly to Google Classroom to share with students.",
    ],
  },
  {
    heading: "Analytics",
    intro: "Turns curriculum data into actionable insight.",
    bullets: [
      "Curriculum Insights Report - AI-generated analysis of alignment gaps, coverage patterns, and recommendations to strengthen curriculum coherence.",
      "Standards and Assessments Analysis - see where standards are taught and assessed across grade levels, and run reports for gaps, redundancies, scope and sequence, and interdisciplinary connections.",
      "Vertical and Horizontal Scope and Sequence - build documents across grades in one discipline, or across disciplines in one grade, to spot cross-disciplinary opportunities and repeated or missing content.",
      "Comparative Unit Calendar - view multiple courses' calendars at once and compare unit details side by side.",
      "Comments & Discussions - leave yourself a note while writing curriculum, post for others to add resources or feedback, or start a discussion about a course, unit, or report.",
    ],
  },
  {
    heading: "Integrations",
    intro: "Connects to the tools our school already uses.",
    bullets: [
      "Single Sign-On through Google, Office 365, Clever, or our school's ADFS account.",
      "ManageBac - browse and edit Atlas alongside ManageBac Classes, and extend units into the ManageBac stream with assessment tasks and resources.",
      "Google Suite for Education - pick files straight from Google Drive, and push lessons from Atlas to Google Classroom.",
      "LTI Integration with Canvas, Schoology, and other LTI-ready platforms.",
      "OneRoster Ready - syncs with our student information system through Classlink, or direct OneRoster import.",
    ],
  },
  {
    heading: "Atlas AI",
    intro: "AI support for building unit content from your standards and goals.",
    bullets: [
      "Generates a starting point using your unit name, course, grade, and aligned standards.",
      "Customizable output - ask for student-friendly language, another language, or added context.",
      "Full transparency: Atlas marks content whenever AI was used to help create it.",
    ],
  },
  {
    heading: "FariaLearn",
    intro: "Atlas's on-demand, asynchronous professional development platform.",
    bullets: [
      "Self-paced courses on Atlas how-tos, unit development, and student engagement.",
      "Earn a certificate of completion for each course, or get the full FariaLearn Bundle.",
    ],
  },
];

const DOMAIN_NAMES = {
  CC: "Counting & Cardinality",
  OA: "Operations & Algebraic Thinking",
  NBT: "Number & Operations in Base Ten",
  NF: "Number & Operations—Fractions",
  MD: "Measurement & Data",
  G: "Geometry",
  RL: "Reading: Literature",
  RI: "Reading: Informational Text",
  RF: "Reading: Foundational Skills",
  W: "Writing",
};

function renderTopic(grade, subjectKey, topic) {
  // Science/history topics are plain strings with no per-topic standard link.
  if (typeof topic === "string") return `<li>${topic}</li>`;

  const linkBuilder = subjectKey === "math" ? mathLink : readingLink;
  const url = linkBuilder(grade, topic.code);
  const domainName = DOMAIN_NAMES[topic.code] || topic.code;

  return `<li>${topic.text}
    <a class="std-link" href="${url}" target="_blank" rel="noopener noreferrer" title="View official ${domainName} standard (Grade ${grade})">
      view standard ↗
    </a>
  </li>`;
}

function renderQuarterStandardsLink(grade, subjectKey) {
  if (subjectKey === "science") {
    return `<a class="std-link quarter-link" href="${SCIENCE_LINKS[grade]}" target="_blank" rel="noopener noreferrer">View NGSS Grade ${grade} standards ↗</a>`;
  }
  if (subjectKey === "history") {
    return `<a class="std-link quarter-link" href="${HISTORY_LINK}" target="_blank" rel="noopener noreferrer">View VA History &amp; Social Science SOL ↗</a>`;
  }
  return "";
}

function renderPacing(grade, subjectKey) {
  const subjectMeta = SUBJECTS.find((s) => s.key === subjectKey);
  const pacing = PACING[grade][subjectKey];
  const quarterLink = renderQuarterStandardsLink(grade, subjectKey);

  const quartersHtml = pacing.quarters
    .map(
      (q) => `
      <div class="quarter">
        <h4>${q.label}</h4>
        <ul>${q.topics.map((t) => renderTopic(grade, subjectKey, t)).join("")}</ul>
        ${quarterLink}
      </div>`
    )
    .join("");

  return `
    <section class="guide-section">
      <h2>Pacing Suggestions — Grade ${grade} ${subjectMeta.label}</h2>
      <p class="standard-tag">${subjectMeta.standard}</p>
      <p class="focus">${pacing.focus}</p>
      <div class="quarters">${quartersHtml}</div>
      <p class="caveat">These are general suggestions to orient a new teacher in week one. Always confirm current pacing against the official curriculum map in Atlas.</p>
    </section>`;
}

function renderVeraCross() {
  const stepsHtml = VERA_CROSS_STEPS.map(
    (s, i) => `
      <li>
        <strong>${i + 1}. ${s.title}</strong>
        <p>${s.detail}</p>
      </li>`
  ).join("");

  return `
    <section class="guide-section">
      <h2>Platform Walkthrough — Veracross</h2>
      <p class="focus">Veracross is our system of record for grades and attendance. Complete each step below before your first full day.</p>
      <ol class="steps">${stepsHtml}</ol>
    </section>`;
}

function renderChecklist() {
  const itemsHtml = FIRST_WEEK_CHECKLIST.map(
    (item) => `<li><label><input type="checkbox" /> ${item}</label></li>`
  ).join("");

  return `
    <section class="guide-section">
      <h2>First-Week Checklist</h2>
      <p class="focus">Work through this before school starts. Check items off as you go — this guide is printable/exportable.</p>
      <ul class="checklist">${itemsHtml}</ul>
    </section>`;
}

function renderAtlas() {
  const groupsHtml = ATLAS_SECTIONS.map(
    (group) => `
      <div class="atlas-group">
        <h3>${group.heading}</h3>
        <p class="group-intro">${group.intro}</p>
        <ul>${group.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      </div>`
  ).join("");

  return `
    <section class="guide-section">
      <h2>Curriculum Maps — Atlas</h2>
      <p class="focus">Atlas holds our official curriculum maps. Use it alongside — not instead of — this guide. Here's what it can do.</p>
      ${groupsHtml}
    </section>`;
}

function generateGuide(grade, subjectKey) {
  const subjectMeta = SUBJECTS.find((s) => s.key === subjectKey);
  const header = `
    <div class="guide-header">
      <h1>Teacher Onboarding Guide</h1>
      <p>Grade ${grade} &middot; ${subjectMeta.label}</p>
    </div>`;

  return header + renderPacing(grade, subjectKey);
}

function populateSelectors() {
  const gradeSelect = document.getElementById("grade-select");
  const subjectSelect = document.getElementById("subject-select");

  GRADES.forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g === "K" ? "Kindergarten" : `Grade ${g}`;
    gradeSelect.appendChild(opt);
  });

  SUBJECTS.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.key;
    opt.textContent = s.label;
    subjectSelect.appendChild(opt);
  });
}

function renderStandalone(title, subtitle, bodyHtml) {
  return `
    <div class="guide-header">
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
    ${bodyHtml}`;
}

function showChoiceScreen() {
  document.getElementById("choice-screen").classList.remove("hidden");
  document.getElementById("back-link").classList.add("hidden");
  document.getElementById("generator-form").classList.add("hidden");
  document.getElementById("guide-output").classList.add("hidden");
  document.getElementById("print-btn").classList.add("hidden");
}

function showCurriculumPath() {
  document.getElementById("choice-screen").classList.add("hidden");
  document.getElementById("back-link").classList.remove("hidden");
  document.getElementById("generator-form").classList.remove("hidden");
  document.getElementById("guide-output").classList.add("hidden");
  document.getElementById("print-btn").classList.add("hidden");
}

function showStandalonePath(title, subtitle, bodyHtml) {
  const output = document.getElementById("guide-output");
  const printBtn = document.getElementById("print-btn");

  document.getElementById("choice-screen").classList.add("hidden");
  document.getElementById("back-link").classList.remove("hidden");
  document.getElementById("generator-form").classList.add("hidden");

  output.innerHTML = renderStandalone(title, subtitle, bodyHtml);
  output.classList.remove("hidden");
  printBtn.classList.remove("hidden");
  output.scrollIntoView({ behavior: "smooth" });
}

function showVeraCrossPath() {
  showStandalonePath("Veracross Walkthrough", "Logging in, attendance, and grades", renderVeraCross());
}

function showChecklistPath() {
  showStandalonePath("First-Week Checklist", "Confirm these before school starts", renderChecklist());
}

function showAtlasPath() {
  showStandalonePath("Atlas Curriculum Maps", "Find and use the team's official curriculum maps", renderAtlas());
}

function init() {
  populateSelectors();

  const form = document.getElementById("generator-form");
  const output = document.getElementById("guide-output");
  const printBtn = document.getElementById("print-btn");
  const backLink = document.getElementById("back-link");

  document.getElementById("choice-curriculum").addEventListener("click", showCurriculumPath);
  document.getElementById("choice-veracross").addEventListener("click", showVeraCrossPath);
  document.getElementById("choice-checklist").addEventListener("click", showChecklistPath);
  document.getElementById("choice-atlas").addEventListener("click", showAtlasPath);

  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    showChoiceScreen();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const grade = document.getElementById("grade-select").value;
    const subject = document.getElementById("subject-select").value;

    if (!grade || !subject) return;

    output.innerHTML = generateGuide(grade, subject);
    output.classList.remove("hidden");
    printBtn.classList.remove("hidden");
    output.scrollIntoView({ behavior: "smooth" });
  });

  printBtn.addEventListener("click", () => window.print());
}

document.addEventListener("DOMContentLoaded", init);
