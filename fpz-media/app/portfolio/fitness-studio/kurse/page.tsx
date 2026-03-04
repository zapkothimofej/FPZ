import Link from "next/link"

type CourseSlot = {
  time: string
  name: string
  trainer: string
  duration: string
  level: string
  levelColor: string
}

type DaySchedule = {
  day: string
  short: string
  slots: CourseSlot[]
}

const SCHEDULE: DaySchedule[] = [
  {
    day: "Montag",
    short: "Mo",
    slots: [
      { time: "07:00", name: "Yoga & Mindfulness", trainer: "Jana Weber", duration: "75 Min", level: "Alle", levelColor: "#8b5cf6" },
      { time: "12:00", name: "HIIT", trainer: "Toni Klein", duration: "45 Min", level: "Fortgeschritten", levelColor: "#f97316" },
      { time: "18:30", name: "Krafttraining", trainer: "Max Schulz", duration: "60 Min", level: "Alle", levelColor: "#22c55e" },
    ],
  },
  {
    day: "Dienstag",
    short: "Di",
    slots: [
      { time: "08:00", name: "Pilates", trainer: "Jana Weber", duration: "60 Min", level: "Beginner", levelColor: "#ec4899" },
      { time: "17:00", name: "Spinning", trainer: "Max Schulz", duration: "50 Min", level: "Alle", levelColor: "#3b82f6" },
      { time: "19:30", name: "Boxing Fitness", trainer: "Toni Klein", duration: "55 Min", level: "Alle", levelColor: "#ef4444" },
    ],
  },
  {
    day: "Mittwoch",
    short: "Mi",
    slots: [
      { time: "06:30", name: "HIIT", trainer: "Toni Klein", duration: "45 Min", level: "Fortgeschritten", levelColor: "#f97316" },
      { time: "11:00", name: "Yoga & Mindfulness", trainer: "Jana Weber", duration: "75 Min", level: "Alle", levelColor: "#8b5cf6" },
      { time: "18:00", name: "Krafttraining", trainer: "Max Schulz", duration: "60 Min", level: "Alle", levelColor: "#22c55e" },
    ],
  },
  {
    day: "Donnerstag",
    short: "Do",
    slots: [
      { time: "09:00", name: "Pilates", trainer: "Jana Weber", duration: "60 Min", level: "Beginner", levelColor: "#ec4899" },
      { time: "18:00", name: "Boxing Fitness", trainer: "Toni Klein", duration: "55 Min", level: "Alle", levelColor: "#ef4444" },
      { time: "20:00", name: "Spinning", trainer: "Max Schulz", duration: "50 Min", level: "Alle", levelColor: "#3b82f6" },
    ],
  },
  {
    day: "Freitag",
    short: "Fr",
    slots: [
      { time: "07:30", name: "Krafttraining", trainer: "Max Schulz", duration: "60 Min", level: "Alle", levelColor: "#22c55e" },
      { time: "12:30", name: "HIIT", trainer: "Toni Klein", duration: "45 Min", level: "Fortgeschritten", levelColor: "#f97316" },
      { time: "17:30", name: "Yoga & Mindfulness", trainer: "Jana Weber", duration: "75 Min", level: "Alle", levelColor: "#8b5cf6" },
    ],
  },
  {
    day: "Samstag",
    short: "Sa",
    slots: [
      { time: "09:00", name: "Spinning", trainer: "Max Schulz", duration: "50 Min", level: "Alle", levelColor: "#3b82f6" },
      { time: "11:00", name: "Pilates", trainer: "Jana Weber", duration: "60 Min", level: "Beginner", levelColor: "#ec4899" },
    ],
  },
  {
    day: "Sonntag",
    short: "So",
    slots: [
      { time: "10:00", name: "Yoga & Mindfulness", trainer: "Jana Weber", duration: "75 Min", level: "Alle", levelColor: "#8b5cf6" },
      { time: "12:00", name: "Boxing Fitness", trainer: "Toni Klein", duration: "55 Min", level: "Alle", levelColor: "#ef4444" },
    ],
  },
]

type CourseDetail = {
  name: string
  icon: string
  level: string
  levelColor: string
  duration: string
  trainer: string
  desc: string
  requirements: string
  bring: string
}

