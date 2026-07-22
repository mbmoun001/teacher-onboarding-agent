# Teacher Onboarding Agent

A small web app that generates a customized onboarding guide for a new teacher based on their **grade level** and **subject**. Built as a portfolio piece for edtech CSM / implementation roles — it demonstrates the same workflow I ran manually onboarding 13 teachers onto a new math program, now packaged as a self-serve tool.

## What it does

The landing page asks what you want to explore, with one icon per destination:

- **Standards** — goes to a grade (K–5) + subject (Math, Reading/ELA, Science, History/Social Studies) picker, which generates pacing suggestions aligned to Common Core (Math/Reading), Next Generation Science Standards (Science), or Common Core literacy + Virginia SOL (History). Math and Reading topics link straight to the official standard page for that domain (e.g. a grade 3 fractions topic links to the real Common Core "Number & Operations—Fractions, Grade 3" page); Science and History link to the official NGSS/VDOE page for that grade, since those sites don't publish clean per-topic URLs the way Common Core does.
- **Veracross** — a step-by-step platform walkthrough for grades and attendance.
- **First-Week Checklist** — the concrete things a teacher should confirm before school starts.
- **Atlas Curriculum Maps** — an overview of Atlas's real feature set (Unit Planning, Lesson Planning, Analytics, Integrations, Atlas AI, and FariaLearn), organized into the same six groups Atlas uses on its own features page.

Each destination is printable/exportable to PDF directly from the browser, with a back link to return to the choice screen.

## How it's built

Plain HTML/CSS/JavaScript, no build step, no backend, no API key.

- `index.html` — page structure: the choice screen and the grade/subject picker
- `styles.css` — styling, including print styles for PDF export
- `data.js` — the pacing content: one entry per grade × subject combination
- `app.js` — routes between the four paths, renders the picker, assembles each destination's content, handles print

I chose a template-based approach over calling an AI model at runtime: the pacing content touches real academic standards, so I wanted full control over accuracy rather than letting a model improvise it. The "agent" behavior — take two inputs, decide what's relevant, assemble a personalized document — is the same shape whether the content is templated or model-generated; this version is free to run, has zero latency, and is honest about being a first draft that should be checked against the official curriculum maps in Atlas (which the guide itself tells the teacher to do).

## Running it

No install needed — just open `index.html` in a browser, or double-click the file.

```bash
open index.html   # macOS
```

## Notes on accuracy

The pacing content follows the general structure of Common Core, NGSS, and Virginia SOL standards, but standards get revised periodically (Virginia last revised its History & Social Science SOLs in 2023). Treat `data.js` as a realistic starting template — in a real deployment, this content would be reviewed against the district's current official standards and the source-of-truth curriculum maps in Atlas before use.

The outbound standards links were spot-checked (not exhaustively verified) against the live sites: Common Core Math and Reading follow a confirmed, consistent URL pattern per grade/domain (`thecorestandards.org/Math/Content/{grade}/{domain}/` and `thecorestandards.org/ELA-Literacy/{strand}/{grade}/`), verified live for several grade/domain combinations. NGSS grade pages were each individually confirmed (their URL slugs are inconsistent — some are "topics-model," some are "topic-model"). Virginia doesn't publish per-grade History SOL pages, so History links to VDOE's combined K–12 standards hub instead.

The Atlas Curriculum Maps content (Unit Planning, Lesson Planning, Analytics, Integrations, Atlas AI, FariaLearn) is sourced directly from Atlas's public features page (onatlas.com/atlas-features) as of July 2026, condensed into shorter bullets. It describes the real Atlas product, not this school's specific Atlas configuration.

## Possible next steps

- Swap the template content for a live call to Atlas's API, so pacing always matches the current curriculum map instead of a static file
- Add grades 6–12 and additional subjects
- Persist checklist progress (e.g. localStorage) so a teacher can leave and come back
