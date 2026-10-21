// LessonPlayer - COO Branding
// Colors: Red #BB0A12, warm white #fdfcf9, sand #ede9e0, ink #1a1a18
// Fonts: Playfair Display (headings), Source Serif 4 (body), DM Sans (UI)
// Full-width reading experience with slide-out drawer navigation

import { useParams, Link, useLocation } from "wouter";
import { useState, useEffect, useCallback, useRef } from "react";
import { useCourse, useLessonBody } from "@/data/useCourse";
import LessonBody from "@/components/LessonBody";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Menu, X, ChevronLeft, ChevronRight, Check, BookOpen, Award } from "lucide-react";

const MODULE_COLORS: Record<string, { dot: string; text: string; bg: string }> = {
  "module-1": { dot: "#BB0A12", text: "#8a0710", bg: "#fef5f5" },
  "module-2": { dot: "#8a0710", text: "#6b0510", bg: "#f5f0f0" },
  "module-3": { dot: "#c4442a", text: "#8a2e1a", bg: "#fef8f5" },
  "module-4": { dot: "#7a3d2e", text: "#5c2e22", bg: "#f8f5f0" },
  "module-5": { dot: "#4a3528", text: "#3d2e22", bg: "#f5f5f0" },
};

const DEFAULT_MODULE_COLOR = { dot: "#4a3528", text: "#3d2e22", bg: "#f5f5f0" };

