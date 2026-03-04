import Link from "next/link"

const STATS = [
  { value: "450+", label: "Mitglieder" },
  { value: "24", label: "Kurse / Woche" },
  { value: "8", label: "zert. Trainer" },
  { value: "2019", label: "Gegründet" },
]

const COURSES = [
  {
    name: "Krafttraining",
    level: "Alle",
    duration: "60 Min",
    desc: "Hanteltraining, Maschinen, freie Gewichte. Für Anfänger und Fortgeschrittene.",
    color: "#22c55e",
    icon: "💪",
  },
  {
    name: "Yoga & Mindfulness",
    level: "Alle",
    duration: "75 Min",
    desc: "Flow, Yin und Power Yoga. Stärke Körper und Geist.",
    color: "#8b5cf6",
    icon: "🧘",
  },
  {
    name: "HIIT",
    level: "Fortgeschritten",
    duration: "45 Min",
    desc: "Hochintensives Intervalltraining für maximalen Kalorienverbrauch.",
    color: "#f97316",
    icon: "🔥",
  },
  {
    name: "Spinning",
    level: "Alle",
    duration: "50 Min",
    desc: "Indoor-Cycling auf modernen Peloton-Bikes. Musik. Power. Spaß.",
    color: "#3b82f6",
    icon: "🚴",
  },
  {
    name: "Pilates",
    level: "Beginner",
    duration: "60 Min",
    desc: "Tiefe Muskulatur, Haltung und Beweglichkeit. Sanft und effektiv.",
    color: "#ec4899",
    icon: "🌸",
  },
  {
    name: "Boxing Fitness",
    level: "Alle",
    duration: "55 Min",
    desc: "Nicht zum Kämpfen – zum Schwitzen. Boxen für alle.",
    color: "#ef4444",
    icon: "🥊",
  },
]

const TRAINERS = [
  {
    initials: "MS",
    name: "Max Schulz",
    specialty: "Krafttraining & Functional Fitness",
    cert: "NASM zertifiziert",
    quote: "Jeder kann stark werden – man muss nur anfangen.",
  },
  {
    initials: "JW",
    name: "Jana Weber",
    specialty: "Yoga, Pilates & Mindfulness",
    cert: "BYT zertifiziert",
    quote: "Der Kopf kommt zum Training mit.",
  },
  {
    initials: "TK",
    name: "Toni Klein",
    specialty: "HIIT, Boxing & Outdoor",
    cert: "Lizenzierter Boxtrainer",
    quote: "Keine Ausreden. Nur Ergebnisse.",
  },
]

