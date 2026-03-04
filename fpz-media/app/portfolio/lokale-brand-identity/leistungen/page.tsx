import Link from "next/link"

const BASE = "/portfolio/lokale-brand-identity"

type Service = {
  title: string
  description: string
  features: string[]
  iconPath: React.ReactNode
}

type ServiceSection = {
  heading: string
  sectionIconPath: React.ReactNode
  services: Service[]
}

export const metadata = {
  title: "Leistungen – Breuer & Partner Steuerberatung",
  description:
    "Steuerberatung für Unternehmen und Privatpersonen, Lohnbuchhaltung und Betriebsprüfungsbegleitung in Bochum.",
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-8 flex flex-col gap-5">
      <div className="w-12 h-12 bg-[var(--site-accent)]/10 rounded-xl flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-[var(--site-accent)]"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {service.iconPath}
        </svg>
      </div>
      <div>
        <h3 className="text-[var(--site-text)] font-bold text-[19px] mb-2.5">
          {service.title}
        </h3>
        <p className="text-[var(--site-muted)] text-sm leading-[1.75]">
          {service.description}
        </p>
      </div>
      <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-[var(--site-muted)] text-sm">{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`${BASE}/kontakt`}
        className="inline-block text-[var(--site-accent)] border border-[var(--site-accent)]/30 rounded-lg px-5 py-2.5 text-[13px] font-semibold no-underline mt-auto self-start hover:bg-[var(--site-accent)]/10 transition-colors"
      >
        Anfragen →
      </Link>
    </div>
  )
}

