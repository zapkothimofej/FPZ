import Link from "next/link"

type Props = { children: React.ReactNode }

export default function KrauseLayout({ children }: Props) {
  return (
    <div style={{ backgroundColor: "#0f1929", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(15,25,41,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid #1e3048" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/portfolio/immobilien-portal" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, border: "2px solid #60a5fa", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16 }}>Krause Immobilien</span>
              <span style={{ color: "#64748b", fontSize: 10, display: "block", letterSpacing: "0.1em" }}>ESSEN · RUHRGEBIET</span>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/portfolio/immobilien-portal/immobilien" style={{ color: "#64748b", textDecoration: "none", fontSize: 14 }}>Immobilien</Link>
            <Link href="/portfolio/immobilien-portal/kontakt" style={{ color: "#64748b", textDecoration: "none", fontSize: 14 }}>Leistungen</Link>
            <Link href="/portfolio/immobilien-portal/kontakt" style={{ color: "#64748b", textDecoration: "none", fontSize: 14 }}>Über uns</Link>
            <Link
              href="/portfolio/immobilien-portal/kontakt"
              style={{ border: "1px solid #60a5fa", color: "#60a5fa", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "8px 18px", borderRadius: 8 }}
            >
              Kostenlose Bewertung
            </Link>
          </div>
        </div>
      </nav>

      {children}

      <footer style={{ backgroundColor: "#0a1220", borderTop: "1px solid #1e3048", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p style={{ color: "#e2e8f0", fontWeight: 700, marginBottom: 8 }}>Krause Immobilien GmbH</p>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.8 }}>
              Kettwiger Str. 21 · 45127 Essen<br />
              Tel: 0201 654 321<br />
              info@krause-immo.de
            </p>
          </div>
          <div>
            <p style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Öffnungszeiten</p>
            <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.8 }}>
              Mo – Fr: 9:00 – 18:00 Uhr<br />
              Sa: 10:00 – 14:00 Uhr
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#2d4a6b", fontSize: 12 }}>IHK Mitglied · Zertifizierter Makler</p>
            <p style={{ color: "#2d4a6b", fontSize: 12, marginTop: 4 }}>Diese Website wurde gebaut von</p>
            <Link href="/#portfolio" style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none" }}>← fpz media</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
