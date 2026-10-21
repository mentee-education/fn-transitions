// Build the complete Sanity dataset (NDJSON): course, modules, lessons.
// Run scripts/jsx-to-pt.mjs first (produces lessons.ndjson bodies).
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

// compile courseData.ts → importable mjs via esbuild (ships with vite)
execSync(
  "./node_modules/.pnpm/node_modules/.bin/esbuild client/src/data/courseData.ts --bundle --format=esm --outfile=scripts/.courseData.mjs && ./node_modules/.pnpm/node_modules/.bin/esbuild client/src/data/pageDefaults.ts --bundle --format=esm --outfile=scripts/.pageDefaults.mjs",
  { stdio: "inherit" }
);
const { COURSE } = await import(new URL("./.courseData.mjs", import.meta.url));
const { HOME_DEFAULTS, OVERVIEW_DEFAULTS, LESSONS_PAGE_DEFAULTS } = await import(
  new URL("./.pageDefaults.mjs", import.meta.url)
);

const bodies = Object.fromEntries(
  readFileSync(new URL("./lessons.ndjson", import.meta.url), "utf8")
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l))
    .map((d) => [d.slug.current, d.body])
);

const docs = [];
const lessonRef = (slug) => ({ _type: "reference", _ref: `lesson-${slug}` });

function lessonDoc(l, subtitle) {
  const body = bodies[l.slug];
  if (!body) throw new Error("No body for " + l.slug);
  return {
    _id: `lesson-${l.slug}`,
    _type: "lesson",
    title: l.title,
    slug: { _type: "slug", current: l.slug },
    lessonType: l.type,
    ...(subtitle ? { subtitle } : {}),
    body,
  };
}

docs.push(lessonDoc(COURSE.intro));
for (const m of COURSE.modules) {
  for (const l of m.lessons) docs.push(lessonDoc(l));
  docs.push({
    _id: `module-doc-${m.id}`,
    _type: "courseModule",
    moduleId: m.id,
    title: m.title,
    lessons: m.lessons.map((l) => ({ ...lessonRef(l.slug), _key: l.id })),
  });
}
for (const f of COURSE.foundations) docs.push(lessonDoc(f, f.subtitle));

docs.push({
  _id: "course-transitions",
  _type: "course",
  title: COURSE.title,
  slug: { _type: "slug", current: COURSE.slug },
  intro: lessonRef(COURSE.intro.slug),
  modules: COURSE.modules.map((m) => ({ _type: "reference", _ref: `module-doc-${m.id}`, _key: m.id })),
  foundations: COURSE.foundations.map((f) => ({ ...lessonRef(f.slug), _key: f.id })),
});

// page singletons — arrays of objects need _key
let pk = 0;
function withKeys(v) {
  if (Array.isArray(v)) return v.map((x) => (x && typeof x === "object" ? { _key: "p" + pk++, ...withKeys(x) } : x));
  if (v && typeof v === "object")
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, withKeys(x)]));
  return v;
}
docs.push({ _id: "homePage", _type: "homePage", ...withKeys(HOME_DEFAULTS) });
docs.push({ _id: "overviewPage", _type: "overviewPage", ...withKeys(OVERVIEW_DEFAULTS) });
docs.push({ _id: "lessonsPage", _type: "lessonsPage", ...withKeys(LESSONS_PAGE_DEFAULTS) });

writeFileSync(
  new URL("./dataset.ndjson", import.meta.url),
  docs.map((d) => JSON.stringify(d)).join("\n")
);
console.log(`dataset: ${docs.length} documents (${docs.filter((d) => d._type === "lesson").length} lessons)`);
