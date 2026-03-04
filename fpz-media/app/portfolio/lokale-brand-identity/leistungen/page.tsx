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

type Service = {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
}

export const metadata = {
  title: "Leistungen – Breuer & Partner Steuerberatung",
  description: "Steuerberatung für Unternehmen und Privatpersonen, Lohnbuchhaltung und Betriebsprüfungsbegleitung in Bochum.",
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          background: "rgba(59,130,246,0.1)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {service.icon}
      </div>
      <div>
        <h3 style={{ color: C.text, fontWeight: 700, fontSize: 19, marginBottom: 10 }}>
          {service.title}
        </h3>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{service.description}</p>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {service.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ marginTop: 2, flexShrink: 0 }}>
              <CheckIcon />
            </span>
            <span style={{ color: C.muted, fontSize: 14 }}>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`${BASE}/kontakt`}
        style={{
          display: "inline-block",
          color: C.accent,
          border: `1px solid rgba(59,130,246,0.3)`,
          borderRadius: 8,
          padding: "9px 20px",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          marginTop: "auto",
          alignSelf: "flex-start",
        }}
      >
        Anfragen →
      </Link>
    </div>
  )
}

const sections: { heading: string; icon: React.ReactNode; services: Service[] }[] = [
  {
    heading: "Für Unternehmen",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 1 4 0" />
      </svg>
    ),
    services: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        title: "Körperschaftsteuer & Gewerbesteuer",
        description: "Vollständige Betreuung der Körperschaftsteuererklärung und Gewerbesteuererklärung für Kapital- und Personengesellschaften aller Größen.",
        features: [
          "Körperschaftsteuererklärung (KSt 1)",
          "Gewerbesteuererklärung (GewSt 1)",
          "Steuerliche Gewinnermittlung",
          "Abweichende Wirtschaftsjahre",
          "Organschaftsbeziehungen",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        ),
        title: "Umsatzsteuervoranmeldungen",
        description: "Fristgerechte monatliche oder vierteljährliche Umsatzsteuervoranmeldungen – zuverlässig und elektronisch übermittelt.",
        features: [
          "Monatliche oder vierteljährliche Abgabe",
          "Elektronische Übermittlung via ELSTER",
          "Zusammenfassende Meldungen (ZM)",
          "Prüfung auf Dauerfristverlängerung",
          "Umsatzsteuer-Jahreserklärung",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        ),
        title: "Jahresabschluss (HGB / IFRS)",
        description: "Erstellung von Jahresabschlüssen nach Handelsgesetzbuch oder IFRS – von der Bilanz bis zum Anhang und Lagebericht.",
        features: [
          "Bilanz & Gewinn- und Verlustrechnung",
          "Anhang und Lagebericht",
          "HGB-konforme Bewertungen",
          "Koordination mit Wirtschaftsprüfer",
          "Einreichung beim Bundesanzeiger",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
        title: "Betriebsprüfungsbegleitung",
        description: "Professionelle Begleitung durch Betriebsprüfungen – von der Vorbereitung bis zur abschließenden Einigung mit dem Finanzamt.",
        features: [
          "Vorbereitung der Unterlagen",
          "Begleitung der Schlussbesprechung",
          "Einspruchsverfahren und Klage",
          "Kommunikation mit dem Finanzamt",
          "Nachverhandlung von Prüfungsfeststellungen",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
        title: "Unternehmensberatung & Planung",
        description: "Strategische Steuerplanung, Rechtsformoptimierung und betriebswirtschaftliche Beratung für nachhaltiges Wachstum.",
        features: [
          "Rechtsformoptimierung (GmbH, UG, GbR…)",
          "Unternehmenskauf und -verkauf",
          "Steuerliche Investitionsplanung",
          "Liquiditäts- und Finanzplanung",
          "Unternehmensnachfolge",
        ],
      },
    ],
  },
  {
    heading: "Für Privatpersonen",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    services: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
        title: "Einkommensteuererklärung",
        description: "Maximale Steuererstattung für Arbeitnehmer, Rentner, Beamte und Selbständige – individuell und sorgfältig.",
        features: [
          "Alle Einkunftsarten (ESt 1 A/V/E)",
          "Werbungskosten und Sonderausgaben",
          "Anlage N, R, S, G, V und mehr",
          "Kinderbetreuungskosten, Pflegekosten",
          "Elektronische Übermittlung und Prüfung",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        ),
        title: "Anlage KAP – Kapitalvermögen",
        description: "Korrekte Erfassung aller Kapitalerträge – von Dividenden bis Kryptowährungen – und Geltendmachung der Günstigerprüfung.",
        features: [
          "Dividenden und Zinserträge",
          "Veräußerungsgewinne aus Aktien",
          "Kryptowährungen und DeFi",
          "Günstigerprüfung Abgeltungsteuer",
          "Ausländische Depots und Konten",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        ),
        title: "Erbschaft- & Schenkungsteuer",
        description: "Planung und Optimierung von Schenkungen und Erbschaften – damit Ihr Vermögen bei Ihren Lieben ankommt.",
        features: [
          "Erbschaftsteuerklärung",
          "Schenkungsteuererklärung",
          "Nutzung von Freibeträgen",
          "Gestaltungsberatung für Übertragungen",
          "Bewertung von Immobilien und Betrieben",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ),
        title: "Steueroptimierung",
        description: "Individuelle Steuergestaltung: legal und nachhaltig – für mehr Netto vom Brutto.",
        features: [
          "Analyse der persönlichen Steuersituation",
          "Optimierung von Sonderausgaben",
          "Verlustverrechnungen und -vorträge",
          "Altersvorsorge und Rürup/Riester",
          "Laufende steuerliche Beratung",
        ],
      },
    ],
  },
  {
    heading: "Lohnbuchhaltung",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="12" y2="18" />
      </svg>
    ),
    services: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
          </svg>
        ),
        title: "Monatliche Lohnabrechnungen",
        description: "Pünktliche und rechtssichere Lohn- und Gehaltsabrechnungen für Ihr gesamtes Team – analog oder digital via DATEV.",
        features: [
          "Lohnabrechnung für alle Beschäftigungsarten",
          "Minijobs, Midijobs, Vollzeit",
          "Kurzarbeitergeld (KUG)",
          "Digitale Abrechnungen via DATEV",
          "Buchungsbelege für die Finanzbuchhaltung",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        title: "Sozialversicherungsmeldungen",
        description: "Ordnungsgemäße Meldungen an Krankenkassen und Sozialversicherungsträger – fristgerecht und vollständig.",
        features: [
          "Anmeldungen, Ab- und Ummeldungen",
          "Beitragsnachweise an Krankenkassen",
          "DEÜV-Meldungen",
          "Unfallversicherungsmeldungen (DGUV)",
          "Jahresmeldungen",
        ],
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
          </svg>
        ),
        title: "Jahresbescheinigungen",
        description: "Elektronische Lohnsteuerbescheinigungen und alle Jahresabschlussarbeiten im Lohnbereich.",
        features: [
          "Elektronische Lohnsteuerbescheinigung",
          "Verdienstbescheinigungen",
          "Lohnsteueranmeldung ans Finanzamt",
          "Lohnjournal und Lohnkonto",
          "Betriebliche Altersvorsorge (bAV)",
        ],
      },
    ],
  },
]

