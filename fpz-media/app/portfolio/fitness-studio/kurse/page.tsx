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

function ScheduleRow({ slot }: { slot: CourseSlot }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#141414",
        border: "1px solid #262626",
        borderRadius: 10,
        padding: "16px 20px",
        gap: 20,
      }}
    >
      {/* Time */}
      <span
        style={{
          color: "#22c55e",
          fontWeight: 800,
          fontSize: 15,
          fontVariantNumeric: "tabular-nums",
          minWidth: 52,
          flexShrink: 0,
        }}
      >
        {slot.time}
      </span>

      {/* Course info */}
      <div style={{ flex: 1 }}>
        <p style={{ color: "#f5f5f5", fontWeight: 700, fontSize: 15, margin: "0 0 2px" }}>
          {slot.name}
        </p>
        <p style={{ color: "#737373", fontSize: 12, margin: 0 }}>
          {slot.trainer} · {slot.duration}
        </p>
      </div>

      {/* Level badge + book */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span
          style={{
            background: `${slot.levelColor}18`,
            color: slot.levelColor,
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 999,
            border: `1px solid ${slot.levelColor}40`,
          }}
        >
          {slot.level}
        </span>
        <Link
          href="/portfolio/fitness-studio/mitgliedschaft"
          style={{
            color: "#22c55e",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
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
      {/* ── HEADER ── */}
      <section style={{ padding: "72px 24px 56px", background: "#0a0a0a", borderBottom: "1px solid #262626" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Wochenplan
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
            Kursplan
          </h1>
          <p style={{ color: "#737373", fontSize: 17, maxWidth: 540 }}>
            24 Kurse pro Woche, 7 Tage die Woche. Für Premium- und All-In-Mitglieder inklusive.
          </p>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section style={{ padding: "64px 24px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Day tabs (static – no JS needed for demo) */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 40,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {SCHEDULE.map((d, i) => (
              <div
                key={d.day}
                style={{
                  flexShrink: 0,
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "default",
                  background: i === 0 ? "#22c55e" : "#141414",
                  color: i === 0 ? "#0a0a0a" : "#737373",
                  border: i === 0 ? "none" : "1px solid #262626",
                }}
              >
                {d.short}
              </div>
            ))}
          </div>

          {/* Show all days */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {SCHEDULE.map((d, i) => (
              <div key={d.day}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <h2
                    style={{
                      color: i === 0 ? "#22c55e" : "#f5f5f5",
                      fontWeight: 800,
                      fontSize: 20,
                      margin: 0,
                    }}
                  >
                    {d.day}
                  </h2>
                  <span
                    style={{
                      color: "#404040",
                      fontSize: 13,
                    }}
                  >
                    {d.slots.length} Kurse
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {d.slots.map((slot) => (
                    <ScheduleRow key={`${d.day}-${slot.time}`} slot={slot} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE DETAILS ── */}
      <section style={{ padding: "96px 24px", background: "#070707", borderTop: "1px solid #262626" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Details
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, letterSpacing: "-0.025em" }}>
              Alle Kurse im Überblick
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {COURSE_DETAILS.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "#141414",
                  border: "1px solid #262626",
                  borderRadius: 16,
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 22 }}>{c.icon}</span>
                      <h3 style={{ color: "#f5f5f5", fontWeight: 800, fontSize: 18, margin: 0 }}>{c.name}</h3>
                    </div>
                    <p style={{ color: "#737373", fontSize: 12, margin: 0 }}>
                      {c.trainer} · {c.duration}
                    </p>
                  </div>
                  <span
                    style={{
                      background: `${c.levelColor}18`,
                      color: c.levelColor,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: `1px solid ${c.levelColor}40`,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {c.level}
                  </span>
                </div>

                {/* Description */}
                <p style={{ color: "#a3a3a3", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                  {c.desc}
                </p>

                {/* Requirements + bring */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <p style={{ color: "#737373", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                      Voraussetzungen
                    </p>
                    <p style={{ color: "#525252", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{c.requirements}</p>
                  </div>
                  <div>
                    <p style={{ color: "#737373", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                      Was mitbringen
                    </p>
                    <p style={{ color: "#525252", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{c.bring}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="anfrage" style={{ padding: "96px 24px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ color: "#22c55e", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Sonderanfragen
            </p>
            <h2 style={{ color: "#f5f5f5", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 12 }}>
              Privat- oder Firmenkurs anfragen
            </h2>
            <p style={{ color: "#737373", fontSize: 15, lineHeight: 1.6 }}>
              Team-Events, Firmenworkouts oder privater Gruppenunterricht – wir machen das möglich.
            </p>
          </div>

          <form
            style={{
              background: "#141414",
              border: "1px solid #262626",
              borderRadius: 16,
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.04em" }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Dein Name"
                  style={{
                    width: "100%",
                    background: "#1a1a1a",
                    border: "1px solid #262626",
                    borderRadius: 8,
                    padding: "10px 14px",
                    color: "#f5f5f5",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.04em" }}>
                  E-Mail
                </label>
                <input
                  type="email"
                  placeholder="deine@mail.de"
                  style={{
                    width: "100%",
                    background: "#1a1a1a",
                    border: "1px solid #262626",
                    borderRadius: 8,
                    padding: "10px 14px",
                    color: "#f5f5f5",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.04em" }}>
                Kurstyp
              </label>
              <select
                style={{
                  width: "100%",
                  background: "#1a1a1a",
                  border: "1px solid #262626",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#f5f5f5",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
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
              <label style={{ display: "block", color: "#737373", fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: "0.04em" }}>
                Nachricht
              </label>
              <textarea
                rows={4}
                placeholder="Personenanzahl, Wunschtermine, besondere Anforderungen…"
                style={{
                  width: "100%",
                  background: "#1a1a1a",
                  border: "1px solid #262626",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#f5f5f5",
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "#22c55e",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: 15,
                padding: "13px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              Anfrage senden
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
