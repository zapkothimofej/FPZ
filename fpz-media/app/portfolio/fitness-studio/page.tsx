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

function CourseIconBox({ icon, color }: { icon: string; color: string }) {
  const bgClass =
    color === "#22c55e" ? "bg-green-500/10 border-green-500/25" :
    color === "#8b5cf6" ? "bg-violet-500/10 border-violet-500/25" :
    color === "#f97316" ? "bg-orange-500/10 border-orange-500/25" :
    color === "#3b82f6" ? "bg-blue-500/10 border-blue-500/25" :
    color === "#ec4899" ? "bg-pink-500/10 border-pink-500/25" :
    color === "#ef4444" ? "bg-red-500/10 border-red-500/25" :
    "bg-green-500/10 border-green-500/25"

  return (
    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-[22px] ${bgClass}`}>
      {icon}
    </div>
  )
}

function LevelBadge({ level, color }: { level: string; color: string }) {
  const classes =
    color === "#22c55e" ? "bg-green-500/10 text-green-500 border-green-500/25" :
    color === "#8b5cf6" ? "bg-violet-500/10 text-violet-500 border-violet-500/25" :
    color === "#f97316" ? "bg-orange-500/10 text-orange-500 border-orange-500/25" :
    color === "#3b82f6" ? "bg-blue-500/10 text-blue-500 border-blue-500/25" :
    color === "#ec4899" ? "bg-pink-500/10 text-pink-500 border-pink-500/25" :
    color === "#ef4444" ? "bg-red-500/10 text-red-500 border-red-500/25" :
    "bg-green-500/10 text-green-500 border-green-500/25"

  return (
    <span className={`text-[11px] font-bold px-[9px] py-[3px] rounded-full border tracking-wide ${classes}`}>
      {level}
    </span>
  )
}

function CourseLink({ color }: { color: string }) {
  const textClass =
    color === "#22c55e" ? "text-green-500" :
    color === "#8b5cf6" ? "text-violet-500" :
    color === "#f97316" ? "text-orange-500" :
    color === "#3b82f6" ? "text-blue-500" :
    color === "#ec4899" ? "text-pink-500" :
    color === "#ef4444" ? "text-red-500" :
    "text-green-500"

  return (
    <Link
      href="/portfolio/fitness-studio/kurse"
      className={`text-[13px] font-bold no-underline ${textClass}`}
    >
      Kursplan →
    </Link>
  )
}

export default function FitBasePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-[100px] pb-[120px] px-6 bg-[var(--site-bg)]">
        {/* Green glow */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.13)_0%,transparent_70%)] pointer-events-none"
        />

        {/* Barbell SVG watermark */}
        <div
          aria-hidden="true"
          className="absolute right-[4%] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
        >
          <svg width="520" height="200" viewBox="0 0 520 200" fill="none">
            <rect x="0" y="40" width="60" height="120" rx="8" fill="#22c55e"/>
            <rect x="60" y="60" width="24" height="80" rx="4" fill="#22c55e"/>
            <rect x="84" y="90" width="352" height="20" rx="4" fill="#22c55e"/>
            <rect x="436" y="60" width="24" height="80" rx="4" fill="#22c55e"/>
            <rect x="460" y="40" width="60" height="120" rx="8" fill="#22c55e"/>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto relative">
          {/* Pill badge */}
          <div className="inline-block bg-green-500/10 border border-green-500/30 text-[var(--site-accent)] text-xs font-bold tracking-[0.12em] px-3.5 py-1.5 rounded-full mb-7 uppercase">
            #1 Fitnessstudio in Rüttenscheid
          </div>

          <h1 className="text-[var(--site-text)] text-[clamp(40px,7vw,80px)] font-black leading-[1.06] tracking-[-0.03em] max-w-[720px] mb-6">
            Dein Ziel.<br />
            <span className="text-[var(--site-accent)]">Unser Plan.</span>
          </h1>

          <p className="text-[var(--site-muted)] text-lg leading-[1.7] max-w-[560px] mb-11">
            Über 450 Mitglieder trainieren bereits bei FitBase Essen. Personal Training,
            Gruppenklassen und modernste Geräte – alles unter einem Dach.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/portfolio/fitness-studio/mitgliedschaft"
              className="bg-[var(--site-accent)] text-[var(--site-bg)] font-extrabold text-[15px] px-7 py-3.5 rounded-[10px] no-underline tracking-tight"
            >
              Probetraining buchen
            </Link>
            <Link
              href="/portfolio/fitness-studio/mitgliedschaft"
              className="bg-transparent text-[var(--site-accent)] font-bold text-[15px] px-7 py-3.5 rounded-[10px] no-underline border-[1.5px] border-[var(--site-accent)] tracking-tight"
            >
              Mitgliedschaft entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[var(--site-surface)] border-t border-b border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-6 px-4 ${i < 3 ? "border-r border-[var(--site-border)]" : ""} ${i === 1 ? "max-md:border-r-0" : ""}`}
            >
              <p className="text-[var(--site-accent)] font-black text-[clamp(28px,4vw,44px)] tracking-[-0.03em] mb-1.5">
                {s.value}
              </p>
              <p className="text-[var(--site-muted)] text-[13px] font-medium tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section className="py-24 px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              Unser Angebot
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(28px,4vw,44px)] font-black tracking-tight mb-3">
              Kurse für jedes Level
            </h2>
            <p className="text-[var(--site-muted)] text-base">
              Von entspanntem Yoga bis knallhartem HIIT – bei uns ist für jeden etwas dabei.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-5">
            {COURSES.map((c) => (
              <div
                key={c.name}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[14px] p-7 flex flex-col gap-4 transition-colors duration-200"
              >
                <CourseIconBox icon={c.icon} color={c.color} />

                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="text-[var(--site-text)] font-extrabold text-lg m-0">
                      {c.name}
                    </h3>
                    <LevelBadge level={c.level} color={c.color} />
                  </div>
                  <p className="text-[var(--site-muted)] text-[13px] leading-relaxed m-0">
                    {c.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-neutral-600 text-[13px] font-medium">
                    ⏱ {c.duration}
                  </span>
                  <CourseLink color={c.color} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainer" className="py-24 px-6 bg-[#070707] border-t border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              Das Team
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(28px,4vw,44px)] font-black tracking-tight">
              Unsere Trainer
            </h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {TRAINERS.map((t) => (
              <div
                key={t.name}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-8 flex flex-col gap-5"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center text-[var(--site-accent)] font-black text-lg shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[var(--site-text)] font-extrabold text-[17px] mb-0.5">{t.name}</p>
                    <p className="text-[var(--site-accent)] text-xs font-semibold">{t.cert}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[var(--site-muted)] text-[13px] font-semibold mb-3 tracking-wide">
                    {t.specialty}
                  </p>
                  <blockquote className="m-0 p-3.5 pl-4 bg-green-500/[0.06] border-l-[3px] border-l-[var(--site-accent)] rounded-r-lg text-neutral-400 text-sm italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Social placeholders */}
                <div className="flex gap-2.5">
                  {["IG", "in"].map((s) => (
                    <span
                      key={s}
                      className="bg-[#1e1e1e] border border-[var(--site-border)] rounded-md px-3 py-[5px] text-xs font-bold text-neutral-600 cursor-default"
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

      {/* PRICING TEASER */}
      <section className="py-24 px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              Mitgliedschaft
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(28px,4vw,44px)] font-black tracking-tight mb-3">
              Fair. Transparent. Monatlich kündbar.
            </h2>
            <p className="text-[var(--site-muted)] text-base">
              Keine versteckten Kosten. Kein Jahresvertrag-Zwang.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`bg-[var(--site-surface)] rounded-2xl p-8 flex flex-col gap-6 relative ${
                  p.highlight
                    ? "border-2 border-[var(--site-accent)]"
                    : "border border-[var(--site-border)]"
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--site-accent)] text-[var(--site-bg)] text-[11px] font-extrabold px-3.5 py-1 rounded-full whitespace-nowrap tracking-wide">
                    {p.badge}
                  </div>
                )}

                <div>
                  <p className="text-[var(--site-muted)] text-[13px] font-semibold mb-2 tracking-[0.08em] uppercase">
                    {p.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[var(--site-text)] text-5xl font-black tracking-[-0.04em]">
                      {p.price}€
                    </span>
                    <span className="text-[var(--site-muted)] text-sm">/Mo.</span>
                  </div>
                </div>

                <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-neutral-400 text-sm">
                      <span className="text-[var(--site-accent)] font-bold shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/portfolio/fitness-studio/mitgliedschaft"
                  className={`block text-center py-3 rounded-lg font-bold text-sm no-underline mt-auto ${
                    p.highlight
                      ? "bg-[var(--site-accent)] text-[var(--site-bg)]"
                      : "bg-transparent text-[var(--site-accent)] border-[1.5px] border-[var(--site-accent)]"
                  }`}
                >
                  {p.highlight ? "Jetzt Mitglied werden" : "Tarif wählen"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-6 mb-24 bg-[linear-gradient(135deg,rgba(34,197,94,0.15)_0%,rgba(34,197,94,0.05)_100%)] border border-green-500/25 rounded-[20px] py-16 px-12 text-center max-w-[1152px] ml-auto mr-auto relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(34,197,94,0.08)_0%,transparent_70%)] pointer-events-none"
        />
        <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-4">
          Angebot
        </p>
        <h2 className="text-[var(--site-text)] text-[clamp(26px,4vw,42px)] font-black tracking-tight mb-4">
          Dein erstes Training ist kostenlos.
        </h2>
        <p className="text-[var(--site-muted)] text-base mb-9 max-w-[480px] mx-auto">
          Komm einfach vorbei. Kein Vertrag, keine Kreditkarte. Überzeuge dich selbst.
        </p>
        <Link
          href="/portfolio/fitness-studio/mitgliedschaft"
          className="inline-block bg-[var(--site-accent)] text-[var(--site-bg)] font-extrabold text-base px-9 py-4 rounded-[10px] no-underline tracking-tight"
        >
          Jetzt Termin buchen
        </Link>
      </section>
    </>
  )
}