const COURSE_DETAILS: CourseDetail[] = [
  {
    name: "Krafttraining",
    icon: "💪",
    level: "Alle",
    levelColor: "#22c55e",
    duration: "60 Min",
    trainer: "Max Schulz",
    desc: "Unser Krafttraining-Kurs führt dich systematisch durch alle Grundübungen – Kniebeugen, Kreuzheben, Bankdrücken und mehr. Du lernst saubere Technik, aufbauende Progression und wie du deinen Körper effektiv formst.",
    requirements: "Keine Vorkenntnisse nötig. Sportschuhe mit festem Halt erforderlich.",
    bring: "Trainingsschuhe, Handtuch, Wasserflasche. Optional: eigene Trainingsgurte.",
  },
  {
    name: "Yoga & Mindfulness",
    icon: "🧘",
    level: "Alle",
    levelColor: "#8b5cf6",
    duration: "75 Min",
    trainer: "Jana Weber",
    desc: "Flow, Yin und Power Yoga wechseln sich wöchentlich ab. Jana führt dich durch Atemübungen, achtsame Bewegungsabläufe und Entspannungstechniken. Ideal als Ergänzung zum intensiven Training.",
    requirements: "Keine Vorkenntnisse nötig. Barfuß oder Yogasocken.",
    bring: "Eigene Yogamatte (oder Studiomatte kostenlos ausleihen), bequeme Kleidung.",
  },
  {
    name: "HIIT",
    icon: "🔥",
    level: "Fortgeschritten",
    levelColor: "#f97316",
    duration: "45 Min",
    trainer: "Toni Klein",
    desc: "High-Intensity Interval Training auf höchstem Niveau. 30 Sekunden Vollgas, 15 Sekunden Pause – wiederholt. Burpees, Box Jumps, Battle Ropes und mehr. Du verbrennst bis zu 600 kcal in einer Session.",
    requirements: "Mindestens 3 Monate Trainingserfahrung. Nicht geeignet bei Herz-Kreislauf-Erkrankungen.",
    bring: "Handtuch, viel Wasser (min. 750ml), Trainingsschuhe mit Dämpfung.",
  },
  {
    name: "Spinning",
    icon: "🚴",
    level: "Alle",
    levelColor: "#3b82f6",
    duration: "50 Min",
    trainer: "Max Schulz",
    desc: "Indoor-Cycling auf modernen Peloton-Bikes. Musik. Power. Spaß. Du pedalisierst dich durch verschiedene Terrains – Bergetappen, Sprints und Flatstrecken – im Takt der Musik.",
    requirements: "Keine Vorkenntnisse nötig. Cycling-Schuhe empfohlen (Leihschuhe vorhanden).",
    bring: "Handtuch, Wasserflasche. Eng anliegende Kleidung für den Sattel empfohlen.",
  },
  {
    name: "Pilates",
    icon: "🌸",
    level: "Beginner",
    levelColor: "#ec4899",
    duration: "60 Min",
    trainer: "Jana Weber",
    desc: "Pilates stärkt die tiefe Rumpfmuskulatur, verbessert Haltung und Beweglichkeit. Janas sanfter Unterrichtsstil macht diesen Kurs ideal für Einsteiger, Schreibtischtäter und alle, die etwas für den Rücken tun möchten.",
    requirements: "Keinerlei Vorkenntnisse nötig. Ideal auch nach Verletzungen (ärztliche Freigabe vorausgesetzt).",
    bring: "Bequeme Kleidung, Sportsocken. Matte wird gestellt.",
  },
  {
    name: "Boxing Fitness",
    icon: "🥊",
    level: "Alle",
    levelColor: "#ef4444",
    duration: "55 Min",
    trainer: "Toni Klein",
    desc: "Nicht zum Kämpfen – zum Schwitzen. Du lernst Grundtechniken des Boxens kombiniert mit intensiven Fitness-Elementen. Sandsack, Pratzen, Seilspringen. Kondition, Koordination, Selbstvertrauen.",
    requirements: "Keine Vorkenntnisse nötig. Bandagen werden gestellt.",
    bring: "Eigene Boxhandschuhe wenn vorhanden (Studiohandschuhe kostenlos). Sportschuhe, Handtuch.",
  },
]

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
    <span className={`text-[11px] font-bold py-1 px-2.5 rounded-full border whitespace-nowrap shrink-0 ${classes}`}>
      {level}
    </span>
  )
}

function ScheduleRow({ slot }: { slot: CourseSlot }) {
  return (
    <div className="flex items-center bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[10px] py-4 px-5 gap-5">
      {/* Time */}
      <span className="text-[var(--site-accent)] font-extrabold text-[15px] tabular-nums min-w-[52px] shrink-0">
        {slot.time}
      </span>

      {/* Course info */}
      <div className="flex-1">
        <p className="text-[var(--site-text)] font-bold text-[15px] m-0 mb-0.5">
          {slot.name}
        </p>
        <p className="text-[var(--site-muted)] text-xs m-0">
          {slot.trainer} · {slot.duration}
        </p>
      </div>

      {/* Level badge + book */}
      <div className="flex items-center gap-3 shrink-0">
        <LevelBadge level={slot.level} color={slot.levelColor} />
        <Link
          href="/portfolio/fitness-studio/mitgliedschaft"
          className="text-[var(--site-accent)] text-[13px] font-bold no-underline whitespace-nowrap"
        >
          Buchen →
        </Link>
      </div>
    </div>
  )
}

