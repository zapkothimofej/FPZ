import Link from "next/link"
import { ScrollReveal, StaggerReveal } from "../_components/portfolio-animations"

const iconBed = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4v16" /><path d="M22 4v16" /><path d="M2 8h20" /><rect x="6" y="8" width="4" height="4" rx="1" />
    <rect x="14" y="8" width="4" height="4" rx="1" />
  </svg>
)

const iconSqm = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
)

const iconYear = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const properties = [
  { title: "Einfamilienhaus Essen-Rüttenscheid", rooms: 4, sqm: 140, year: 1998, price: "485.000 €", type: "Haus", mode: "Verkauf", district: "Rüttenscheid" },
  { title: "Eigentumswohnung Bochum-Innenstadt", rooms: 3, sqm: 88, year: 2008, price: "259.000 €", type: "Wohnung", mode: "Verkauf", district: "Bochum" },
  { title: "Doppelhaushälfte Mülheim a.d. Ruhr", rooms: 5, sqm: 160, year: 2002, price: "389.000 €", type: "Haus", mode: "Verkauf", district: "Mülheim" },
]

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Immobilien verkaufen",
    desc: "Professionelle Vermarktung, Bewertung, Exposé und persönliche Besichtigung – wir begleiten Sie vom ersten Gespräch bis zur Schlüsselübergabe.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Immobilien vermieten",
    desc: "Mietersuche, Bonitätsprüfung, Mietvertragsgestaltung und Übergabe – sicher, rechtssicher und effizient für Eigentümer im Ruhrgebiet.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Immobilienbewertung",
    desc: "Kostenlose Wertermittlung auf Basis aktueller Marktdaten und 15 Jahren Regionalkenntnisse – fundiert, unverbindlich und persönlich.",
  },
]

const testimonials = [
  { quote: "Herr Krause hat unser Haus in nur 9 Tagen verkauft – zu einem Preis über unseren Erwartungen.", author: "Familie Bauer", location: "Essen" },
  { quote: "Professionelle Beratung, schnelle Kommunikation und ein super Ergebnis. Klare Empfehlung!", author: "M. Scholz", location: "Bochum" },
  { quote: "Von der Bewertung bis zur Übergabe alles perfekt organisiert.", author: "Ehepaar Müller", location: "Mülheim" },
]

const stats = [
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "380+", label: "Verkaufte Objekte" },
  { value: "Ø 12", label: "Tage Verkaufszeit" },
  { value: "98%", label: "Kundenzufriedenheit" },
]

const gradients = [
  "from-[#1a3a6b] via-[#0f2040] to-[#162032]",
  "from-[#0f2a4a] via-[#1a2d4a] to-[#1e3a55]",
  "from-[#0f2535] via-[#163040] to-[#1a3a45]",
]