const PRICING = [
  {
    name: "Basic",
    price: 29,
    features: [
      "Gerätetraining (alle Maschinen)",
      "Umkleiden & Duschen",
      "WLAN",
      "Mo – Fr · 9:00 – 18:00 Uhr",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: 49,
    features: [
      "Alles aus Basic",
      "Alle Gruppentrainings (24 Kurse/Woche)",
      "7 Tage · 6:00 – 23:00 Uhr",
      "Sauna & Dampfbad",
      "Getränke-Flatrate",
    ],
    highlight: true,
    badge: "Beliebteste Wahl",
  },
  {
    name: "All-In",
    price: 69,
    features: [
      "Alles aus Premium",
      "1× Personal Training / Monat",
      "Ernährungsberatung (Erstgespräch)",
      "Handtuchservice",
      "Gäste einladen (2× / Monat)",
    ],
    highlight: false,
  },
]

export default function FitBasePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "100px 24px 120px",
          background: "#0a0a0a",
        }}
      >
        {/* Green glow – top right */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.13) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Decorative barbell SVG */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "4%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        >
          <svg width="520" height="200" viewBox="0 0 520 200" fill="none">
            {/* left weight */}
            <rect x="0" y="40" width="60" height="120" rx="8" fill="#22c55e"/>
            <rect x="60" y="60" width="24" height="80" rx="4" fill="#22c55e"/>
            {/* bar */}
            <rect x="84" y="90" width="352" height="20" rx="4" fill="#22c55e"/>
            {/* right weight */}
            <rect x="436" y="60" width="24" height="80" rx="4" fill="#22c55e"/>
            <rect x="460" y="40" width="60" height="120" rx="8" fill="#22c55e"/>
          </svg>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "6px 14px",
              borderRadius: 999,
              marginBottom: 28,
              textTransform: "uppercase",
            }}
          >
            #1 Fitnessstudio in Rüttenscheid
          </div>

          <h1
            style={{
              color: "#f5f5f5",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: 720,
              marginBottom: 24,
            }}
          >
            Dein Ziel.<br />
            <span style={{ color: "#22c55e" }}>Unser Plan.</span>
          </h1>

          <p
            style={{
              color: "#737373",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 44,
            }}
          >
            Über 450 Mitglieder trainieren bereits bei FitBase Essen. Personal Training,
            Gruppenklassen und modernste Geräte – alles unter einem Dach.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/portfolio/fitness-studio/mitgliedschaft"
              style={{
                background: "#22c55e",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: 15,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Probetraining buchen
            </Link>
            <Link
              href="/portfolio/fitness-studio/mitgliedschaft"
              style={{
                background: "transparent",
                color: "#22c55e",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
                border: "1.5px solid #22c55e",
                letterSpacing: "-0.01em",
              }}
            >
              Mitgliedschaft entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#141414", borderTop: "1px solid #262626", borderBottom: "1px solid #262626" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "48px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "24px 16px",
                borderRight: i < 3 ? "1px solid #262626" : "none",
              }}
            >
              <p style={{ color: "#22c55e", fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.03em", marginBottom: 6 }}>
                {s.value}
              </p>
              <p style={{ color: "#737373", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COURSES ── */}
      <section style={{ padding: "96px 24px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Unser Angebot
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 12 }}>
              Kurse für jedes Level
            </h2>
            <p style={{ color: "#737373", fontSize: 16 }}>
              Von entspanntem Yoga bis knallhartem HIIT – bei uns ist für jeden etwas dabei.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 20,
            }}
          >
            {COURSES.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "#141414",
                  border: "1px solid #262626",
                  borderRadius: 14,
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "border-color 0.2s",
                }}
              >
                {/* Icon square */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${c.color}18`,
                    border: `1px solid ${c.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {c.icon}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h3 style={{ color: "#f5f5f5", fontWeight: 800, fontSize: 18, margin: 0 }}>
                      {c.name}
                    </h3>
                    <span
                      style={{
                        background: `${c.color}18`,
                        color: c.color,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 999,
                        border: `1px solid ${c.color}40`,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {c.level}
                    </span>
                  </div>
                  <p style={{ color: "#737373", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {c.desc}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ color: "#404040", fontSize: 13, fontWeight: 500 }}>
                    ⏱ {c.duration}
                  </span>
                  <Link
                    href="/portfolio/fitness-studio/kurse"
                    style={{
                      color: c.color,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Kursplan →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINERS ── */}
      <section id="trainer" style={{ padding: "96px 24px", background: "#070707", borderTop: "1px solid #262626" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Das Team
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.025em" }}>
              Unsere Trainer
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {TRAINERS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#141414",
                  border: "1px solid #262626",
                  borderRadius: 16,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.15)",
                      border: "2px solid rgba(34,197,94,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#22c55e",
                      fontWeight: 900,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ color: "#f5f5f5", fontWeight: 800, fontSize: 17, marginBottom: 2 }}>{t.name}</p>
                    <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 600 }}>{t.cert}</p>
                  </div>
                </div>

                <div>
                  <p style={{ color: "#737373", fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: "0.02em" }}>
                    {t.specialty}
                  </p>
                  <blockquote
                    style={{
                      margin: 0,
                      padding: "14px 16px",
                      background: "rgba(34,197,94,0.06)",
                      borderLeft: "3px solid #22c55e",
                      borderRadius: "0 8px 8px 0",
                      color: "#a3a3a3",
                      fontSize: 14,
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Static social placeholders */}
                <div style={{ display: "flex", gap: 10 }}>
                  {["IG", "in"].map((s) => (
                    <span
                      key={s}
                      style={{
                        background: "#1e1e1e",
                        border: "1px solid #262626",
                        borderRadius: 6,
                        padding: "5px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#404040",
                        cursor: "default",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section style={{ padding: "96px 24px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Mitgliedschaft
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 12 }}>
              Fair. Transparent. Monatlich kündbar.
            </h2>
            <p style={{ color: "#737373", fontSize: 16 }}>
              Keine versteckten Kosten. Kein Jahresvertrag-Zwang.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {PRICING.map((p) => (
              <div
                key={p.name}
                style={{
                  background: "#141414",
                  border: p.highlight ? "2px solid #22c55e" : "1px solid #262626",
                  borderRadius: 16,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  position: "relative",
                }}
              >
                {p.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#22c55e",
                      color: "#0a0a0a",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "4px 14px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.badge}
                  </div>
                )}

                <div>
                  <p style={{ color: "#737373", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {p.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ color: "#f5f5f5", fontSize: 48, fontWeight: 900, letterSpacing: "-0.04em" }}>
                      {p.price}€
                    </span>
                    <span style={{ color: "#737373", fontSize: 14 }}>/Mo.</span>
                  </div>
                </div>

                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#a3a3a3", fontSize: 14 }}>
                      <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/portfolio/fitness-studio/mitgliedschaft"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: p.highlight ? "#22c55e" : "transparent",
                    color: p.highlight ? "#0a0a0a" : "#22c55e",
                    border: p.highlight ? "none" : "1.5px solid #22c55e",
                    padding: "12px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    marginTop: "auto",
                  }}
                >
                  {p.highlight ? "Jetzt Mitglied werden" : "Tarif wählen"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          margin: "0 24px 96px",
          background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: 20,
          padding: "64px 48px",
          textAlign: "center",
          maxWidth: 1200 - 48,
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
          Angebot
        </p>
        <h2
          style={{
            color: "#f5f5f5",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            marginBottom: 16,
          }}
        >
          Dein erstes Training ist kostenlos.
        </h2>
        <p style={{ color: "#737373", fontSize: 16, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
          Komm einfach vorbei. Kein Vertrag, keine Kreditkarte. Überzeuge dich selbst.
        </p>
        <Link
          href="/portfolio/fitness-studio/mitgliedschaft"
          style={{
            display: "inline-block",
            background: "#22c55e",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: 16,
            padding: "16px 36px",
            borderRadius: 10,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Jetzt Termin buchen
        </Link>
      </section>
    </>
  )
}
