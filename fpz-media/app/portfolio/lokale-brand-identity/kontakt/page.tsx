export const metadata = {
  title: "Kontakt – Breuer & Partner Steuerberatung",
  description:
    "Erstgespräch vereinbaren – kostenlos und unverbindlich. Wir melden uns innerhalb von 48 Stunden.",
}

const contactItems = [
  {
    iconPath: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    text: "Herner Str. 45, 44789 Bochum",
  },
  {
    iconPath: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    text: "+49 234 123 456-0",
  },
  {
    iconPath: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    text: "info@breuer-partner-stb.de",
  },
]

const hours = [
  ["Mo – Do", "8:00 – 17:00 Uhr"],
  ["Fr", "8:00 – 13:00 Uhr"],
  ["Sa – So", "Geschlossen"],
]

const whyPoints = [
  "Persönlicher Ansprechpartner – keine anonyme Hotline",
  "DATEV-zertifiziert für maximale Datensicherheit",
  "Über 25 Jahre Erfahrung im Ruhrgebiet",
]

export default function KontaktPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--site-bg)] py-20 pb-[60px] px-6 border-b border-[var(--site-border)] relative overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.07)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative text-center">
          <div className="inline-block bg-[var(--site-accent)]/10 border border-[var(--site-accent)]/20 rounded-full px-3.5 py-1.5 mb-6">
            <span className="text-[var(--site-accent)] text-xs font-semibold tracking-wide">
              KONTAKT & BERATUNG
            </span>
          </div>
          <h1 className="text-[clamp(34px,5vw,52px)] font-extrabold text-[var(--site-text)] tracking-tight mb-4">
            Erstgespräch vereinbaren
          </h1>
          <p className="text-[var(--site-muted)] text-[17px] max-w-[500px] mx-auto leading-[1.7]">
            Kostenlos · Unverbindlich · Innerhalb von 48h Rückmeldung
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 pb-[100px] px-6 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr_400px] gap-10 items-start">
          {/* Left: Form */}
          <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-10">
            <h2 className="text-[var(--site-text)] font-bold text-[22px] mb-2">
              Anfrage senden
            </h2>
            <p className="text-[var(--site-muted)] text-sm mb-8 leading-relaxed">
              Füllen Sie das Formular aus – wir melden uns persönlich bei Ihnen.
            </p>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                    Vollständiger Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Max Mustermann"
                    readOnly
                    className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                    Unternehmen (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Muster GmbH"
                    readOnly
                    className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    placeholder="max@beispiel.de"
                    readOnly
                    className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    placeholder="+49 234 000 000"
                    readOnly
                    className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                  Ihr Anliegen *
                </label>
                <select className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none appearance-none cursor-pointer">
                  <option value="">Bitte wählen…</option>
                  <option>Steuerberatung Unternehmen</option>
                  <option>Einkommensteuererklärung</option>
                  <option>Lohnbuchhaltung</option>
                  <option>Betriebsprüfungsbegleitung</option>
                  <option>Sonstiges</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                    Wunschtermin
                  </label>
                  <input
                    type="date"
                    readOnly
                    className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                    Gesprächsformat
                  </label>
                  <select className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none appearance-none cursor-pointer">
                    <option value="">Bitte wählen…</option>
                    <option>Persönlich vor Ort</option>
                    <option>Telefonisch</option>
                    <option>Video-Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--site-muted)] text-[13px] font-medium mb-1.5">
                  Ihre Nachricht
                </label>
                <textarea
                  placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Fragen…"
                  rows={5}
                  readOnly
                  className="w-full bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg px-3.5 py-[11px] text-sm text-[var(--site-text)] outline-none resize-y min-h-[120px] font-[inherit]"
                />
              </div>

              <p className="text-[var(--site-muted)] text-xs leading-relaxed">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß
                unserer{" "}
                <a
                  href="#"
                  className="text-[var(--site-accent)] no-underline"
                >
                  Datenschutzerklärung
                </a>{" "}
                zu. Diese Demo sendet keine Daten ab.
              </p>

              <button
                type="button"
                className="bg-[var(--site-accent)] text-white border-none rounded-[10px] px-7 py-3.5 text-[15px] font-bold cursor-pointer w-full hover:brightness-110 transition-all"
              >
                Anfrage absenden
              </button>
            </form>
          </div>

          {/* Right: Info Column */}
          <div className="flex flex-col gap-6">
            {/* Agent Card */}
            <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-7">
              <div className="flex items-center gap-4 mb-[18px]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#3b82f6] flex items-center justify-center text-xl font-bold text-white shrink-0">
                  KB
                </div>
                <div>
                  <p className="text-[var(--site-text)] font-bold text-base">
                    Dr. Klaus Breuer
                  </p>
                  <p className="text-[var(--site-accent)] text-[13px] font-medium">
                    Geschäftsführer & Steuerberater
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#22c55e]/8 border border-[#22c55e]/20 rounded-lg px-3.5 py-2.5">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] shrink-0" />
                <p className="text-[#86efac] text-[13px] font-medium">
                  Wir melden uns innerhalb von 48 Stunden
                </p>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-7">
              <p className="text-[var(--site-text)] font-bold text-[15px] mb-4">
                Kanzlei
              </p>
              <div className="flex flex-col gap-3">
                {contactItems.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2.5"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="stroke-[var(--site-accent)]"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {item.iconPath}
                    </svg>
                    <span className="text-[var(--site-muted)] text-sm">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--site-border)]">
                <p className="text-[var(--site-text)] font-semibold text-[13px] mb-2.5">
                  Öffnungszeiten
                </p>
                {hours.map(([day, time]) => (
                  <div key={day} className="flex justify-between mb-1.5">
                    <span className="text-[var(--site-muted)] text-[13px]">
                      {day}
                    </span>
                    <span className="text-[var(--site-muted)] text-[13px]">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[var(--site-border)] h-40 bg-gradient-to-br from-[#0d1f35] to-[#0d1117] flex flex-col items-center justify-center gap-2.5 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[length:32px_32px]" />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-[var(--site-accent)] relative"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="#fff" />
              </svg>
              <p className="text-[var(--site-text)] text-[13px] font-semibold relative">
                Herner Str. 45 · 44789 Bochum
              </p>
              <p className="text-[var(--site-muted)] text-xs relative">
                Nähe Hbf Bochum · Parkplätze vorhanden
              </p>
            </div>

            {/* Why Breuer */}
            <div className="bg-[var(--site-surface)] border border-[var(--site-border)] rounded-2xl p-6">
              <p className="text-[var(--site-text)] font-bold text-[15px] mb-4">
                Warum Breuer &amp; Partner?
              </p>
              {whyPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2.5 mb-3"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-[var(--site-accent)] mt-px shrink-0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[var(--site-muted)] text-sm leading-normal">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
