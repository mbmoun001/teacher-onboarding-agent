/* ------------------------------------------------------------------
   app.js
   UI wiring + guide generation for the Teacher Onboarding Agent.

   The four sections of a generated guide:
     1. Pacing Suggestions   -> grade+subject specific, from data.js
     2. Vera Cross Walkthrough -> same for every teacher
     3. First-Week Checklist   -> same for every teacher
     4. Atlas Curriculum Maps  -> same for every teacher
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

const ATLAS_STEPS = [
  {
    title: "What Atlas is",
    detail: "Atlas is where our curriculum maps live — the scope & sequence, essential questions, assessments, and standards alignment for every grade and subject.",
  },
  {
    title: "Find your map",
    detail: "Log in to Atlas and filter by your grade level and subject to pull up the current curriculum map. This is your primary planning reference, not the pacing suggestions below — those are a starting point, Atlas is the source of truth.",
  },
  {
    title: "Compare to the pacing suggestions",
    detail: "Cross-check the pacing suggestions in this guide against your Atlas map. If they differ, follow Atlas and flag the difference to your team lead so this guide can be corrected.",
  },
  {
    title: "Contribute back",
    detail: "As you teach the year, you can suggest edits directly in Atlas (pacing tweaks, resource links, notes for next year) — it's a living document maintained by the team, not a static PDF.",
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
      <h2>1. Pacing Suggestions — Grade ${grade} ${subjectMeta.label}</h2>
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
      <h2>2. Platform Walkthrough — Veracross</h2>
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
      <h2>3. First-Week Checklist</h2>
      <p class="focus">Work through this before school starts. Check items off as you go — this guide is printable/exportable.</p>
      <ul class="checklist">${itemsHtml}</ul>
    </section>`;
}

function renderAtlas() {
  const stepsHtml = ATLAS_STEPS.map(
    (s, i) => `
      <li>
        <strong>${i + 1}. ${s.title}</strong>
        <p>${s.detail}</p>
      </li>`
  ).join("");

  return `
    <section class="guide-section">
      <h2>4. Curriculum Maps — Atlas</h2>
      <p class="focus">Atlas holds our official curriculum maps. Use it alongside — not instead of — this guide.</p>
      <ol class="steps">${stepsHtml}</ol>
    </section>`;
}

function generateGuide(grade, subjectKey) {
  const subjectMeta = SUBJECTS.find((s) => s.key === subjectKey);
  const header = `
    <div class="guide-header">
      <h1>Teacher Onboarding Guide</h1>
      <p>Grade ${grade} &middot; ${subjectMeta.label}</p>
    </div>`;

  return (
    header +
    renderPacing(grade, subjectKey) +
    renderVeraCross() +
    renderChecklist() +
    renderAtlas()
  );
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

function init() {
  populateSelectors();

  const form = document.getElementById("generator-form");
  const output = document.getElementById("guide-output");
  const printBtn = document.getElementById("print-btn");

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
