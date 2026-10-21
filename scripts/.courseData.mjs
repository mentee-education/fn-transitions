// client/src/data/courseData.ts
var COURSE = {
  title: "Supporting First Nations Learner Transitions",
  slug: "transitions",
  intro: {
    id: "before-you-begin",
    slug: "before-you-begin-context-for-the-path-forward",
    title: "Before You Begin: Context for the Path Forward",
    type: "intro",
    moduleId: null
  },
  foundations: [
    {
      id: "foundation-1",
      slug: "lesson-6-1-educator-accountability",
      title: "Walking the Talk: Accountability in Practice",
      subtitle: "Challenging educators to move beyond training toward meaningful, sustained action.",
      type: "foundation",
      moduleId: null
    },
    {
      id: "foundation-2",
      slug: "lesson-6-2-community-engagement-strategies",
      title: "Building Authentic Partnerships",
      subtitle: "Strategies for genuine collaboration between education systems and First Nations communities.",
      type: "foundation",
      moduleId: null
    },
    {
      id: "foundation-3",
      slug: "lesson-6-3-disabilities-and-accommodations",
      title: "Knowing Your Rights & Supports",
      subtitle: "Understanding IEPs, accommodations, and accessibility services for learners.",
      type: "foundation",
      moduleId: null
    },
    {
      id: "foundation-4",
      slug: "lesson-6-4-budgeting-and-financial-literacy",
      title: "Managing Your Money",
      subtitle: "Practical budgeting, income planning, and financial awareness for learners in transition.",
      type: "foundation",
      moduleId: null
    },
    {
      id: "foundation-5",
      slug: "lesson-6-5-finding-funding",
      title: "Building Your Bursary Basket",
      subtitle: "Finding and applying for bursaries, scholarships, grants, and other funding sources.",
      type: "foundation",
      moduleId: null
    }
  ],
  modules: [
    {
      id: "module-1",
      title: "MODULE 1 \u2014 BEFORE THE JOURNEY",
      lessons: [
        { id: "lesson-1-1", slug: "lesson-1-1-module-overview", title: "Lesson 1.1 \u2014 Module Overview", type: "overview", moduleId: "module-1" },
        { id: "lesson-1-2", slug: "lesson-1-2-preface-chapter-1-the-road-out", title: "Lesson 1.2 \u2014 Preface + Chapter 1: The Road Out", type: "chapter", moduleId: "module-1" },
        { id: "lesson-1-3", slug: "lesson-1-3-activities-tools-readiness-and-supports", title: "Lesson 1.3 \u2014 Activities & Tools: Readiness and Supports", type: "activities", moduleId: "module-1" }
      ]
    },
    {
      id: "module-2",
      title: "MODULE 2 \u2014 ARRIVING & EXPLORING",
      lessons: [
        { id: "lesson-2-1", slug: "lesson-2-1-module-overview", title: "Lesson 2.1 \u2014 Module Overview", type: "overview", moduleId: "module-2" },
        { id: "lesson-2-2", slug: "lesson-2-2-chapter-2-the-first-day", title: "Lesson 2.2 \u2014 Chapter 2: The First Day", type: "chapter", moduleId: "module-2" },
        { id: "lesson-2-3", slug: "lesson-2-3-activities-tools-belonging-and-identity", title: "Lesson 2.3 \u2014 Activities & Tools: Belonging and Identity", type: "activities", moduleId: "module-2" }
      ]
    },
    {
      id: "module-3",
      title: "MODULE 3 \u2014 LIFE SKILLS IN MOTION",
      lessons: [
        { id: "lesson-3-1", slug: "lesson-3-1-module-overview", title: "Lesson 3.1 \u2014 Module Overview", type: "overview", moduleId: "module-3" },
        { id: "lesson-3-2", slug: "lesson-3-2-chapter-3-the-middle-space-2", title: "Lesson 3.2 \u2014 Chapter 3: Finding Steady Ground", type: "chapter", moduleId: "module-3" },
        { id: "lesson-3-3", slug: "lesson-3-3-activities-tools-life-skills-and-independence", title: "Lesson 3.3 \u2014 Activities & Tools: Life Skills and Independence", type: "activities", moduleId: "module-3" }
      ]
    },
    {
      id: "module-4",
      title: "MODULE 4 \u2014 WELLNESS, BALANCE & REAL TALK",
      lessons: [
        { id: "lesson-4-1", slug: "lesson-4-1-module-overview", title: "Lesson 4.1 \u2014 Module Overview", type: "overview", moduleId: "module-4" },
        { id: "lesson-4-2", slug: "lesson-4-2-chapter-4-real-talk", title: "Lesson 4.2 \u2014 Chapter 4: Real Talk", type: "chapter", moduleId: "module-4" },
        { id: "lesson-4-3", slug: "lesson-4-3-activities-tools-wellness-coping-support", title: "Lesson 4.3 \u2014 Activities & Tools: Wellness, Coping & Support", type: "activities", moduleId: "module-4" }
      ]
    },
    {
      id: "module-5",
      title: "MODULE 5 \u2014 MOVING FORWARD WITH PURPOSE",
      lessons: [
        { id: "lesson-5-1", slug: "lesson-5-1-module-overview", title: "Lesson 5.1 \u2014 Module Overview", type: "overview", moduleId: "module-5" },
        { id: "lesson-5-2", slug: "lesson-5-2-chapter-5-the-way-back", title: "Lesson 5.2 \u2014 Chapter 5: The Way Back", type: "chapter", moduleId: "module-5" },
        { id: "lesson-5-3", slug: "lesson-5-3-activities-tools-planning-your-pathway", title: "Lesson 5.3 \u2014 Activities & Tools: Planning Your Pathway", type: "activities", moduleId: "module-5" }
      ]
    }
  ]
};
var ALL_LESSONS = [
  COURSE.intro,
  ...COURSE.modules.flatMap((m) => m.lessons)
];
var FOUNDATION_LESSONS = COURSE.foundations.map((f) => ({
  id: f.id,
  slug: f.slug,
  title: f.title,
  type: "foundation",
  moduleId: null
}));
var ALL_NAVIGABLE = [
  COURSE.intro,
  ...FOUNDATION_LESSONS,
  ...COURSE.modules.flatMap((m) => m.lessons)
];
function getLessonBySlug(slug) {
  return ALL_NAVIGABLE.find((l) => l.slug === slug);
}
function getLessonIndex(slug) {
  return ALL_LESSONS.findIndex((l) => l.slug === slug);
}
function getPrevLesson(slug) {
  const idx = ALL_NAVIGABLE.findIndex((l) => l.slug === slug);
  return idx > 0 ? ALL_NAVIGABLE[idx - 1] : void 0;
}
function getNextLesson(slug) {
  const idx = ALL_NAVIGABLE.findIndex((l) => l.slug === slug);
  return idx < ALL_NAVIGABLE.length - 1 ? ALL_NAVIGABLE[idx + 1] : void 0;
}
export {
  ALL_LESSONS,
  ALL_NAVIGABLE,
  COURSE,
  FOUNDATION_LESSONS,
  getLessonBySlug,
  getLessonIndex,
  getNextLesson,
  getPrevLesson
};
