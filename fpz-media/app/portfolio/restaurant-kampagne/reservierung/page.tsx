const C = {
  bg: "#0c0a08",
  text: "#faf6f0",
  accent: "#c9a84c",
  muted: "#8a7d6b",
  surface: "#161410",
  border: "#2a2519",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#0c0a08",
  border: `1px solid ${C.border}`,
  color: C.text,
  padding: "0.75rem 1rem",
  fontSize: "0.9rem",
  fontFamily: "system-ui, sans-serif",
  outline: "none",
  borderRadius: 0,
  boxSizing: "border-box",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  color: C.muted,
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontFamily: "system-ui, sans-serif",
  marginBottom: "0.4rem",
}

export default function ReservierungPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          backgroundColor: C.bg,
          padding: "4.5rem 1.5rem 3rem",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              color: C.accent,
              fontStyle: "italic",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              marginBottom: "0.5rem",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Willkommen zurück
          </p>
          <h1
            style={{
              color: C.text,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Tisch{" "}
            <span style={{ color: C.accent, fontStyle: "italic" }}>
              reservieren
            </span>
          </h1>
        </div>
      </section>

      {/* Main 2-col */}
      <section
        style={{
          backgroundColor: C.bg,
          padding: "4rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "flex-start",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* ── Form ───────────────────────────────────────────────── */}
          <div>
            <p
              style={{
                color: C.muted,
                fontSize: "0.875rem",
                lineHeight: 1.8,
                fontFamily: "system-ui, sans-serif",
                marginBottom: "2rem",
              }}
            >
              Füllen Sie das Formular aus — wir bestätigen Ihre Reservierung
              telefonisch oder per E-Mail innerhalb von 2 Stunden.
            </p>

            <form action="#" method="post" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Name */}
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ihr vollständiger Name"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Datum + Uhrzeit */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Datum</label>
                  <input
                    type="date"
                    name="datum"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Uhrzeit</label>
                  <select name="uhrzeit" required style={inputStyle}>
                    <option value="">Wählen…</option>
                    <option value="12:00">12:00 Uhr</option>
                    <option value="13:00">13:00 Uhr</option>
                    <option value="18:00">18:00 Uhr</option>
                    <option value="19:00">19:00 Uhr</option>
                    <option value="20:00">20:00 Uhr</option>
                    <option value="21:00">21:00 Uhr</option>
                  </select>
                </div>
              </div>

              {/* Personen + Telefon */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Anzahl Personen</label>
                  <select name="personen" required style={inputStyle}>
                    <option value="">Wählen…</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Person" : "Personen"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Telefon</label>
                  <input
                    type="tel"
                    name="telefon"
                    placeholder="+49 …"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Besondere Wünsche */}
              <div>
                <label style={labelStyle}>Besondere Wünsche</label>
                <textarea
                  name="wuensche"
                  rows={4}
                  placeholder="Allergien, Geburtstag, Hochzeit, Sitzwünsche, vegetarisch …"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: C.accent,
                  color: C.bg,
                  border: "none",
                  padding: "1rem 2rem",
                  fontSize: "0.85rem",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Tisch reservieren
              </button>

              <p
                style={{
                  color: "#4a4035",
                  fontSize: "0.78rem",
                  fontFamily: "system-ui, sans-serif",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                Ihre Daten werden ausschließlich zur Bearbeitung Ihrer
                Reservierung verwendet und nicht an Dritte weitergegeben.
              </p>
            </form>
          </div>

          {/* ── Info ───────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Öffnungszeiten */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                padding: "1.75rem",
              }}
            >
              <p
                style={{
                  color: C.text,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                  marginBottom: "1rem",
                }}
              >
                Öffnungszeiten
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {[
                  ["Dienstag – Donnerstag", "12:00 – 22:00 Uhr"],
                  ["Freitag – Samstag", "12:00 – 23:00 Uhr"],
                  ["Sonntag", "12:00 – 21:00 Uhr"],
                  ["Montag", "Ruhetag"],
                ].map(([day, hours]) => (
                  <tr key={day}>
                    <td
                      style={{
                        color: C.muted,
                        fontSize: "0.85rem",
                        fontFamily: "system-ui, sans-serif",
                        padding: "0.4rem 0",
                        paddingRight: "1rem",
                      }}
                    >
                      {day}
                    </td>
                    <td
                      style={{
                        color: day === "Montag" ? "#4a4035" : C.text,
                        fontSize: "0.85rem",
                        fontFamily: "system-ui, sans-serif",
                        padding: "0.4rem 0",
                        textAlign: "right",
                        fontStyle: day === "Montag" ? "italic" : "normal",
                      }}
                    >
                      {hours}
                    </td>
                  </tr>
                ))}
              </table>
            </div>

            {/* Map placeholder */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                padding: "1.75rem",
              }}
            >
              <p
                style={{
                  color: C.text,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                  marginBottom: "1rem",
                }}
              >
                Anfahrt
              </p>

              {/* Map visual */}
              <div
                style={{
                  height: 180,
                  background:
                    "linear-gradient(135deg, #1a1408 0%, #2a1f0a 30%, #1e1608 60%, #261c0a 100%)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Grid lines */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${C.border}30 1px, transparent 1px), linear-gradient(90deg, ${C.border}30 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Pin */}
                <div
                  style={{
                    position: "relative",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: C.accent,
                    boxShadow: `0 0 0 4px ${C.accent}30`,
                  }}
                />
                <p
                  style={{
                    position: "relative",
                    color: C.accent,
                    fontSize: "0.8rem",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Kortumstr. 18 · Bochum
                </p>
              </div>

              <div
                style={{
                  color: C.muted,
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                <p>Kortumstraße 18</p>
                <p>44787 Bochum</p>
                <p style={{ marginTop: 8, color: "#4a4035", fontSize: "0.78rem" }}>
                  Parkplätze: Stadtpark-Garage (400 m) · ÖPNV: U35 Husemannplatz
                </p>
              </div>
            </div>

            {/* Telefon */}
            <div
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                padding: "1.75rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: C.muted,
                  fontSize: "0.8rem",
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Oder direkt anrufen
              </p>
              <a
                href="tel:+4923498765"
                style={{
                  color: C.accent,
                  textDecoration: "none",
                  fontSize: "1.75rem",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  display: "block",
                }}
              >
                0234 987 654
              </a>
              <p
                style={{
                  color: "#4a4035",
                  fontSize: "0.75rem",
                  fontFamily: "system-ui, sans-serif",
                  marginTop: "0.5rem",
                }}
              >
                Mo–Sa: 11:00 – 22:00 Uhr
              </p>
            </div>

            {/* Hinweis */}
            <div
              style={{
                border: `1px solid ${C.accent}40`,
                backgroundColor: "#1e180a",
                padding: "1.25rem 1.5rem",
                borderLeft: `3px solid ${C.accent}`,
              }}
            >
              <p
                style={{
                  color: C.accent,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Wichtiger Hinweis
              </p>
              <p
                style={{
                  color: C.muted,
                  fontSize: "0.83rem",
                  lineHeight: 1.7,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Reservierungen ohne Bestätigung durch unser Team werden nach
                15 Minuten automatisch freigegeben. Bei größeren Gruppen (8+
                Personen) bitten wir um vorherige telefonische Rücksprache.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
