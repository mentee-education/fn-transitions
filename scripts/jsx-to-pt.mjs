// Convert client/src/data/lessonContent.tsx (JSX) → Portable Text documents.
// Lossless: anything that doesn't map to a known type is preserved as a rawHtml
// block (and logged) so no content can silently disappear.
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import { readFileSync, writeFileSync } from "node:fs";

const traverse = traverseModule.default?.default ?? traverseModule.default ?? traverseModule;
const SRC_PATH = new URL("../client/src/data/lessonContent.tsx", import.meta.url);
const src = readFileSync(SRC_PATH, "utf8");

const ast = parse(src, { sourceType: "module", plugins: ["typescript", "jsx"] });

// ── collect: component name → JSX body, and slug → component name ─────────────
const components = {}; // Name → JSXElement (root)
const slugToComponent = {}; // slug → Name
traverse(ast, {
  VariableDeclarator(path) {
    const { node } = path;
    if (
      node.id.type === "Identifier" &&
      node.init &&
      node.init.type === "ArrowFunctionExpression"
    ) {
      let body = node.init.body;
      if (body.type === "JSXElement" || body.type === "JSXFragment") {
        components[node.id.name] = body;
      } else if (body.type === "BlockStatement") {
        const ret = body.body.find((s) => s.type === "ReturnStatement");
        if (ret && ret.argument && ret.argument.type === "JSXElement")
          components[node.id.name] = ret.argument;
      }
    }
    if (node.id.type === "Identifier" && node.id.name === "LESSON_CONTENT_MAP") {
      for (const prop of node.init.properties) {
        const slug = prop.key.value ?? prop.key.name;
        const el = prop.value.type === "JSXElement" ? prop.value : null;
        if (el) slugToComponent[slug] = el.openingElement.name.name;
      }
    }
  },
});

// ── helpers ────────────────────────────────────────────────────────────────────
let keyCounter = 0;
const k = () => `k${(keyCounter++).toString(36).padStart(6, "0")}`;
const rawHtmlLog = [];

