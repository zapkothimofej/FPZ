import Link from "next/link"

type Feature = { text: string; included: boolean }

type Tier = {
  name: string
  price: number
  billing: string
  badge?: string
  highlight: boolean
  features: Feature[]
  cta: string
}

const TIERS: Tier[] = [
  {
    name: "Basic",
    price: 29,
    billing: "monatlich kündbar",
    highlight: false,
    cta: "Basic wählen",
    features: [
      { text: "Gerätetraining (alle Maschinen)", included: true },
      { text: "Umkleiden & Duschen", included: true },
      { text: "WLAN", included: true },
      { text: "Mo – Fr · 9:00 – 18:00 Uhr", included: true },
      { text: "Alle Gruppentrainings", included: false },
      { text: "Sauna & Dampfbad", included: false },
      { text: "Personal Training", included: false },
    ],
  },
  {
    name: "Premium",
    price: 49,
    billing: "monatlich kündbar",
    badge: "Beliebteste Wahl",
    highlight: true,
    cta: "Premium wählen",
    features: [
      { text: "Alles aus Basic", included: true },
      { text: "Alle Gruppentrainings (24 Kurse/Woche)", included: true },
      { text: "7 Tage · 6:00 – 23:00 Uhr", included: true },
      { text: "Sauna & Dampfbad", included: true },
      { text: "Getränke-Flatrate", included: true },
      { text: "Personal Training", included: false },
      { text: "Ernährungsberatung", included: false },
    ],
  },
  {
    name: "All-In",
    price: 69,
    billing: "monatlich kündbar",
    highlight: false,
    cta: "All-In wählen",
    features: [
      { text: "Alles aus Premium", included: true },
      { text: "1× Personal Training / Monat", included: true },
      { text: "Ernährungsberatung (Erstgespräch)", included: true },
      { text: "Handtuchservice", included: true },
      { text: "Gäste einladen (2× / Monat)", included: true },
      { text: "Prioritäts-Kursbuchung", included: true },
      { text: "Nutzungsanalyse & Trainingsplan", included: true },
    ],
  },
]

const FAQ = [
  {
    q: "Gibt es eine Mindestlaufzeit?",
    a: "Nein. Alle Tarife sind monatlich kündbar mit einer Frist von einem Monat zum Monatsende. Kein Jahresvertrag, keine versteckten Bindungen.",
  },
  {
    q: "Was ist beim Probetraining inbegriffen?",
    a: "Dein erstes Training ist komplett kostenlos. Du erhältst eine einstündige Einführung in die Geräte, einen ersten Trainingsplan und kannst alle Räumlichkeiten unverbindlich kennenlernen. Kein Vertrag erforderlich.",
  },
  {
    q: "Gibt es Rabatte für Studenten oder Gruppen?",
    a: "Ja. Studenten erhalten 20% Rabatt gegen Vorlage des Studentenausweises. Paare, die gemeinsam beitreten, zahlen 15% weniger. Bei Jahreszahlung gibt es 2 Monate gratis.",
  },
  {
    q: "Kann ich meine Mitgliedschaft einfrieren?",
    a: "Ja. Du kannst deine Mitgliedschaft einmal pro Kalenderjahr bis zu 2 Monate beitragsfrei pausieren – zum Beispiel bei Urlaub, Krankheit oder beruflichen Reisen.",
  },
  {
    q: "Was, wenn ich nicht zufrieden bin?",
    a: "Du hast ein 14-tägiges Widerrufsrecht nach Vertragsabschluss. Innerhalb dieser Frist kannst du die Mitgliedschaft ohne Angabe von Gründen und ohne Kosten stornieren.",
  },
]

