import Link from "next/link";

const BASE = "/portfolio/einzelhandel-launch";

const categories = [
  { label: "Oberteile", bg: "bg-[#f0ebe8]" },
  { label: "Hosen", bg: "bg-[#e8e3df]" },
  { label: "Kleider", bg: "bg-[#e5ddd9]" },
  { label: "Accessoires", bg: "bg-[#ddd6d1]" },
];

const bestsellers = [
  {
    name: "Leinenbluse Ivory",
    desc: "100% Leinen, locker geschnitten, zeitlos.",
    price: "79",
    sizes: ["XS", "S", "M", "L", "XL"],
    from: "from-[#f0ebe8]",
    to: "to-[#d6c4bc]",
  },
  {
    name: "Wide-Leg Hose Camel",
    desc: "Hochwertige Baumwollmischung, weiter Schnitt.",
    price: "129",
    sizes: ["34", "36", "38", "40", "42"],
    from: "from-[#e8ddd5]",
    to: "to-[#c4a98e]",
  },
  {
    name: "Sommerkleid Rose",
    desc: "Fließender Viskose-Stoff, A-Linie.",
    price: "99",
    sizes: ["XS", "S", "M", "L"],
    from: "from-[#f0d9d3]",
    to: "to-[#d6a89a]",
  },
];

