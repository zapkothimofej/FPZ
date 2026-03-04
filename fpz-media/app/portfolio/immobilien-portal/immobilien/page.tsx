import Link from "next/link"

const iconBed = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4v16" /><path d="M22 4v16" /><path d="M2 8h20" />
    <rect x="6" y="8" width="4" height="4" rx="1" /><rect x="14" y="8" width="4" height="4" rx="1" />
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

const iconLocation = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const listings = [
  {
    id: 1,
    title: "Einfamilienhaus Essen-Rüttenscheid",
    address: "Rüttenscheider Str. · 45130 Essen",
    rooms: 4,
    sqm: 140,
    year: 1998,
    plot: 360,
    price: "485.000 €",
    priceUnit: "Kaufpreis",
    type: "Einfamilienhaus",
    mode: "Verkauf",
    modeColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #1a3a6b 0%, #0f2040 60%, #0d1a35 100%)",
    desc: "Gepflegtes Einfamilienhaus in bester Lage von Essen-Rüttenscheid. Das Objekt überzeugt mit einer großzügigen Wohnfläche, einem gepflegten Garten und modernisiertem Badezimmer. Ideale Anbindung an ÖPNV und Einkaufsmöglichkeiten.",
    extras: ["Garten 360 m²", "Garage", "Keller", "Modernisiert 2019"],
  },
  {
    id: 2,
    title: "Eigentumswohnung Bochum-Innenstadt",
    address: "Kortumstraße · 44787 Bochum",
    rooms: 3,
    sqm: 88,
    year: 2008,
    plot: null,
    price: "259.000 €",
    priceUnit: "Kaufpreis",
    type: "Eigentumswohnung",
    mode: "Verkauf",
    modeColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #0f2a4a 0%, #1a2d4a 60%, #1e3a55 100%)",
    desc: "Moderne Eigentumswohnung im Herzen von Bochum mit hochwertiger Ausstattung. Die Wohnung befindet sich im dritten Obergeschoss eines gepflegten Mehrfamilienhauses und bietet eine offene Wohnküche sowie zwei Bäder.",
    extras: ["Aufzug", "Balkon", "TG-Stellplatz", "Fußbodenheizung"],
  },
  {
    id: 3,
    title: "Doppelhaushälfte Mülheim an der Ruhr",
    address: "Schloßstraße · 45468 Mülheim a.d.R.",
    rooms: 5,
    sqm: 160,
    year: 2002,
    plot: 280,
    price: "389.000 €",
    priceUnit: "Kaufpreis",
    type: "Doppelhaushälfte",
    mode: "Verkauf",
    modeColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #0f2535 0%, #163040 60%, #1a3a45 100%)",
    desc: "Großzügige Doppelhaushälfte in ruhiger Wohnlage von Mülheim. Das Objekt bietet fünf Zimmer, einen sonnigen Garten und einen ausgebauten Dachboden. Ideal für Familien, die Raum und Ruhe suchen.",
    extras: ["Garten 280 m²", "Carport", "Ausgebautes DG", "Neue Heizung 2021"],
  },
  {
    id: 4,
    title: "Apartment Essen-Kettwig",
    address: "Ruhrtalstraße · 45219 Essen-Kettwig",
    rooms: 2,
    sqm: 65,
    year: 2015,
    plot: null,
    price: "185.000 €",
    priceUnit: "Kaufpreis",
    type: "Apartment",
    mode: "Verkauf",
    modeColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #1a2a40 0%, #0f2030 60%, #162035 100%)",
    desc: "Charmantes Apartment in der idyllischen Altstadt von Essen-Kettwig mit Blick auf die Ruhr. Hochwertige Ausstattung, offene Küche und ein großer Balkon machen diese Wohnung zu einem echten Wohnjuwel.",
    extras: ["Balkon mit Ruhrblick", "Einbauküche", "Stellplatz", "Barrierefrei"],
  },
  {
    id: 5,
    title: "Gewerbefläche Oberhausen-Innenstadt",
    address: "Marktstraße · 46045 Oberhausen",
    rooms: null,
    sqm: 220,
    year: 1995,
    plot: null,
    price: "1.800 € / Mo.",
    priceUnit: "Kaltmiete",
    type: "Gewerbefläche",
    mode: "Miete",
    modeColor: "#a78bfa",
    gradient: "linear-gradient(135deg, #1a1a3a 0%, #1e1e45 60%, #2a1a40 100%)",
    desc: "Repräsentative Gewerbefläche in zentraler 1a-Lage von Oberhausen. Die Fläche ist derzeit als Büro ausgebaut und bietet flexible Nutzungsmöglichkeiten. Sehr gute Erreichbarkeit mit PKW und ÖPNV.",
    extras: ["Klimaanlage", "5 Parkplätze inklusive", "Lastenaufzug", "Provisionsfrei"],
  },
  {
    id: 6,
    title: "Reihenmittelhaus Gelsenkirchen-Buer",
    address: "Victoriastraße · 45886 Gelsenkirchen",
    rooms: 4,
    sqm: 120,
    year: 1985,
    plot: 195,
    price: "285.000 €",
    priceUnit: "Kaufpreis",
    type: "Reihenmittelhaus",
    mode: "Verkauf",
    modeColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #122030 0%, #1a2a3a 60%, #162535 100%)",
    desc: "Solides Reihenmittelhaus in familienfreundlicher Lage von Gelsenkirchen-Buer. Das Objekt wurde kontinuierlich modernisiert und bietet einen kleinen Garten sowie eine ausgebaute Terrasse. Gute Schulanbindung.",
    extras: ["Garten 195 m²", "Terrasse", "Neue Fenster 2020", "Keller"],
  },
]

