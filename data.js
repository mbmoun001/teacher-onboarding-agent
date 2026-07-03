/* ------------------------------------------------------------------
   data.js
   Reference content for the Teacher Onboarding Agent.

   PACING = grade + subject specific (this is what the "agent" selects).
   The Vera Cross walkthrough, first-week checklist, and Atlas section
   are the same for every teacher, so they live in app.js as constants
   instead of being duplicated here.

   STANDARDS LINKS
   Math and Reading topics carry a `code` (CCSS domain/strand, e.g. "OA",
   "RL") so each topic can link straight to that domain's official page:
     Math:    thecorestandards.org/Math/Content/{grade}/{code}/
     Reading: thecorestandards.org/ELA-Literacy/{code}/{grade}/
   These patterns were confirmed live for grade K & 3 Math and grade 1 & 3
   ELA-Literacy/RL; the other grade/domain combos follow the same site
   structure but weren't individually clicked through, so spot-check
   before relying on them publicly.

   Science (NGSS) and History (VA SOL) don't publish clean per-topic
   URLs the way CCSS does, so SCIENCE_LINKS/HISTORY_LINK below point to
   one confirmed page per grade (science) or one shared hub page
   (history) instead of a link per topic.

   NOTE: Standards get revised periodically (e.g. Virginia revised its
   History & Social Science SOLs in 2023). Treat this file as a
   realistic starting template, not a substitute for checking the
   current official standards documents before real classroom use.
------------------------------------------------------------------- */

const GRADES = ["K", "1", "2", "3", "4", "5"];

const SUBJECTS = [
  { key: "math", label: "Math", standard: "Common Core State Standards (Math)" },
  { key: "reading", label: "Reading / ELA", standard: "Common Core State Standards (ELA)" },
  { key: "science", label: "Science", standard: "Next Generation Science Standards (NGSS)" },
  { key: "history", label: "History / Social Studies", standard: "Common Core Literacy in History + Virginia SOL (History & Social Science)" },
];

// Confirmed live via search, one page per grade (URL slugs are inconsistent on nextgenscience.org).
const SCIENCE_LINKS = {
  K: "https://www.nextgenscience.org/kindergarten-topics-model",
  "1": "https://www.nextgenscience.org/1st-grade-topics-model",
  "2": "https://www.nextgenscience.org/2nd-grade-topic-model",
  "3": "https://www.nextgenscience.org/3rd-grade-topics-model",
  "4": "https://www.nextgenscience.org/4th-grade-topics-model",
  "5": "https://www.nextgenscience.org/5th-grade-topic-model",
};

// VDOE publishes one combined K-12 hub rather than per-grade pages.
const HISTORY_LINK = "https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/history-and-social-science/standards-of-learning";

function mathLink(grade, code) {
  return `https://www.thecorestandards.org/Math/Content/${grade}/${code}/`;
}

function readingLink(grade, code) {
  return `https://www.thecorestandards.org/ELA-Literacy/${code}/${grade}/`;
}