export default function MilaHomePage() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2.5 px-4 text-xs tracking-[0.08em]">
        Kostenloser Versand ab 80€ &nbsp;|&nbsp; Neu: Frühjahrskollektion 2025
        →
      </div>

      {/* Hero */}
      <section className="grid grid-cols-2 min-h-[600px]">
        {/* Left */}
        <div className="bg-white flex items-center justify-center p-16 pr-12">
          <div className="max-w-[420px]">
            <p className="text-[11px] tracking-[0.25em] text-[var(--site-muted)] mb-4 uppercase">
              Frühjahr / Sommer 2025
            </p>
            <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] text-[var(--site-text)] mb-5 tracking-tight">
              Neue
              <br />
              Frühjahrs-
              <br />
              kollektion
              <br />
              2025
            </h1>
            <p className="text-[var(--site-muted)] text-[15px] leading-[1.7] mb-8">
              Zeitlose Stücke für jeden Anlass. Nachhaltig produziert, modern
              gestylt.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={`${BASE}/kollektion`}
                className="bg-[#1a1a1a] text-white no-underline text-xs tracking-[0.1em] px-7 py-3.5 inline-block"
              >
                KOLLEKTION ENTDECKEN
              </Link>
              <Link
                href={`${BASE}/kollektion`}
                className="border border-[#1a1a1a] text-[#1a1a1a] no-underline text-xs tracking-[0.1em] px-7 py-3.5 inline-block"
              >
                NEUHEITEN
              </Link>
            </div>
          </div>
        </div>

        {/* Right – image placeholder */}
        <div className="relative min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#d6a89a] via-[#c4877a] to-[#b57060]" />
          {/* NEU badge */}
          <div className="absolute top-8 -left-4 bg-white text-[#1a1a1a] text-[11px] font-bold tracking-[0.2em] px-4 py-2 shadow-lg">
            NEU
          </div>
          {/* Bottom label */}
          <div className="absolute bottom-8 left-8 text-white text-[13px] tracking-[0.08em] opacity-80">
            Frühjahr / Sommer 2025
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-8 bg-[var(--site-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-[var(--site-muted)] mb-2 uppercase text-center">
            Sortiment
          </p>
          <h2 className="text-[clamp(24px,3vw,36px)] font-bold text-center text-[var(--site-text)] mb-10 tracking-tight">
            Entdecke unsere Welt
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`${BASE}/kollektion`}
                className="no-underline"
              >
                <div
                  className={`${cat.bg} h-[200px] flex items-end p-5 relative overflow-hidden transition-transform duration-200 hover:scale-[1.02]`}
                >
                  <span className="text-[13px] font-semibold tracking-[0.1em] text-[#1a1a1a] uppercase relative">
                    {cat.label} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-[var(--site-muted)] mb-2 uppercase text-center">
            Bestseller
          </p>
          <h2 className="text-[clamp(24px,3vw,36px)] font-bold text-center text-[var(--site-text)] mb-12 tracking-tight">
            Unsere Bestseller
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {bestsellers.map((product) => (
              <div
                key={product.name}
                className="bg-white border border-[var(--site-border)]"
              >
                {/* Product image placeholder */}
                <div
                  className={`h-80 bg-gradient-to-br ${product.from} ${product.to} relative`}
                />
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[var(--site-text)] mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-[13px] text-[var(--site-muted)] mb-3 leading-normal">
                    {product.desc}
                  </p>
                  <p className="text-lg font-bold text-[var(--site-text)] mb-3.5">
                    {product.price} €
                  </p>
                  {/* Sizes */}
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="text-[10px] tracking-[0.06em] border border-[var(--site-border)] px-2 py-1 text-[var(--site-muted)]"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-[#1a1a1a] text-white border-none py-3 text-[11px] tracking-[0.1em] cursor-pointer font-semibold">
                    IN DEN WARENKORB
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-8 bg-[var(--site-surface)] border-t border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-[11px] tracking-[0.25em] text-[var(--site-muted)] mb-3 uppercase">
              Über uns
            </p>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[var(--site-text)] mb-6 leading-[1.15] tracking-tight">
              Mode aus Leidenschaft
            </h2>
            <p className="text-[var(--site-muted)] text-[15px] leading-[1.8] mb-5">
              Lisa Meier gründete Mila Mode 2018 mit einer klaren Vision: Mode,
              die wirklich passt – für echte Frauen, nicht für Mannequins. Jedes
              Stück wird sorgfältig ausgewählt, nachhaltig produziert und fair
              gehandelt.
            </p>
            <p className="text-[var(--site-muted)] text-[15px] leading-[1.8] mb-8">
              Unser kleines Team berät euch persönlich im Store an der
              Kortumstraße oder hilft euch gerne per E-Mail weiter. Mode ist für
              uns kein Massenprodukt – sondern ein Ausdruck eurer
              Persönlichkeit.
            </p>
            <Link
              href={`${BASE}/kontakt`}
              className="text-xs tracking-[0.1em] text-[var(--site-text)] no-underline border-b border-[var(--site-text)] pb-0.5"
            >
              KONTAKT AUFNEHMEN →
            </Link>
          </div>

          {/* Portrait placeholder */}
          <div className="h-[480px] bg-gradient-to-br from-[#e8d5cf] via-[#d6a89a] to-[#c4877a] relative overflow-hidden">
            <div className="absolute bottom-6 left-6 bg-white/90 px-4.5 py-3">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">
                Lisa Meier
              </p>
              <p className="text-[11px] text-[var(--site-muted)] tracking-[0.06em]">
                Gründerin, Mila Mode
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--site-accent)] py-20 px-8 text-center">
        <p className="text-[11px] tracking-[0.25em] text-white/70 mb-3 uppercase">
          Newsletter
        </p>
        <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-white mb-3 tracking-tight">
          10% auf deine erste Bestellung
        </h2>
        <p className="text-white/80 text-[15px] mb-8 leading-relaxed">
          Melde dich für unseren Newsletter an und erhalte exklusive Angebote,
          Styling-Tipps und Neuheiten direkt in dein Postfach.
        </p>
        <form className="flex max-w-[460px] mx-auto">
          <input
            type="email"
            placeholder="deine@email.de"
            className="flex-1 px-4.5 py-3.5 text-[13px] border-none outline-none bg-white text-[#1a1a1a]"
          />
          <button
            type="submit"
            className="bg-[#1a1a1a] text-white border-none px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold cursor-pointer whitespace-nowrap"
          >
            JETZT SICHERN
          </button>
        </form>
      </section>

      {/* USPs */}
      <section className="bg-white border-t border-[var(--site-border)] py-14 px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-3 gap-8 text-center">
          {/* USP 1 */}
          <div className="flex flex-col items-center gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[var(--site-text)] mb-1">
                Kostenloser Versand
              </p>
              <p className="text-[13px] text-[var(--site-muted)]">
                ab 80€ Bestellwert
              </p>
            </div>
          </div>

          {/* USP 2 */}
          <div className="flex flex-col items-center gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[var(--site-text)] mb-1">
                30 Tage Rückgabe
              </p>
              <p className="text-[13px] text-[var(--site-muted)]">
                Kostenlos & unkompliziert
              </p>
            </div>
          </div>

          {/* USP 3 */}
          <div className="flex flex-col items-center gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[var(--site-text)] mb-1">
                Nachhaltige Marken
              </p>
              <p className="text-[13px] text-[var(--site-muted)]">
                Fair & umweltbewusst produziert
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