export default function MitgliedschaftPage() {
  return (
    <>
      {/* HEADER */}
      <section className="pt-[72px] pb-14 px-6 bg-[var(--site-bg)] border-b border-[var(--site-border)] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-[120px] -right-[120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_70%)] pointer-events-none"
        />
        <div className="max-w-[1200px] mx-auto relative">
          <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
            Tarife & Konditionen
          </p>
          <h1 className="text-[var(--site-text)] text-[clamp(32px,5vw,56px)] font-black tracking-[-0.03em] mb-4">
            Mitgliedschaft
          </h1>
          <p className="text-[var(--site-muted)] text-[17px] max-w-[520px] leading-[1.7]">
            Fair. Transparent. Monatlich kündbar. Wähle den Tarif, der zu deinem Lebensstil passt.
          </p>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="py-20 px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`rounded-[18px] px-8 py-9 flex flex-col gap-7 relative ${
                  t.highlight
                    ? "bg-green-500/[0.04] border-2 border-[var(--site-accent)]"
                    : "bg-[var(--site-surface)] border border-[var(--site-border)]"
                }`}
              >
                {t.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--site-accent)] text-[var(--site-bg)] text-[11px] font-extrabold px-4 py-[5px] rounded-full whitespace-nowrap tracking-[0.06em] uppercase">
                    {t.badge}
                  </div>
                )}

                {/* Tier name + price */}
                <div>
                  <p className={`text-xs font-bold tracking-[0.12em] uppercase mb-4 ${t.highlight ? "text-[var(--site-accent)]" : "text-[var(--site-muted)]"}`}>
                    {t.name}
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-[var(--site-text)] text-[56px] font-black tracking-[-0.04em] leading-none">
                      {t.price}€
                    </span>
                    <span className="text-[var(--site-muted)] text-sm">/Monat</span>
                  </div>
                  <p className="text-neutral-600 text-xs">{t.billing}</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[var(--site-border)]" />

                {/* Features */}
                <ul className="list-none m-0 p-0 flex flex-col gap-3">
                  {t.features.map((f) => (
                    <li
                      key={f.text}
                      className={`flex items-start gap-2.5 text-sm leading-snug ${f.included ? "text-neutral-300" : "text-neutral-700"}`}
                    >
                      <span className={`font-extrabold text-sm shrink-0 mt-px ${f.included ? "text-[var(--site-accent)]" : "text-neutral-700"}`}>
                        {f.included ? "✓" : "✗"}
                      </span>
                      <span className={f.included ? "" : "line-through"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#anmeldung"
                  className={`block text-center py-3.5 rounded-[10px] font-extrabold text-[15px] no-underline mt-auto tracking-tight ${
                    t.highlight
                      ? "bg-[var(--site-accent)] text-[var(--site-bg)]"
                      : "bg-transparent text-[var(--site-accent)] border-[1.5px] border-[var(--site-accent)]"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex justify-center gap-10 flex-wrap">
            {[
              "Monatlich kündbar",
              "Keine Einrichtungsgebühr",
              "14 Tage Widerrufsrecht",
              "Kostenloses Probetraining",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-[var(--site-muted)] text-[13px]"
              >
                <span className="text-[var(--site-accent)] text-base">✓</span>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#070707] border-t border-[var(--site-border)]">
        <div className="max-w-[760px] mx-auto">
          <div className="mb-12">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(26px,4vw,40px)] font-black tracking-tight">
              Häufige Fragen
            </h2>
          </div>

          <div className="flex flex-col">
            {FAQ.map((item, i) => (
              <div
                key={item.q}
                className={`border-t border-[var(--site-border)] py-7 ${i === FAQ.length - 1 ? "border-b border-[var(--site-border)]" : ""}`}
              >
                <h3 className="text-[var(--site-text)] font-bold text-base mb-3 flex items-start gap-3">
                  <span className="text-[var(--site-accent)] font-black shrink-0">Q</span>
                  {item.q}
                </h3>
                <p className="text-[var(--site-muted)] text-[15px] leading-[1.7] m-0 pl-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGN UP FORM */}
      <section id="anmeldung" className="py-24 px-6 bg-[var(--site-bg)]">
        <div className="max-w-[640px] mx-auto">
          <div className="mb-10">
            <p className="text-[var(--site-accent)] text-xs font-bold tracking-[0.15em] uppercase mb-3">
              Jetzt starten
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(26px,4vw,40px)] font-black tracking-tight mb-3">
              Mitglied werden
            </h2>
            <p className="text-[var(--site-muted)] text-[15px] leading-relaxed">
              Füll das Formular aus – wir melden uns innerhalb von 24 Stunden bei dir. Kein Stress, kein Druck.
            </p>
          </div>

          <form className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-[18px] p-10 flex flex-col gap-[22px]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-[0.06em]">
                  Vorname
                </label>
                <input
                  type="text"
                  placeholder="Max"
                  className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-[var(--site-text)] text-sm outline-none font-[inherit]"
                />
              </div>
              <div>
                <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-[0.06em]">
                  Nachname
                </label>
                <input
                  type="text"
                  placeholder="Mustermann"
                  className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-[var(--site-text)] text-sm outline-none font-[inherit]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-[0.06em]">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                placeholder="max@mustermann.de"
                className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-[var(--site-text)] text-sm outline-none font-[inherit]"
              />
            </div>

            <div>
              <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-[0.06em]">
                Gewünschter Tarif
              </label>
              <select className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-[var(--site-text)] text-sm outline-none font-[inherit] appearance-none cursor-pointer">
                <option value="">Tarif wählen…</option>
                <option value="basic">Basic – 29€ / Monat</option>
                <option value="premium">Premium – 49€ / Monat</option>
                <option value="all-in">All-In – 69€ / Monat</option>
                <option value="probe">Erstmal Probetraining</option>
              </select>
            </div>

            <div>
              <label className="block text-[var(--site-muted)] text-xs font-semibold mb-1.5 tracking-[0.06em]">
                Gewünschtes Startdatum
              </label>
              <input
                type="date"
                className="w-full bg-[#1a1a1a] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-[var(--site-text)] text-sm outline-none font-[inherit] [color-scheme:dark]"
              />
            </div>

            <div className="bg-green-500/[0.06] border border-green-500/20 rounded-lg px-4 py-3.5 flex items-start gap-2.5">
              <span className="text-[var(--site-accent)] shrink-0 mt-px">ℹ</span>
              <p className="text-[var(--site-muted)] text-[13px] m-0 leading-normal">
                Nach dem Absenden kontaktieren wir dich innerhalb von einem Werktag. Dein erstes Training
                ist kostenlos – auch vor Vertragsabschluss.
              </p>
            </div>

            <button
              type="submit"
              className="bg-[var(--site-accent)] text-[var(--site-bg)] font-extrabold text-base py-[15px] rounded-[10px] border-none cursor-pointer tracking-tight"
            >
              Jetzt anmelden
            </button>

            <p className="text-neutral-600 text-xs text-center m-0">
              Durch das Absenden stimmst du unserer{" "}
              <Link href="/portfolio/fitness-studio" className="text-[var(--site-muted)] underline">
                Datenschutzerklärung
              </Link>{" "}
              zu. Du kannst jederzeit widerrufen.
            </p>
          </form>

          {/* Alternative contact */}
          <div className="mt-7 text-center text-[var(--site-muted)] text-sm">
            Lieber persönlich?{" "}
            <a
              href="tel:0201987654"
              className="text-[var(--site-accent)] no-underline font-semibold"
            >
              0201 / 987 654
            </a>{" "}
            oder{" "}
            <a
              href="mailto:hallo@fitbase-essen.de"
              className="text-[var(--site-accent)] no-underline font-semibold"
            >
              hallo@fitbase-essen.de
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
