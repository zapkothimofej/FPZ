import Link from "next/link"

export const metadata = {
  title: "Leistungen — Müller Haustechnik GmbH",
  description: "Heizungsinstallation, Sanitär, Badsanierung und Elektroinstallation im Ruhrgebiet. Faire Preise, schnelle Termine.",
}

type Service = {
  icon: React.ReactNode
  title: string
  desc: string
  items: string[]
  price: string
}

const services: Service[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12h4l2-4" />
        <path d="M12 8v4" />
      </svg>
    ),
    title: "Heizungsinstallation",
    desc: "Einbau moderner Gas-, Öl- und Wärmepumpenanlagen — von der Planung bis zur schlüsselfertigen Übergabe, inklusive Förderberatung.",
    items: ["Altanlagen-Demontage", "Neuinstallation nach TRGI", "Inbetriebnahme & Einweisung", "Förderantrag (BEG) auf Wunsch"],
    price: "Ab 89 €/Std.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Heizungswartung & Reparatur",
    desc: "Jährliche Inspektion nach TRGI und schnelle Störungsbeseitigung — damit Ihre Heizung auch im Winter zuverlässig läuft.",
    items: ["Dichtheitsprüfung", "Abgasmessung", "Filterwechsel", "Sicherheitscheck & Protokoll"],
    price: "Ab 65 €/Einsatz",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <path d="M12 2a5 5 0 0 1 5 5c0 5-5 11-5 11S7 12 7 7a5 5 0 0 1 5-5z" />
        <circle cx="12" cy="7" r="1.5" fill="#f97316" />
      </svg>
    ),
    title: "Sanitärinstallation",
    desc: "Bäder, Küchen und Wasseranschlüsse — wir kümmern uns um alle sanitären Arbeiten, vom Austausch einzelner Armaturen bis zur Komplettsanierung.",
    items: ["Montage Armaturen & Sanitärobjekte", "Rohrleitungen & Anschlüsse", "Abdichtung nach DIN 18534", "Fliesenarbeiten auf Anfrage"],
    price: "Ab 79 €/Std.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: "Badsanierung",
    desc: "Komplette Badsanierungen aus einer Hand — wir koordinieren alle Gewerke und liefern Ihr Traumbad termingerecht und sauber.",
    items: ["Planung & 3D-Visualisierung", "Demontage & Entsorgung", "Installation & Abdichtung", "Fliesen, Möbel & Beleuchtung"],
    price: "Auf Anfrage",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Elektroinstallation",
    desc: "Elektroinstallationen für Neubau und Modernisierung — geprüft, zertifiziert und nach aktueller VDE-Norm ausgeführt.",
    items: ["Unterverteilung & Leitungen", "Steckdosen & Beleuchtung", "Smart Home & KNX", "Wallbox / E-Mobilität"],
    price: "Ab 75 €/Std.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
      </svg>
    ),
    title: "E-Prüfung (DGUV V3)",
    desc: "Prüfung elektrischer Anlagen und Betriebsmittel nach DGUV Vorschrift 3 — rechtssicher, dokumentiert und mit Prüfplakette.",
    items: ["Prüfprotokoll (digital)", "Prüfplaketten", "Mängelbericht & Empfehlungen", "Wiederholungsprüfung auf Wunsch"],
    price: "Ab 45 €/Einheit",
  },
]

const faq = [
  {
    q: "Wie schnell kann ein Termin vereinbart werden?",
    a: "Wir versuchen, Ihnen innerhalb von 2–3 Werktagen einen Termin anzubieten. Bei Notfällen sind wir rund um die Uhr erreichbar und in der Regel innerhalb von 2 Stunden vor Ort.",
  },
  {
    q: "Gibt es einen Notdienst?",
    a: "Ja. Unsere 24/7-Notfall-Hotline ist unter 02041 123 456 erreichbar — 365 Tage im Jahr, auch an Sonn- und Feiertagen. Notfalleinsätze werden nach Aufwand abgerechnet.",
  },
  {
    q: "Werden auch ältere Anlagen repariert?",
    a: "Ja, wir arbeiten mit allen gängigen Fabrikaten und Baujahren. Sollte ein Ersatzteil nicht mehr verfügbar sein, beraten wir Sie ehrlich über Reparatur vs. Neuanschaffung — ohne versteckten Verkaufsdruck.",
  },
  {
    q: "Was kostet ein erster Besichtigungstermin?",
    a: "Der erste Beratungsbesuch und die Besichtigung vor Ort sind für Sie kostenlos und unverbindlich. Wir erstellen Ihnen danach ein detailliertes Angebot mit transparenter Kostenaufstellung.",
  },
]

export default function LeistungenPage() {
  return (
    <>
      {/* Page Hero */}
      <section style={{ padding: "5rem 2rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f97316", display: "inline-block" }} />
            <span style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Leistungsübersicht</span>
          </div>
          <h1 style={{ color: "#f1f5f9", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>Unsere Leistungen</h1>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>
            Von der Einzelreparatur bis zum Komplettpaket — wir bieten alles aus einer Hand. Transparente Preise, erfahrene Fachkräfte, saubere Ausführung.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section style={{ padding: "1rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {services.map((s) => (
            <div key={s.title} style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 14, padding: "2rem", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 52, height: 52, backgroundColor: "rgba(249,115,22,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{s.title}</h2>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #2d3348", paddingTop: 16 }}>
                <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Inklusive</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "#cbd5e1", fontSize: 14 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2d3348", paddingTop: 16 }}>
                <span style={{ color: "#f97316", fontWeight: 700, fontSize: 15 }}>{s.price}</span>
                <Link href="/portfolio/handwerk-digital/kontakt" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "7px 16px", borderRadius: 8 }}>
                  Anfragen →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "4rem 2rem", backgroundColor: "#0d1018", borderTop: "1px solid #2d3348" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>FAQ</p>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>Häufige Fragen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faq.map((item) => (
              <div key={item.q} style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 12, padding: "1.5rem" }}>
                <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{item.q}</p>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.75 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.75rem", fontWeight: 700, marginBottom: 16 }}>Kostenlosen Termin vereinbaren</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Kein Risiko, kein Verkaufsdruck. Wir kommen vorbei, schauen uns die Situation an und machen Ihnen ein ehrliches Angebot.
          </p>
          <Link href="/portfolio/handwerk-digital/kontakt" style={{ backgroundColor: "#f97316", color: "white", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, display: "inline-block" }}>
            Jetzt Termin anfragen
          </Link>
        </div>
      </section>
    </>
  )
}
