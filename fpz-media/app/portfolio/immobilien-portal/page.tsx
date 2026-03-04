import Link from "next/link"

const iconBed = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4v16" /><path d="M22 4v16" /><path d="M2 8h20" /><rect x="6" y="8" width="4" height="4" rx="1" />
    <rect x="14" y="8" width="4" height="4" rx="1" />
  </svg>
)

const iconSqm = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
)

const iconYear = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const properties = [
  {
    title: "Einfamilienhaus Essen-Rüttenscheid",
    rooms: 4,
    sqm: 140,
    year: 1998,
    price: "485.000 €",
    type: "Haus",
    mode: "Verkauf",
    district: "Rüttenscheid",
    gradient: "linear-gradient(135deg, #1a3a6b 0%, #0f2040 50%, #162032 100%)",
  },
  {
    title: "Eigentumswohnung Bochum-Innenstadt",
    rooms: 3,
    sqm: 88,
    year: 2008,
    price: "259.000 €",
    type: "Wohnung",
    mode: "Verkauf",
    district: "Bochum",
    gradient: "linear-gradient(135deg, #0f2a4a 0%, #1a2d4a 50%, #1e3a55 100%)",
  },
  {
    title: "Doppelhaushälfte Mülheim a.d. Ruhr",
    rooms: 5,
    sqm: 160,
    year: 2002,
    price: "389.000 €",
    type: "Haus",
    mode: "Verkauf",
    district: "Mülheim",
    gradient: "linear-gradient(135deg, #0f2535 0%, #163040 50%, #1a3a45 100%)",
  },
]

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Immobilien verkaufen",
    desc: "Professionelle Vermarktung, Bewertung, Exposé und persönliche Besichtigung – wir begleiten Sie vom ersten Gespräch bis zur Schlüsselübergabe.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Immobilien vermieten",
    desc: "Mietersuche, Bonitätsprüfung, Mietvertragsgestaltung und Übergabe – sicher, rechtssicher und effizient für Eigentümer im Ruhrgebiet.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Immobilienbewertung",
    desc: "Kostenlose Wertermittlung auf Basis aktueller Marktdaten und 15 Jahren Regionalkenntnisse – fundiert, unverbindlich und persönlich.",
  },
]

const testimonials = [
  {
    quote: "Herr Krause hat unser Haus in nur 9 Tagen verkauft – zu einem Preis über unseren Erwartungen. Eine außergewöhnliche Leistung.",
    author: "Familie Bauer",
    location: "Essen",
  },
  {
    quote: "Professionelle Beratung, schnelle Kommunikation und ein super Ergebnis. Klare Empfehlung für jeden, der im Ruhrgebiet kaufen oder verkaufen möchte!",
    author: "M. Scholz",
    location: "Bochum",
  },
  {
    quote: "Von der Bewertung bis zur Übergabe alles perfekt organisiert. Wir sind sehr dankbar, dass wir Herrn Krause gefunden haben.",
    author: "Ehepaar Müller",
    location: "Mülheim",
  },
]

