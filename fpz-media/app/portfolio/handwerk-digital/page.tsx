import Link from "next/link"

const services = [
  {
    title: "Heizungstechnik",
    desc: "Von der Gasheizung bis zur Wärmepumpe — planen, installieren und warten.",
    href: "/portfolio/handwerk-digital/leistungen",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Sanitärinstallation",
    desc: "Badsanierung, Küchen- und Wasseranschlüsse — termingerecht und sauber.",
    href: "/portfolio/handwerk-digital/leistungen",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2a5 5 0 0 1 5 5c0 5-5 11-5 11S7 12 7 7a5 5 0 0 1 5-5z" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Elektroarbeiten",
    desc: "Neuinstallationen, Modernisierungen und DGUV-Prüfungen — Ihre Elektrik in sicheren Händen.",
    href: "/portfolio/handwerk-digital/leistungen",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

const referenzen = [
  {
    title: "Badsanierung Essen",
    year: "2024",
    desc: "Komplette Kernsanierung eines 9m² Bades inkl. bodenebener Dusche und Fußbodenheizung. 12 Werktage.",
  },
  {
    title: "Heizungsanlage Bottrop",
    year: "2023",
    desc: "Austausch Ölheizung gegen Luft-Wasser-Wärmepumpe (18 kW) mit Pufferspeicher.",
  },
  {
    title: "Elektroinstallation Gladbeck",
    year: "2024",
    desc: "Vollständige Neuinstallation in EFH — inkl. Unterverteilung, KNX-Vorbereitung, Wallbox.",
  },
]

const stats = [
  { value: "35+", label: "Jahre Erfahrung", sub: "Gegründet 1987 in Bottrop" },
  { value: "2.400+", label: "Abgeschlossene Projekte", sub: "Im gesamten Ruhrgebiet" },
  { value: "4.9 ★", label: "Google Bewertung", sub: "Aus 312 Rezensionen" },
]

const miniStats = [
  { v: "12", l: "Fachkräfte" },
  { v: "3", l: "Gewerke" },
  { v: "48h", l: "Reaktionszeit" },
]

export default function HandwerkHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        {/* Orange glow blob top-right */}
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-[1200px] grid grid-cols-[1fr_auto] items-center gap-12">
          <div className="max-w-[640px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--site-accent)]/10 border border-[var(--site-accent)]/25 rounded-full px-3.5 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--site-accent)] inline-block" />
              <span className="text-[var(--site-accent)] text-xs font-semibold tracking-widest uppercase">
                Ruhrgebiet seit 1987
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[clamp(2.4rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight mb-6">
              Heizung.
              <br />
              <span className="text-[var(--site-accent)]">Sanitär.</span>
              <br />
              Elektro.
            </h1>

            <p className="text-[var(--site-muted)] text-lg leading-relaxed mb-9 max-w-[480px]">
              Ihr verlässlicher Handwerksbetrieb im Ruhrgebiet. Seit 37 Jahren
              stehen wir für Qualität, Pünktlichkeit und faire Preise — von
              Bottrop bis Essen.
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <Link
                href="/portfolio/handwerk-digital/kontakt"
                className="bg-[var(--site-accent)] text-white no-underline font-bold text-[15px] px-7 py-3.5 rounded-[10px] inline-block hover:brightness-110 transition"
              >
                Anfrage stellen
              </Link>
              <Link
                href="/portfolio/handwerk-digital/leistungen"
                className="bg-[var(--site-surface)] text-[var(--site-text)] no-underline font-semibold text-[15px] px-7 py-3.5 rounded-[10px] border border-[var(--site-border)] inline-block hover:border-[var(--site-muted)] transition-colors"
              >
                Unsere Leistungen &rarr;
              </Link>
            </div>
          </div>

          {/* Large wrench SVG watermark */}
          <div className="flex items-center justify-center opacity-5">
            <svg
              width="220"
              height="220"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-[var(--site-accent)]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Trust-Bar */}
      <section className="border-y border-[var(--site-border)] bg-[color-mix(in_srgb,var(--site-bg),black_15%)]">
        <div className="mx-auto max-w-[1200px] px-8 py-10 grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-6 px-4">
              <p className="text-[var(--site-accent)] text-[2.5rem] font-extrabold tracking-tighter leading-none">
                {stat.value}
              </p>
              <p className="text-[var(--site-text)] font-semibold text-[15px] mt-2">
                {stat.label}
              </p>
              <p className="text-[var(--site-muted)] text-[13px] mt-1">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[var(--site-accent)] text-xs font-semibold tracking-[0.1em] uppercase mb-3">
            Was wir tun
          </p>
          <h2 className="text-[var(--site-text)] text-[2rem] font-bold tracking-tight mb-12">
            Unsere Leistungen
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-xl p-8 flex flex-col gap-4"
              >
                <div className="w-[52px] h-[52px] bg-[var(--site-accent)]/10 rounded-[10px] flex items-center justify-center text-[var(--site-accent)]">
                  {s.icon}
                </div>
                <h3 className="text-[var(--site-text)] font-bold text-lg">
                  {s.title}
                </h3>
                <p className="text-[var(--site-muted)] text-sm leading-relaxed grow">
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="text-[var(--site-accent)] text-sm font-semibold no-underline hover:brightness-110 transition"
                >
                  Mehr erfahren &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section className="py-20 px-8 bg-[color-mix(in_srgb,var(--site-bg),black_15%)]">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[var(--site-accent)] text-xs font-semibold tracking-[0.1em] uppercase mb-3">
              Über uns
            </p>
            <h2 className="text-[var(--site-text)] text-[2rem] font-bold tracking-tight mb-5">
              Handwerk mit Geschichte
            </h2>
            <p className="text-[var(--site-muted)] text-[15px] leading-[1.8] mb-4">
              1987 gründete Heinrich Müller seinen Ein-Mann-Betrieb in Bottrop.
              Heute führt sein Sohn Thomas das Unternehmen mit einem Team aus 12
              qualifizierten Fachkräften — Heizungsbauer, Sanitärinstallateure
              und Elektriker unter einem Dach.
            </p>
            <p className="text-[var(--site-muted)] text-[15px] leading-[1.8] mb-7">
              Was uns auszeichnet: kurze Reaktionszeiten, transparente
              Kostenvoranschläge und eine Garantie auf alle ausgeführten
              Arbeiten. Wir arbeiten ausschließlich mit zertifizierten
              Materialien führender Hersteller wie Viessmann, Grohe und Siemens.
            </p>
            <div className="flex gap-8">
              {miniStats.map((item) => (
                <div key={item.l}>
                  <p className="text-[var(--site-accent)] font-extrabold text-2xl">
                    {item.v}
                  </p>
                  <p className="text-[var(--site-muted)] text-[13px]">
                    {item.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--site-accent)] via-[#ea580c] via-30% to-[var(--site-bg)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.2"
                className="opacity-60"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-white/50 text-[13px]">
                Team Müller Haustechnik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notdienst-CTA */}
      <section className="py-12 px-8 bg-[var(--site-accent)]">
        <div className="mx-auto max-w-[1200px] flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-white/85 text-[13px] font-semibold uppercase tracking-wide mb-1.5">
              24/7 Notfallservice
            </p>
            <h2 className="text-white text-[1.75rem] font-extrabold tracking-tight">
              Notfall? Wir sind rund um die Uhr erreichbar.
            </h2>
          </div>
          <a
            href="tel:02041123456"
            className="bg-white text-[var(--site-accent)] no-underline font-extrabold text-[22px] px-8 py-3.5 rounded-[10px] whitespace-nowrap hover:scale-105 transition-transform"
          >
            02041 123 456
          </a>
        </div>
      </section>

      {/* Referenzprojekte */}
      <section className="py-20 px-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[var(--site-accent)] text-xs font-semibold tracking-[0.1em] uppercase mb-3">
            Referenzen
          </p>
          <h2 className="text-[var(--site-text)] text-[2rem] font-bold tracking-tight mb-12">
            Ausgewählte Projekte
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {referenzen.map((ref) => (
              <div
                key={ref.title}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-xl overflow-hidden"
              >
                {/* Gradient placeholder with year badge */}
                <div className="h-[140px] bg-gradient-to-br from-[var(--site-surface)] to-[var(--site-border)] flex items-center justify-center relative">
                  <div className="absolute top-3.5 right-3.5 bg-[var(--site-accent)] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {ref.year}
                  </div>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-[var(--site-accent)]/35"
                    aria-hidden="true"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-[var(--site-text)] font-bold text-base mb-2">
                    {ref.title}
                  </h3>
                  <p className="text-[var(--site-muted)] text-[13px] leading-relaxed">
                    {ref.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
