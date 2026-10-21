import { defineType, defineField, defineArrayMember } from "sanity";

// The rich-text body used by lessons — mirrors the site's original components 1:1.
const lessonBody = defineType({
  name: "lessonBody",
  title: "Lesson body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Lesson title (H1)", value: "h1" },
        { title: "Section heading (H2)", value: "h2" },
        { title: "Sub-heading (H3)", value: "h3" },
        { title: "Quote line (italic)", value: "quote" },
        { title: "Big statement", value: "display" },
      ],
      lists: [{ title: "Bullets", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "activityLink",
            title: "Link (activity or web)",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Address (/activities/1 or https://…)",
                type: "string",
                validation: (r) => r.required(),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: "videoEmbed",
      title: "Video",
      type: "object",
      fields: [
        defineField({ name: "url", title: "Embed URL (YouTube embed link)", type: "url", validation: (r) => r.required() }),
        defineField({ name: "title", title: "Caption", type: "string" }),
      ],
      preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `🎬 ${title || "Video"}` }) },
    }),
    defineArrayMember({
      name: "reflectionBox",
      title: "Reflection questions",
      type: "object",
      fields: [
        defineField({
          name: "questions",
          title: "Questions",
          type: "array",
          of: [{ type: "string" }],
          validation: (r) => r.min(1),
        }),
      ],
      preview: {
        select: { questions: "questions" },
        prepare: ({ questions }) => ({ title: `🪞 Reflection (${questions?.length ?? 0} questions)` }),
      },
    }),
    defineArrayMember({
      name: "calloutBox",
      title: "Highlight box",
      type: "object",
      fields: [
        defineField({
          name: "tone",
          title: "Colour",
          type: "string",
          options: {
            list: [
              { title: "Green (activities)", value: "green" },
              { title: "Blue", value: "blue" },
              { title: "Amber", value: "amber" },
              { title: "Purple", value: "purple" },
              { title: "Teal", value: "teal" },
            ],
          },
          initialValue: "green",
        }),
        defineField({ name: "centered", title: "Centre the text", type: "boolean" }),
        defineField({ name: "title", title: "Box heading", type: "string" }),
        defineField({
          name: "body",
          title: "Box content",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
              styles: [
                { title: "Paragraph", value: "normal" },
                { title: "Plain line", value: "plain" },
                { title: "Sign title (bold)", value: "signTitle" },
                { title: "Accent line", value: "accent" },
                { title: "Quote line (italic)", value: "quote" },
                { title: "Big statement", value: "display" },
              ],
              lists: [{ title: "Bullets", value: "bullet" }],
              marks: {
                decorators: [
                  { title: "Bold", value: "strong" },
                  { title: "Italic", value: "em" },
                ],
                annotations: [
                  {
                    name: "activityLink",
                    title: "Link",
                    type: "object",
                    fields: [defineField({ name: "href", title: "Address", type: "string" })],
                  },
                ],
              },
            }),
          ],
        }),
      ],
      preview: {
        select: { title: "title", tone: "tone" },
        prepare: ({ title, tone }) => ({ title: `📦 ${title || "Highlight box"} (${tone})` }),
      },
    }),
  ],
});

const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address (do not change)",
      type: "slug",
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "lessonType",
      title: "Lesson type",
      type: "string",
      options: {
        list: ["intro", "overview", "chapter", "activities", "foundation"],
      },
      readOnly: true,
    }),
    defineField({ name: "subtitle", title: "Subtitle (foundation topics only)", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Content", type: "lessonBody" }),
  ],
  orderings: [
    { title: "Course order", name: "courseOrder", by: [{ field: "slug.current", direction: "asc" }] },
  ],
});

const module_ = defineType({
  name: "courseModule",
  title: "Module",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Module title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "moduleId", title: "Module id (do not change)", type: "string", readOnly: true }),
    defineField({
      name: "lessons",
      title: "Lessons in this module (in order)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
    }),
  ],
});

const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Course title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Web address (do not change)", type: "slug", readOnly: true }),
    defineField({ name: "intro", title: "Intro lesson", type: "reference", to: [{ type: "lesson" }] }),
    defineField({
      name: "modules",
      title: "Modules (in order)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "courseModule" }] }],
    }),
    defineField({
      name: "foundations",
      title: "Foundation topics (in order)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lesson" }] }],
    }),
  ],
});


