import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Mila Mode — Zeitlose Mode für jeden Anlass",
  description:
    "Mila Mode in Bochum: Nachhaltige, zeitlose Damenmode für jeden Anlass. Entdecke unsere aktuelle Frühjahrskollektion.",
};

const BASE = "/portfolio/einzelhandel-launch";

const navLinks = [
  { label: "Kollektion", href: `${BASE}/kollektion` },
  { label: "Neuheiten", href: `${BASE}` },
  { label: "Über uns", href: `${BASE}` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
];

export default function MilaLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily:
          "'Inter', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#fafaf9",
        color: "#1a1a1a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Demo Banner */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "#fafaf9",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: "12px",
          letterSpacing: "0.08em",
        }}
      >
        Portfolio-Demo · Diese Website wurde für fpz media erstellt ·{" "}
        <Link
          href="/"
          style={{ color: "#d6a89a", textDecoration: "underline" }}
        >
          fpz media ansehen
        </Link>
      </div>

      {/* Navbar */}
      <header
        style={{
          backgroundColor: "#fafaf9",
          borderBottom: "1px solid #e7e5e4",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href={BASE} style={{ textDecoration: "none", lineHeight: 1 }}>
            <div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: "#1a1a1a",
                  lineHeight: 1,
                }}
              >
                MILA
              </div>
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.4em",
                  color: "#737373",
                  marginTop: "2px",
                }}
              >
                MODE
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  color: "#1a1a1a",
                  textDecoration: "none",
                  fontWeight: 400,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "transparent",
              border: "1px solid #1a1a1a",
              padding: "8px 16px",
              fontSize: "12px",
              letterSpacing: "0.06em",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Warenkorb
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1a1a1a",
          color: "#fafaf9",
          padding: "60px 24px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Store Info */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#737373", marginBottom: "16px" }}>
              STORE
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "16px" }}>
              MILA<span style={{ fontWeight: 300, marginLeft: "6px" }}>MODE</span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.8, color: "#a3a3a3" }}>
              Kortumstr. 48<br />
              44787 Bochum<br />
              <br />
              Mo–Fr: 10:00–19:00 Uhr<br />
              Sa: 10:00–18:00 Uhr<br />
              So: geschlossen
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#737373", marginBottom: "16px" }}>
              NEWSLETTER
            </div>
            <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
              Bleib immer auf dem neuesten Stand.
            </p>
            <p style={{ fontSize: "13px", color: "#a3a3a3", marginBottom: "20px", lineHeight: 1.7 }}>
              Neue Kollektionen, exklusive Angebote und stilvolle Inspiration direkt in dein Postfach.
            </p>
            <div style={{ display: "flex", gap: "0" }}>
              <input
                type="email"
                placeholder="deine@email.de"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  fontSize: "12px",
                  backgroundColor: "#262626",
                  border: "1px solid #404040",
                  borderRight: "none",
                  color: "#fafaf9",
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#d6a89a",
                  border: "none",
                  color: "#1a1a1a",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ANMELDEN
              </button>
            </div>
          </div>

          {/* Made by */}
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#737373", marginBottom: "16px" }}>
              GEBAUT VON
            </div>
            <p style={{ fontSize: "13px", color: "#a3a3a3", lineHeight: 1.8, marginBottom: "20px" }}>
              Diese Website wurde konzipiert und entwickelt von fpz media — Digitalagentur für ambitionierte Marken.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-block",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "#d6a89a",
                textDecoration: "none",
                borderBottom: "1px solid #d6a89a",
                paddingBottom: "2px",
              }}
            >
              fpz media ansehen →
            </Link>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #262626",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "11px", color: "#525252", letterSpacing: "0.04em" }}>
            © 2025 Mila Mode. Alle Rechte vorbehalten.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Datenschutz", "Impressum", "AGB"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "11px", color: "#525252", textDecoration: "none", letterSpacing: "0.04em" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
