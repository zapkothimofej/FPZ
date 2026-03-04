import Link from "next/link"

type Props = { children: React.ReactNode }

export default function HandwerkLayout({ children }: Props) {
  return (
    <div style={{ backgroundColor: "#0f1117", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(15,17,23,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #2d3348" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/portfolio/handwerk-digital" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, backgroundColor: "#f97316", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>Müller Haustechnik</span>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/portfolio/handwerk-digital/leistungen" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Leistungen</Link>
            <Link href="/portfolio/handwerk-digital/kontakt" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Kontakt</Link>
            <Link href="/portfolio/handwerk-digital/kontakt" style={{ backgroundColor: "#f97316", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "8px 18px", borderRadius: 8 }}>Jetzt anfragen</Link>
          </div>
        </div>
      </nav>

      {children}

      <footer style={{ backgroundColor: "#0a0c12", borderTop: "1px solid #2d3348", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 8 }}>Müller Haustechnik GmbH</p>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>Gahlenscher Str. 14<br />46238 Bottrop<br />Tel: 02041 123 456</p>
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontSize: 13 }}>Öffnungszeiten</p>
            <p style={{ color: "#f1f5f9", fontSize: 14, lineHeight: 1.7 }}>Mo–Fr: 7:00–18:00 Uhr<br />Sa: 8:00–13:00 Uhr</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#475569", fontSize: 12 }}>Diese Website wurde gebaut von</p>
            <Link href="/#portfolio" style={{ color: "#f97316", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>← fpz media</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
