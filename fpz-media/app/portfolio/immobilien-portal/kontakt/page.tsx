export default function KontaktPage() {
  return (
    <main style={{ padding: "3rem 2rem 5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: "#60a5fa", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Unverbindlich & Kostenlos</p>
          <h1 style={{ color: "#e2e8f0", fontSize: 32, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Kontakt & Bewertung</h1>
          <p style={{ color: "#64748b", fontSize: 15, maxWidth: 540 }}>
            Nutzen Sie unsere kostenlose Immobilienbewertung oder nehmen Sie direkt Kontakt auf – wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>

          {/* Form */}
          <div style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 16, padding: "2.5rem" }}>
            <h2 style={{ color: "#e2e8f0", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Kostenlose Immobilienbewertung</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>Alle Felder mit * sind Pflichtfelder.</p>

            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Name + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    placeholder="Vor- und Nachname"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Telefon *</label>
                  <input
                    type="tel"
                    placeholder="+49 201 ..."
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>E-Mail-Adresse *</label>
                <input
                  type="email"
                  placeholder="ihre@email.de"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Immobilientyp + Anliegen */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Immobilientyp *</label>
                  <select style={selectStyle} required>
                    <option value="">Bitte wählen …</option>
                    <option>Einfamilienhaus</option>
                    <option>Wohnung / Apartment</option>
                    <option>Mehrfamilienhaus</option>
                    <option>Gewerbefläche</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Ihr Anliegen *</label>
                  <select style={selectStyle} required>
                    <option value="">Bitte wählen …</option>
                    <option>Verkaufen</option>
                    <option>Vermieten</option>
                    <option>Bewertung</option>
                    <option>Kaufberatung</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
              </div>

              {/* PLZ + Wohnfläche + Baujahr */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>PLZ / Ort *</label>
                  <input
                    type="text"
                    placeholder="z.B. 45127 Essen"
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Wohnfläche (m²)</label>
                  <input
                    type="number"
                    placeholder="z.B. 120"
                    min={10}
                    max={2000}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Baujahr</label>
                  <input
                    type="number"
                    placeholder="z.B. 1998"
                    min={1850}
                    max={2026}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Nachricht */}
              <div>
                <label style={labelStyle}>Nachricht (optional)</label>
                <textarea
                  placeholder="Weitere Informationen zu Ihrer Immobilie oder Ihrem Anliegen …"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              {/* Privacy note */}
              <p style={{ color: "#2d4a6b", fontSize: 12, lineHeight: 1.6 }}>
                Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
              </p>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  background: "#60a5fa",
                  color: "#0f1929",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "14px 32px",
                  borderRadius: 10,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Bewertung anfragen →
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Agent card */}
            <div style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 16, padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #1e3048" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #1a3a6b 0%, #2d5a9e 100%)", border: "2px solid #1e3048", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#60a5fa", fontSize: 18, fontWeight: 800 }}>TK</span>
                </div>
                <div>
                  <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 16, margin: "0 0 2px" }}>Thomas Krause</p>
                  <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 2px" }}>Geschäftsführer & Inhaber</p>
                  <p style={{ color: "#64748b", fontSize: 12 }}>Zertifizierter Immobilienmakler (IHK)</p>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <p style={{ color: "#2d4a6b", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Direktkontakt</p>
                <a href="tel:+492016543210" style={{ color: "#60a5fa", fontWeight: 800, fontSize: 22, textDecoration: "none", display: "block", marginBottom: 4 }}>
                  0201 654 321
                </a>
                <a href="mailto:thomas.krause@krause-immo.de" style={{ color: "#64748b", fontSize: 13, textDecoration: "none" }}>
                  thomas.krause@krause-immo.de
                </a>
              </div>
            </div>

            {/* Office hours */}
            <div style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14, margin: 0 }}>Öffnungszeiten</p>
              </div>
              {[
                { day: "Mo – Fr", time: "9:00 – 18:00 Uhr" },
                { day: "Samstag", time: "10:00 – 14:00 Uhr" },
                { day: "Sonntag", time: "Geschlossen" },
              ].map((row) => (
                <div key={row.day} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e3048" }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>{row.day}</span>
                  <span style={{ color: row.day === "Sonntag" ? "#2d4a6b" : "#94a3b8", fontSize: 13, fontWeight: 600 }}>{row.time}</span>
                </div>
              ))}
              <p style={{ color: "#60a5fa", fontSize: 12, marginTop: 12, fontWeight: 600 }}>
                Termine außerhalb der Öffnungszeiten auf Anfrage.
              </p>
            </div>

            {/* Map placeholder */}
            <div style={{ background: "#162032", border: "1px solid #1e3048", borderRadius: 16, overflow: "hidden" }}>
              <div
                style={{
                  height: 220,
                  background: "linear-gradient(135deg, #0a1a2a 0%, #0f2035 40%, #162540 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Grid overlay for map feel */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div style={{ position: "relative", textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, background: "rgba(96,165,250,0.15)", border: "2px solid #60a5fa", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", margin: "0 auto 16px" }} />
                  <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>Kettwiger Str. 21</p>
                  <p style={{ color: "#64748b", fontSize: 13 }}>45127 Essen · Stadtmitte</p>
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <p style={{ color: "#64748b", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                  S-Bahn Essen Hbf · 8 Min. zu Fuß · Parkhaus Limbecker Platz in der Nähe
                </p>
              </div>
            </div>

            {/* IHK Badge */}
            <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 16, padding: "1.25rem", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 10 }}>
                {["IHK", "IVD", "§17a MaBV"].map((badge) => (
                  <div key={badge} style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 8, padding: "6px 14px" }}>
                    <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: 13 }}>{badge}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: "#2d4a6b", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                Zertifizierter Makler · Mitglied IVD · Haftpflicht versichert
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#94a3b8",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  letterSpacing: "0.02em",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0f1929",
  border: "1px solid #1e3048",
  borderRadius: 8,
  padding: "10px 14px",
  color: "#e2e8f0",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  background: "#0f1929",
  border: "1px solid #1e3048",
  borderRadius: 8,
  padding: "10px 14px",
  color: "#94a3b8",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  appearance: "none",
  cursor: "pointer",
}
