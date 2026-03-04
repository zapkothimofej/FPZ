import Link from "next/link"

export const metadata = {
  title: "Krause Immobilien — Ihr Makler im Ruhrgebiet",
}

type Props = { children: React.ReactNode }

export default function KrauseLayout({ children }: Props) {
  return (
    <div data-site="immobilien" className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--site-bg)]/97 backdrop-blur-md border-b border-[var(--site-border)]">
        <div className="mx-auto max-w-[1200px] px-8 flex items-center justify-between h-16">
          <Link href="/portfolio/immobilien-portal" className="no-underline flex items-center gap-3">
            <div className="w-[34px] h-[34px] border-2 border-[var(--site-accent)] rounded-md flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--site-accent)" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <span className="text-[var(--site-text)] font-bold text-base block">Krause Immobilien</span>
              <span className="text-[var(--site-muted)] text-[10px] block tracking-widest">ESSEN &middot; RUHRGEBIET</span>
            </div>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/portfolio/immobilien-portal/immobilien" className="text-[var(--site-muted)] no-underline text-sm hover:text-[var(--site-text)] transition-colors">
              Immobilien
            </Link>
            <Link href="/portfolio/immobilien-portal/kontakt" className="text-[var(--site-muted)] no-underline text-sm hover:text-[var(--site-text)] transition-colors">
              Leistungen
            </Link>
            <Link href="/portfolio/immobilien-portal/kontakt" className="text-[var(--site-muted)] no-underline text-sm hover:text-[var(--site-text)] transition-colors">
              Über uns
            </Link>
            <Link
              href="/portfolio/immobilien-portal/kontakt"
              className="border border-[var(--site-accent)] text-[var(--site-accent)] no-underline text-[13px] font-semibold px-[18px] py-2 rounded-lg hover:bg-[var(--site-accent)] hover:text-[var(--site-bg)] transition-colors"
            >
              Kostenlose Bewertung
            </Link>
          </div>
        </div>
      </nav>

      {children}

      {/* Footer */}
      <footer className="bg-[#0a1220] border-t border-[var(--site-border)] py-12 px-8">
        <div className="mx-auto max-w-[1200px] flex justify-between flex-wrap gap-8">
          <div>
            <p className="text-[var(--site-text)] font-bold mb-2">Krause Immobilien GmbH</p>
            <p className="text-[var(--site-muted)] text-[13px] leading-[1.8]">
              Kettwiger Str. 21 &middot; 45127 Essen<br />
              Tel: 0201 654 321<br />
              info@krause-immo.de
            </p>
          </div>
          <div>
            <p className="text-[var(--site-text)] text-[13px] font-semibold mb-1">Öffnungszeiten</p>
            <p className="text-[var(--site-muted)] text-[13px] leading-[1.8]">
              Mo – Fr: 9:00 – 18:00 Uhr<br />
              Sa: 10:00 – 14:00 Uhr
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#2d4a6b] text-xs">IHK Mitglied &middot; Zertifizierter Makler</p>
            <p className="text-[#2d4a6b] text-xs mt-1">Diese Website wurde gebaut von</p>
            <Link href="/#portfolio" className="text-[var(--site-accent)] text-[13px] no-underline">&larr; fpz media</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
