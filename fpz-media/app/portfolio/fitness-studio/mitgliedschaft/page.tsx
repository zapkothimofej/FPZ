import Link from "next/link"

type Feature = { text: string; included: boolean }

type Tier = {
  name: string
  price: number
  billing: string
  badge?: string
  highlight: boolean
  features: Feature[]
  cta: string
}

const TIERS: Tier[] = [
  {
    name: "Basic",
    price: 29,
    billing: "monatlich kündbar",
    highlight: false,
    cta: "Basic wählen",
    features: [
      { text: "Gerätetraining (alle Maschinen)", included: true },
      { text: "Umkleiden & Duschen", included: true },
      { text: "WLAN", included: true },
      { text: "Mo – Fr · 9:00 – 18:00 Uhr", included: true },
      { text: "Alle Gruppentrainings", included: false },
      { text: "Sauna & Dampfbad", included: false },
      { text: "Personal Training", included: false },
    ],
  },
  {
    name: "Premium",
    price: 49,
    billing: "monatlich kündbar",
    badge: "Beliebteste Wahl",
    highlight: true,
    cta: "Premium wählen",
    features: [
      { text: "Alles aus Basic", included: true },
      { text: "Alle Gruppentrainings (24 Kurse/Woche)", included: true },
      { text: "7 Tage · 6:00 – 23:00 Uhr", included: true },
      { text: "Sauna & Dampfbad", included: true },
      { text: "Getränke-Flatrate", included: true },
      { text: "Personal Training", included: false },
      { text: "Ernährungsberatung", included: false },
    ],
  },
  {
    name: "All-In",
    price: 69,
    billing: "monatlich kündbar",
    highlight: false,
    cta: "All-In wählen",
    features: [
      { text: "Alles aus Premium", included: true },
      { text: "1× Personal Training / Monat", included: true },
      { text: "Ernährungsberatung (Erstgespräch)", included: true },
      { text: "Handtuchservice", included: true },
      { text: "Gäste einladen (2× / Monat)", included: true },
      { text: "Prioritäts-Kursbuchung", included: true },
      { text: "Nutzungsanalyse & Trainingsplan", included: true },
    ],
  },
]

const FAQ = [
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Nein. Alle Tarife sind monatlich kündbar mit einer Frist von einem Monat zum Monatsende. Kein Jahresvertrag, keine versteckten Bindungen.",
  },
  {
    q: "Was ist beim Probetraining inbegriffen?",
    a: "Dein erstes Training ist komplett kostenlos. Du erhältst eine einstündige Einführung in die Geräte, einen ersten Trainingsplan und kannst alle Räumlichkeiten unverbindlich kennenlernen. Kein Vertrag erforderlich.",
  },
  {
    q: "Gibt es Rabatte für Studenten oder Gruppen?",
    a: "Ja. Studenten erhalten 20% Rabatt gegen Vorlage des Studentenausweises. Paare, die gemeinsam beitreten, zahlen 15% weniger. Bei Jahreszahlung gibt es 2 Monate gratis.",
  },
  {
    q: "Kann ich meine Mitgliedschaft einfrieren?",
    a: "Ja. Du kannst deine Mitgliedschaft einmal pro Kalenderjahr bis zu 2 Monate beitragsfrei pausieren – zum Beispiel bei Urlaub, Krankheit oder beruflichen Reisen.",
  },
  {
    q: "Was, wenn ich nicht zufrieden bin?",
    a: "Du hast ein 14-tägiges Widerrufsrecht nach Vertragsabschluss. Innerhalb dieser Frist kannst du die Mitgliedschaft ohne Angabe von Gründen und ohne Kosten stornieren.",
  },
]

