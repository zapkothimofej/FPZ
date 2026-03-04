import type { ReactNode } from "react"
import Link from "next/link"

const BASE = "/portfolio/lokale-brand-identity"

const C = {
  bg: "#0d1117",
  text: "#e2e8f0",
  accent: "#3b82f6",
  muted: "#64748b",
  surface: "#161c2a",
  border: "#1e2d45",
}

export const metadata = {
  title: "Breuer & Partner Steuerberatung",
  description: "Ihre verlässliche Steuerberatung im Ruhrgebiet seit 1998. Für Unternehmen und Privatpersonen.",
}

const ShieldLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path
      d="M16 3L4 8v8c0 7.18 5.13 13.89 12 15.5C22.87 29.89 28 23.18 28 16V8L16 3z"
      fill={C.accent}
      opacity="0.15"
    />
    <path
      d="M16 3L4 8v8c0 7.18 5.13 13.89 12 15.5C22.87 29.89 28 23.18 28 16V8L16 3z"
      stroke={C.accent}
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M11 16l3.5 3.5L21 12"
      stroke={C.accent}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function BreuerLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Demo Banner */}
      <div
        style={{
          background: C.accent,
          color: "#fff",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        Demo-Website — erstellt von{" "}
        <a href="/" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>
          fpz media
        </a>
      </div>

      {/* Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(13,17,23,0.97)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 66,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href={BASE}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <ShieldLogo size={30} />
            <div>
              <span style={{ color: C.text, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", display: "block" }}>
                Breuer &amp; Partner
              </span>
              <span style={{ color: C.muted, fontSize: 10, letterSpacing: "0.12em", display: "block" }}>
                STEUERBERATUNG
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {[
              { label: "Leistungen", href: `${BASE}/leistungen` },
              { label: "Team", href: `${BASE}#team` },
              { label: "Kontakt", href: `${BASE}/kontakt` },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ color: C.muted, textDecoration: "none", fontSize: 14, fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/kontakt`}
              style={{
                background: C.accent,
                color: "#fff",
                padding: "9px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Erstgespräch buchen
            </Link>
          </nav>
        </div>
      </header>

      {/* Page */}
      <main>{children}</main>

      {/* Footer */}
      <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 32px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 48,
              marginBottom: 40,
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <ShieldLogo size={26} />
                <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>
                  Breuer &amp; Partner Steuerberatung
                </span>
              </div>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 300 }}>
                Ihre verlässliche Steuerberatungskanzlei im Ruhrgebiet. Seit 1998 für Unternehmen und Privatpersonen.
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <p style={{ fontWeight: 600, fontSize: 12, color: C.text, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Kontakt
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, color: C.muted, fontSize: 14 }}>
                <span>Herner Str. 45, 44789 Bochum</span>
                <span>+49 234 123 456-0</span>
                <span>info@breuer-partner-stb.de</span>
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div>
              <p style={{ fontWeight: 600, fontSize: 12, color: C.text, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Öffnungszeiten
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, color: C.muted, fontSize: 14 }}>
                {[["Mo – Do", "8:00 – 17:00"], ["Fr", "8:00 – 13:00"], ["Sa – So", "Geschlossen"]].map(([d, h]) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <span>{d}</span><span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              paddingTop: 24,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <p style={{ color: C.muted, fontSize: 13 }}>
              © 2026 Breuer &amp; Partner Steuerberatung GmbH. Alle Rechte vorbehalten.
            </p>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <a href="#" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>Impressum</a>
              <a href="#" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>Datenschutz</a>
              <span style={{ color: C.muted, fontSize: 13 }}>
                Website by{" "}
                <a href="/" style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}>fpz media</a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
