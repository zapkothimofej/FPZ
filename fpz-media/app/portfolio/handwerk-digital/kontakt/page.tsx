export const metadata = {
  title: "Kontakt — Müller Haustechnik GmbH",
  description: "Nehmen Sie Kontakt auf — kostenloser Besichtigungstermin, schnelle Reaktionszeiten, 24/7 Notfallhotline.",
}

const oeffnungszeiten = [
  { tag: "Montag–Freitag", zeit: "07:00–18:00 Uhr" },
  { tag: "Samstag", zeit: "08:00–13:00 Uhr" },
  { tag: "Sonntag", zeit: "Notdienst" },
]

export default function KontaktPage() {
  return (
    <>
      {/* Page Hero */}
      <section style={{ padding: "5rem 2rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f97316", display: "inline-block" }} />
            <span style={{ color: "#f97316", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Jetzt melden</span>
          </div>
          <h1 style={{ color: "#f1f5f9", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>Kontakt aufnehmen</h1>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Erster Beratungsbesuch kostenlos und unverbindlich. Wir melden uns in der Regel innerhalb eines Werktages bei Ihnen.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "1rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: "3rem", alignItems: "flex-start" }}>

          {/* Form */}
          <div style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 14, padding: "2.5rem" }}>
            <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Anfrage senden</h2>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 28 }}>Alle mit * gekennzeichneten Felder sind Pflichtfelder.</p>
            <form action="#" method="post" style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>Vorname *</label>
                  <input
                    type="text"
                    name="vorname"
                    required
                    placeholder="Max"
                    style={{ backgroundColor: "#0f1117", border: "1px solid #2d3348", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, outline: "none" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>Nachname *</label>
                  <input
                    type="text"
                    name="nachname"
                    required
                    placeholder="Mustermann"
                    style={{ backgroundColor: "#0f1117", border: "1px solid #2d3348", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>Telefon</label>
                  <input
                    type="tel"
                    name="telefon"
                    placeholder="0201 123 456"
                    style={{ backgroundColor: "#0f1117", border: "1px solid #2d3348", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, outline: "none" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>E-Mail *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="max@beispiel.de"
                    style={{ backgroundColor: "#0f1117", border: "1px solid #2d3348", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>Betreff *</label>
                <select
                  name="betreff"
                  required
                  style={{ backgroundColor: "#0f1117", border: "1px solid #2d3348", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", appearance: "none" }}
                >
                  <option value="">Bitte wählen …</option>
                  <option value="heizung">Heizung</option>
                  <option value="sanitaer">Sanitär / Bad</option>
                  <option value="elektro">Elektro</option>
                  <option value="notfall">Notfall</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>Nachricht *</label>
                <textarea
                  name="nachricht"
                  required
                  rows={5}
                  placeholder="Beschreiben Sie kurz Ihr Anliegen — z. B. Baujahr der Anlage, Art des Problems oder gewünschte Leistung …"
                  style={{ backgroundColor: "#0f1117", border: "1px solid #2d3348", borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
                <input type="checkbox" name="datenschutz" required style={{ marginTop: 2, accentColor: "#f97316" }} />
                <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                  Ich habe die{" "}
                  <span style={{ color: "#f97316" }}>Datenschutzerklärung</span>{" "}
                  gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *
                </span>
              </label>

              <button
                type="submit"
                style={{ backgroundColor: "#f97316", color: "white", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}
              >
                Anfrage absenden →
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Contact Info */}
            <div style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 14, padding: "1.75rem" }}>
              <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Kontaktdaten</p>
              <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Müller Haustechnik GmbH</p>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                Gahlenscher Str. 14<br />
                46238 Bottrop<br />
                Nordrhein-Westfalen
              </p>
              <a href="tel:02041123456" style={{ display: "block", color: "#f97316", fontWeight: 800, fontSize: 22, textDecoration: "none", marginBottom: 8 }}>
                02041 123 456
              </a>
              <a href="mailto:info@mueller-haustechnik.de" style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>
                info@mueller-haustechnik.de
              </a>
            </div>

            {/* Öffnungszeiten */}
            <div style={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3348", borderRadius: 14, padding: "1.75rem" }}>
              <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Öffnungszeiten</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {oeffnungszeiten.map((row) => (
                    <tr key={row.tag} style={{ borderBottom: "1px solid #2d3348" }}>
                      <td style={{ color: "#94a3b8", fontSize: 14, padding: "10px 0" }}>{row.tag}</td>
                      <td style={{ color: row.zeit === "Notdienst" ? "#f97316" : "#f1f5f9", fontSize: 14, fontWeight: 600, textAlign: "right", padding: "10px 0" }}>{row.zeit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notfall Box */}
            <div style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 14, padding: "1.75rem", textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "rgba(239,68,68,0.15)", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ef4444", display: "inline-block" }} />
                <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>24/7 Notfall</span>
              </div>
              <a href="tel:02041123456" style={{ display: "block", color: "#f1f5f9", fontWeight: 800, fontSize: 26, textDecoration: "none", marginBottom: 6 }}>
                02041 123 456
              </a>
              <p style={{ color: "#94a3b8", fontSize: 13 }}>Rund um die Uhr erreichbar — auch an Sonn- und Feiertagen.</p>
            </div>

            {/* Map Placeholder */}
            <div style={{ borderRadius: 14, overflow: "hidden", height: 250, background: "linear-gradient(135deg, #1a1f2e 0%, #2d3348 50%, #1a1f2e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, border: "1px solid #2d3348", position: "relative" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5">
                <path d="M12 2a7 7 0 0 1 7 7c0 6.5-7 13-7 13S5 15.5 5 9a7 7 0 0 1 7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>Bottrop · Ruhrgebiet</p>
                <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>Gahlenscher Str. 14, 46238 Bottrop</p>
              </div>
              <div style={{ position: "absolute", top: "20%", left: "30%", width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(249,115,22,0.4)" }} />
              <div style={{ position: "absolute", top: "60%", left: "60%", width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(249,115,22,0.25)" }} />
              <div style={{ position: "absolute", top: "35%", right: "20%", width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(249,115,22,0.25)" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
