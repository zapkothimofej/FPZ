import Link from "next/link"

const BASE = "/portfolio/lokale-brand-identity"

const trustBadges = [
  "DATEV-Partner",
  "Steuerberaterkammer NRW Mitglied",
  "25+ Jahre Erfahrung",
  "Kanzlei des Jahres NRW 2023",
]

const services = [
  {
    title: "Steuerberatung Unternehmen",
    desc: "Von der laufenden Buchhaltung bis zur Jahresabschlusserstellung – wir übernehmen Ihre steuerlichen Pflichten vollständig.",
    iconPath: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-4 0v2" />
        <path d="M8 7V5a2 2 0 0 1 4 0" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </>
    ),
  },
  {
    title: "Einkommensteuererklärung",
    desc: "Ob Arbeitnehmer, Rentner oder Selbständiger – wir maximieren Ihre Steuererstattung.",
    iconPath: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
  {
    title: "Lohnbuchhaltung",
    desc: "Monatliche Lohnabrechnungen, Meldewesen und Sozialversicherung – rechtssicher und pünktlich.",
    iconPath: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="12" y2="18" />
      </>
    ),
  },
  {
    title: "Betriebsprüfungsbegleitung",
    desc: "Wir begleiten Sie durch jede Betriebsprüfung und vertreten Ihre Interessen gegenüber dem Finanzamt.",
    iconPath: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
]

const stats = [
  { value: "25+", label: "Jahre Erfahrung" },
  { value: "680+", label: "Mandanten" },
  { value: "98%", label: "Weiterempfehlungsrate" },
]

const team = [
  {
    initials: "KB",
    name: "Dr. Klaus Breuer",
    role: "Geschäftsführer, Steuerberater",
    detail:
      "28 Jahre Erfahrung in Unternehmenssteuerrecht und Jahresabschluss.",
  },
  {
    initials: "SH",
    name: "Sabine Hoffmann",
    role: "Steuerberaterin",
    detail:
      "Spezialisierung: Unternehmensteuer, Gestaltungsberatung, GmbH-Besteuerung.",
  },
  {
    initials: "MR",
    name: "Marc Richter",
    role: "Steuerfachwirt",
    detail:
      "Lohnbuchhaltung, Sozialversicherungsrecht, Reisekostenabrechnung.",
  },
]

