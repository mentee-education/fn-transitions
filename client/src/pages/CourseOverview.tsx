// CourseOverview - COO Branding - DISTINCT from homepage
// Full-width hero with learning circle image, left-aligned layout, different structure
// Colors: Red #BB0A12, warm white #fdfcf9, sand #E0DFD9, ink #1a1a18
// Fonts: Playfair Display (headings), Source Serif 4 (body), DM Sans (UI)

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FntButton from "@/components/FntButton";
import FntAccordion from "@/components/FntAccordion";
import { useState, useEffect, useRef } from "react";
import { usePageContent } from "@/data/useCourse";
import { OVERVIEW_DEFAULTS } from "@/data/pageDefaults";
import { X, Download } from "lucide-react";

const COURSE_HERO = "https://pub-8445d67a8aa042a9adef9ee73ed5c0e8.r2.dev/coo_hero_wide.webp";
const COURSE_ABOUT = "https://pub-8445d67a8aa042a9adef9ee73ed5c0e8.r2.dev/coo_cta_section.jpg";

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

const PDF_URL = "https://pub-8445d67a8aa042a9adef9ee73ed5c0e8.r2.dev/HonouringMyJourney.pdf";

// FAQ items may carry linkText/linkUrl — render the link inside the plain content
function withLink(items: { title: string; content: string; linkText?: string; linkUrl?: string }[]) {
  return items.map((it) => {
    if (!it.linkText || !it.linkUrl || !it.content.includes(it.linkText)) return it;
    const [before, ...rest] = it.content.split(it.linkText);
    return {
      title: it.title,
      content: (
        <span>
          {before}
          <a href={it.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#BB0A12", textDecoration: "underline" }}>{it.linkText}</a>
          {rest.join(it.linkText)}
        </span>
      ),
    };
  });
}

export default function CourseOverview() {
  const c = usePageContent("overviewPage", OVERVIEW_DEFAULTS);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fdfcf9" }}>
      <SiteHeader />

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setShowPdfPreview(false)}
        >
          <div
            className="relative w-[95vw] h-[92vh] max-w-[1100px] flex flex-col rounded-sm overflow-hidden"
            style={{ backgroundColor: "#1a1a18" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: "#252520", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Honouring My Journey
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={PDF_URL}
                  download="Honouring My Journey.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 transition-all hover:bg-white hover:text-[#1a1a18] rounded-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* PDF preview via Google Docs Viewer */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
                <div className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Loading preview...</div>
              </div>
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(PDF_URL)}&embedded=true`}
                className="w-full h-full relative"
                title="Honouring My Journey"
                style={{ border: "none", zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* ===== HERO — Full-width image, LEFT-aligned text ===== */}
        <section
          className="relative w-full overflow-hidden"
          style={{ minHeight: "min(70vh, 560px)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${COURSE_HERO})`,
              backgroundSize: "cover",
              backgroundPosition: "center 38%",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(15,15,13,0.88) 0%, rgba(15,15,13,0.72) 45%, rgba(15,15,13,0.4) 100%)",
            }}
          />
          <div className="relative z-10 flex items-center px-5 sm:px-8" style={{ minHeight: "min(70vh, 560px)" }}>
            <div className="max-w-[1100px] mx-auto w-full">
              <FadeIn>
                <div className="max-w-[560px]">
                  <p
                    className="uppercase tracking-[0.2em] mb-3 text-[11px] sm:text-[13px] font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#e8a0a3" }}
                  >
                    {c.heroLabel}
                  </p>
                  <h1
                    className="font-bold leading-[1.08] mb-5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 5vw, 52px)",
                      color: "#ffffff",
                    }}
                  >
                    {c.heroTitle}
                  </h1>
                  <p
                    className="mb-7"
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: "clamp(15px, 1.8vw, 18px)",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.7,
                    }}
                  >
                    {c.heroSubtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <FntButton href="/courses/transitions/lessons">
                      {c.heroCtaLabel}
                    </FntButton>
                    <button
                      onClick={() => setShowPdfPreview(true)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 font-bold text-sm uppercase tracking-wider border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-[#1a1a18] cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 2 }}
                    >
                      {c.heroPdfLabel}
                    </button>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {c.heroMeta}
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== MODULE OVERVIEW — Horizontal cards ===== */}
        <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
              >
                {c.structureLabel}
              </p>
              <h2
                className="font-bold text-center mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  color: "#1a1a18",
                }}
              >
                {c.structureHeading}
              </h2>
              <p
                className="text-center mx-auto max-w-[600px] mb-10"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  color: "#6b6b65",
                  lineHeight: 1.7,
                }}
              >
                {c.structureIntro}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {c.modules.map((m, i) => (
                <FadeIn key={m.num} delay={i * 0.08}>
                  <div
                    className="relative p-5 sm:p-6 h-full flex flex-col"
                    style={{
                      backgroundColor: "#ffffff",
                      borderTop: "4px solid #BB0A12",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      borderRadius: 2,
                      minHeight: 180,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 32,
                        fontWeight: 800,
                        color: "rgba(187,10,18,0.1)",
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {m.num}
                    </span>
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(16px, 1.6vw, 19px)",
                        fontWeight: 700,
                        color: "#1a1a18",
                        lineHeight: 1.3,
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: "'Source Serif 4', serif",
                        fontSize: "clamp(13px, 1.3vw, 15px)",
                        color: "#6b6b65",
                        lineHeight: 1.6,
                      }}
                    >
                      {m.desc}
                    </p>
                    <span
                      className="inline-block mt-3"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#9a9a90",
                        fontWeight: 500,
                      }}
                    >
                      {m.lessons} lessons
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT — Image RIGHT, text LEFT (opposite of homepage) ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#E0DFD9" }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <FadeIn>
              <div>
                <p
                  className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
                >
                  {c.aboutLabel}
                </p>
                <h2
                  className="font-bold mb-5"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(24px, 3vw, 38px)",
                    color: "#1a1a18",
                    lineHeight: 1.15,
                  }}
                >
                  {c.aboutHeading}
                </h2>
                <p
                  className="mb-5"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "#3d3d39",
                    lineHeight: 1.8,
                  }}
                >
                  {c.aboutPara1}
                </p>
                <p
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "#3d3d39",
                    lineHeight: 1.8,
                  }}
                >
                  {c.aboutPara2Before}<em>{c.aboutPara2Em}</em>{c.aboutPara2After}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="overflow-hidden" style={{ borderRadius: 4 }}>
                <img
                  src={COURSE_ABOUT}
                  alt={c.aboutImageAlt}
                  className="w-full h-auto block"
                  style={{ aspectRatio: "4/3", objectFit: "cover", objectPosition: "center 55%" }}
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== WHY TAKE THIS COURSE — Full-width with accordion ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
              >
                {c.whyLabel}
              </p>
              <h2
                className="font-bold text-center mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  color: "#1a1a18",
                }}
              >
                {c.whyHeading}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FntAccordion items={c.whyItems} />
            </FadeIn>
          </div>
        </section>

        {/* ===== WHAT YOU'LL LEARN — Deep red section ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#6b1215" }}>
          <div className="max-w-[900px] mx-auto text-center">
            <FadeIn>
              <p
                className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#e8a0a3" }}
              >
                {c.learnLabel}
              </p>
              <h2
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: "#ffffff",
                }}
              >
                {c.learnHeading}
              </h2>
              <p
                className="mx-auto max-w-[600px] mb-8"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                {c.learnIntro}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[700px] mx-auto text-left">
              {c.learnItems.map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div
                    className="flex items-start gap-3 py-2"
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: "clamp(14px, 1.5vw, 16px)",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span className="shrink-0 mt-0.5" style={{ color: "#e8a0a3", fontSize: "1.1em" }}>&#8594;</span>
                    <span>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[700px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
              >
                {c.faqLabel}
              </p>
              <h2
                className="font-bold text-center mb-8 sm:mb-10"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: "#1a1a18",
                }}
              >
                {c.faqHeading}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FntAccordion items={withLink(c.faqs)} />
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA — Clean, sand background (no image — different from homepage) ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#E0DFD9" }}>
          <div className="max-w-[700px] mx-auto text-center">
            <FadeIn>
              <h2
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3.5vw, 40px)",
                  color: "#1a1a18",
                }}
              >
                {c.ctaHeading}
              </h2>
              <p
                className="mx-auto max-w-[550px] mb-8"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  color: "#5a5a55",
                  lineHeight: 1.7,
                }}
              >
                {c.ctaBody}
              </p>
              <FntButton href="/courses/transitions/lessons">
                {c.ctaButtonLabel}
              </FntButton>
            </FadeIn>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
