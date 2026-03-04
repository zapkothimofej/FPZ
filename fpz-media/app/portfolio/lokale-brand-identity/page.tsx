import Link from "next/link"

const C = {
  bg: "#0d1117",
  text: "#e2e8f0",
  accent: "#3b82f6",
  muted: "#64748b",
  surface: "#161c2a",
  border: "#1e2d45",
}

const BASE = "/portfolio/lokale-brand-identity"

function StarRating() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export const metadata = {
  title: "Breuer & Partner Steuerberatung – Bochum",
  description: "Ihre verlässliche Steuerberatung im Ruhrgebiet seit 1998. Für Unternehmen und Privatpersonen.",
}

export default function BreuerHome() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "100px 24px 120px",
          background: C.bg,
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ maxWidth: 680 }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(59,130,246,0.1)",
                border: `1px solid rgba(59,130,246,0.25)`,
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 32,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
              <span style={{ color: C.accent, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>
                DATEV-zertifiziert · Bochum seit 1998
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: C.text,
                marginBottom: 24,
              }}
            >
              Steuerberatung<br />
              <span style={{ color: C.accent }}>die versteht.</span>
            </h1>

            <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}>
              Seit über 25 Jahren begleiten wir Unternehmen und Privatpersonen im Ruhrgebiet –
              verlässlich, transparent und persönlich.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link
                href={`${BASE}/kontakt`}
                style={{
                  background: C.accent,
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Erstgespräch vereinbaren
              </Link>
              <Link
                href={`${BASE}/leistungen`}
                style={{
                  background: "transparent",
                  color: C.text,
                  border: `1px solid ${C.border}`,
                  padding: "14px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface, padding: "20px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[
            "DATEV-Partner",
            "Steuerberaterkammer NRW Mitglied",
            "25+ Jahre Erfahrung",
            "Kanzlei des Jahres NRW 2023",
          ].map((badge) => (
            <div
              key={badge}
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 100,
                padding: "7px 16px",
                fontSize: 13,
                color: C.muted,
                whiteSpace: "nowrap",
                background: C.bg,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Leistungen Cards ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: C.text, letterSpacing: "-0.03em", marginBottom: 14 }}>
              Was wir für Sie tun
            </h2>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Vollumfängliche steuerliche Begleitung – von der Gründung bis zur Betriebsprüfung.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-4 0v2" />
                    <path d="M8 7V5a2 2 0 0 1 4 0" />
                    <line x1="12" y1="12" x2="12" y2="16" />
                    <line x1="10" y1="14" x2="14" y2="14" />
                  </svg>
                ),
                title: "Steuerberatung Unternehmen",
                desc: "Von der laufenden Buchhaltung bis zur Jahresabschlusserstellung – wir übernehmen Ihre steuerlichen Pflichten vollständig.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                title: "Einkommensteuererklärung",
                desc: "Ob Arbeitnehmer, Rentner oder Selbständiger – wir maximieren Ihre Steuererstattung.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="16" y2="14" />
                    <line x1="8" y1="18" x2="12" y2="18" />
                  </svg>
                ),
                title: "Lohnbuchhaltung",
                desc: "Monatliche Lohnabrechnungen, Meldewesen und Sozialversicherung – rechtssicher und pünktlich.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
                title: "Betriebsprüfungsbegleitung",
                desc: "Wir begleiten Sie durch jede Betriebsprüfung und vertreten Ihre Interessen gegenüber dem Finanzamt.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(59,130,246,0.1)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </div>
                <h3 style={{ color: C.text, fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>{card.title}</h3>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, flexGrow: 1 }}>{card.desc}</p>
                <Link
                  href={`${BASE}/leistungen`}
                  style={{ color: C.accent, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                >
                  Mehr erfahren →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────────── */}
      <section style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            textAlign: "center",
          }}
        >
          {[
            { value: "25+", label: "Jahre Erfahrung" },
            { value: "680+", label: "Mandanten" },
            { value: "98%", label: "Weiterempfehlungsrate" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontSize: "clamp(48px, 6vw, 72px)",
                  fontWeight: 800,
                  color: C.accent,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: C.muted, fontSize: 15 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Team ─────────────────────────────────────────────────────── */}
      <section id="team" style={{ padding: "100px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: C.text, letterSpacing: "-0.03em", marginBottom: 14 }}>
              Ihr Team
            </h2>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Erfahrene Steuerberater und Fachleute – mit persönlichem Anspruch.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              {
                initials: "KB",
                name: "Dr. Klaus Breuer",
                role: "Geschäftsführer, Steuerberater",
                detail: "28 Jahre Erfahrung in Unternehmenssteuerrecht und Jahresabschluss.",
              },
              {
                initials: "SH",
                name: "Sabine Hoffmann",
                role: "Steuerberaterin",
                detail: "Spezialisierung: Unternehmensteuer, Gestaltungsberatung, GmbH-Besteuerung.",
              },
              {
                initials: "MR",
                name: "Marc Richter",
                role: "Steuerfachwirt",
                detail: "Lohnbuchhaltung, Sozialversicherungsrecht, Reisekostenabrechnung.",
              },
            ].map((member) => (
              <div
                key={member.name}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "36px 28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1e3a5f, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.05em",
                  }}
                >
                  {member.initials}
                </div>
                <p style={{ color: C.text, fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{member.name}</p>
                <p style={{ color: C.accent, fontSize: 13, fontWeight: 500, marginBottom: 14 }}>{member.role}</p>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.65 }}>{member.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────── */}
      <section style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: C.text, letterSpacing: "-0.03em", marginBottom: 14 }}>
              Was Mandanten sagen
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              {
                quote: "Seit 10 Jahren arbeiten wir mit Breuer & Partner zusammen. Unsere Steuerlast wurde erheblich optimiert – und das Wichtigste: Wir verstehen endlich, was auf unseren Bescheiden steht.",
                name: "Thomas W.",
                company: "Geschäftsführer, Handwerksbetrieb Witten",
              },
              {
                quote: "Als Freiberuflerin war ich zunächst überfordert. Das Team hat mir alles in Ruhe erklärt und meine Rückerstattung war deutlich höher als erwartet. Absolut empfehlenswert.",
                name: "Daniela K.",
                company: "Grafikdesignerin, Bochum",
              },
              {
                quote: "Die Betriebsprüfung verlief komplikationslos. Dr. Breuer hatte alles im Griff und kommunizierte direkt mit dem Finanzamt. Großes Vertrauen.",
                name: "Andreas P.",
                company: "Inhaber, Gastronomiebetrieb Herne",
              },
            ].map((t) => (
              <div
                key={t.name}
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 14,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <StarRating />
                <p style={{ color: C.text, fontSize: 15, lineHeight: 1.75, flexGrow: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                  <p style={{ color: C.muted, fontSize: 13 }}>{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: C.bg }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.04))",
              border: `1px solid rgba(59,130,246,0.2)`,
              borderRadius: 20,
              padding: "60px 40px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}
            >
              Erstgespräch vereinbaren
            </h2>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 12 }}>
              Kostenlos und unverbindlich. Wir melden uns innerhalb von 48 Stunden bei Ihnen.
            </p>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 36 }}>
              Persönlich · Telefonisch · Per Video-Call
            </p>
            <Link
              href={`${BASE}/kontakt`}
              style={{
                display: "inline-block",
                background: C.accent,
                color: "#fff",
                padding: "15px 36px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Jetzt anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