const filters = ["Alle", "Häuser", "Wohnungen", "Gewerbe", "Zur Miete"]

export default function ImmobilienPage() {
  return (
    <main style={{ padding: "3rem 2rem 5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Portfolio</p>
          <h1 style={{ color: "#e2e8f0", fontSize: 32, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Unsere Immobilien</h1>
          <p style={{ color: "#64748b", fontSize: 15 }}>{listings.length} Objekte verfügbar · Ruhrgebiet</p>
        </div>

        {/* Filter bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {filters.map((f, i) => (
            <span
              key={f}
              style={{
                padding: "7px 18px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: i === 0 ? "#60a5fa" : "transparent",
                color: i === 0 ? "#0f1929" : "#64748b",
                border: i === 0 ? "1px solid #60a5fa" : "1px solid #1e3048",
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Listings */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {listings.map((p) => (
            <div
              key={p.id}
              style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              {/* Image */}
              <div style={{ height: 220, background: p.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="1">
                  {p.type === "Gewerbefläche" ? (
                    <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>
                  ) : (
                    <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>
                  )}
                </svg>
                <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6 }}>
                  <span style={{ background: "rgba(15,25,41,0.9)", color: p.modeColor, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: `1px solid ${p.modeColor}40` }}>
                    {p.mode}
                  </span>
                  <span style={{ background: "rgba(15,25,41,0.9)", color: "#94a3b8", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid #1e3048" }}>
                    {p.type}
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 14, right: 14 }}>
                  <span style={{ background: "rgba(15,25,41,0.9)", color: "#d4a843", fontSize: 15, fontWeight: 800, padding: "6px 14px", borderRadius: 10, border: "1px solid rgba(212,168,67,0.3)" }}>
                    {p.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                <div>
                  <h2 style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3 }}>{p.title}</h2>
                  <span style={{ color: "#64748b", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
                    {iconLocation} {p.address}
                  </span>
                </div>

                {/* Key stats */}
                <div style={{ display: "flex", gap: 20, padding: "12px 0", borderTop: "1px solid #1e3048", borderBottom: "1px solid #1e3048", flexWrap: "wrap" }}>
                  {p.rooms !== null && (
                    <span style={{ color: "#94a3b8", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                      {iconBed} <strong style={{ color: "#e2e8f0" }}>{p.rooms}</strong> Zimmer
                    </span>
                  )}
                  <span style={{ color: "#94a3b8", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    {iconSqm} <strong style={{ color: "#e2e8f0" }}>{p.sqm} m²</strong> Wohnfläche
                  </span>
                  {p.plot && (
                    <span style={{ color: "#94a3b8", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                      {iconSqm} <strong style={{ color: "#e2e8f0" }}>{p.plot} m²</strong> Grundstück
                    </span>
                  )}
                  <span style={{ color: "#94a3b8", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    {iconYear} BJ <strong style={{ color: "#e2e8f0" }}>{p.year}</strong>
                  </span>
                </div>

                <p style={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>

                {/* Extras */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.extras.map((e) => (
                    <span key={e} style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.15)", color: "#60a5fa", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 16 }}>
                      {e}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ marginTop: "auto", paddingTop: 4 }}>
                  <Link
                    href="/portfolio/immobilien-portal/kontakt"
                    style={{ display: "inline-block", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", color: "#60a5fa", textDecoration: "none", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 10 }}
                  >
                    Exposé anfordern →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{ color: "#2d4a6b", fontSize: 12, textAlign: "center", marginTop: 48, lineHeight: 1.6 }}>
          Alle Angaben ohne Gewähr. Irrtümer vorbehalten. Provisionsangaben gemäß § 656a BGB.<br />
          Stand der Angebote: März 2026.
        </p>
      </div>
    </main>
  )
}