export default function MitgliedschaftPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section
        style={{
          padding: "72px 24px 56px",
          background: "#0a0a0a",
          borderBottom: "1px solid #262626",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Tarife & Konditionen
          </p>
          <h1
            style={{
              color: "#f5f5f5",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Mitgliedschaft
          </h1>
          <p style={{ color: "#737373", fontSize: 17, maxWidth: 520, lineHeight: 1.7 }}>
            Fair. Transparent. Monatlich kündbar. Wähle den Tarif, der zu deinem Lebensstil passt.
          </p>
        </div>
      </section>

      {/* ── PRICING TIERS ── */}
      <section style={{ padding: "80px 24px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {TIERS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: t.highlight ? "rgba(34,197,94,0.04)" : "#141414",
                  border: t.highlight ? "2px solid #22c55e" : "1px solid #262626",
                  borderRadius: 18,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                  position: "relative",
                }}
              >
                {t.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#22c55e",
                      color: "#0a0a0a",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "5px 16px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.badge}
                  </div>
                )}

                {/* Tier name + price */}
                <div>
                  <p
                    style={{
                      color: t.highlight ? "#22c55e" : "#737373",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    {t.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                    <span
                      style={{
                        color: "#f5f5f5",
                        fontSize: 56,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {t.price}€
                    </span>
                    <span style={{ color: "#737373", fontSize: 14 }}>/Monat</span>
                  </div>
                  <p style={{ color: "#525252", fontSize: 12 }}>{t.billing}</p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "#262626" }} />

                {/* Features */}
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {t.features.map((f) => (
                    <li
                      key={f.text}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        color: f.included ? "#d4d4d4" : "#3a3a3a",
                        fontSize: 14,
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{
                          color: f.included ? "#22c55e" : "#3a3a3a",
                          fontWeight: 800,
                          fontSize: 14,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        {f.included ? "✓" : "✗"}
                      </span>
                      <span style={{ textDecoration: f.included ? "none" : "line-through" }}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#anmeldung"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: t.highlight ? "#22c55e" : "transparent",
                    color: t.highlight ? "#0a0a0a" : "#22c55e",
                    border: t.highlight ? "none" : "1.5px solid #22c55e",
                    padding: "14px",
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: 15,
                    textDecoration: "none",
                    marginTop: "auto",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              "Monatlich kündbar",
              "Keine Einrichtungsgebühr",
              "14 Tage Widerrufsrecht",
              "Kostenloses Probetraining",
            ].map((badge) => (
              <div
                key={badge}
                style={{ display: "flex", alignItems: "center", gap: 8, color: "#737373", fontSize: 13 }}
              >
                <span style={{ color: "#22c55e", fontSize: 16 }}>✓</span>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "96px 24px", background: "#070707", borderTop: "1px solid #262626" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              FAQ
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, letterSpacing: "-0.025em" }}>
              Häufige Fragen
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQ.map((item, i) => (
              <div
                key={item.q}
                style={{
                  borderTop: "1px solid #262626",
                  borderBottom: i === FAQ.length - 1 ? "1px solid #262626" : "none",
                  padding: "28px 0",
                }}
              >
                <h3
                  style={{
                    color: "#f5f5f5",
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <span style={{ color: "#22c55e", fontWeight: 900, flexShrink: 0 }}>Q</span>
                  {item.q}
                </h3>
                <p
                  style={{
                    color: "#737373",
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: 0,
                    paddingLeft: 28,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGN UP FORM ── */}
      <section id="anmeldung" style={{ padding: "96px 24px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Jetzt starten
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 12 }}>
              Mitglied werden
            </h2>
            <p style={{ color: "#737373", fontSize: 15, lineHeight: 1.6 }}>
              Füll das Formular aus – wir melden uns innerhalb von 24 Stunden bei dir. Kein Stress, kein Druck.
            </p>
          </div>

          <form
            style={{
              background: "#141414",
              border: "1px solid #262626",
              borderRadius: 18,
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
                  Vorname
                </label>
                <input
                  type="text"
                  placeholder="Max"
                  style={{
                    width: "100%",
                    background: "#1a1a1a",
                    border: "1px solid #262626",
                    borderRadius: 8,
                    padding: "11px 14px",
                    color: "#f5f5f5",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
                  Nachname
                </label>
                <input
                  type="text"
                  placeholder="Mustermann"
                  style={{
                    width: "100%",
                    background: "#1a1a1a",
                    border: "1px solid #262626",
                    borderRadius: 8,
                    padding: "11px 14px",
                    color: "#f5f5f5",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
                E-Mail-Adresse
              </label>
              <input
                type="email"
                placeholder="max@mustermann.de"
                style={{
                  width: "100%",
                  background: "#1a1a1a",
                  border: "1px solid #262626",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "#f5f5f5",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
                Gewünschter Tarif
              </label>
              <select
                style={{
                  width: "100%",
                  background: "#1a1a1a",
                  border: "1px solid #262626",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "#f5f5f5",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Tarif wählen…</option>
                <option value="basic">Basic – 29€ / Monat</option>
                <option value="premium">Premium – 49€ / Monat</option>
                <option value="all-in">All-In – 69€ / Monat</option>
                <option value="probe">Erstmal Probetraining</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.06em" }}>
                Gewünschtes Startdatum
              </label>
              <input
                type="date"
                style={{
                  width: "100%",
                  background: "#1a1a1a",
                  border: "1px solid #262626",
                  borderRadius: 8,
                  padding: "11px 14px",
                  color: "#f5f5f5",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  colorScheme: "dark",
                }}
              />
            </div>

            <div
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 8,
                padding: "14px 16px",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }}>ℹ</span>
              <p style={{ color: "#737373", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                Nach dem Absenden kontaktieren wir dich innerhalb von einem Werktag. Dein erstes Training
                ist kostenlos – auch vor Vertragsabschluss.
              </p>
            </div>

            <button
              type="submit"
              style={{
                background: "#22c55e",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: 16,
                padding: "15px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              Jetzt anmelden
            </button>

            <p style={{ color: "#525252", fontSize: 12, textAlign: "center", margin: 0 }}>
              Durch das Absenden stimmst du unserer{" "}
              <Link href="/portfolio/fitness-studio" style={{ color: "#737373", textDecoration: "underline" }}>
                Datenschutzerklärung
              </Link>{" "}
              zu. Du kannst jederzeit widerrufen.
            </p>
          </form>

          {/* Alternative contact */}
          <div
            style={{
              marginTop: 28,
              textAlign: "center",
              color: "#737373",
              fontSize: 14,
            }}
          >
            Lieber persönlich?{" "}
            <a
              href="tel:0201987654"
              style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}
            >
              0201 / 987 654
            </a>{" "}
            oder{" "}
            <a
              href="mailto:hallo@fitbase-essen.de"
              style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}
            >
              hallo@fitbase-essen.de
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