const str = (name: string, title: string) => defineField({ name, title, type: "string" });
const txt = (name: string, title: string) => defineField({ name, title, type: "text", rows: 3 });
const strList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }] });
const cardList = (name: string, title: string, withHref = false, withLessons = false) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "desc", title: "Description", type: "text", rows: 2 }),
          ...(withHref ? [defineField({ name: "href", title: "Link", type: "string" })] : []),
          ...(withLessons
            ? [
                defineField({ name: "num", title: "Number label", type: "string" }),
                defineField({ name: "lessons", title: "Lesson count", type: "number" }),
              ]
            : []),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      },
    ],
  });
const faqList = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          defineField({ name: "title", title: "Question", type: "string" }),
          defineField({ name: "content", title: "Answer", type: "text", rows: 5 }),
          defineField({ name: "linkText", title: "Text to turn into a link (optional)", type: "string" }),
          defineField({ name: "linkUrl", title: "Link address (optional)", type: "url" }),
        ],
        preview: { select: { title: "title" } },
      },
    ],
  });

const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    str("heroTitle", "Hero title"), txt("heroSubtitle", "Hero subtitle"), str("heroCtaLabel", "Hero button label"),
    str("exploreLabel", "Resources strip label"), cardList("resources", "Resource cards", true),
    str("aboutLabel", "About label"), str("aboutHeading", "About heading"),
    txt("aboutPara1", "About paragraph 1"), txt("aboutPara2", "About paragraph 2"), str("aboutImageAlt", "About image alt text"),
    str("pillarsLabel", "Pillars label"), str("pillarsHeading", "Pillars heading"), cardList("pillars", "Pillar cards"),
    str("approachesLabel", "Approaches label"), str("approachesHeading", "Approaches heading"),
    txt("approachesIntro", "Approaches intro"), strList("approaches", "Approach list"),
    str("faqLabel", "FAQ label"), str("faqHeading", "FAQ heading"), faqList("faqs", "FAQs"),
    str("ctaLabel2", "CTA label"), str("ctaHeading", "CTA heading"), txt("ctaBody", "CTA body"), str("ctaButtonLabel", "CTA button label"),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

const overviewPage = defineType({
  name: "overviewPage",
  title: "Program overview page",
  type: "document",
  fields: [
    str("heroLabel", "Hero label"), str("heroTitle", "Hero title"), txt("heroSubtitle", "Hero subtitle"),
    str("heroCtaLabel", "Hero button label"), str("heroPdfLabel", "Hero PDF button label"), str("heroMeta", "Hero meta line"),
    str("structureLabel", "Structure label"), str("structureHeading", "Structure heading"), txt("structureIntro", "Structure intro"),
    cardList("modules", "Module cards", false, true),
    str("aboutLabel", "About label"), str("aboutHeading", "About heading"), txt("aboutPara1", "About paragraph 1"),
    str("aboutPara2Before", "About paragraph 2 — before the italic title"),
    str("aboutPara2Em", "About paragraph 2 — italic title"),
    txt("aboutPara2After", "About paragraph 2 — after the italic title"),
    str("aboutImageAlt", "About image alt text"),
    str("whyLabel", "Why label"), str("whyHeading", "Why heading"), faqList("whyItems", "Why accordion items"),
    str("learnLabel", "Learn label"), str("learnHeading", "Learn heading"), txt("learnIntro", "Learn intro"),
    strList("learnItems", "Learn list"),
    str("faqLabel", "FAQ label"), str("faqHeading", "FAQ heading"), faqList("faqs", "FAQs"),
    str("ctaHeading", "CTA heading"), txt("ctaBody", "CTA body"), str("ctaButtonLabel", "CTA button label"),
  ],
  preview: { prepare: () => ({ title: "Program overview page" }) },
});

const lessonsPage = defineType({
  name: "lessonsPage",
  title: "Modules & lessons page",
  type: "document",
  fields: [
    str("headerLabel", "Header label"), str("headerTitle", "Header title"), txt("headerIntro", "Header intro"),
    str("progressLabel", "Progress label"),
    str("foundationsHeading", "Foundations heading"), str("foundationsIntro", "Foundations intro"),
  ],
  preview: { prepare: () => ({ title: "Modules & lessons page" }) },
});

export const schemaTypes = [lessonBody, lesson, module_, course, homePage, overviewPage, lessonsPage];
