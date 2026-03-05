import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FitBase Essen – Stärker werden. Jeden Tag.",
  description:
    "Dein Fitnessstudio in Essen. Krafttraining, Kurse, Personal Training. Über 450 Mitglieder vertrauen FitBase Essen.",
  openGraph: {
    type: "website",
    title: "FitBase Essen – Stärker werden. Jeden Tag.",
    description:
      "Dein Fitnessstudio in Essen. Krafttraining, Kurse, Personal Training. Über 450 Mitglieder vertrauen FitBase Essen.",
    url: "https://fpz-media.de/portfolio/fitness-studio",
  },
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
      className="text-[var(--site-accent)]"
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
    <div
      data-site="fitness"
      className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] font-sans"
    >
      {/* Navbar */}
      <nav className="bg-[var(--site-bg)] border-b border-[var(--site-border)] sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/portfolio/fitness-studio"
            className="flex items-center gap-2 no-underline"
          >
            <LightningIcon />
            <span className="flex items-baseline gap-1">
              <span className="font-extrabold text-lg text-[var(--site-text)] tracking-tight">
                FitBase
              </span>
              <span className="font-normal text-[13px] text-[var(--site-muted)]">Essen</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[var(--site-muted)] no-underline text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/portfolio/fitness-studio/mitgliedschaft"
            className="bg-[var(--site-accent)] text-[var(--site-bg)] px-[18px] py-2 rounded-md font-bold text-sm no-underline whitespace-nowrap"
          >
            Probetraining buchen
          </Link>
        </div>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fpz-media.de" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://fpz-media.de/portfolio" },
              { "@type": "ListItem", "position": 3, "name": "FitBase Essen", "item": "https://fpz-media.de/portfolio/fitness-studio" },
            ],
          }),
        }}
      />

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-[var(--site-border)] mt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LightningIcon />
              <span className="font-extrabold text-base">FitBase Essen</span>
            </div>
            <p className="text-[var(--site-muted)] text-sm leading-relaxed">
              Stärker werden. Jeden Tag.
            </p>
          </div>

          {/* Address */}
          <div>
            <p className="font-bold text-sm mb-3 text-[var(--site-text)]">Standort</p>
            <p className="text-[var(--site-muted)] text-sm leading-[1.8]">
              Rüttenscheider Str. 87<br />
              45130 Essen<br />
              Tel: 0201 / 987 654 30
            </p>
          </div>

          {/* Hours */}
          <div>
            <p className="font-bold text-sm mb-3 text-[var(--site-text)]">Öffnungszeiten</p>
            <p className="text-[var(--site-muted)] text-sm leading-[1.8]">
              Mo – Fr: 06:00 – 23:00 Uhr<br />
              Sa – So: 08:00 – 21:00 Uhr<br />
              Feiertage: 09:00 – 18:00 Uhr
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-bold text-sm mb-3 text-[var(--site-text)]">Navigation</p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[var(--site-muted)] text-sm no-underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--site-border)] py-5 px-6 text-center text-[var(--site-muted)] text-[13px]">
          © 2025 FitBase Essen. Alle Rechte vorbehalten. &nbsp;·&nbsp;{" "}
          <span>
            Diese Website wurde gebaut von{" "}
            <Link
              href="/"
              className="text-[var(--site-accent)] no-underline font-semibold"
            >
              fpz media
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
