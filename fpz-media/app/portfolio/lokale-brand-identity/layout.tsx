import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"

const BASE = "/portfolio/lokale-brand-identity"

export const metadata: Metadata = {
  title: "Breuer & Partner Steuerberatung",
  description:
    "Ihre verlässliche Steuerberatung im Ruhrgebiet seit 1998. Für Unternehmen und Privatpersonen.",
  openGraph: {
    type: "website",
    title: "Breuer & Partner Steuerberatung",
    description:
      "Ihre verlässliche Steuerberatung im Ruhrgebiet seit 1998. Für Unternehmen und Privatpersonen.",
    url: "https://fpz-media.de/portfolio/lokale-brand-identity",
  },
}

const navLinks = [
  { label: "Leistungen", href: `${BASE}/leistungen` },
  { label: "Team", href: `${BASE}#team` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
]

const footerHours = [
  ["Mo – Do", "8:00 – 17:00"],
  ["Fr", "8:00 – 13:00"],
  ["Sa – So", "Geschlossen"],
]

export default function BreuerLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-site="steuerberater"
      className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] font-sans"
    >
      {/* Demo Banner */}
      <div className="bg-[var(--site-accent)] text-white text-center py-2 px-4 text-[13px] font-medium tracking-wide">
        Demo-Website — erstellt von{" "}
        <Link href="/" className="text-white font-bold underline">
          fpz media
        </Link>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--site-bg)]/97 backdrop-blur-[10px] border-b border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[66px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href={BASE}
            className="flex items-center gap-2.5 no-underline"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M16 3L4 8v8c0 7.18 5.13 13.89 12 15.5C22.87 29.89 28 23.18 28 16V8L16 3z"
                className="fill-[var(--site-accent)]/15"
              />
              <path
                d="M16 3L4 8v8c0 7.18 5.13 13.89 12 15.5C22.87 29.89 28 23.18 28 16V8L16 3z"
                className="stroke-[var(--site-accent)]"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M11 16l3.5 3.5L21 12"
                className="stroke-[var(--site-accent)]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <span className="text-[var(--site-text)] font-bold text-base tracking-tight block">
                Breuer &amp; Partner
              </span>
              <span className="text-[var(--site-muted)] text-[10px] tracking-[0.12em] block">
                STEUERBERATUNG
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-7">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[var(--site-muted)] no-underline text-sm font-medium hover:text-[var(--site-text)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/kontakt`}
              className="bg-[var(--site-accent)] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold no-underline whitespace-nowrap hover:brightness-110 transition-all"
            >
              Erstgespräch buchen
            </Link>
          </nav>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fpz-media.de" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://fpz-media.de/portfolio" },
              { "@type": "ListItem", "position": 3, "name": "Breuer & Partner Steuerberatung", "item": "https://fpz-media.de/portfolio/lokale-brand-identity" },
            ],
          }),
        }}
      />

      {/* Page */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--site-surface)] border-t border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-8">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-12 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 3L4 8v8c0 7.18 5.13 13.89 12 15.5C22.87 29.89 28 23.18 28 16V8L16 3z"
                    className="fill-[var(--site-accent)]/15"
                  />
                  <path
                    d="M16 3L4 8v8c0 7.18 5.13 13.89 12 15.5C22.87 29.89 28 23.18 28 16V8L16 3z"
                    className="stroke-[var(--site-accent)]"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M11 16l3.5 3.5L21 12"
                    className="stroke-[var(--site-accent)]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold text-[15px] text-[var(--site-text)]">
                  Breuer &amp; Partner Steuerberatung
                </span>
              </div>
              <p className="text-[var(--site-muted)] text-sm leading-[1.7] max-w-[300px]">
                Ihre verlässliche Steuerberatungskanzlei im Ruhrgebiet. Seit
                1998 für Unternehmen und Privatpersonen.
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <p className="font-semibold text-xs text-[var(--site-text)] uppercase tracking-[0.1em] mb-4">
                Kontakt
              </p>
              <div className="flex flex-col gap-2 text-[var(--site-muted)] text-sm">
                <span>Herner Str. 45, 44789 Bochum</span>
                <span>+49 234 123 456-0</span>
                <span>info@breuer-partner-stb.de</span>
              </div>
            </div>

            {/* Oeffnungszeiten */}
            <div>
              <p className="font-semibold text-xs text-[var(--site-text)] uppercase tracking-[0.1em] mb-4">
                Öffnungszeiten
              </p>
              <div className="flex flex-col gap-1.5 text-[var(--site-muted)] text-sm">
                {footerHours.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4">
                    <span>{d}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-[var(--site-border)] pt-6 flex flex-wrap justify-between items-center gap-3">
            <p className="text-[var(--site-muted)] text-[13px]">
              © 2026 Breuer &amp; Partner Steuerberatung GmbH. Alle Rechte
              vorbehalten.
            </p>
            <div className="flex gap-5 items-center">
              <a
                href="#"
                className="text-[var(--site-muted)] text-[13px] no-underline"
              >
                Impressum
              </a>
              <a
                href="#"
                className="text-[var(--site-muted)] text-[13px] no-underline"
              >
                Datenschutz
              </a>
              <span className="text-[var(--site-muted)] text-[13px]">
                Website by{" "}
                <Link
                  href="/"
                  className="text-[var(--site-accent)] no-underline font-semibold"
                >
                  fpz media
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
