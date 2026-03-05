import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Müller Haustechnik GmbH — Heizung · Sanitär · Elektro",
  description:
    "Ihr zuverlässiger Handwerksbetrieb im Ruhrgebiet seit 1987. Heizung, Sanitär und Elektro aus einer Hand.",
  openGraph: {
    type: "website",
    title: "Müller Haustechnik GmbH — Heizung · Sanitär · Elektro",
    description:
      "Ihr zuverlässiger Handwerksbetrieb im Ruhrgebiet seit 1987. Heizung, Sanitär und Elektro aus einer Hand.",
    url: "https://fpz-media.de/portfolio/handwerk-digital",
  },
}

type Props = { children: React.ReactNode }

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

export default function HandwerkLayout({ children }: Props) {
  return (
    <div
      data-site="handwerk"
      className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] font-sans"
    >
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--site-bg)]/95 backdrop-blur-md border-b border-[var(--site-border)]">
        <div className="mx-auto max-w-[1200px] px-8 flex items-center justify-between h-16">
          <Link
            href="/portfolio/handwerk-digital"
            className="flex items-center gap-2.5 no-underline"
          >
            <div className="w-8 h-8 bg-[var(--site-accent)] rounded-md flex items-center justify-center text-white">
              <WrenchIcon />
            </div>
            <span className="text-[var(--site-text)] font-bold text-base tracking-tight">
              Müller Haustechnik
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/portfolio/handwerk-digital/leistungen"
              className="text-[var(--site-muted)] no-underline text-sm font-medium hover:text-[var(--site-text)] transition-colors"
            >
              Leistungen
            </Link>
            <Link
              href="/portfolio/handwerk-digital/kontakt"
              className="text-[var(--site-muted)] no-underline text-sm font-medium hover:text-[var(--site-text)] transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="/portfolio/handwerk-digital/kontakt"
              className="bg-[var(--site-accent)] text-white no-underline text-[13px] font-semibold px-[18px] py-2 rounded-lg hover:brightness-110 transition"
            >
              Jetzt anfragen
            </Link>
          </div>
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
              { "@type": "ListItem", "position": 3, "name": "Müller Haustechnik", "item": "https://fpz-media.de/portfolio/handwerk-digital" },
            ],
          }),
        }}
      />

      {children}

      {/* Footer */}
      <footer className="bg-[color-mix(in_srgb,var(--site-bg),black_30%)] border-t border-[var(--site-border)] py-12 px-8">
        <div className="mx-auto max-w-[1200px] flex justify-between items-start flex-wrap gap-8">
          <div>
            <p className="text-[var(--site-text)] font-bold mb-2">
              Müller Haustechnik GmbH
            </p>
            <p className="text-[var(--site-muted)] text-sm leading-7">
              Gahlenscher Str. 14
              <br />
              46238 Bottrop
              <br />
              Tel: 02041 123 456
            </p>
          </div>
          <div>
            <p className="text-[var(--site-muted)] text-[13px]">
              Öffnungszeiten
            </p>
            <p className="text-[var(--site-text)] text-sm leading-7">
              Mo–Fr: 7:00–18:00 Uhr
              <br />
              Sa: 8:00–13:00 Uhr
            </p>
          </div>
          <div className="text-right">
            <p className="text-[var(--site-muted)]/60 text-xs">
              Diese Website wurde gebaut von
            </p>
            <Link
              href="/#portfolio"
              className="text-[var(--site-accent)] text-[13px] font-semibold no-underline"
            >
              &larr; fpz media
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
