export const metadata = {
  title: "Kontakt — Mila Mode",
  description: "Kontaktiere Mila Mode in Bochum. Besuche uns im Store an der Kortumstraße oder schreib uns eine Nachricht.",
}

const hours = [
  { day: "Montag – Freitag", time: "10:00 – 19:00 Uhr" },
  { day: "Samstag", time: "10:00 – 18:00 Uhr" },
  { day: "Sonntag", time: "geschlossen" },
]

export default function KontaktPage() {
  return (
    <>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#f5f5f4",
          borderBottom: "1px solid #e7e5e4",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#737373",
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          Wir freuen uns von dir zu hören
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
          }}
        >
          Kontakt & Store
        </h1>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }}>

          {/* Left – Contact Form */}
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#1a1a1a",
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}
            >
              Schreib uns eine Nachricht
            </h2>
            <p style={{ fontSize: 13, color: "#737373", marginBottom: 32, lineHeight: 1.6 }}>
              Wir antworten in der Regel innerhalb von 24 Stunden – Montag bis Samstag.
            </p>

            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "#737373",
                    marginBottom: 6,
                  }}
                >
                  NAME *
                </label>
                <input
                  type="text"
                  placeholder="Dein Name"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 13,
                    border: "1px solid #e7e5e4",
                    backgroundColor: "white",
                    color: "#1a1a1a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "#737373",
                    marginBottom: 6,
                  }}
                >
                  E-MAIL *
                </label>
                <input
                  type="email"
                  placeholder="deine@email.de"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 13,
                    border: "1px solid #e7e5e4",
                    backgroundColor: "white",
                    color: "#1a1a1a",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "#737373",
                    marginBottom: 6,
                  }}
                >
                  BETREFF *
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 13,
                    border: "1px solid #e7e5e4",
                    backgroundColor: "white",
                    color: "#1a1a1a",
                    outline: "none",
                    appearance: "none",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Bitte wählen…</option>
                  <option value="bestellung">Bestellung</option>
                  <option value="rueckgabe">Rückgabe</option>
                  <option value="produkt">Frage zum Produkt</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "#737373",
                    marginBottom: 6,
                  }}
                >
                  NACHRICHT *
                </label>
                <textarea
                  rows={6}
                  placeholder="Wie können wir dir helfen?"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 13,
                    border: "1px solid #e7e5e4",
                    backgroundColor: "white",
                    color: "#1a1a1a",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  border: "none",
                  padding: "14px 28px",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                NACHRICHT SENDEN →
              </button>
            </form>
          </div>

          {/* Right – Store Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Address Card */}
            <div
              style={{
                border: "1px solid #e7e5e4",
                backgroundColor: "white",
                padding: "28px",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "#737373",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                Store
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>
                    Mila Mode
                  </p>
                  <p style={{ fontSize: 13, color: "#737373", lineHeight: 1.7 }}>
                    Kortumstraße 48<br />
                    44787 Bochum<br />
                    Deutschland
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div>
                  <p style={{ fontSize: 13, color: "#737373" }}>
                    0234 456 789
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div>
                  <p style={{ fontSize: 13, color: "#737373" }}>
                    hallo@mila-mode.de
                  </p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e7e5e4", marginTop: 20, paddingTop: 20 }}>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: "#737373",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Öffnungszeiten
                </p>
                {hours.map(({ day, time }) => (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "#1a1a1a" }}>{day}</span>
                    <span style={{ color: "#737373" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              style={{
                height: 200,
                background: "linear-gradient(135deg, #e8e4e0 0%, #d4cfc9 50%, #c8c2bb 100%)",
                position: "relative",
                overflow: "hidden",
                border: "1px solid #e7e5e4",
              }}
            >
              {/* Grid lines to simulate map */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Road lines */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 14,
                  backgroundColor: "rgba(255,255,255,0.55)",
                  transform: "translateY(-50%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "40%",
                  top: 0,
                  bottom: 0,
                  width: 14,
                  backgroundColor: "rgba(255,255,255,0.55)",
                }}
              />
              {/* Pin */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "40%",
                  transform: "translate(-50%, -100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#d6a89a",
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(-45deg)",
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  backgroundColor: "white",
                  padding: "6px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  letterSpacing: "0.04em",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                Kortumstr. 48 · Bochum
              </div>
            </div>

            {/* Size Guide Teaser */}
            <div
              style={{
                backgroundColor: "#fdf0ec",
                border: "1px solid #f0d9d3",
                padding: "24px",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d6a89a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M2 9l10-7 10 7v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>
                  Größentabelle
                </p>
                <p style={{ fontSize: 12, color: "#737373", lineHeight: 1.5 }}>
                  Unsicher bei der Größe? Unser detaillierter Größenratgeber hilft dir, die perfekte Passform zu finden.
                </p>
              </div>
            </div>

            {/* Return Policy */}
            <div
              style={{
                backgroundColor: "#f5f5f4",
                border: "1px solid #e7e5e4",
                padding: "24px",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
              </svg>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>
                  30 Tage kostenlose Rückgabe
                </p>
                <p style={{ fontSize: 12, color: "#737373", lineHeight: 1.5 }}>
                  Nicht zufrieden? Kein Problem. Rücksendung kostenlos – kein Grund angeben notwendig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
