// CourseLessons - COO Branding
// Program pathway page with foundations, module details and lesson cards
// Colors: Red #BB0A12, warm white #fdfcf9, sand #E0DFD9, ink #1a1a18
// Fonts: Playfair Display (headings), Source Serif 4 (body), DM Sans (UI)

import { Link } from "wouter";
import { useCourse, usePageContent } from "@/data/useCourse";
import { LESSONS_PAGE_DEFAULTS } from "@/data/pageDefaults";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useState, useEffect, useRef } from "react";

const MODULE_COLORS: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  "module-1": { bg: "#fef5f5", border: "#BB0A12", dot: "#BB0A12", text: "#8a0710" },
  "module-2": { bg: "#f5f0f0", border: "#8a0710", dot: "#8a0710", text: "#6b0510" },
  "module-3": { bg: "#fef8f5", border: "#c4442a", dot: "#c4442a", text: "#8a2e1a" },
  "module-4": { bg: "#f8f5f0", border: "#7a3d2e", dot: "#7a3d2e", text: "#5c2e22" },
  "module-5": { bg: "#f5f5f0", border: "#4a3528", dot: "#4a3528", text: "#3d2e22" },
};

const DEFAULT_MODULE_COLOR = { bg: "#f5f5f0", border: "#4a3528", dot: "#4a3528", text: "#3d2e22" };