const faqs: { q: string; a: string }[] = [
  {
    q: "Wie läuft ein Erstgespräch ab?",
    a: "Das Erstgespräch ist kostenlos und dauert ca. 30 Minuten. Es findet auf Wunsch persönlich in unserer Kanzlei in Bochum, telefonisch oder per Video-Call statt. Wir analysieren Ihre steuerliche Situation und besprechen, welche Leistungen für Sie sinnvoll sind. Im Anschluss erhalten Sie ein konkretes Angebot.",
  },
  {
    q: "Was kostet die Steuerberatung?",
    a: "Die Abrechnung erfolgt nach der Steuerberatervergütungsverordnung (StBVV) oder – für regelmäßige Leistungen – auf Basis einer transparenten Pauschalvereinbarung. Wir besprechen die Vergütung vor Auftragserteilung offen und verbindlich. Für Privatpersonen beginnen Steuererklärungen ab ca. 180 €.",
  },
  {
    q: "Wie lange dauert es bis zur fertigen Steuererklärung?",
    a: "Wir streben eine Bearbeitungszeit von maximal 4 Wochen nach vollständiger Unterlagenübermittlung an. In der Hochsaison (Februar–Mai) kann es zu leichten Verzögerungen kommen – wir kommunizieren das transparent und frühzeitig.",
  },
  {
    q: "Gibt es eine digitale Mandantenakte?",
    a: "Ja. Wir nutzen DATEV Unternehmen Online – damit können Sie Belege einfach per Smartphone einreichen, Dokumente einsehen und mit uns digital kommunizieren. Ein Einarbeitungsgespräch ist inklusive.",
  },
  {
    q: "Betreuen Sie auch GmbHs und andere Kapitalgesellschaften?",
    a: "Ja, wir betreuen alle gängigen Rechtsformen: GmbH, UG (haftungsbeschränkt), AG, GbR, OHG, KG und Einzelunternehmen. Unsere Steuerberater haben langjährige Erfahrung mit Kapitalgesellschaften und komplexen Konzernstrukturen.",
  },
]

export default function LeistungenPage() {
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
            right: "-10%",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
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
              UNSERE LEISTUNGEN
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-0.03em",
              marginBottom: 18,
              maxWidth: 700,
            }}
          >
            Steuerberatung auf allen Ebenen
          </h1>
          <p style={{ color: C.muted, fontSize: 17, maxWidth: 580, lineHeight: 1.7 }}>
            Von der monatlichen Lohnabrechnung bis zur Betriebsprüfung – wir begleiten Sie in jeder steuerlichen Situation.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {sections.map((section) => (
        <section key={section.heading} style={{ padding: "80px 24px", background: C.bg }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(59,130,246,0.1)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {section.icon}
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>
                {section.heading}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {section.services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: C.text,
              letterSpacing: "-0.03em",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Häufige Fragen
          </h2>
          <p style={{ color: C.muted, fontSize: 15, textAlign: "center", marginBottom: 56 }}>
            Alles Wichtige auf einen Blick.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {faqs.map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "28px 28px",
                }}
              >
                <p style={{ color: C.text, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                  {faq.q}
                </p>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: C.bg, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.text, marginBottom: 14, letterSpacing: "-0.02em" }}>
            Interesse geweckt?
          </h2>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
            Vereinbaren Sie jetzt ein kostenloses Erstgespräch – persönlich, telefonisch oder per Video.
          </p>
          <Link
            href={`${BASE}/kontakt`}
            style={{
              display: "inline-block",
              background: C.accent,
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Erstgespräch anfragen
          </Link>
        </div>
      </section>
    </>
  )
}
