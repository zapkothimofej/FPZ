const inputClasses =
  "w-full bg-[var(--site-bg)] border border-[var(--site-border)] text-[var(--site-text)] px-4 py-3 text-sm font-sans outline-none";

const labelClasses =
  "block text-[var(--site-muted)] text-xs tracking-[0.12em] uppercase font-sans mb-1.5";

export default function ReservierungPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--site-bg)] px-6 pt-[4.5rem] pb-12 border-b border-[var(--site-border)]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[var(--site-accent)] italic text-[0.9rem] tracking-[0.12em] mb-2 font-sans">
            Willkommen zurück
          </p>
          <h1 className="text-[var(--site-text)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
            Tisch{" "}
            <span className="text-[var(--site-accent)] italic">
              reservieren
            </span>
          </h1>
        </div>
      </section>

      {/* Main 2-col */}
      <section className="bg-[var(--site-bg)] px-6 py-16">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div>
            <p className="text-[var(--site-muted)] text-sm leading-relaxed font-sans mb-8">
              Füllen Sie das Formular aus — wir bestätigen Ihre Reservierung
              telefonisch oder per E-Mail innerhalb von 2 Stunden.
            </p>

            <form action="#" method="post" className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className={labelClasses}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ihr vollständiger Name"
                  required
                  className={inputClasses}
                />
              </div>

              {/* Datum + Uhrzeit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Datum</label>
                  <input
                    type="date"
                    name="datum"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Uhrzeit</label>
                  <select name="uhrzeit" required className={inputClasses}>
                    <option value="">Wählen...</option>
                    <option value="12:00">12:00 Uhr</option>
                    <option value="13:00">13:00 Uhr</option>
                    <option value="18:00">18:00 Uhr</option>
                    <option value="19:00">19:00 Uhr</option>
                    <option value="20:00">20:00 Uhr</option>
                    <option value="21:00">21:00 Uhr</option>
                  </select>
                </div>
              </div>

              {/* Personen + Telefon */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Anzahl Personen</label>
                  <select name="personen" required className={inputClasses}>
                    <option value="">Wählen...</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Person" : "Personen"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Telefon</label>
                  <input
                    type="tel"
                    name="telefon"
                    placeholder="+49 ..."
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Besondere Wünsche */}
              <div>
                <label className={labelClasses}>Besondere Wünsche</label>
                <textarea
                  name="wuensche"
                  rows={4}
                  placeholder="Allergien, Geburtstag, Hochzeit, Sitzwünsche, vegetarisch ..."
                  className={`${inputClasses} resize-y leading-relaxed`}
                />
              </div>

              <button
                type="submit"
                className="bg-[var(--site-accent)] text-[var(--site-bg)] border-none px-8 py-4 text-[0.85rem] font-sans font-bold tracking-[0.1em] uppercase cursor-pointer w-full"
              >
                Tisch reservieren
              </button>

              <p className="text-[#4a4035] text-[0.78rem] font-sans leading-relaxed text-center">
                Ihre Daten werden ausschließlich zur Bearbeitung Ihrer
                Reservierung verwendet und nicht an Dritte weitergegeben.
              </p>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Öffnungszeiten */}
            <div className="bg-[var(--site-surface)] border border-[var(--site-border)] p-7">
              <p className="text-[var(--site-text)] text-xs tracking-[0.15em] uppercase font-sans mb-4">
                Öffnungszeiten
              </p>
              <table className="w-full border-collapse">
                <tbody>
                  {[
                    { day: "Dienstag – Donnerstag", hours: "12:00 – 22:00 Uhr", closed: false },
                    { day: "Freitag – Samstag", hours: "12:00 – 23:00 Uhr", closed: false },
                    { day: "Sonntag", hours: "12:00 – 21:00 Uhr", closed: false },
                    { day: "Montag", hours: "Ruhetag", closed: true },
                  ].map((row) => (
                    <tr key={row.day}>
                      <td className="text-[var(--site-muted)] text-[0.85rem] font-sans py-1.5 pr-4">
                        {row.day}
                      </td>
                      <td
                        className={`text-[0.85rem] font-sans py-1.5 text-right ${
                          row.closed
                            ? "text-[#4a4035] italic"
                            : "text-[var(--site-text)]"
                        }`}
                      >
                        {row.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map placeholder */}
            <div className="bg-[var(--site-surface)] border border-[var(--site-border)] p-7">
              <p className="text-[var(--site-text)] text-xs tracking-[0.15em] uppercase font-sans mb-4">
                Anfahrt
              </p>

              {/* Map visual */}
              <div className="h-[180px] bg-gradient-to-br from-[#1a1408] via-[#2a1f0a] via-30% to-[#261c0a] border border-[var(--site-border)] rounded-sm mb-4 flex items-center justify-center flex-col gap-2 relative overflow-hidden">
                {/* Grid lines */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(var(--site-border)/20_1px,transparent_1px),linear-gradient(90deg,var(--site-border)/20_1px,transparent_1px)] bg-[length:30px_30px]"
                />
                {/* Pin */}
                <div className="relative w-3 h-3 rounded-full bg-[var(--site-accent)] shadow-[0_0_0_4px_rgba(201,168,76,0.19)]" />
                <p className="relative text-[var(--site-accent)] text-[0.8rem] font-sans font-semibold">
                  Kortumstr. 18 &middot; Bochum
                </p>
              </div>

              <div className="text-[var(--site-muted)] text-[0.85rem] leading-relaxed font-sans">
                <p>Kortumstraße 18</p>
                <p>44787 Bochum</p>
                <p className="mt-2 text-[#4a4035] text-[0.78rem]">
                  Parkplätze: Stadtpark-Garage (400 m) &middot; ÖPNV: U35 Husemannplatz
                </p>
              </div>
            </div>

            {/* Telefon */}
            <div className="bg-[var(--site-surface)] border border-[var(--site-border)] p-7 text-center">
              <p className="text-[var(--site-muted)] text-[0.8rem] font-sans tracking-[0.1em] uppercase mb-3">
                Oder direkt anrufen
              </p>
              <a
                href="tel:+4923498765"
                className="text-[var(--site-accent)] no-underline text-3xl font-sans font-bold tracking-wide block"
              >
                0234 987 654
              </a>
              <p className="text-[#4a4035] text-xs font-sans mt-2">
                Mo–Sa: 11:00 – 22:00 Uhr
              </p>
            </div>

            {/* Hinweis */}
            <div className="border border-[var(--site-accent)]/25 bg-[#1e180a] px-6 py-5 border-l-[3px] border-l-[var(--site-accent)]">
              <p className="text-[var(--site-accent)] text-xs tracking-[0.1em] uppercase font-sans font-semibold mb-2">
                Wichtiger Hinweis
              </p>
              <p className="text-[var(--site-muted)] text-[0.83rem] leading-relaxed font-sans">
                Reservierungen ohne Bestätigung durch unser Team werden nach
                15 Minuten automatisch freigegeben. Bei größeren Gruppen (8+
                Personen) bitten wir um vorherige telefonische Rücksprache.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
