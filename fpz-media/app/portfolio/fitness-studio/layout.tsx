"use client"

import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "FitBase Essen – Stärker werden. Jeden Tag.",
  description:
    "Dein Fitnessstudio in Essen. Krafttraining, Kurse, Personal Training. Über 450 Mitglieder vertrauen FitBase Essen.",
};

const NAV_LINKS = [
  { href: "/portfolio/fitness-studio/kurse", label: "Kurse" },
  { href: "/portfolio/fitness-studio#trainer", label: "Trainer" },
  { href: "/portfolio/fitness-studio/mitgliedschaft", label: "Mitgliedschaft" },
  { href: "/portfolio/fitness-studio#kontakt", label: "Kontakt" },
];

function LightningIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: "#22c55e" }}
      aria-hidden="true"
    >
      <path
        d="M13 2L4.5 13.5H11L10 22L20.5 10.5H14L13 2Z"
        fill="#22c55e"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FitnessStudioLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: "#0a0a0a", color: "#f5f5f5", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Navbar */}
      <nav
        style={{
          background: "#0a0a0a",
          borderBottom: "1px solid #262626",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            href="/portfolio/fitness-studio"
            style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
          >
            <LightningIcon />
            <span style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontWeight: 800, fontSize: "18px", color: "#f5f5f5", letterSpacing: "-0.02em" }}>
                FitBase
              </span>
              <span style={{ fontWeight: 400, fontSize: "13px", color: "#737373" }}>Essen</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "#737373",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#737373")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/portfolio/fitness-studio/mitgliedschaft"
            style={{
              background: "#22c55e",
              color: "#0a0a0a",
              padding: "8px 18px",
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Probetraining buchen
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #262626", marginTop: "80px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "48px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <LightningIcon />
              <span style={{ fontWeight: 800, fontSize: "16px" }}>FitBase Essen</span>
            </div>
            <p style={{ color: "#737373", fontSize: "14px", lineHeight: "1.6" }}>
              Stärker werden. Jeden Tag.
            </p>
          </div>

          {/* Address */}
          <div>
            <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "12px", color: "#f5f5f5" }}>Standort</p>
            <p style={{ color: "#737373", fontSize: "14px", lineHeight: "1.8" }}>
              Rüttenscheider Str. 87<br />
              45130 Essen<br />
              Tel: 0201 / 987 654 30
            </p>
          </div>

          {/* Hours */}
          <div>
            <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "12px", color: "#f5f5f5" }}>Öffnungszeiten</p>
            <p style={{ color: "#737373", fontSize: "14px", lineHeight: "1.8" }}>
              Mo – Fr: 06:00 – 23:00 Uhr<br />
              Sa – So: 08:00 – 21:00 Uhr<br />
              Feiertage: 09:00 – 18:00 Uhr
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "12px", color: "#f5f5f5" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ color: "#737373", fontSize: "14px", textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #262626",
            padding: "20px 24px",
            textAlign: "center",
            color: "#737373",
            fontSize: "13px",
          }}
        >
          © 2025 FitBase Essen. Alle Rechte vorbehalten. &nbsp;·&nbsp;{" "}
          <span>
            Diese Website wurde gebaut von{" "}
            <a
              href="/"
              style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}
            >
              fpz media
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
