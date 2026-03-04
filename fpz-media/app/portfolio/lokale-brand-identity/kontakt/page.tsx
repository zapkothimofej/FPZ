const C = {
  bg: "#0d1117",
  text: "#e2e8f0",
  accent: "#3b82f6",
  muted: "#64748b",
  surface: "#161c2a",
  border: "#1e2d45",
}

export const metadata = {
  title: "Kontakt – Breuer & Partner Steuerberatung",
  description: "Erstgespräch vereinbaren – kostenlos und unverbindlich. Wir melden uns innerhalb von 48 Stunden.",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: C.bg,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  padding: "11px 14px",
  fontSize: 14,
  color: C.text,
  outline: "none",
  boxSizing: "border-box",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  color: C.muted,
  fontSize: 13,
  fontWeight: 500,
  marginBottom: 6,
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

export default function KontaktPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          background: C.bg,
          padding: "80px 24px 60px",
          borderBottom: `1px solid ${C.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
            transform: "translateX(-50%)",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 24,
            }}
          >
            <span style={{ color: C.accent, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>
              KONTAKT & BERATUNG
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 52px)",
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Erstgespräch vereinbaren
          </h1>
          <p style={{ color: C.muted, fontSize: 17, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Kostenlos · Unverbindlich · Innerhalb von 48h Rückmeldung
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "80px 24px 100px", background: C.bg }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* ── Left: Form ── */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "40px 36px",
            }}
          >
            <h2 style={{ color: C.text, fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
              Anfrage senden
            </h2>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
              Füllen Sie das Formular aus – wir melden uns persönlich bei Ihnen.
            </p>

            {/* Note: Static demo form — no action wired */}
            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Vollständiger Name *">
                  <input
                    type="text"
                    placeholder="Max Mustermann"
                    style={inputStyle}
                    readOnly
                  />
                </Field>
                <Field label="Unternehmen (optional)">
                  <input
                    type="text"
                    placeholder="Muster GmbH"
                    style={inputStyle}
                    readOnly
                  />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="E-Mail-Adresse *">
                  <input
                    type="email"
                    placeholder="max@beispiel.de"
                    style={inputStyle}
                    readOnly
                  />
                </Field>
                <Field label="Telefonnummer">
                  <input
                    type="tel"
                    placeholder="+49 234 000 000"
                    style={inputStyle}
                    readOnly
                  />
                </Field>
              </div>

              <Field label="Ihr Anliegen *">
                <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  <option value="">Bitte wählen…</option>
                  <option>Steuerberatung Unternehmen</option>
                  <option>Einkommensteuererklärung</option>
                  <option>Lohnbuchhaltung</option>
                  <option>Betriebsprüfungsbegleitung</option>
                  <option>Sonstiges</option>
                </select>
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Wunschtermin">
                  <input
                    type="date"
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    readOnly
                  />
                </Field>
                <Field label="Gesprächsformat">
                  <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                    <option value="">Bitte wählen…</option>
                    <option>Persönlich vor Ort</option>
                    <option>Telefonisch</option>
                    <option>Video-Call</option>
                  </select>
                </Field>
              </div>

              <Field label="Ihre Nachricht">
                <textarea
                  placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Fragen…"
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 120,
                    fontFamily: "inherit",
                  }}
                  readOnly
                />
              </Field>

              {/* Privacy notice */}
              <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{" "}
                <a href="#" style={{ color: C.accent, textDecoration: "none" }}>Datenschutzerklärung</a>{" "}
                zu. Diese Demo sendet keine Daten ab.
              </p>

              <button
                type="button"
                style={{
                  background: C.accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Anfrage absenden
              </button>
            </form>
          </div>

          {/* ── Right: Info Column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Agent Card */}
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1e3a5f, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  KB
                </div>
                <div>
                  <p style={{ color: C.text, fontWeight: 700, fontSize: 16 }}>Dr. Klaus Breuer</p>
                  <p style={{ color: C.accent, fontSize: 13, fontWeight: 500 }}>Geschäftsführer & Steuerberater</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                <p style={{ color: "#86efac", fontSize: 13, fontWeight: 500 }}>
                  Wir melden uns innerhalb von 48 Stunden
                </p>
              </div>
            </div>

            {/* Address & Hours */}
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <p style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Kanzlei</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  {
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    text: "Herner Str. 45, 44789 Bochum",
                  },
                  {
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    ),
                    text: "+49 234 123 456-0",
                  },
                  {
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    text: "info@breuer-partner-stb.de",
                  },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {item.icon}
                    <span style={{ color: C.muted, fontSize: 14 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <p style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Öffnungszeiten</p>
                {[
                  ["Mo – Do", "8:00 – 17:00 Uhr"],
                  ["Fr", "8:00 – 13:00 Uhr"],
                  ["Sa – So", "Geschlossen"],
                ].map(([day, hours]) => (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: C.muted, fontSize: 13 }}>{day}</span>
                    <span style={{ color: C.muted, fontSize: 13 }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                height: 160,
                background: "linear-gradient(135deg, #0d1f35, #0d1117)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                position: "relative",
              }}
            >
              {/* Grid lines for map feel */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <svg width="24" height="24" viewBox="0 0 24 24" fill={C.accent} style={{ position: "relative" }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="#fff" />
              </svg>
              <p style={{ color: C.text, fontSize: 13, fontWeight: 600, position: "relative" }}>
                Herner Str. 45 · 44789 Bochum
              </p>
              <p style={{ color: C.muted, fontSize: 12, position: "relative" }}>
                Nähe Hbf Bochum · Parkplätze vorhanden
              </p>
            </div>

            {/* Why Breuer */}
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: "24px",
              }}
            >
              <p style={{ color: C.text, fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
                Warum Breuer &amp; Partner?
              </p>
              {[
                "Persönlicher Ansprechpartner – keine anonyme Hotline",
                "DATEV-zertifiziert für maximale Datensicherheit",
                "Über 25 Jahre Erfahrung im Ruhrgebiet",
              ].map((point) => (
                <div
                  key={point}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={C.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ marginTop: 1, flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
