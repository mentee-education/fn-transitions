// FNT Homepage - COO Branding - Project Overview
// Full-width hero, stunning imagery, polished sections
// Colors: Red #BB0A12, warm white #fdfcf9, sand #E0DFD9, ink #1a1a18
// Fonts: Playfair Display (headings), Source Serif 4 (body), DM Sans (UI)

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FntButton from "@/components/FntButton";
import FntAccordion from "@/components/FntAccordion";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/dbdnf9YxmUznohGAsnbG3a/coo_hero_wide-BNTHTVXA59ntYpaqUGu4dF.webp";
const ABOUT_IMG = HERO_BG;
const CTA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/dbdnf9YxmUznohGAsnbG3a/coo_cta_section-MNkeMDJnGxmuGd7StAHjgE.webp";

const faqItems = [
  {
    title: "What does the Education Transitions project include?",
    content:
      "This is a Chiefs of Ontario initiative that brings together research, strategy, best practices, and practical tools to strengthen how First Nations learners are supported through key education transitions. It includes a strategy, research report, best practices guide, resource directory, and an experiential online program.",
  },
  {
    title: "Who is this project designed for?",
    content:
      "It is designed for educators, school counsellors, transition coordinators, student success leads, administrators, post-secondary advisors, community education support workers, and anyone involved in helping First Nations learners and their families navigate education transitions.",
  },
  {
    title: "How were these resources developed?",
    content:
      "The resources were shaped through engagement with First Nations learners, communities, and education support staff across Ontario. These engagements included interviews, focus groups, and case studies. Chi-miigwech to everyone who contributed.",
  },
  {
    title: "How do I get started with the resources?",
    content:
      "You can start with the Education Transition Strategy for the broader vision, the Research Report for detailed findings, the Best Practices guide for community-informed approaches, the Programs and Resources directory for regional supports, or jump directly into the online program.",
  },
];

const pillars = [
  { title: "Relationship-Based Support", desc: "Strong, ongoing relationships help First Nations learners feel supported and succeed through transitions." },
  { title: "Holistic & Cultural Support", desc: "When learning supports academic, emotional, and cultural needs together, learners are more likely to thrive." },
  { title: "Clear Information & Resources", desc: "Easy-to-find, culturally relevant information helps learners and families make confident decisions." },
  { title: "Community Context Matters", desc: "Local realities, learner experiences, and supports are designed and delivered by communities." },
  { title: "Effective Strategies", desc: "Mentorship, hands-on learning, and cultural programs build confidence and readiness for next steps." },
];

const siteResources = [
  { title: "Education Strategy", desc: "A comprehensive strategy for supporting First Nations learner transitions across Ontario.", href: "/strategy" },
  { title: "Research Report", desc: "Research findings and analysis on education transitions for First Nations learners.", href: "/report" },
  { title: "Best Practices", desc: "Evidence-based practices for supporting First Nations learners through educational transitions.", href: "/best-practices" },
  { title: "Programs & Resources", desc: "A directory of programs and resources available to support First Nations education transitions.", href: "/resources" },
  { title: "Online Program", desc: "A story-based, experiential program with 5 modules, 16 lessons, and hands-on activities.", href: "/courses/transitions" },
];

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

