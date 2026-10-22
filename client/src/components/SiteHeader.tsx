import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "Program", href: "/courses/transitions" },
  { label: "Strategy", href: "/strategy" },
  { label: "Report", href: "/report" },
  { label: "Best Practices", href: "/best-practices" },
  { label: "Directory", href: "/resources" },

  {
    label: "Flipbook",
    href: "/flipbook",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, display: "inline-block", verticalAlign: "-2px" }}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

export default function SiteHeader() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: scrolled ? "rgba(253,252,249,0.97)" : "rgba(253,252,249,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2ddd5",
          height: 64,
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Logo — left */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <img
              src="https://chiefs-of-ontario.org/wp-content/uploads/2019/11/logo_coo_lores_ret.png"
              alt="Chiefs of Ontario"
              style={{ height: 40 }}
            />
          </Link>

          {/* Desktop Nav — centered */}
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
            }}
            className="hidden lg:flex"
          >
            {navLinks.map((link) => {
              const isActive = link.href === "/courses/transitions"
                    ? location.startsWith("/courses") || location.startsWith("/lessons")
                    : location === link.href || location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: isActive ? "#BB0A12" : "#3d3d39",
                    textDecoration: "none",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                    borderBottom: isActive ? "2px solid #BB0A12" : "2px solid transparent",
                    paddingBottom: 2,
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = "#BB0A12";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = "#3d3d39";
                  }}
                >
                  {"icon" in link && link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right spacer to balance the logo width for centering */}
          <div className="hidden lg:block" style={{ width: 40, flexShrink: 0 }} />

          {/* Mobile Hamburger */}
          <div className="lg:hidden" style={{ marginLeft: "auto" }}>
            <button
              className="flex flex-col"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                gap: 5,
                padding: 8,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#1a1a18",
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#1a1a18",
                  transition: "all 0.3s",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#1a1a18",
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: 64,
            zIndex: 899,
            background: "rgba(253,252,249,0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem 1.5rem",
              gap: "0.25rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => {
              const isActive = link.href === "/courses/transitions"
                    ? location.startsWith("/courses") || location.startsWith("/lessons")
                    : location === link.href || location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#BB0A12" : "#1a1a18",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    padding: "14px 0",
                    borderBottom: "1px solid #e2ddd5",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {"icon" in link && link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div style={{ height: 64 }} />
    </>
  );
}
