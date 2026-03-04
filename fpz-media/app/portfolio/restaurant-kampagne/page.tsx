import Link from "next/link";

const dishes = [
  {
    name: "Pasta al Tartufo Nero",
    desc: "Hausgemachte Tagliatelle mit schwarzem Trüffel, Parmigiano Reggiano und brauner Butter.",
    price: "22€",
  },
  {
    name: "Branzino al Forno",
    desc: "Im Ofen gegarter Wolfsbarsch mit Zitronen-Kapern-Butter, Ofengemüse und Kartoffeln.",
    price: "28€",
  },
  {
    name: "Vitello Tonnato",
    desc: "Klassisch geschnittenes Kalbsfleisch mit Thunfischcreme und Kapern nach Nonnas Art.",
    price: "18€",
  },
  {
    name: "Tiramisù della Casa",
    desc: "Original nach Familienrezept, mit Savoiardi, Mascarpone und Espresso. Serviert im Glas.",
    price: "9€",
  },
];

const reviews = [
  {
    text: "Das beste Tiramisu in ganz Bochum! Marco und sein Team machen einfach alles mit Liebe.",
    author: "Sandra K.",
  },
  {
    text: "Authentisch wie in Italien. Die Pasta wird frisch gemacht und man schmeckt jeden Unterschied.",
    author: "Thomas M.",
  },
  {
    text: "Unser Lieblingsrestaurant für besondere Anlässe. Atmosphäre, Essen, Service — alles perfetto.",
    author: "Familie Schulz",
  },
];