export default function LessonPlayer() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [, navigate] = useLocation();

  const { COURSE, ALL_LESSONS, getLessonBySlug, getLessonIndex, getPrevLesson, getNextLesson } = useCourse();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fnt_completed");
      if (saved) setCompletedLessons(JSON.parse(saved));
    } catch {}
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close drawer on lesson change & reset scroll tracking
  useEffect(() => {
    setDrawerOpen(false);
    setHasScrolledEnough(false);
  }, [slug]);

  const { body, loading: contentLoading } = useLessonBody(slug);

  // Track scroll progress to unlock Mark Complete (only once real content is in)
  useEffect(() => {
    if (contentLoading) return;
    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const contentHeight = contentRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - rect.top;
      const scrollPercent = scrolled / contentHeight;
      if (scrollPercent >= 0.75) {
        setHasScrolledEnough(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check immediately in case content is short
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug, contentLoading]);

  const lesson = getLessonBySlug(slug);
  const lessonIndex = getLessonIndex(slug);
  const prevLesson = getPrevLesson(slug);
  const nextLesson = getNextLesson(slug);
  const content = contentLoading ? (
    <div className="animate-pulse text-[#8B2332] font-semibold py-12 text-center">Loading…</div>
  ) : (
    <LessonBody value={body || []} />
  );

  const totalLessons = ALL_LESSONS.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCompleted = completedLessons.includes(slug);

  const FOUNDATION_COLOR = { dot: "#8a7e72", text: "#5c4f42", bg: "#f5f2ed" };
  const moduleColor = lesson?.type === 'foundation' ? FOUNDATION_COLOR : lesson?.moduleId ? (MODULE_COLORS[lesson.moduleId] || DEFAULT_MODULE_COLOR) : MODULE_COLORS["module-1"];

  const markComplete = useCallback(() => {
    setCompletedLessons(prev => {
      const updated = prev.includes(slug) ? prev : [...prev, slug];
      localStorage.setItem("fnt_completed", JSON.stringify(updated));
      return updated;
    });
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.slug}`);
    }
  }, [slug, nextLesson, navigate]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1a1a18", marginBottom: 16 }}>
              Lesson Not Found
            </h1>
            <Link href="/courses/transitions">
              <span className="hover:underline cursor-pointer" style={{ color: "#BB0A12", fontFamily: "'DM Sans', sans-serif" }}>
                Return to Program Overview
              </span>
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
      {/* Top Progress Strip */}
      <div className="sticky top-0 z-40" style={{ background: "#1a1a18" }}>
        {/* Thin progress bar */}
        <div className="h-1 w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, background: "#BB0A12" }}
          />
        </div>
        {/* Navigation bar */}
        <div className="max-w-5xl mx-auto px-3 sm:px-6 flex items-center justify-between h-12 sm:h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 transition-colors"
              style={{ color: "#a09a90", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#a09a90")}
              aria-label="Open lesson menu"
            >
              <Menu className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lessons</span>
            </button>
            <div className="hidden sm:block w-px h-5" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span className="text-xs sm:text-sm" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
              {progressPercent}% &middot; {completedCount}/{totalLessons}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/courses/transitions/lessons">
              <span className="text-xs sm:text-sm cursor-pointer flex items-center gap-1 transition-colors" style={{ color: "#a09a90", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a09a90")}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">All Lessons</span>
              </span>
            </Link>
            <div className="hidden sm:block w-px h-5" style={{ background: "rgba(255,255,255,0.15)" }} />
            <Link href="/courses/transitions">
              <span className="text-xs sm:text-sm cursor-pointer flex items-center gap-1 transition-colors" style={{ color: "#a09a90", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a09a90")}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Program Overview</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer Panel */}
          <div
            className="relative w-[320px] sm:w-[380px] max-w-[85vw] h-full overflow-y-auto"
            style={{ background: "#fdfcf9" }}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4" style={{ background: "#1a1a18" }}>
              <h2 className="text-sm font-bold text-white truncate pr-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {COURSE.title}
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="shrink-0 transition-colors"
                style={{ color: "#a09a90", background: "none", border: "none", cursor: "pointer" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4">
              {/* Intro Lesson */}
              <Link href={`/lessons/${COURSE.intro.slug}`} onClick={() => setDrawerOpen(false)}>
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-sm mb-3 cursor-pointer transition-colors"
                  style={{
                    background: slug === COURSE.intro.slug ? "rgba(187,10,18,0.08)" : "transparent",
                    border: slug === COURSE.intro.slug ? "1px solid rgba(187,10,18,0.25)" : "1px solid transparent",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={
                      completedLessons.includes(COURSE.intro.slug)
                        ? { background: "#BB0A12", color: "#fff" }
                        : { border: "2px solid #BB0A12", color: "#BB0A12" }
                    }
                  >
                    {completedLessons.includes(COURSE.intro.slug) ? <Check className="w-3.5 h-3.5" /> : "0"}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: slug === COURSE.intro.slug ? 700 : 400,
                      color: slug === COURSE.intro.slug ? "#BB0A12" : "#3d3d39",
                    }}
                  >
                    Before You Begin
                  </span>
                </div>
              </Link>

              {/* Foundations */}
              <div className="mb-4">
                <div className="flex items-center gap-2 px-3 mb-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "#f0ebe4", border: "1.5px solid #8a7e72" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8a7e72" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                    Foundations
                  </span>
                </div>
                <div className="space-y-1 ml-3 pl-3" style={{ borderLeft: "2px solid rgba(138,126,114,0.15)" }}>
                  {COURSE.foundations.map((f, fIdx) => {
                    const isActive = slug === f.slug;
                    const isDone = completedLessons.includes(f.slug);
                    return (
                      <Link key={f.slug} href={`/lessons/${f.slug}`} onClick={() => setDrawerOpen(false)}>
                        <div
                          className="flex items-center gap-2.5 px-3 py-2 rounded-sm cursor-pointer transition-colors"
                          style={{
                            background: isActive ? "#f5f2ed" : "transparent",
                            border: isActive ? "1px solid rgba(138,126,114,0.3)" : "1px solid transparent",
                          }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={
                              isDone
                                ? { background: "#8a7e72", color: "#fff" }
                                : { border: "2px solid #8a7e72", color: "#8a7e72" }
                            }
                          >
                            {isDone ? <Check className="w-3 h-3" /> : fIdx + 1}
                          </div>
                          <span
                            className="text-xs sm:text-sm leading-tight"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: isActive ? 700 : 400,
                              color: isActive ? "#5c4f42" : "#3d3d39",
                            }}
                          >
                            {f.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Modules */}
              {COURSE.modules.map((module, moduleIdx) => {
                const colors = MODULE_COLORS[module.id] || DEFAULT_MODULE_COLOR;
                return (
                  <div key={module.id} className="mb-4">
                    <div className="flex items-center gap-2 px-3 mb-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                        style={{ background: colors.dot }}
                      >
                        {moduleIdx + 1}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif", color: colors.text }}>
                        Module {moduleIdx + 1}
                      </span>
                    </div>
                    <div className="space-y-1 ml-3 pl-3" style={{ borderLeft: `2px solid ${colors.dot}22` }}>
                      {module.lessons.map((l, lIdx) => {
                        const isActive = slug === l.slug;
                        const isDone = completedLessons.includes(l.slug);
                        return (
                          <Link key={l.slug} href={`/lessons/${l.slug}`} onClick={() => setDrawerOpen(false)}>
                            <div
                              className="flex items-center gap-2.5 px-3 py-2 rounded-sm cursor-pointer transition-colors"
                              style={{
                                background: isActive ? colors.bg : "transparent",
                                border: isActive ? `1px solid ${colors.dot}44` : "1px solid transparent",
                              }}
                            >
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                                style={
                                  isDone
                                    ? { background: colors.dot, color: "#fff" }
                                    : { border: `2px solid ${colors.dot}`, color: colors.dot }
                                }
                              >
                                {isDone ? <Check className="w-3 h-3" /> : `${moduleIdx + 1}.${lIdx + 1}`}
                              </div>
                              <span
                                className="text-xs sm:text-sm leading-tight"
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: isActive ? 700 : 400,
                                  color: isActive ? colors.text : "#3d3d39",
                                }}
                              >
                                {l.title.replace(/^Lesson \d+\.\d+ — /, "")}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Lesson Header */}
        <div className="border-b" style={{ borderColor: "#e2ddd5", background: "#fff" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 flex-wrap" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
              <Link href="/courses/transitions">
                <span className="cursor-pointer transition-colors hover:text-[#BB0A12]">Program</span>
              </Link>
              {lesson.moduleId && (
                <>
                  <span>/</span>
                  <span style={{ color: moduleColor.text }}>
                    Module {COURSE.modules.findIndex(m => m.id === lesson.moduleId) + 1}
                  </span>
                </>
              )}
              {lesson.type === 'foundation' && (
                <>
                  <span>/</span>
                  <span style={{ color: '#8a7e72' }}>Foundations</span>
                </>
              )}
              {lessonIndex >= 0 && (
                <><span>/</span><span className="font-medium" style={{ color: "#3d3d39" }}>Lesson {lessonIndex + 1} of {totalLessons}</span></>
              )}
            </div>

            <h1
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 4vw, 36px)",
                color: "#1a1a18",
              }}
            >
              {lesson.title.replace(/^(Lesson \d+\.\d+ — |\u2B50 )/, "")}
            </h1>

            {/* Lesson type badge */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", background: moduleColor.bg, color: moduleColor.text }}
              >
                {lesson.type === "intro" ? "Introduction" : lesson.type === "foundation" ? "Foundation" : lesson.type === "overview" ? "Module Overview" : lesson.type === "chapter" ? "Story Chapter" : "Activities & Tools"}
              </span>
              {isCompleted && (
                <span
                  className="inline-flex items-center gap-1 text-xs text-white px-2.5 py-1 rounded-sm font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: "#BB0A12" }}
                >
                  <Check className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div
            ref={contentRef}
            className="lesson-content text-[15px] sm:text-base leading-relaxed"
            style={{ color: "#3d3d39", fontFamily: "'Source Serif 4', serif" }}
          >
            {content}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t" style={{ borderColor: "#e2ddd5", background: "#fff" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Mark Complete + Back to All Lessons — same row */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {!hasScrolledEnough && !isCompleted && (
                <p className="w-full text-center text-xs mb-0" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
                  Scroll through the lesson content to unlock completion.
                </p>
              )}
              <Link href="/courses/transitions/lessons">
                <span
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider border-2 transition-all duration-200 hover:bg-[#1a1a18] hover:text-white hover:border-[#1a1a18] cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18", borderColor: "#1a1a18", borderRadius: 2 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to All Lessons
                </span>
              </Link>
              {!isCompleted ? (
                <button
                  onClick={markComplete}
                  disabled={!hasScrolledEnough}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 font-bold text-white text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: "#BB0A12", borderRadius: 2 }}
                >
                  <Check className="w-4 h-4" />
                  Mark Complete & Continue
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}>
                  <Check className="w-4 h-4" /> Lesson Completed
                </span>
              )}
            </div>

            {/* Prev / Next Navigation */}
            <div className="flex items-stretch gap-3 sm:gap-4">
              {prevLesson ? (
                <Link href={`/lessons/${prevLesson.slug}`} className="flex-1">
                  <div className="group h-full p-4 sm:p-5 rounded-sm border transition-all cursor-pointer" style={{ borderColor: "#e2ddd5" }}>
                    <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Previous
                    </div>
                    <p className="text-sm font-semibold group-hover:text-[#BB0A12] transition-colors leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" }}>
                      {prevLesson.title.replace(/^(Lesson \d+\.\d+ — |\u2B50 )/, "")}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link href="/courses/transitions" className="flex-1">
                  <div className="group h-full p-4 sm:p-5 rounded-sm border transition-all cursor-pointer" style={{ borderColor: "#e2ddd5" }}>
                    <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Back
                    </div>
                    <p className="text-sm font-semibold group-hover:text-[#BB0A12] transition-colors leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" }}>
                      Program Overview
                    </p>
                  </div>
                </Link>
              )}

              {nextLesson ? (
                <Link href={`/lessons/${nextLesson.slug}`} className="flex-1">
                  <div className="group h-full p-4 sm:p-5 rounded-sm border transition-all cursor-pointer text-right" style={{ borderColor: "#e2ddd5" }}>
                    <div className="flex items-center justify-end gap-2 text-xs mb-1" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
                      Next
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-[#BB0A12] transition-colors leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" }}>
                      {nextLesson.title.replace(/^(Lesson \d+\.\d+ — |\u2B50 )/, "")}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link href="/courses/transitions" className="flex-1">
                  <div className="group h-full p-4 sm:p-5 rounded-sm border transition-all cursor-pointer text-right" style={{ borderColor: "#D4A853" }}>
                    <div className="flex items-center justify-end gap-2 text-xs mb-1" style={{ color: "#D4A853", fontFamily: "'DM Sans', sans-serif" }}>
                      <Award className="w-3.5 h-3.5" />
                      Finish Program
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-[#D4A853] transition-colors leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" }}>
                      Program Complete
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