function elName(node) {
  return node.openingElement?.name?.name ?? null;
}
function attr(node, name) {
  const a = node.openingElement.attributes.find(
    (x) => x.type === "JSXAttribute" && x.name.name === name
  );
  if (!a) return undefined;
  if (!a.value) return true;
  if (a.value.type === "StringLiteral") return a.value.value;
  if (a.value.type === "JSXExpressionContainer") return a.value.expression;
  return undefined;
}
function cleanText(s) {
  // JSX collapses whitespace around newlines
  return s.replace(/\s*\n\s*/g, " ");
}
function evalStringArray(expr) {
  if (expr && expr.type === "ArrayExpression")
    return expr.elements.map((e) => decodeEntities(e.value));
  return null;
}
function decodeEntities(s) {
  return String(s)
    .replace(/&bull;/g, "•")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
function sourceOf(node) {
  return src.slice(node.start, node.end);
}
// crude JSX→HTML for the rawHtml escape hatch (no expressions expected inside)
function jsxToHtml(node) {
  return sourceOf(node)
    .replace(/className=/g, "class=")
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");
}

// ── inline (span) collection: text + marks within a block ─────────────────────
function collectSpans(children, marks, spans, markDefs) {
  for (const child of children) {
    if (child.type === "JSXText") {
      const t = decodeEntities(cleanText(child.value));
      if (t.trim() === "" && !t.includes(" ")) continue;
      if (t === "") continue;
      spans.push({ _type: "span", _key: k(), text: t, marks: [...marks] });
    } else if (child.type === "JSXExpressionContainer") {
      if (child.expression.type === "StringLiteral") {
        spans.push({
          _type: "span",
          _key: k(),
          text: decodeEntities(child.expression.value),
          marks: [...marks],
        });
      } else if (child.expression.type !== "JSXEmptyExpression") {
        throw new Error("Unexpected expression in inline: " + sourceOf(child));
      }
    } else if (child.type === "JSXElement") {
      const name = elName(child);
      if (name === "Bold" || name === "strong" || name === "b") {
        collectSpans(child.children, [...marks, "strong"], spans, markDefs);
      } else if (name === "Em" || name === "em" || name === "i") {
        collectSpans(child.children, [...marks, "em"], spans, markDefs);
      } else if (name === "ActivityLink" || name === "a") {
        const href = attr(child, "href") ?? "#";
        const defKey = k();
        markDefs.push({ _type: "activityLink", _key: defKey, href: String(href) });
        collectSpans(child.children, [...marks, defKey], spans, markDefs);
      } else if (name === "br") {
        spans.push({ _type: "span", _key: k(), text: "\n", marks: [...marks] });
      } else if (name === "span") {
        collectSpans(child.children, marks, spans, markDefs);
      } else {
        throw new Error("Unknown inline element <" + name + ">");
      }
    }
  }
}

function makeBlock(node, style, extra = {}) {
  const spans = [];
  const markDefs = [];
  collectSpans(node.children, [], spans, markDefs);
  // trim leading/trailing whitespace across the block
  if (spans.length) {
    spans[0].text = spans[0].text.replace(/^\s+/, "");
    spans[spans.length - 1].text = spans[spans.length - 1].text.replace(/\s+$/, "");
  }
  return { _type: "block", _key: k(), style, markDefs, children: spans, ...extra };
}

// classify styled raw <p>/<div> callouts
function classNameOf(node) {
  const v = attr(node, "className");
  return typeof v === "string" ? v : "";
}

// ── block-level conversion ─────────────────────────────────────────────────────
function convertBlockChildren(children, out) {
  for (const child of children) {
    if (child.type === "JSXText") {
      if (child.value.trim() !== "")
        throw new Error("Stray text at block level: " + JSON.stringify(child.value));
      continue;
    }
    if (child.type === "JSXExpressionContainer") {
      if (child.expression.type === "JSXEmptyExpression") continue; // comment
      throw new Error("Unexpected block-level expression: " + sourceOf(child));
    }
    if (child.type !== "JSXElement") continue;
    const name = elName(child);
    const cls = classNameOf(child);

    if (name === "P" || name === "p") {
      // styled raw <p> variants inside callout boxes
      if (/italic/.test(cls)) out.push(makeBlock(child, "quote"));
      else if (/text-2xl/.test(cls)) out.push(makeBlock(child, "display"));
      else if (/font-semibold/.test(cls)) out.push(makeBlock(child, "accent"));
      else if (/font-bold/.test(cls) && /text-gray-800/.test(cls)) out.push(makeBlock(child, "signTitle"));
      else if (name === "p" && /text-gray-700/.test(cls)) out.push(makeBlock(child, "plain"));
      else out.push(makeBlock(child, "normal"));
    } else if (name === "H2" || name === "h2") out.push(makeBlock(child, "h2"));
    else if (name === "H3" || name === "h3") out.push(makeBlock(child, "h3"));
    else if (name === "h1") out.push(makeBlock(child, "h1"));
    else if (name === "UL" || name === "ul") {
      for (const li of child.children) {
        if (li.type !== "JSXElement") continue;
        out.push(makeBlock(li, "normal", { listItem: "bullet", level: 1 }));
      }
    } else if (name === "VideoEmbed") {
      out.push({
        _type: "videoEmbed",
        _key: k(),
        url: String(attr(child, "url")),
        title: String(attr(child, "title")),
      });
    } else if (name === "ReflectionBox") {
      out.push({
        _type: "reflectionBox",
        _key: k(),
        questions: evalStringArray(attr(child, "questions")),
      });
    } else if (name === "OntarioMap") {
      out.push({ _type: "ontarioMap", _key: k() });
    } else if (name === "div" && /bg-(green|blue|amber|purple|teal)-50/.test(cls)) {
      const tone = cls.match(/bg-(green|blue|amber|purple|teal)-50/)[1];
      const centered = /text-center/.test(cls);
      const spacing = /space-y-1/.test(cls)
        ? "tight"
        : child.children.some((c) => c.type === "JSXElement" && /mt-2/.test((attr(c, "className") || "")))
        ? "loose"
        : undefined;
      const body = [];
      convertBlockChildren(child.children, body);
      // a leading fully-bold paragraph (the box's heading, e.g. "Module Activities")
      let title;
      const firstEl = child.children.find((c) => c.type === "JSXElement");
      if (
        body[0] &&
        body[0]._type === "block" &&
        body[0].children.length &&
        new RegExp("font-bold text-" + tone + "-800").test(classNameOf(firstEl) || "")
      ) {
        title = body[0].children.map((s) => s.text).join("");
        body.shift();
      }
      out.push({ _type: "calloutBox", _key: k(), tone, centered: centered || undefined, spacing, title, body });
    } else if (name === "div" && cls === "") {
      convertBlockChildren(child.children, out); // transparent wrapper
    } else {
      rawHtmlLog.push(sourceOf(child).slice(0, 120));
      out.push({ _type: "rawHtml", _key: k(), html: jsxToHtml(child) });
    }
  }
}

// bold-only paragraph check needs marks on the p itself (font-bold class)
// handled post-hoc below for green callout titles rendered as <p className="font-bold...">

// ── run over every lesson ──────────────────────────────────────────────────────
const docs = [];
for (const [slug, compName] of Object.entries(slugToComponent)) {
  const root = components[compName];
  if (!root) throw new Error("No component found for " + compName);
  const body = [];
  convertBlockChildren(root.children, body);
  docs.push({
    _id: `lesson-${slug}`,
    _type: "lesson",
    slug: { _type: "slug", current: slug },
    body,
  });
}

writeFileSync(new URL("./lessons.ndjson", import.meta.url), docs.map((d) => JSON.stringify(d)).join("\n"));
console.log(`converted ${docs.length} lessons, ${docs.reduce((n, d) => n + d.body.length, 0)} blocks`);
if (rawHtmlLog.length) {
  console.log(`rawHtml fallbacks (${rawHtmlLog.length}):`);
  rawHtmlLog.forEach((s) => console.log("  -", s.replace(/\n/g, " ")));
}
