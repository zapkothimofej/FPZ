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
      data-site="mode"
      className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] font-sans flex flex-col"
    >
      {/* Demo Banner */}
      <div className="bg-[#1a1a1a] text-[#fafaf9] text-center py-2 px-4 text-xs tracking-widest">
        Portfolio-Demo · Diese Website wurde für fpz media erstellt ·{" "}
        <Link href="/" className="text-[var(--site-accent)] underline">
          fpz media ansehen
        </Link>
      </div>

      {/* Navbar */}
      <header className="bg-[var(--site-bg)] border-b border-[var(--site-border)] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href={BASE} className="no-underline leading-none">
            <div>
              <div className="text-[22px] font-extrabold tracking-[0.15em] text-[var(--site-text)] leading-none">
                MILA
              </div>
              <div className="text-[9px] font-normal tracking-[0.4em] text-[var(--site-muted)] mt-0.5">
                MODE
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex gap-9 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] tracking-[0.06em] text-[var(--site-text)] no-underline font-normal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart Button */}
          <button className="flex items-center gap-2 bg-transparent border border-[var(--site-text)] px-4 py-2 text-xs tracking-[0.06em] cursor-pointer text-[var(--site-text)]">
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
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#fafaf9] pt-15 px-6 pb-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-12 mb-12">
          {/* Store Info */}
          <div>
            <div className="text-[11px] tracking-[0.2em] text-[#737373] mb-4">
              STORE
            </div>
            <div className="text-[22px] font-bold tracking-[0.12em] mb-4">
              MILA<span className="font-light ml-1.5">MODE</span>
            </div>
            <p className="text-[13px] leading-[1.8] text-[#a3a3a3]">
              Kortumstr. 48
              <br />
              44787 Bochum
              <br />
              <br />
              Mo–Fr: 10:00–19:00 Uhr
              <br />
              Sa: 10:00–18:00 Uhr
              <br />
              So: geschlossen
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-[11px] tracking-[0.2em] text-[#737373] mb-4">
              NEWSLETTER
            </div>
            <p className="text-sm font-medium mb-2">
              Bleib immer auf dem neuesten Stand.
            </p>
            <p className="text-[13px] text-[#a3a3a3] mb-5 leading-[1.7]">
              Neue Kollektionen, exklusive Angebote und stilvolle Inspiration
              direkt in dein Postfach.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="deine@email.de"
                className="flex-1 px-3.5 py-2.5 text-xs bg-[#262626] border border-[#404040] border-r-0 text-[#fafaf9] outline-none"
              />
              <button className="px-4.5 py-2.5 bg-[var(--site-accent)] border-none text-[#1a1a1a] text-[11px] tracking-[0.08em] font-semibold cursor-pointer">
                ANMELDEN
              </button>
            </div>
          </div>

          {/* Made by */}
          <div>
            <div className="text-[11px] tracking-[0.2em] text-[#737373] mb-4">
              GEBAUT VON
            </div>
            <p className="text-[13px] text-[#a3a3a3] leading-[1.8] mb-5">
              Diese Website wurde konzipiert und entwickelt von fpz media —
              Digitalagentur für ambitionierte Marken.
            </p>
            <Link
              href="/"
              className="inline-block text-[11px] tracking-[0.12em] text-[var(--site-accent)] no-underline border-b border-[var(--site-accent)] pb-0.5"
            >
              fpz media ansehen →
            </Link>
          </div>
        </div>

        <div className="border-t border-[#262626] pt-6 flex justify-between items-center">
          <p className="text-[11px] text-[#525252] tracking-[0.04em]">
            © 2025 Mila Mode. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            {["Datenschutz", "Impressum", "AGB"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] text-[#525252] no-underline tracking-[0.04em]"
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