const PACING = {
  K: {
    math: {
      focus: "Counting, cardinality, and building number sense to 20.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Counting & Cardinality: count to 20, one-to-one correspondence", code: "CC" },
          { text: "Sorting & classifying objects", code: "MD" },
        ] },
        { label: "Q2", topics: [
          { text: "Operations & Algebraic Thinking: addition/subtraction within 10 (concrete)", code: "OA" },
          { text: "Comparing numbers", code: "CC" },
        ] },
        { label: "Q3", topics: [
          { text: "Number & Operations in Base Ten: compose/decompose 11-19", code: "NBT" },
          { text: "Measurement & Data: compare length, weight", code: "MD" },
        ] },
        { label: "Q4", topics: [
          { text: "Geometry: 2D and 3D shapes", code: "G" },
          { text: "Review & counting to 100 (by ones and tens)", code: "CC" },
        ] },
      ],
    },
    reading: {
      focus: "Print concepts, phonological awareness, and oral language.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Print concepts: top-to-bottom, left-to-right, word spacing", code: "RF" },
          { text: "Rhyming & syllables (phonological awareness)", code: "RF" },
        ] },
        { label: "Q2", topics: [
          { text: "Letter recognition & letter-sound correspondence", code: "RF" },
          { text: "Retelling familiar stories", code: "RL" },
        ] },
        { label: "Q3", topics: [
          { text: "Blending & segmenting onset-rime", code: "RF" },
          { text: "Identifying main topic of informational text", code: "RI" },
        ] },
        { label: "Q4", topics: [
          { text: "Beginning decodable reading", code: "RF" },
          { text: "Writing: draw/dictate/write to compose", code: "W" },
        ] },
      ],
    },
    science: {
      focus: "Weather patterns, pushes/pulls, and needs of living things.",
      quarters: [
        { label: "Q1", topics: ["Weather & Sky: observe and describe weather patterns"] },
        { label: "Q2", topics: ["Pushes & Pulls: effects of forces on motion"] },
        { label: "Q3", topics: ["Interdependent Relationships in Ecosystems: what plants/animals need to survive"] },
        { label: "Q4", topics: ["Engineering design: solve a simple problem (reduce effect of weather)"] },
      ],
    },
    history: {
      focus: "Self, family, and community; VA SOL K.1-K.9.",
      quarters: [
        { label: "Q1", topics: ["Self & family; understanding maps/globes represent places (VA SOL K.4-K.5)"] },
        { label: "Q2", topics: ["Rules, authority figures, and good citizenship (VA SOL K.7)"] },
        { label: "Q3", topics: ["Wants vs. needs; people who work in the community (VA SOL K.8)"] },
        { label: "Q4", topics: ["American symbols and traditions; comparing past/present (VA SOL K.1, K.9)"] },
      ],
    },
  },
  "1": {
    math: {
      focus: "Addition/subtraction fluency within 20 and place value understanding.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Operations & Algebraic Thinking: add/subtract within 20", code: "OA" },
          { text: "Word problems", code: "OA" },
        ] },
        { label: "Q2", topics: [
          { text: "Number & Operations in Base Ten: place value to 120", code: "NBT" },
        ] },
        { label: "Q3", topics: [
          { text: "Measurement & Data: length, time to the hour/half hour, graphs", code: "MD" },
        ] },
        { label: "Q4", topics: [
          { text: "Geometry: partition shapes into halves/fourths", code: "G" },
          { text: "Fluency review", code: "OA" },
        ] },
      ],
    },
    reading: {
      focus: "Phonics-based decoding and reading with increasing fluency.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Phonics: short vowels, consonant blends", code: "RF" },
          { text: "Asking/answering questions about key details", code: "RL" },
        ] },
        { label: "Q2", topics: [
          { text: "Digraphs & long vowel patterns", code: "RF" },
          { text: "Comparing/contrasting characters", code: "RL" },
        ] },
        { label: "Q3", topics: [
          { text: "Multisyllabic word reading", code: "RF" },
          { text: "Main idea & supporting details in informational text", code: "RI" },
        ] },
        { label: "Q4", topics: [
          { text: "Fluency (accuracy, rate, expression)", code: "RF" },
          { text: "Narrative writing", code: "W" },
        ] },
      ],
    },
    science: {
      focus: "Light/sound, space patterns, and how organisms use their parts.",
      quarters: [
        { label: "Q1", topics: ["Waves: light and sound"] },
        { label: "Q2", topics: ["Space Systems: patterns of sun, moon, stars"] },
        { label: "Q3", topics: ["Structure, Function & Information Processing in organisms"] },
        { label: "Q4", topics: ["Engineering design tied to light/sound problem"] },
      ],
    },
    history: {
      focus: "Change over time, map skills, citizenship; VA SOL 1.1-1.12.",
      quarters: [
        { label: "Q1", topics: ["Change over time using calendars/timelines (VA SOL 1.1-1.2)"] },
        { label: "Q2", topics: ["Map skills: locate VA on US map/globe (VA SOL 1.4)"] },
        { label: "Q3", topics: ["Goods/services and how people earn/spend money (VA SOL 1.8)"] },
        { label: "Q4", topics: ["Rules, leaders, and rights/responsibilities of citizens (VA SOL 1.10-1.12)"] },
      ],
    },
  },
  "2": {
    math: {
      focus: "Base-ten fluency to 1,000 and intro to standard measurement.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Operations & Algebraic Thinking: fluently add/subtract within 100", code: "OA" },
        ] },
        { label: "Q2", topics: [
          { text: "Number & Operations in Base Ten: place value to 1,000", code: "NBT" },
        ] },
        { label: "Q3", topics: [
          { text: "Measurement & Data: measure with standard units, work with money and time", code: "MD" },
        ] },
        { label: "Q4", topics: [
          { text: "Geometry: partition rectangles into rows/columns (intro to area)", code: "G" },
          { text: "Review", code: "OA" },
        ] },
      ],
    },
    reading: {
      focus: "Building fluency and comprehension across genres.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Phonics: prefixes/suffixes, irregular words", code: "RF" },
          { text: "Story structure and lessons/morals", code: "RL" },
        ] },
        { label: "Q2", topics: [
          { text: "Determining main purpose of informational text", code: "RI" },
        ] },
        { label: "Q3", topics: [
          { text: "Comparing versions of the same story", code: "RL" },
          { text: "Text features", code: "RI" },
        ] },
        { label: "Q4", topics: [
          { text: "Fluency at grade level", code: "RF" },
          { text: "Opinion & informative writing", code: "W" },
        ] },
      ],
    },
    science: {
      focus: "Properties of matter, biodiversity, and how land changes.",
      quarters: [
        { label: "Q1", topics: ["Structure & Properties of Matter: describe and classify materials"] },
        { label: "Q2", topics: ["Interdependent Relationships in Ecosystems: biodiversity in habitats"] },
        { label: "Q3", topics: ["Earth's Systems: processes that shape the land (erosion, wind, water)"] },
        { label: "Q4", topics: ["Engineering design: solve a problem caused by land change"] },
      ],
    },
    history: {
      focus: "Early world civilizations (Egypt, China, Mali); VA SOL 2.1-2.11.",
      quarters: [
        { label: "Q1", topics: ["Ancient Egypt: contributions and daily life (VA SOL 2.2)"] },
        { label: "Q2", topics: ["Ancient China: contributions and daily life (VA SOL 2.3)"] },
        { label: "Q3", topics: ["Ancient Mali: contributions and daily life (VA SOL 2.4)"] },
        { label: "Q4", topics: ["Map/globe skills and civic life connecting the three civilizations (VA SOL 2.5-2.11)"] },
      ],
    },
  },
  "3": {
    math: {
      focus: "Multiplication/division fluency and intro to fractions.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Operations & Algebraic Thinking: multiplication/division within 100", code: "OA" },
        ] },
        { label: "Q2", topics: [
          { text: "Number & Operations—Fractions: unit fractions on a number line", code: "NF" },
        ] },
        { label: "Q3", topics: [
          { text: "Measurement & Data: area, perimeter, time, liquid volume/mass", code: "MD" },
        ] },
        { label: "Q4", topics: [
          { text: "Geometry: categorize shapes by attributes", code: "G" },
          { text: "Fluency review", code: "OA" },
        ] },
      ],
    },
    reading: {
      focus: "Independent reading and analyzing text structure.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Decoding multisyllabic words", code: "RF" },
          { text: "Recount stories and determine central message", code: "RL" },
        ] },
        { label: "Q2", topics: [
          { text: "Compare/contrast themes across texts", code: "RL" },
        ] },
        { label: "Q3", topics: [
          { text: "Describe relationships among events/ideas in informational text", code: "RI" },
        ] },
        { label: "Q4", topics: [
          { text: "Grade-level fluency & comprehension", code: "RF" },
          { text: "Research-based writing", code: "W" },
        ] },
      ],
    },
    science: {
      focus: "Forces, life cycles/heredity, and weather/climate patterns.",
      quarters: [
        { label: "Q1", topics: ["Forces & Interactions: balanced/unbalanced forces"] },
        { label: "Q2", topics: ["Life Cycles & Traits: inherited vs. acquired traits"] },
        { label: "Q3", topics: ["Weather & Climate: typical weather conditions in a season"] },
        { label: "Q4", topics: ["Interdependent Relationships in Ecosystems: environmental impact on organisms"] },
      ],
    },
    history: {
      focus: "Ancient Greece, Rome, and West African civilizations; VA SOL 3.1-3.12.",
      quarters: [
        { label: "Q1", topics: ["Ancient Greece: government, philosophy, contributions (VA SOL 3.2)"] },
        { label: "Q2", topics: ["Ancient Rome: government, engineering, contributions (VA SOL 3.3)"] },
        { label: "Q3", topics: ["West African civilizations (Mali): trade, culture (VA SOL 3.4)"] },
        { label: "Q4", topics: ["Economics and civics connecting the three civilizations (VA SOL 3.7-3.12)"] },
      ],
    },
  },
  "4": {
    math: {
      focus: "Multi-digit operations and fraction equivalence/operations.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Operations & Algebraic Thinking: multi-step word problems, factors/multiples", code: "OA" },
        ] },
        { label: "Q2", topics: [
          { text: "Number & Operations in Base Ten: multi-digit multiplication/division", code: "NBT" },
        ] },
        { label: "Q3", topics: [
          { text: "Number & Operations—Fractions: equivalence, add/subtract fractions", code: "NF" },
        ] },
        { label: "Q4", topics: [
          { text: "Measurement & Data: measuring and classifying angles", code: "MD" },
          { text: "Geometry: classify shapes by lines/angles", code: "G" },
        ] },
      ],
    },
    reading: {
      focus: "Analyzing theme, point of view, and informational text across subjects.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Refer to details/examples when explaining literary text", code: "RL" },
          { text: "Refer to details/examples when explaining informational text", code: "RI" },
        ] },
        { label: "Q2", topics: [
          { text: "Determine theme from details; summarize", code: "RL" },
        ] },
        { label: "Q3", topics: [
          { text: "Compare firsthand/secondhand accounts; point of view", code: "RI" },
        ] },
        { label: "Q4", topics: [
          { text: "Integrate information from multiple texts", code: "RI" },
          { text: "Opinion & narrative writing", code: "W" },
        ] },
      ],
    },
    science: {
      focus: "Energy, waves/information transfer, and structure/function.",
      quarters: [
        { label: "Q1", topics: ["Energy: transfer through collisions, motion/speed"] },
        { label: "Q2", topics: ["Waves & Information: patterns of waves, digital information transfer"] },
        { label: "Q3", topics: ["Structure & Function: internal/external structures support survival"] },
        { label: "Q4", topics: ["Earth's Systems: processes that shape Earth's surface over time"] },
      ],
    },
    history: {
      focus: "Virginia Studies (pre-Columbian to present); VA SOL VS.1-VS.10.",
      quarters: [
        { label: "Q1", topics: ["Virginia's geography & first peoples (VA SOL VS.2-VS.3)"] },
        { label: "Q2", topics: ["Jamestown & colonial Virginia (VA SOL VS.4)"] },
        { label: "Q3", topics: ["Revolution & the new nation; Virginia's role (VA SOL VS.5-VS.6)"] },
        { label: "Q4", topics: ["Civil War, Reconstruction, and 20th century Virginia (VA SOL VS.7-VS.9)"] },
      ],
    },
  },
  "5": {
    math: {
      focus: "Fraction/decimal operations and the coordinate plane.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Operations & Algebraic Thinking: order of operations, numerical patterns", code: "OA" },
        ] },
        { label: "Q2", topics: [
          { text: "Number & Operations in Base Ten: decimals to the hundredths, multiply/divide", code: "NBT" },
        ] },
        { label: "Q3", topics: [
          { text: "Number & Operations—Fractions: add/subtract/multiply/divide fractions", code: "NF" },
        ] },
        { label: "Q4", topics: [
          { text: "Geometry: coordinate plane", code: "G" },
          { text: "Measurement & Data: volume", code: "MD" },
        ] },
      ],
    },
    reading: {
      focus: "Synthesizing across texts and analyzing craft/structure.",
      quarters: [
        { label: "Q1", topics: [
          { text: "Compare/contrast characters, settings, events using details", code: "RL" },
        ] },
        { label: "Q2", topics: [
          { text: "Determine theme from details; quote accurately", code: "RL" },
        ] },
        { label: "Q3", topics: [
          { text: "Integrate information from several texts on the same topic", code: "RI" },
        ] },
        { label: "Q4", topics: [
          { text: "Analyze how point of view shapes a text", code: "RL" },
          { text: "Research & argument writing", code: "W" },
        ] },
      ],
    },
    science: {
      focus: "Matter/energy in systems, Earth's systems, and the solar system.",
      quarters: [
        { label: "Q1", topics: ["Structure & Properties of Matter: measure/graph properties"] },
        { label: "Q2", topics: ["Matter & Energy in Organisms and Ecosystems: food webs"] },
        { label: "Q3", topics: ["Earth's Systems: interactions among geosphere, biosphere, hydrosphere, atmosphere"] },
        { label: "Q4", topics: ["Space Systems: stars, the solar system, and scale"] },
      ],
    },
    history: {
      focus: "United States History to 1865; VA SOL USI.1-USI.9.",
      quarters: [
        { label: "Q1", topics: ["Exploration & colonization of North America (VA SOL USI.4)"] },
        { label: "Q2", topics: ["Causes and events of the American Revolution (VA SOL USI.6)"] },
        { label: "Q3", topics: ["Westward expansion and the growing nation (VA SOL USI.7-USI.8)"] },
        { label: "Q4", topics: ["Causes and effects of the Civil War (VA SOL USI.9)"] },
      ],
    },
  },
};