export default function KrauseHome() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(96,165,250,0.12)_0%,transparent_65%)] pointer-events-none" />
        <div className="mx-auto max-w-[1200px] relative">
          <div className="max-w-[680px]">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-[var(--site-accent)]/10 border border-[var(--site-accent)]/25 rounded-full px-3.5 py-1 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--site-accent)] inline-block" />
                <span className="text-[var(--site-accent)] text-xs font-semibold tracking-wide">Ihr Makler im Ruhrgebiet seit 2009</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-[var(--site-text)] text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.15] mb-5 tracking-tight">
                Ihre Immobilie.<br />
                <span className="text-[var(--site-accent)]">Unser Auftrag.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[var(--site-muted)] text-lg leading-relaxed mb-9 max-w-[540px]">
                Seit 2009 vermitteln wir Immobilien im Ruhrgebiet mit Leidenschaft, Expertise und persönlicher Betreuung. Vertrauen Sie auf einen Makler, der Ihre Region kennt.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex gap-4 flex-wrap mb-10">
                <Link
                  href="/portfolio/immobilien-portal/immobilien"
                  className="bg-[var(--site-accent)] text-[var(--site-bg)] no-underline font-bold text-[15px] px-7 py-3.5 rounded-[10px] hover:brightness-110 transition-all"
                >
                  Immobilien ansehen
                </Link>
                <Link
                  href="/portfolio/immobilien-portal/kontakt"
                  className="border border-[var(--site-border)] text-[var(--site-text)] no-underline font-semibold text-[15px] px-7 py-3.5 rounded-[10px] bg-[var(--site-border)]/30 hover:bg-[var(--site-border)]/50 transition-colors"
                >
                  Kostenlose Bewertung
                </Link>
              </div>
            </ScrollReveal>

            {/* Search Bar Mock */}
            <ScrollReveal delay={0.4}>
              <div className="flex bg-[var(--site-surface)] border border-[var(--site-border)] rounded-xl overflow-hidden max-w-[560px]">
                <div className="flex-1 px-4 py-3 border-r border-[var(--site-border)]">
                  <div className="text-[#2d4a6b] text-[10px] font-semibold tracking-wider mb-0.5">STANDORT</div>
                  <div className="text-[var(--site-muted)] text-sm">Ort, PLZ oder Stadtteil</div>
                </div>
                <div className="px-4 py-3 border-r border-[var(--site-border)] min-w-[120px]">
                  <div className="text-[#2d4a6b] text-[10px] font-semibold tracking-wider mb-0.5">TYP</div>
                  <div className="text-[var(--site-muted)] text-sm">Alle Typen</div>
                </div>
                <Link
                  href="/portfolio/immobilien-portal/immobilien"
                  className="bg-[var(--site-accent)] text-[var(--site-bg)] no-underline font-bold text-sm px-[22px] flex items-center hover:brightness-110 transition-all"
                >
                  Suchen
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-[var(--site-border)] bg-[var(--site-surface)]">
        <StaggerReveal className="mx-auto max-w-[1200px] px-8 grid grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 text-center ${i < 3 ? "border-r border-[var(--site-border)]" : ""}`}
            >
              <div className="text-[var(--site-accent)] text-[32px] font-extrabold tracking-tight">{stat.value}</div>
              <div className="text-[var(--site-muted)] text-[13px] mt-1">{stat.label}</div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-8">
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-9">
              <div>
                <p className="text-[var(--site-accent)] text-xs font-semibold tracking-widest uppercase mb-2">Aktuelle Angebote</p>
                <h2 className="text-[var(--site-text)] text-[28px] font-bold">Ausgewählte Objekte</h2>
              </div>
              <Link href="/portfolio/immobilien-portal/immobilien" className="text-[var(--site-accent)] no-underline text-sm font-semibold">
                Alle Objekte ansehen &rarr;
              </Link>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-3 gap-6">
            {properties.map((p, i) => (
              <div
                key={i}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[14px] overflow-hidden hover:border-[var(--site-accent)]/40 transition-colors"
              >
                {/* Image placeholder */}
                <div className={`h-[200px] bg-gradient-to-br ${gradients[i]} relative flex items-center justify-center`}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="bg-[var(--site-bg)]/85 text-[var(--site-accent)] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[var(--site-accent)]/30">
                      {p.type}
                    </span>
                    <span className="bg-[var(--site-bg)]/85 text-[var(--site-muted)] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[var(--site-border)]">
                      {p.mode}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[var(--site-bg)]/85 text-[var(--site-muted)] text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--site-border)]">
                    {p.district}
                  </div>
                </div>

                <div className="px-5 py-[18px]">
                  <h3 className="text-[var(--site-text)] text-[15px] font-bold mb-3.5 leading-snug">{p.title}</h3>
                  <div className="flex gap-4 mb-4">
                    <span className="text-[var(--site-muted)] text-[13px] flex items-center gap-1.5">
                      {iconBed} {p.rooms} Zimmer
                    </span>
                    <span className="text-[var(--site-muted)] text-[13px] flex items-center gap-1.5">
                      {iconSqm} {p.sqm} m²
                    </span>
                    <span className="text-[var(--site-muted)] text-[13px] flex items-center gap-1.5">
                      {iconYear} BJ {p.year}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#d4a843] text-xl font-extrabold">{p.price}</span>
                    <Link
                      href="/portfolio/immobilien-portal/immobilien"
                      className="text-[var(--site-accent)] no-underline text-[13px] font-semibold"
                    >
                      Details & Exposé &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-8 bg-[#0a1220] border-t border-[var(--site-border)]">
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[var(--site-accent)] text-xs font-semibold tracking-widest uppercase mb-2">Unsere Leistungen</p>
            <h2 className="text-[var(--site-text)] text-[28px] font-bold">Was wir für Sie tun</h2>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[14px] p-8">
                <div className="w-12 h-12 bg-[var(--site-accent)]/10 rounded-xl flex items-center justify-center mb-[18px]">
                  {s.icon}
                </div>
                <h3 className="text-[var(--site-text)] text-[17px] font-bold mb-3">{s.title}</h3>
                <p className="text-[var(--site-muted)] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Agent Profile */}
      <section className="py-20 px-8 border-t border-[var(--site-border)]">
        <div className="mx-auto max-w-[1200px] grid grid-cols-[1fr_auto] gap-16 items-center">
          <ScrollReveal className="max-w-[600px]">
            <p className="text-[var(--site-accent)] text-xs font-semibold tracking-widest uppercase mb-3">Ihr Ansprechpartner</p>
            <h2 className="text-[var(--site-text)] text-[28px] font-bold mb-5">Ihr persönlicher Ansprechpartner</h2>
            <p className="text-[#94a3b8] text-[15px] leading-[1.8] mb-4">
              Thomas Krause gründete Krause Immobilien 2009 mit einer klaren Vision: Immobilienvermittlung, die auf echtem Vertrauen und tiefer Regionalkenntniss basiert. Als gebürtiger Essener kennt er das Ruhrgebiet in- und auswendig – von Rüttenscheid bis Kettwig, von Bochum bis Oberhausen.
            </p>
            <p className="text-[#94a3b8] text-[15px] leading-[1.8] mb-6">
              Das Familienunternehmen steht für persönliche Betreuung, Transparenz und Verlässlichkeit. Als zertifizierter Immobilienmakler der IHK und langjähriges Mitglied im Immobilienverband Deutschland begleitet Herr Krause seine Kunden mit Fachkompetenz und echtem Engagement.
            </p>
            <div className="flex gap-6">
              <div className="bg-[var(--site-accent)]/8 border border-[var(--site-accent)]/20 rounded-[10px] px-5 py-3 text-center">
                <div className="text-[var(--site-accent)] font-bold text-lg">IHK</div>
                <div className="text-[var(--site-muted)] text-[11px]">Zertifiziert</div>
              </div>
              <div className="bg-[var(--site-accent)]/8 border border-[var(--site-accent)]/20 rounded-[10px] px-5 py-3 text-center">
                <div className="text-[var(--site-accent)] font-bold text-lg">IVD</div>
                <div className="text-[var(--site-muted)] text-[11px]">Mitglied</div>
              </div>
              <div className="bg-[var(--site-accent)]/8 border border-[var(--site-accent)]/20 rounded-[10px] px-5 py-3 text-center">
                <div className="text-[var(--site-accent)] font-bold text-lg">2009</div>
                <div className="text-[var(--site-muted)] text-[11px]">Gegründet</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="text-center">
            <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#2d5a9e] border-[3px] border-[var(--site-border)] flex items-center justify-center mx-auto mb-4">
              <span className="text-[var(--site-accent)] text-[40px] font-extrabold">TK</span>
            </div>
            <p className="text-[var(--site-text)] font-bold text-base mb-1">Thomas Krause</p>
            <p className="text-[var(--site-muted)] text-[13px] mb-0.5">Geschäftsführer & Inhaber</p>
            <p className="text-[var(--site-muted)] text-xs">Zertifizierter Immobilienmakler (IHK)</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-[#0a1220] border-t border-[var(--site-border)]">
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[var(--site-accent)] text-xs font-semibold tracking-widest uppercase mb-2">Kundenstimmen</p>
            <h2 className="text-[var(--site-text)] text-[28px] font-bold">Was unsere Kunden sagen</h2>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[14px] p-8">
                <div className="text-[var(--site-accent)] text-[40px] leading-none mb-4 opacity-60">&ldquo;</div>
                <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-5 italic">{t.quote}</p>
                <div className="border-t border-[var(--site-border)] pt-4">
                  <p className="text-[var(--site-text)] font-bold text-sm mb-0.5">{t.author}</p>
                  <p className="text-[var(--site-muted)] text-[13px]">{t.location}</p>
                </div>
                <div className="flex gap-0.5 mt-2.5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#d4a843" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 border-t border-[var(--site-border)]">
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-[var(--site-surface)] to-[#1a2a45] border border-[var(--site-border)] rounded-[20px] p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(ellipse_at_80%_50%,rgba(212,168,67,0.08)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4a843] rounded-l-[20px]" />
              <div className="pl-6 relative">
                <p className="text-[#d4a843] text-xs font-semibold tracking-widest uppercase mb-3">Kostenlos & unverbindlich</p>
                <h2 className="text-[var(--site-text)] text-[28px] font-extrabold mb-3">Wie viel ist Ihre Immobilie wert?</h2>
                <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-7 max-w-[540px]">
                  Innerhalb von 24 Stunden erhalten Sie eine fundierte Einschätzung – basierend auf aktuellen Marktdaten und 15 Jahren Erfahrung im Ruhrgebiet.
                </p>
                <Link
                  href="/portfolio/immobilien-portal/kontakt"
                  className="bg-[#d4a843] text-[var(--site-bg)] no-underline font-bold text-[15px] px-8 py-3.5 rounded-[10px] inline-block hover:brightness-110 transition-all"
                >
                  Kostenlose Erstbewertung &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
