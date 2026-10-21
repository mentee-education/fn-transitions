/* Developed by Mentee: the standard band from concept-site-kit/developed-by-mentee —
   Barlow Condensed 600, 0.8rem, capitals, 0.12em tracking, logo 32px tall, py-5, gap-4,
   thin top rule. Site-specific: the FNT red accent rule stays on top of the footer. */
export default function SiteFooter() {
  return (
    <footer
      id="site-footer"
      style={{
        background: "#0f0f0d",
        borderTop: "3px solid #BB0A12",
      }}
    >
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.25)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1.25rem 1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Developed by
          </span>
          <a
            href="https://mentee.ca"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 0.2s",
              opacity: 0.85,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
          >
            <img
              src="/mentee-logo.svg"
              alt="Mentee"
              width={156}
              height={52}
              style={{ height: 32, width: "auto" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