export default function KrauseHome() {
  return (
    <main>
      {/* Hero */}
      <section style={{ position: "relative", padding: "7rem 2rem 5rem", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
            background: "radial-gradient(ellipse at 80% 20%, rgba(96,165,250,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 20, padding: "4px 14px", marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
              <span style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>Ihr Makler im Ruhrgebiet seit 2009</span>
            </div>
            <h1 style={{ color: "#e2e8f0", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
              Ihre Immobilie.<br />
              <span style={{ color: "#60a5fa" }}>Unser Auftrag.</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Seit 2009 vermitteln wir Immobilien im Ruhrgebiet mit Leidenschaft, Expertise und persönlicher Betreuung. Vertrauen Sie auf einen Makler, der Ihre Region kennt.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
              <Link
                href="/portfolio/immobilien-portal/immobilien"
                style={{ background: "#60a5fa", color: "#0f1929", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 10 }}
              >
                Immobilien ansehen
              </Link>
              <Link
                href="/portfolio/immobilien-portal/kontakt"
                style={{ border: "1px solid #1e3048", color: "#e2e8f0", textDecoration: "none", fontWeight: 600, fontSize: 15, padding: "13px 28px", borderRadius: 10, background: "rgba(30,48,72,0.3)" }}
              >
                Kostenlose Bewertung
              </Link>
            </div>

            {/* Search Bar Mock */}
            <div style={{ display: "flex", gap: 0, background: "#162032", border: "1px solid #1e3048", borderRadius: 12, overflow: "hidden", maxWidth: 560 }}>
              <div style={{ flex: 1, padding: "12px 16px", borderRight: "1px solid #1e3048" }}>
                <div style={{ color: "#2d4a6b", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 2 }}>STANDORT</div>
                <div style={{ color: "#64748b", fontSize: 14 }}>Ort, PLZ oder Stadtteil</div>
              </div>
              <div style={{ padding: "12px 16px", borderRight: "1px solid #1e3048", minWidth: 120 }}>
                <div style={{ color: "#2d4a6b", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 2 }}>TYP</div>
                <div style={{ color: "#64748b", fontSize: 14 }}>Alle Typen</div>
              </div>
              <Link
                href="/portfolio/immobilien-portal/immobilien"
                style={{ background: "#60a5fa", color: "#0f1929", textDecoration: "none", fontWeight: 700, fontSize: 14, padding: "0 22px", display: "flex", alignItems: "center" }}
              >
                Suchen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid #1e3048", borderBottom: "1px solid #1e3048", backgroundColor: "#162032" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { value: "15+", label: "Jahre Erfahrung" },
            { value: "380+", label: "Verkaufte Objekte" },
            { value: "Ø 12", label: "Tage Verkaufszeit" },
            { value: "98%", label: "Kundenzufriedenheit" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "2rem",
                borderRight: i < 3 ? "1px solid #1e3048" : "none",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
            <div>
              <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Aktuelle Angebote</p>
              <h2 style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 700, margin: 0 }}>Ausgewählte Objekte</h2>
            </div>
            <Link href="/portfolio/immobilien-portal/immobilien" style={{ color: "#60a5fa", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              Alle Objekte ansehen →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {properties.map((p, i) => (
              <div
                key={i}
                style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" }}
              >
                {/* Image placeholder */}
                <div style={{ height: 200, background: p.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                    <span style={{ background: "rgba(15,25,41,0.85)", color: "#60a5fa", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(96,165,250,0.3)" }}>
                      {p.type}
                    </span>
                    <span style={{ background: "rgba(15,25,41,0.85)", color: "#94a3b8", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: "1px solid #1e3048" }}>
                      {p.mode}
                    </span>
                  </div>
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(15,25,41,0.85)", color: "#94a3b8", fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "1px solid #1e3048" }}>
                    {p.district}
                  </div>
                </div>

                <div style={{ padding: "18px 20px" }}>
                  <h3 style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.4 }}>{p.title}</h3>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <span style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
                      {iconBed} {p.rooms} Zimmer
                    </span>
                    <span style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
                      {iconSqm} {p.sqm} m²
                    </span>
                    <span style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
                      {iconYear} BJ {p.year}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#d4a843", fontSize: 20, fontWeight: 800 }}>{p.price}</span>
                    <Link
                      href="/portfolio/immobilien-portal/immobilien"
                      style={{ color: "#60a5fa", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
                    >
                      Details & Exposé →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#0a1220", borderTop: "1px solid #1e3048" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Unsere Leistungen</p>
            <h2 style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 700 }}>Was wir für Sie tun</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {services.map((s, i) => (
              <div key={i} style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 14, padding: "2rem" }}>
                <div style={{ width: 48, height: 48, background: "rgba(96,165,250,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {s.icon}
                </div>
                <h3 style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Thomas Krause */}
      <section style={{ padding: "5rem 2rem", borderTop: "1px solid #1e3048" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
          <div style={{ maxWidth: 600 }}>
            <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Ihr Ansprechpartner</p>
            <h2 style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Ihr persönlicher Ansprechpartner</h2>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Thomas Krause gründete Krause Immobilien 2009 mit einer klaren Vision: Immobilienvermittlung, die auf echtem Vertrauen und tiefer Regionalkenntniss basiert. Als gebürtiger Essener kennt er das Ruhrgebiet in- und auswendig – von Rüttenscheid bis Kettwig, von Bochum bis Oberhausen.
            </p>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              Das Familienunternehmen steht für persönliche Betreuung, Transparenz und Verlässlichkeit. Als zertifizierter Immobilienmakler der IHK und langjähriges Mitglied im Immobilienverband Deutschland begleitet Herr Krause seine Kunden mit Fachkompetenz und echtem Engagement.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ color: "#60a5fa", fontWeight: 700, fontSize: 18 }}>IHK</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Zertifiziert</div>
              </div>
              <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ color: "#60a5fa", fontWeight: 700, fontSize: 18 }}>IVD</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Mitglied</div>
              </div>
              <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 10, padding: "12px 20px", textAlign: "center" }}>
                <div style={{ color: "#60a5fa", fontWeight: 700, fontSize: 18 }}>2009</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Gegründet</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 140, height: 140, borderRadius: "50%", background: "linear-gradient(135deg, #1a3a6b 0%, #2d5a9e 100%)", border: "3px solid #1e3048", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <span style={{ color: "#60a5fa", fontSize: 40, fontWeight: 800 }}>TK</span>
            </div>
            <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Thomas Krause</p>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 2 }}>Geschäftsführer & Inhaber</p>
            <p style={{ color: "#64748b", fontSize: 12 }}>Zertifizierter Immobilienmakler (IHK)</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#0a1220", borderTop: "1px solid #1e3048" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Kundenstimmen</p>
            <h2 style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 700 }}>Was unsere Kunden sagen</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 14, padding: "2rem" }}>
                <div style={{ color: "#60a5fa", fontSize: 40, lineHeight: 1, marginBottom: 16, opacity: 0.6 }}>"</div>
                <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ borderTop: "1px solid #1e3048", paddingTop: 16 }}>
                  <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{t.author}</p>
                  <p style={{ color: "#64748b", fontSize: 13 }}>{t.location}</p>
                </div>
                <div style={{ display: "flex", gap: 2, marginTop: 10 }}>
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#d4a843" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ padding: "5rem 2rem", borderTop: "1px solid #1e3048" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #162032 0%, #1a2a45 100%)", border: "1px solid #1e3048", borderRadius: 20, padding: "3.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "radial-gradient(ellipse at 80% 50%, rgba(212,168,67,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#d4a843", borderRadius: "20px 0 0 20px" }} />
            <div style={{ paddingLeft: 24, position: "relative" }}>
              <p style={{ color: "#d4a843", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Kostenlos & unverbindlich</p>
              <h2 style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Wie viel ist Ihre Immobilie wert?</h2>
              <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 540 }}>
                Innerhalb von 24 Stunden erhalten Sie eine fundierte Einschätzung – basierend auf aktuellen Marktdaten und 15 Jahren Erfahrung im Ruhrgebiet.
              </p>
              <Link
                href="/portfolio/immobilien-portal/kontakt"
                style={{ background: "#d4a843", color: "#0f1929", textDecoration: "none", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, display: "inline-block" }}
              >
                Kostenlose Erstbewertung →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