export default function KursePage() {
  return (
    <>
      {/* HEADER */}
      <section className="pt-[72px] pb-14 px-6 bg-[var(--site-bg)] border-b border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
            Wochenplan
          </p>
          <h1 className="text-[var(--site-text)] text-[clamp(32px,5vw,56px)] font-black tracking-[-0.03em] mb-4">
            Kursplan
          </h1>
          <p className="text-[var(--site-muted)] text-[17px] max-w-[540px]">
            24 Kurse pro Woche, 7 Tage die Woche. Für Premium- und All-In-Mitglieder inklusive.
          </p>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-16 px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          {/* Day tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
            {SCHEDULE.map((d, i) => (
              <div
                key={d.day}
                className={`shrink-0 px-[18px] py-2 rounded-lg text-[13px] font-bold cursor-default ${
                  i === 0
                    ? "bg-[var(--site-accent)] text-[var(--site-bg)]"
                    : "bg-[var(--site-surface)] text-[var(--site-muted)] border border-[var(--site-border)]"
                }`}
              >
                {d.short}
              </div>
            ))}
          </div>

          {/* All days */}
          <div className="flex flex-col gap-12">
            {SCHEDULE.map((d, i) => (
              <div key={d.day}>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className={`font-extrabold text-xl m-0 ${i === 0 ? "text-[var(--site-accent)]" : "text-[var(--site-text)]"}`}>
                    {d.day}
                  </h2>
                  <span className="text-neutral-600 text-[13px]">
                    {d.slots.length} Kurse
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {d.slots.map((slot) => (
                    <ScheduleRow key={`${d.day}-${slot.time}`} slot={slot} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE DETAILS */}
      <section className="py-24 px-6 bg-[#070707] border-t border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              Details
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(26px,4vw,40px)] font-black tracking-tight">
              Alle Kurse im Überblick
            </h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
            {COURSE_DETAILS.map((c) => (
              <div
                key={c.name}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-7 flex flex-col gap-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[22px]">{c.icon}</span>
                      <h3 className="text-[var(--site-text)] font-extrabold text-lg m-0">{c.name}</h3>
                    </div>
                    <p className="text-[var(--site-muted)] text-xs m-0">
                      {c.trainer} · {c.duration}
                    </p>
                  </div>
                  <LevelBadge level={c.level} color={c.levelColor} />
                </div>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-[1.65] m-0">
                  {c.desc}
                </p>

                {/* Requirements + bring */}
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[var(--site-muted)] text-[11px] font-bold tracking-[0.08em] uppercase mb-1">
                      Voraussetzungen
                    </p>
                    <p className="text-neutral-600 text-[13px] leading-normal m-0">{c.requirements}</p>
                  </div>
                  <div>
                    <p className="text-[var(--site-muted)] text-[11px] font-bold tracking-[0.08em] uppercase mb-1">
                      Was mitbringen
                    </p>
                    <p className="text-neutral-600 text-[13px] leading-normal m-0">{c.bring}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="anfrage" className="py-24 px-6 bg-[var(--site-bg)]">
        <div className="max-w-[640px] mx-auto">
          <div className="mb-10">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              Sonderanfragen
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(24px,3.5vw,36px)] font-black tracking-tight mb-3">
              Privat- oder Firmenkurs anfragen
            </h2>
            <p className="text-[var(--site-muted)] text-[15px] leading-relaxed">
              Team-Events, Firmenworkouts oder privater Gruppenunterricht – wir machen das möglich.
            </p>
          </div>

          <form className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-9 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Dein Name"
                  className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-2.5 text-[var(--site-text)] text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-wide">
                  E-Mail
                </label>
                <input
                  type="email"
                  placeholder="deine@mail.de"
                  className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-2.5 text-[var(--site-text)] text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-wide">
                Kurstyp
              </label>
              <select className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-2.5 text-[var(--site-text)] text-sm outline-none">
                <option value="">Kurstyp wählen…</option>
                <option>Krafttraining</option>
                <option>Yoga & Mindfulness</option>
                <option>HIIT</option>
                <option>Spinning</option>
                <option>Pilates</option>
                <option>Boxing Fitness</option>
                <option>Individueller Kurs</option>
              </select>
            </div>

            <div>
              <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-wide">
                Nachricht
              </label>
              <textarea
                rows={4}
                placeholder="Personenanzahl, Wunschtermine, besondere Anforderungen…"
                className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-2.5 text-[var(--site-text)] text-sm outline-none resize-y font-[inherit]"
              />
            </div>

            <button
              type="submit"
              className="bg-[var(--site-accent)] text-[var(--site-bg)] font-extrabold text-[15px] py-[13px] rounded-lg border-none cursor-pointer tracking-tight"
            >
              Anfrage senden
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
