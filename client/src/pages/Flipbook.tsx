// Flipbook - Dedicated page for the Education Report Flipbook
// Seamless embed with NO border or outline
// Colors: Red #BB0A12, warm white #fdfcf9, ink #1a1a18

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const FLIPBOOK_URL = "https://pub-8445d67a8aa042a9adef9ee73ed5c0e8.r2.dev/flipbook.html";
const COO_WATERMARK = "https://pub-8445d67a8aa042a9adef9ee73ed5c0e8.r2.dev/coo-watermark.png";

export default function Flipbook() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;

    async function loadFlipbook() {
      try {
        const res = await fetch(FLIPBOOK_URL);
        if (!res.ok) throw new Error("Failed to fetch");
        const html = await res.text();
        if (cancelled) return;
        const blob = new Blob([html], { type: "text/html" });
        url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    loadFlipbook();

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fdfcf9" }}>
      <SiteHeader />

      {/* Hero banner */}
      <section
        className="relative overflow-hidden px-4 sm:px-6"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, #E0DFD9 0%, #e8e4dc 100%)",
          minHeight: "min(30vh, 240px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* COO Watermark */}
        <img
          src={COO_WATERMARK}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(220px, 30vw, 420px)",
            opacity: 0.12,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        <div className="max-w-[1100px] mx-auto w-full relative z-10 py-10 sm:py-14">
          <p
            className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#BB0A12" }}
          >
            Chiefs of Ontario &middot; Visual Summary
          </p>
          <h1
            className="font-bold leading-[1.08]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              color: "#1a1a18",
            }}
          >
            Education Report Flipbook
          </h1>
          <div
            className="mt-4"
            style={{ width: 48, height: 4, backgroundColor: "#BB0A12", borderRadius: 2 }}
          />
          <p
            className="mt-4 max-w-[600px]"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              color: "#5a5a55",
              lineHeight: 1.7,
            }}
          >
            Browse a visual, page-turning summary of the Education Report findings.
          </p>
        </div>
      </section>

      {/* Flipbook embed — seamless, NO border, NO outline */}
      <section
        className="flex-1"
        style={{ backgroundColor: "#fdfcf9" }}
      >
        <div className="max-w-[1200px] mx-auto w-full py-6 sm:py-8">
          {loading && (
            <div
              style={{
                width: "100%",
                height: "80vh",
                minHeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "3px solid #d4cfc6",
                  borderTopColor: "#BB0A12",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "#5a5a55",
                  letterSpacing: "0.04em",
                }}
              >
                Loading flipbook...
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          {error && (
            <div
              style={{
                width: "100%",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#BB0A12",
                  fontWeight: 600,
                }}
              >
                Unable to load the flipbook.
              </p>
            </div>
          )}
          {blobUrl && (
            <iframe
              ref={iframeRef}
              src={blobUrl}
              title="Education Report Flipbook"
              style={{
                width: "100%",
                height: "80vh",
                minHeight: 500,
                border: "none",
                outline: "none",
                display: "block",
              }}
              allowFullScreen
            />
          )}
          <div className="text-center mt-6 pb-4">
            <a
              href="/report"
              className="inline-block"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: "#BB0A12",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "#BB0A12"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent"; }}
            >
              &larr; Back to Research Report
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