const testimonials = [
  {
    quote:
      "Seit 10 Jahren arbeiten wir mit Breuer & Partner zusammen. Unsere Steuerlast wurde erheblich optimiert – und das Wichtigste: Wir verstehen endlich, was auf unseren Bescheiden steht.",
    name: "Thomas W.",
    company: "Geschäftsführer, Handwerksbetrieb Witten",
  },
  {
    quote:
      "Als Freiberuflerin war ich zunächst überfordert. Das Team hat mir alles in Ruhe erklärt und meine Rückerstattung war deutlich höher als erwartet. Absolut empfehlenswert.",
    name: "Daniela K.",
    company: "Grafikdesignerin, Bochum",
  },
  {
    quote:
      "Die Betriebsprüfung verlief komplikationslos. Dr. Breuer hatte alles im Griff und kommunizierte direkt mit dem Finanzamt. Großes Vertrauen.",
    name: "Andreas P.",
    company: "Inhaber, Gastronomiebetrieb Herne",
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5">
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
  description:
    "Ihre verlässliche Steuerberatung im Ruhrgebiet seit 1998. Für Unternehmen und Privatpersonen.",
}

export default function BreuerHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-[100px] pb-[120px] px-6 bg-[var(--site-bg)]">
        {/* Blue glow */}
        <div className="absolute -top-[10%] -right-[5%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="max-w-[680px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--site-accent)]/10 border border-[var(--site-accent)]/25 rounded-full px-3.5 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--site-accent)]" />
              <span className="text-[var(--site-accent)] text-xs font-semibold tracking-wide">
                DATEV-zertifiziert · Bochum seit 1998
              </span>
            </div>

            <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.1] tracking-tight text-[var(--site-text)] mb-6">
              Steuerberatung
              <br />
              <span className="text-[var(--site-accent)]">die versteht.</span>
            </h1>

            <p className="text-lg text-[var(--site-muted)] leading-[1.75] mb-10 max-w-[560px]">
              Seit über 25 Jahren begleiten wir Unternehmen und Privatpersonen
              im Ruhrgebiet – verlässlich, transparent und persönlich.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href={`${BASE}/kontakt`}
                className="bg-[var(--site-accent)] text-white px-7 py-3.5 rounded-[10px] no-underline font-semibold text-[15px] hover:brightness-110 transition-all"
              >
                Erstgespräch vereinbaren
              </Link>
              <Link
                href={`${BASE}/leistungen`}
                className="bg-transparent text-[var(--site-text)] border border-[var(--site-border)] px-7 py-3.5 rounded-[10px] no-underline font-semibold text-[15px] hover:bg-[var(--site-border)]/30 transition-colors"
              >
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-b border-[var(--site-border)] bg-[var(--site-surface)] py-5 px-6">
        <div className="max-w-[1200px] mx-auto flex gap-4 flex-wrap items-center justify-center">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="border border-[var(--site-border)] rounded-full px-4 py-[7px] text-[13px] text-[var(--site-muted)] whitespace-nowrap bg-[var(--site-bg)]"
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen Cards */}
      <section className="py-[100px] px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="text-4xl font-extrabold text-[var(--site-text)] tracking-tight mb-3.5">
              Was wir für Sie tun
            </h2>
            <p className="text-[var(--site-muted)] text-base max-w-[480px] mx-auto">
              Vollumfängliche steuerliche Begleitung – von der Gründung bis zur
              Betriebsprüfung.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {services.map((card) => (
              <div
                key={card.title}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[14px] p-8 flex flex-col gap-4"
              >
                <div className="w-11 h-11 bg-[var(--site-accent)]/10 rounded-[10px] flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-[var(--site-accent)]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {card.iconPath}
                  </svg>
                </div>
                <h3 className="text-[var(--site-text)] font-bold text-[17px] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[var(--site-muted)] text-sm leading-[1.7] grow">
                  {card.desc}
                </p>
                <Link
                  href={`${BASE}/leistungen`}
                  className="text-[var(--site-accent)] text-[13px] font-semibold no-underline"
                >
                  Mehr erfahren →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--site-surface)] border-t border-b border-[var(--site-border)] py-20 px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-3 gap-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[clamp(48px,6vw,72px)] font-extrabold text-[var(--site-accent)] tracking-tighter leading-none mb-2.5">
                {stat.value}
              </p>
              <p className="text-[var(--site-muted)] text-[15px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-[100px] px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="text-4xl font-extrabold text-[var(--site-text)] tracking-tight mb-3.5">
              Ihr Team
            </h2>
            <p className="text-[var(--site-muted)] text-base max-w-[480px] mx-auto">
              Erfahrene Steuerberater und Fachleute – mit persönlichem Anspruch.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[14px] py-9 px-7 text-center"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6] flex items-center justify-center mx-auto mb-5 text-[22px] font-bold text-white tracking-wide">
                  {member.initials}
                </div>
                <p className="text-[var(--site-text)] font-bold text-[17px] mb-1">
                  {member.name}
                </p>
                <p className="text-[var(--site-accent)] text-[13px] font-medium mb-3.5">
                  {member.role}
                </p>
                <p className="text-[var(--site-muted)] text-sm leading-[1.65]">
                  {member.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--site-surface)] border-t border-[var(--site-border)] py-[100px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="text-4xl font-extrabold text-[var(--site-text)] tracking-tight mb-3.5">
              Was Mandanten sagen
            </h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[var(--site-bg)] border border-[var(--site-border)] rounded-[14px] p-8 flex flex-col gap-5"
              >
                <StarRating />
                <p className="text-[var(--site-text)] text-[15px] leading-[1.75] grow italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-[var(--site-text)] font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-[var(--site-muted)] text-[13px]">
                    {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px] px-6 bg-[var(--site-bg)]">
        <div className="max-w-[760px] mx-auto text-center">
          <div className="bg-gradient-to-br from-[var(--site-accent)]/8 to-[var(--site-accent)]/4 border border-[var(--site-accent)]/20 rounded-[20px] py-[60px] px-10">
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold text-[var(--site-text)] tracking-tight mb-4">
              Erstgespräch vereinbaren
            </h2>
            <p className="text-[var(--site-muted)] text-base leading-[1.7] mb-3">
              Kostenlos und unverbindlich. Wir melden uns innerhalb von 48
              Stunden bei Ihnen.
            </p>
            <p className="text-[var(--site-muted)] text-sm mb-9">
              Persönlich · Telefonisch · Per Video-Call
            </p>
            <Link
              href={`${BASE}/kontakt`}
              className="inline-block bg-[var(--site-accent)] text-white px-9 py-[15px] rounded-[10px] no-underline font-bold text-[15px] hover:brightness-110 transition-all"
            >
              Jetzt anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