export default function Course() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fdfcf9" }}>
      <SiteHeader />

      <main className="flex-1">
        {/* ===== HERO — Full-width immersive ===== */}
        <section
          className="relative w-full overflow-hidden"
          style={{ minHeight: "min(85vh, 700px)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(15,15,13,0.55) 0%, rgba(15,15,13,0.7) 60%, rgba(15,15,13,0.85) 100%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8" style={{ minHeight: "min(85vh, 700px)" }}>
            <FadeIn delay={0.15}>
              <h1
                className="font-bold leading-[1.08] mb-5 max-w-[900px] mx-auto"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(30px, 5.5vw, 64px)",
                  color: "#ffffff",
                }}
              >
                Supporting Education Transitions for First Nations Learners
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p
                className="mx-auto max-w-[680px] mb-8"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(15px, 2vw, 19px)",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.7,
                }}
              >
                Research, strategy, best practices, and practical tools to strengthen how First Nations learners are supported through key education transitions across Ontario.
              </p>
            </FadeIn>
            <FadeIn delay={0.45}>
              <FntButton href="/courses/transitions">
                EXPLORE THE PROGRAM
              </FntButton>
            </FadeIn>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-20"
            style={{ background: "linear-gradient(to bottom, transparent, #fdfcf9)" }}
          />
        </section>

        {/* ===== EXPLORE RESOURCES — Quick nav strip ===== */}
        <section className="px-4 sm:px-6 py-10 sm:py-14" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[1100px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-8 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
              >
                Explore the Project
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {siteResources.map((r, i) => (
                <FadeIn key={r.title} delay={i * 0.08}>
                  <a href={r.href} className="block h-full no-underline">
                    <div
                      className="text-center p-4 sm:p-5 h-full transition-shadow duration-200 hover:shadow-md flex flex-col"
                      style={{
                        borderRadius: 2,
                        border: "1px solid #d4cfc6",
                        background: "#ffffff",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h3
                        className="mb-1"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 700, color: "#1a1a18", lineHeight: 1.3 }}
                      >
                        {r.title}
                      </h3>
                      <p
                        className="flex-1"
                        style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(12px, 1.2vw, 14px)", color: "#6b6b65", lineHeight: 1.5 }}
                      >
                        {r.desc}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT — Two-column with image ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#E0DFD9" }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <FadeIn>
              <div
                className="overflow-hidden"
                style={{ borderRadius: 4 }}
              >
                <img
                  src={ABOUT_IMG}
                  alt="Northern forest pathway at dusk, echoing the project hero imagery"
                  className="w-full h-auto block"
                  style={{ aspectRatio: "4/3", objectFit: "cover", objectPosition: "30% 42%" }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p
                  className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
                >
                  About This Project
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
                  Shaped by the Voices of Learners and Communities
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "#3d3d39",
                    lineHeight: 1.8,
                  }}
                >
                  This work is shaped by the voices of First Nations learners, communities, and education support staff. Your stories guide these findings. Chi-miigwech for sharing your knowledge, strengths, and experiences.
                </p>
                <p
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "#3d3d39",
                    lineHeight: 1.8,
                  }}
                >
                  The project brings together a comprehensive education transition strategy, research findings, evidence-based best practices, a resource directory, and an experiential online program — all grounded in self-determination, culture, and holistic wellbeing.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== KEY PILLARS ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[1100px] mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p
                  className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
                >
                  Relationships at the Heart
                </p>
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(26px, 3.5vw, 44px)",
                    color: "#1a1a18",
                  }}
                >
                  What Supports Successful Transitions
                </h2>
              </div>
            </FadeIn>
            {/* Pillar cards: 2-column grid on sm+, single column on mobile, last item centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08} className={i === pillars.length - 1 && pillars.length % 2 !== 0 ? "sm:col-span-2 sm:max-w-[50%] sm:mx-auto" : ""}>
                  <div
                    className="p-6 h-full"
                    style={{
                      background: "#ffffff",
                      borderLeft: "4px solid #BB0A12",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    <h3
                      className="mb-2"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 1.6vw, 19px)", fontWeight: 700, color: "#1a1a18", lineHeight: 1.3 }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(13px, 1.3vw, 15px)", color: "#5a5a55", lineHeight: 1.7 }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT YOU'LL FIND ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#6b1215" }}>
          <div className="max-w-[900px] mx-auto text-center">
            <FadeIn>
              <p
                className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#e8a0a3" }}
              >
                What Works Best
              </p>
              <h2
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: "#ffffff",
                }}
              >
                Effective Approaches That Support Success
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
                Key approaches identified through research and community engagement:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[700px] mx-auto text-left">
              {[
                "Building resilience and self-advocacy skills",
                "Creating culturally safe Indigenous spaces",
                "Providing structured transition supports",
                "Offering holistic wraparound supports",
                "Maintaining strong, ongoing relationships",
                "Indigenous-led mentorship and peer networks",
                "Hands-on, youth-centered learning experiences",
                "First Nations-led decision-making in education",
              ].map((item, i) => (
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
                Learn More
              </p>
              <h2
                className="font-bold text-center mb-8 sm:mb-10"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: "#1a1a18",
                }}
              >
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FntAccordion items={faqItems} />
            </FadeIn>
          </div>
        </section>

        {/* ===== MAP — Ontario communities ===== */}

        {/* ===== CTA — Full-width with canoe image ===== */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: 580 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${CTA_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 65%",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(15,15,13,0.82) 0%, rgba(15,15,13,0.6) 50%, rgba(15,15,13,0.3) 100%)",
            }}
          />
          <div className="relative z-10 flex items-center px-5 sm:px-8 py-20" style={{ minHeight: 580 }}>
            <div className="max-w-[1100px] mx-auto w-full">
              <FadeIn>
                <div className="max-w-[560px]">
                  <p
                    className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
                  >
                    Begin Your Journey
                  </p>
                  <h2
                    className="font-bold mb-5 leading-[1.1]"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 4vw, 52px)",
                      color: "#ffffff",
                    }}
                  >
                    Let's strengthen learner pathways together.
                  </h2>
                  <p
                    className="mb-7"
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: "clamp(14px, 1.5vw, 17px)",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.7,
                    }}
                  >
                    The program emerged from engagement with First Nations learners, families, and education staff throughout Ontario, and supports recommendations from the Chiefs of Ontario Post-Secondary Engagement Report.
                  </p>
                  <FntButton href="/courses/transitions">
                    GET STARTED
                  </FntButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