const sections: ServiceSection[] = [
  {
    heading: "Für Unternehmen",
    sectionIconPath: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 1 4 0" />
      </>
    ),
    services: [
      {
        iconPath: (
          <>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </>
        ),
        title: "Körperschaftsteuer & Gewerbesteuer",
        description:
          "Vollständige Betreuung der Körperschaftsteuererklärung und Gewerbesteuererklärung für Kapital- und Personengesellschaften aller Größen.",
        features: [
          "Körperschaftsteuererklärung (KSt 1)",
          "Gewerbesteuererklärung (GewSt 1)",
          "Steuerliche Gewinnermittlung",
          "Abweichende Wirtschaftsjahre",
          "Organschaftsbeziehungen",
        ],
      },
      {
        iconPath: (
          <>
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </>
        ),
        title: "Umsatzsteuervoranmeldungen",
        description:
          "Fristgerechte monatliche oder vierteljährliche Umsatzsteuervoranmeldungen – zuverlässig und elektronisch übermittelt.",
        features: [
          "Monatliche oder vierteljährliche Abgabe",
          "Elektronische Übermittlung via ELSTER",
          "Zusammenfassende Meldungen (ZM)",
          "Prüfung auf Dauerfristverlängerung",
          "Umsatzsteuer-Jahreserklärung",
        ],
      },
      {
        iconPath: (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </>
        ),
        title: "Jahresabschluss (HGB / IFRS)",
        description:
          "Erstellung von Jahresabschlüssen nach Handelsgesetzbuch oder IFRS – von der Bilanz bis zum Anhang und Lagebericht.",
        features: [
          "Bilanz & Gewinn- und Verlustrechnung",
          "Anhang und Lagebericht",
          "HGB-konforme Bewertungen",
          "Koordination mit Wirtschaftsprüfer",
          "Einreichung beim Bundesanzeiger",
        ],
      },
      {
        iconPath: (
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        ),
        title: "Betriebsprüfungsbegleitung",
        description:
          "Professionelle Begleitung durch Betriebsprüfungen – von der Vorbereitung bis zur abschließenden Einigung mit dem Finanzamt.",
        features: [
          "Vorbereitung der Unterlagen",
          "Begleitung der Schlussbesprechung",
          "Einspruchsverfahren und Klage",
          "Kommunikation mit dem Finanzamt",
          "Nachverhandlung von Prüfungsfeststellungen",
        ],
      },
      {
        iconPath: (
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        ),
        title: "Unternehmensberatung & Planung",
        description:
          "Strategische Steuerplanung, Rechtsformoptimierung und betriebswirtschaftliche Beratung für nachhaltiges Wachstum.",
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
    sectionIconPath: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    services: [
      {
        iconPath: (
          <>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        ),
        title: "Einkommensteuererklärung",
        description:
          "Maximale Steuererstattung für Arbeitnehmer, Rentner, Beamte und Selbständige – individuell und sorgfältig.",
        features: [
          "Alle Einkunftsarten (ESt 1 A/V/E)",
          "Werbungskosten und Sonderausgaben",
          "Anlage N, R, S, G, V und mehr",
          "Kinderbetreuungskosten, Pflegekosten",
          "Elektronische Übermittlung und Prüfung",
        ],
      },
      {
        iconPath: (
          <>
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </>
        ),
        title: "Anlage KAP – Kapitalvermögen",
        description:
          "Korrekte Erfassung aller Kapitalerträge – von Dividenden bis Kryptowährungen – und Geltendmachung der Günstigerprüfung.",
        features: [
          "Dividenden und Zinserträge",
          "Veräußerungsgewinne aus Aktien",
          "Kryptowährungen und DeFi",
          "Günstigerprüfung Abgeltungsteuer",
          "Ausländische Depots und Konten",
        ],
      },
      {
        iconPath: (
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        ),
        title: "Erbschaft- & Schenkungsteuer",
        description:
          "Planung und Optimierung von Schenkungen und Erbschaften – damit Ihr Vermögen bei Ihren Lieben ankommt.",
        features: [
          "Erbschaftsteuerklärung",
          "Schenkungsteuererklärung",
          "Nutzung von Freibeträgen",
          "Gestaltungsberatung für Übertragungen",
          "Bewertung von Immobilien und Betrieben",
        ],
      },
      {
        iconPath: (
          <>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </>
        ),
        title: "Steueroptimierung",
        description:
          "Individuelle Steuergestaltung: legal und nachhaltig – für mehr Netto vom Brutto.",
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
    sectionIconPath: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="12" y2="18" />
      </>
    ),
    services: [
      {
        iconPath: (
          <>
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
          </>
        ),
        title: "Monatliche Lohnabrechnungen",
        description:
          "Pünktliche und rechtssichere Lohn- und Gehaltsabrechnungen für Ihr gesamtes Team – analog oder digital via DATEV.",
        features: [
          "Lohnabrechnung für alle Beschäftigungsarten",
          "Minijobs, Midijobs, Vollzeit",
          "Kurzarbeitergeld (KUG)",
          "Digitale Abrechnungen via DATEV",
          "Buchungsbelege für die Finanzbuchhaltung",
        ],
      },
      {
        iconPath: (
          <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </>
        ),
        title: "Sozialversicherungsmeldungen",
        description:
          "Ordnungsgemäße Meldungen an Krankenkassen und Sozialversicherungsträger – fristgerecht und vollständig.",
        features: [
          "Anmeldungen, Ab- und Ummeldungen",
          "Beitragsnachweise an Krankenkassen",
          "DEÜV-Meldungen",
          "Unfallversicherungsmeldungen (DGUV)",
          "Jahresmeldungen",
        ],
      },
      {
        iconPath: (
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
          </>
        ),
        title: "Jahresbescheinigungen",
        description:
          "Elektronische Lohnsteuerbescheinigungen und alle Jahresabschlussarbeiten im Lohnbereich.",
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

const faqs = [
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
      <section className="bg-[var(--site-bg)] py-20 pb-[60px] px-6 border-b border-[var(--site-border)] relative overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="inline-block bg-[var(--site-accent)]/10 border border-[var(--site-accent)]/20 rounded-full px-3.5 py-1.5 mb-6">
            <span className="text-[var(--site-accent)] text-xs font-semibold tracking-wide">
              UNSERE LEISTUNGEN
            </span>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold text-[var(--site-text)] tracking-tight mb-[18px] max-w-[700px]">
            Steuerberatung auf allen Ebenen
          </h1>
          <p className="text-[var(--site-muted)] text-[17px] max-w-[580px] leading-[1.7]">
            Von der monatlichen Lohnabrechnung bis zur Betriebsprüfung – wir
            begleiten Sie in jeder steuerlichen Situation.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {sections.map((section) => (
        <section
          key={section.heading}
          className="py-20 px-6 bg-[var(--site-bg)]"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-[var(--site-accent)]/10 rounded-[10px] flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-[var(--site-accent)]"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {section.sectionIconPath}
                </svg>
              </div>
              <h2 className="text-[26px] font-extrabold text-[var(--site-text)] tracking-tight">
                {section.heading}
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
              {section.services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="bg-[var(--site-surface)] border-t border-[var(--site-border)] py-[100px] px-6">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[32px] font-extrabold text-[var(--site-text)] tracking-tight mb-3 text-center">
            Häufige Fragen
          </h2>
          <p className="text-[var(--site-muted)] text-[15px] text-center mb-14">
            Alles Wichtige auf einen Blick.
          </p>
          <div className="flex flex-col gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-[var(--site-bg)] border border-[var(--site-border)] rounded-xl p-7"
              >
                <p className="text-[var(--site-text)] font-bold text-base mb-3">
                  {faq.q}
                </p>
                <p className="text-[var(--site-muted)] text-sm leading-[1.75]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--site-bg)] text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[30px] font-extrabold text-[var(--site-text)] mb-3.5 tracking-tight">
            Interesse geweckt?
          </h2>
          <p className="text-[var(--site-muted)] text-[15px] mb-8 leading-[1.7]">
            Vereinbaren Sie jetzt ein kostenloses Erstgespräch – persönlich,
            telefonisch oder per Video.
          </p>
          <Link
            href={`${BASE}/kontakt`}
            className="inline-block bg-[var(--site-accent)] text-white px-8 py-3.5 rounded-[10px] no-underline font-bold text-[15px] hover:brightness-110 transition-all"
          >
            Erstgespräch anfragen
          </Link>
        </div>
      </section>
    </>
  )
}