export default function RestaurantHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 py-24">
        {/* Decorative warm glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,#2a1f08_0%,#1a1208_40%,#0c0a08_100%)] pointer-events-none"
        />
        {/* Decorative circle */}
        <div
          aria-hidden="true"
          className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,#3d2a06_0%,#1e1508_50%,transparent_80%)] opacity-45 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] pointer-events-none"
        />

        <div className="relative text-center max-w-[680px]">
          {/* Gold divider */}
          <div className="w-10 h-px bg-[var(--site-accent)] mx-auto mb-6 opacity-70" />

          <p className="text-[var(--site-accent)] italic text-base tracking-[0.12em] mb-5 opacity-85">
            Cucina italiana autentica — Bochum
          </p>

          <h1 className="text-[var(--site-text)] text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.08] tracking-tight mb-6">
            Herz.{" "}
            <span className="text-[var(--site-accent)] italic">Seele.</span>
            {" "}Pasta.
          </h1>

          <p className="text-[var(--site-muted)] text-[1.05rem] leading-relaxed max-w-[520px] mx-auto mb-10 font-sans">
            Seit 2009 kochen wir mit Leidenschaft für Bochum. Frische Zutaten,
            authentische Rezepte — und eine Atmosphäre, die sich anfühlt wie
            famiglia.
          </p>

          <div className="flex gap-5 justify-center flex-wrap">
            <Link
              href="/portfolio/restaurant-kampagne/reservierung"
              className="border border-[var(--site-accent)] text-[var(--site-accent)] no-underline px-8 py-3 text-[0.85rem] tracking-[0.1em] uppercase font-sans font-medium"
            >
              Tisch reservieren
            </Link>
            <Link
              href="/portfolio/restaurant-kampagne/speisekarte"
              className="text-[var(--site-muted)] no-underline px-6 py-3 text-[0.9rem] font-sans flex items-center gap-1.5"
            >
              Zur Speisekarte <span className="text-[var(--site-accent)]">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Unsere Geschichte */}
      <section
        id="story"
        className="bg-[var(--site-surface)] px-6 py-24 border-t border-b border-[var(--site-border)]"
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[var(--site-accent)] italic text-lg mb-2">
              Benvenuti
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight mb-6">
              Eine Geschichte über{" "}
              <span className="text-[var(--site-accent)] italic">
                Leidenschaft
              </span>
            </h2>
            <div className="text-[var(--site-muted)] text-[0.95rem] leading-loose font-sans">
              <p className="mb-4">
                Marco Ferretti wuchs in Napoli auf — in einer Küche, die immer
                nach Sugo duftete. Seine Nonna lehrte ihn früh: gutes Essen
                braucht keine Kompromisse.
              </p>
              <p className="mb-4">
                2009 zog er nach Bochum, im Gepäck ein paar Koffer und ein
                Notizbuch voller Familienrezepte. Seitdem steht er jeden Abend
                am Herd — mit derselben Überzeugung, derselben Sorgfalt.
              </p>
              <p>
                Das <em className="text-[var(--site-text)]">Il Grano</em> ist kein
                Restaurant wie jedes andere. Es ist ein Stück Neapel mitten in
                Bochum. Jeder Teller erzählt eine Geschichte.
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="h-[400px] rounded-sm bg-gradient-to-br from-[#2d1f08] via-[#1a1208] via-40% to-[#1e1408] border border-[var(--site-border)] flex items-center justify-center flex-col gap-3 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_40%,#3d2a0880_0%,transparent_70%)]"
            />
            <p className="text-[var(--site-accent)] italic text-3xl font-bold relative">
              Il Grano
            </p>
            <p className="text-[var(--site-muted)] text-[0.8rem] tracking-[0.2em] uppercase relative font-sans">
              Ristorante &middot; seit 2009
            </p>
          </div>
        </div>
      </section>

      {/* Spezialitäten */}
      <section className="px-6 py-24 bg-[var(--site-bg)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[var(--site-accent)] italic text-[0.9rem] tracking-[0.15em] mb-2 font-sans">
              Unsere Empfehlungen
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold">
              Spezialitäten del giorno
            </h2>
            <div className="w-9 h-px bg-[var(--site-accent)] mx-auto mt-4 opacity-50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dishes.map((dish) => (
              <div
                key={dish.name}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] p-8 border-t-2 border-t-[var(--site-accent)]"
              >
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-[var(--site-text)] text-[1.05rem] font-semibold italic">
                    {dish.name}
                  </h3>
                  <span className="text-[var(--site-accent)] font-sans text-base font-semibold whitespace-nowrap">
                    {dish.price}
                  </span>
                </div>
                <p className="text-[var(--site-muted)] text-sm leading-relaxed font-sans">
                  {dish.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/portfolio/restaurant-kampagne/speisekarte"
              className="text-[var(--site-muted)] no-underline text-sm font-sans tracking-[0.05em] border-b border-[var(--site-border)] pb-0.5"
            >
              Vollständige Speisekarte ansehen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Reservierung CTA */}
      <section className="bg-[var(--site-surface)] border-t border-b border-[var(--site-border)] px-6 py-20 text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[var(--site-accent)] italic text-[0.9rem] tracking-[0.12em] mb-3 font-sans">
            Ihr Abend beginnt hier
          </p>
          <h2 className="text-[var(--site-text)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold mb-4 leading-snug">
            Tisch reservieren —{" "}
            <span className="text-[var(--site-accent)] italic">
              einfach und bequem
            </span>
          </h2>
          <p className="text-[var(--site-muted)] text-[0.95rem] leading-relaxed font-sans mb-8">
            Sichern Sie sich Ihren Wunschtisch für einen unvergesslichen Abend.
            Wir freuen uns auf Sie.
          </p>
          <Link
            href="/portfolio/restaurant-kampagne/reservierung"
            className="bg-[var(--site-accent)] text-[var(--site-bg)] no-underline px-10 py-3.5 text-[0.85rem] font-sans font-bold tracking-[0.1em] uppercase inline-block mb-5"
          >
            Jetzt reservieren
          </Link>
          <p className="text-[var(--site-muted)] text-[0.85rem] font-sans">
            oder rufen Sie uns an:{" "}
            <a
              href="tel:+4923498765"
              className="text-[var(--site-accent)] no-underline font-semibold"
            >
              0234 987 654
            </a>
          </p>
        </div>
      </section>

      {/* Bewertungen */}
      <section className="px-6 py-24 bg-[var(--site-bg)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--site-accent)] italic text-[0.9rem] tracking-[0.15em] mb-2 font-sans">
              Was unsere Gäste sagen
            </p>
            <h2 className="text-[var(--site-text)] text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold">
              Stimmen aus der famiglia
            </h2>
            <div className="w-9 h-px bg-[var(--site-accent)] mx-auto mt-4 opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.author}
                className="bg-[var(--site-surface)] border border-[var(--site-border)] p-8 rounded-sm"
              >
                <div className="text-[var(--site-accent)] text-lg mb-4 tracking-[0.05em]">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p className="text-[var(--site-text)] text-[0.9rem] leading-relaxed font-sans mb-5 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="text-[var(--site-muted)] text-[0.8rem] font-sans tracking-[0.05em]">
                  — {r.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
