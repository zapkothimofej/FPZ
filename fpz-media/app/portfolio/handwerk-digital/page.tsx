import Link from "next/link"

export const metadata = {
  title: "Müller Haustechnik GmbH — Heizung · Sanitär · Elektro im Ruhrgebiet",
  description: "Ihr zuverlässiger Handwerksbetrieb im Ruhrgebiet seit 1987. Heizung, Sanitär und Elektro aus einer Hand.",
}

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Heizungstechnik",
    desc: "Von der Gasheizung bis zur Wärmepumpe — wir planen, installieren und warten Ihre Heizungsanlage fachgerecht und effizient.",
    href: "/portfolio/handwerk-digital/leistungen",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <path d="M12 2a5 5 0 0 1 5 5c0 5-5 11-5 11S7 12 7 7a5 5 0 0 1 5-5z" />
        <circle cx="12" cy="7" r="1.5" fill="#f97316" />
      </svg>
    ),
    title: "Sanitärinstallation",
    desc: "Badsanierung, Küchen- und Wasseranschlüsse — wir realisieren Ihr Badezimmer nach Ihren Wünschen, termingerecht und sauber.",
    href: "/portfolio/handwerk-digital/leistungen",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Elektroarbeiten",
    desc: "Neuinstallationen, Modernisierungen und DGUV-Prüfungen — Ihre Elektrik in sicheren Händen, von der Planung bis zur Abnahme.",
    href: "/portfolio/handwerk-digital/leistungen",
  },
]

const referenzen = [
  { title: "Badsanierung Essen", year: "2024", desc: "Komplette Kernsanierung eines 9m² Bades inkl. bodenebener Dusche und Fußbodenheizung. Fertigstellung in 12 Werktagen." },
  { title: "Heizungsanlage Bottrop", year: "2023", desc: "Austausch einer veralteten Ölheizung gegen eine moderne Luft-Wasser-Wärmepumpe (18 kW) mit Pufferspeicher." },
  { title: "Elektroinstallation Gladbeck", year: "2024", desc: "Vollständige Neuinstallation in einem Einfamilienhaus aus den 1970ern — inkl. Unterverteilung, KNX-Vorbereitung und Wallbox." },
]

export default function HandwerkHomePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", padding: "6rem 2rem 5rem", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: "40%", width: 1, height: "100%", background: "linear-gradient(to bottom, transparent, rgba(45,51,72,0.4), transparent)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "3rem" }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: "5px 14px", marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f97316", display: "inline-block" }} />
              <span style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Ruhrgebiet seit 1987</span>
            </div>
            <h1 style={{ color: "#f1f5f9", fontSize: "clamp(2.4rem, 5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}>
              Heizung.<br />
              <span style={{ color: "#f97316" }}>Sanitär.</span><br />
              Elektro.
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Ihr verlässlicher Handwerksbetrieb im Ruhrgebiet. Seit 37 Jahren stehen wir für Qualität, Pünktlichkeit und faire Preise — von Bottrop bis Essen.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/portfolio/handwerk-digital/kontakt" style={{ backgroundColor: "#f97316", color: "white", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 10, display: "inline-block" }}>
                Anfrage stellen
              </Link>
              <Link href="/portfolio/handwerk-digital/leistungen" style={{ backgroundColor: "#1a1f2e", color: "#f1f5f9", textDecoration: "none", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 10, border: "1px solid #2d3348", display: "inline-block" }}>
                Unsere Leistungen →
              </Link>
            </div>
          </div>

          {/* Decorative icon */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.15 }}>
            <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="0.6">
              <circle cx="12" cy="12" r="10" />
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Vertrauen / Stats */}
      <section style={{ borderTop: "1px solid #2d3348", borderBottom: "1px solid #2d3348", backgroundColor: "#0d1018" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {[
            { value: "35+", label: "Jahre Erfahrung", sub: "Gegründet 1987 in Bottrop" },
            { value: "2.400+", label: "Abgeschlossene Projekte", sub: "Im gesamten Ruhrgebiet" },
            { value: "4.9 ★", label: "Google Bewertung", sub: "Aus 312 Rezensionen" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
              <p style={{ color: "#f97316", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{stat.value}</p>
              <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15, marginTop: 8 }}>{stat.label}</p>
              <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Was wir tun</p>
          <h2 style={{ color: "#f1f5f9", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3rem" }}>Unsere Leistungen</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {services.map((s) => (
              <div key={s.title} style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 12, padding: "2rem", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 52, height: 52, backgroundColor: "rgba(249,115,22,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.icon}
                </div>
                <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18 }}>{s.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, flexGrow: 1 }}>{s.desc}</p>
                <Link href={s.href} style={{ color: "#f97316", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Mehr erfahren →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#0d1018" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Über uns</p>
            <h2 style={{ color: "#f1f5f9", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20 }}>Handwerk mit Geschichte</h2>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              1987 gründete Heinrich Müller seinen Ein-Mann-Betrieb in Bottrop. Heute führt sein Sohn Thomas das Unternehmen mit einem Team aus 12 qualifizierten Fachkräften — Heizungsbauer, Sanitärinstallateure und Elektriker unter einem Dach.
            </p>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Was uns auszeichnet: kurze Reaktionszeiten, transparente Kostenvoranschläge und eine Garantie auf alle ausgeführten Arbeiten. Wir arbeiten ausschließlich mit zertifizierten Materialien führender Hersteller wie Viessmann, Grohe und Siemens.
            </p>
            <div style={{ display: "flex", gap: "2rem" }}>
              {[{ v: "12", l: "Fachkräfte" }, { v: "3", l: "Gewerke" }, { v: "48h", l: "Reaktionszeit" }].map((item) => (
                <div key={item.l}>
                  <p style={{ color: "#f97316", fontWeight: 800, fontSize: "1.5rem" }}>{item.v}</p>
                  <p style={{ color: "#94a3b8", fontSize: 13 }}>{item.l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Image placeholder */}
          <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", aspectRatio: "4/3" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #f97316 0%, #ea580c 30%, #1a1f2e 60%, #0f1117 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Team Müller Haustechnik</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notfall CTA */}
      <section style={{ padding: "3rem 2rem", backgroundColor: "#f97316" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>24/7 Notfallservice</p>
            <h2 style={{ color: "white", fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Notfall? Wir sind rund um die Uhr erreichbar.</h2>
          </div>
          <a href="tel:02041123456" style={{ backgroundColor: "white", color: "#f97316", textDecoration: "none", fontWeight: 800, fontSize: 22, padding: "14px 32px", borderRadius: 10, whiteSpace: "nowrap" }}>
            02041 123 456
          </a>
        </div>
      </section>

      {/* Referenzen */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Referenzen</p>
          <h2 style={{ color: "#f1f5f9", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3rem" }}>Ausgewählte Projekte</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {referenzen.map((ref) => (
              <div key={ref.title} style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 140, background: "linear-gradient(135deg, #1e2535 0%, #2d3348 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: 14, right: 14, backgroundColor: "#f97316", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{ref.year}</div>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.35)" strokeWidth="1">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{ref.title}</h3>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>{ref.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