const LESSON_TYPE_LABELS: Record<string, string> = {
  overview: "Module Overview",
  chapter: "Story Chapter",
  activities: "Activities & Tools",
  intro: "Introduction",
  foundation: "Foundation",
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function CourseLessons() {
  const { COURSE, ALL_LESSONS } = useCourse();
  const c = usePageContent("lessonsPage", LESSONS_PAGE_DEFAULTS);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fnt_completed");
      if (saved) setCompletedLessons(JSON.parse(saved));
    } catch {}
  }, []);

  const totalLessons = ALL_LESSONS.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
      <SiteHeader />

      {/* ===== HERO HEADER ===== */}
      <section style={{ background: "#fdfcf9", borderBottom: "1px solid #e8e2d8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <p
            className="uppercase tracking-[0.2em] mb-3 text-[11px] sm:text-[13px] font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
          >
            {c.headerLabel}
          </p>
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4.5vw, 42px)",
              color: "#1a1a18",
            }}
          >
            {c.headerTitle}
          </h1>
          <p
            className="mx-auto max-w-[600px] mb-6"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "#5a5a55",
              lineHeight: 1.7,
            }}
          >
            {c.headerIntro}
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif", color: "#6b6b65" }}>
                {c.progressLabel}
              </span>
              <span className="text-sm font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}>
                {progressPercent}% &mdash; {completedCount}/{totalLessons} lessons
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e2d8" }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%`, background: "#BB0A12" }}
              />
            </div>
          </div>
        </div>
      </section>



      {/* ===== MODULES DETAIL ===== */}
      <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
        {/* Introduction Lesson Card */}
        <div className="max-w-4xl mx-auto mb-10">
          <Link href={`/lessons/${COURSE.intro.slug}`}>
            <div
              className="group rounded-sm p-5 sm:p-6 border-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              style={{
                background: "#fff",
                borderColor: completedLessons.includes(COURSE.intro.slug) ? "#BB0A12" : "#e0d5c8",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#fef5f5", border: "2px solid #BB0A12" }}
                >
                  <span style={{ color: "#BB0A12", fontSize: 18 }}>&#9733;</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
                    >
                      Start Here
                    </span>
                    {completedLessons.includes(COURSE.intro.slug) && (
                      <span className="text-xs text-white px-2 py-0.5 rounded-full font-medium" style={{ fontFamily: "'DM Sans', sans-serif", background: "#BB0A12" }}>
                        Completed
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-bold group-hover:text-[#BB0A12] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 2vw, 20px)", color: "#1a1a18" }}
                  >
                    Before You Begin: Context for the Path Forward
                  </h3>
                  <p className="text-sm mt-1" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52" }}>
                    Explore an interactive map of Ontario First Nations communities and ground yourself before starting the program.
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-xl" style={{ color: "#BB0A12" }}>
                  &rarr;
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ===== FOUNDATIONS SECTION ===== */}
        <div className="max-w-4xl mx-auto mb-12">
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#f0ebe4", border: "2px solid #8a7e72" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a7e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div>
                  <h2
                    className="font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 22px)", color: "#1a1a18" }}
                  >
                    {c.foundationsHeading}
                  </h2>
                  <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                    {c.foundationsIntro}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {COURSE.foundations.map((topic, i) => (
              <FadeIn key={topic.id} delay={i * 0.06}>
                <Link href={`/lessons/${topic.slug}`}>
                  <div
                    className="group rounded-sm p-4 sm:p-5 border transition-all duration-200 hover:shadow-md cursor-pointer"
                    style={{
                      background: completedLessons.includes(topic.slug) ? "#f5f2ed" : "#fff",
                      borderColor: completedLessons.includes(topic.slug) ? "#c4b89e" : "#e8e2d8",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: completedLessons.includes(topic.slug) ? "#8a7e72" : "transparent",
                          border: `2px solid ${completedLessons.includes(topic.slug) ? "#8a7e72" : "#d4cfc6"}`,
                          color: completedLessons.includes(topic.slug) ? "#fff" : "#8a7e72",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {completedLessons.includes(topic.slug) ? "\u2713" : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span
                            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}
                          >
                            Foundation
                          </span>
                          {completedLessons.includes(topic.slug) && (
                            <span
                              className="text-[10px] sm:text-xs text-white px-1.5 py-0.5 rounded-full font-medium"
                              style={{ fontFamily: "'DM Sans', sans-serif", background: "#8a7e72" }}
                            >
                              Done
                            </span>
                          )}
                        </div>
                        <h4
                          className="font-semibold group-hover:text-[#BB0A12] transition-colors leading-snug"
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.6vw, 16px)", color: "#1a1a18" }}
                        >
                          {topic.title}
                        </h4>
                        <p className="text-xs mt-0.5" style={{ fontFamily: "'Source Serif 4', serif", color: "#8a7e72" }}>
                          {topic.subtitle}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "#BB0A12" }}>
                        &rarr;
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 sm:space-y-10">
            {COURSE.modules.map((module, moduleIdx) => {
              const colors = MODULE_COLORS[module.id] || DEFAULT_MODULE_COLOR;
              const moduleCompleted = module.lessons.every(l => completedLessons.includes(l.slug));
              const moduleLessonsCompleted = module.lessons.filter(l => completedLessons.includes(l.slug)).length;

              return (
                <FadeIn key={module.id}>
                  <div>
                    {/* Module Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white text-lg sm:text-xl shrink-0"
                        style={{ fontFamily: "'DM Sans', sans-serif", background: colors.dot }}
                      >
                        {moduleIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2
                          className="font-bold"
                          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 22px)", color: "#1a1a18" }}
                        >
                          {module.title}
                        </h2>
                        <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                          {moduleLessonsCompleted}/{module.lessons.length} lessons completed
                          {moduleCompleted && " \u2713"}
                        </p>
                      </div>
                    </div>

                    {/* Lesson Cards */}
                    <div className="space-y-3 ml-5 sm:ml-6 pl-5 sm:pl-6" style={{ borderLeft: `2px solid ${colors.border}22` }}>
                      {module.lessons.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson.slug);
                        return (
                          <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
                            <div
                              className="group rounded-sm p-4 sm:p-5 border transition-all duration-200 hover:shadow-md cursor-pointer"
                              style={{
                                background: isCompleted ? colors.bg : "#fff",
                                borderColor: isCompleted ? colors.border + "44" : "#e8e2d8",
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                                  style={{
                                    background: isCompleted ? colors.dot : "transparent",
                                    border: `2px solid ${isCompleted ? colors.dot : "#d4cfc6"}`,
                                    color: isCompleted ? "#fff" : "#8a7e72",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  {isCompleted ? "\u2713" : ""}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span
                                      className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                                      style={{ fontFamily: "'DM Sans', sans-serif", color: colors.text }}
                                    >
                                      {LESSON_TYPE_LABELS[lesson.type]}
                                    </span>
                                    {isCompleted && (
                                      <span
                                        className="text-[10px] sm:text-xs text-white px-1.5 py-0.5 rounded-full font-medium"
                                        style={{ fontFamily: "'DM Sans', sans-serif", background: colors.dot }}
                                      >
                                        Done
                                      </span>
                                    )}
                                  </div>
                                  <h4
                                    className="font-semibold group-hover:text-[#BB0A12] transition-colors leading-snug"
                                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.6vw, 16px)", color: "#1a1a18" }}
                                  >
                                    {lesson.title}
                                  </h4>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "#BB0A12" }}>
                                  &rarr;
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
