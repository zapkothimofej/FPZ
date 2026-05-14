import Link from "next/link"
import type { LocalSeoPage } from "@/lib/local-seo"

export function LocalServicePage({ page }: { page: LocalSeoPage }) {
  return (
    <>
      <section className="bg-ink px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40 lg:px-16">
        <div className="max-w-6xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
            {page.kicker}
          </p>
          <h1 className="max-w-5xl font-display text-[clamp(2.8rem,7vw,7rem)] font-light italic leading-[1.04] text-cream">
            {page.h1}
          </h1>
          <div className="mt-10 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-[1fr_0.7fr] md:gap-16">
            <p className="text-base leading-relaxed text-cream/60 md:text-lg">
              {page.intro}
            </p>
            <dl className="grid grid-cols-1 gap-4 border-y border-white/10 py-6 text-sm text-cream/55">
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.18em] text-cream/30">Leistung</dt>
                <dd>{page.serviceName}</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.18em] text-cream/30">Region</dt>
                <dd>{page.region}, Ruhrgebiet und NRW</dd>
              </div>
              <div>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.18em] text-cream/30">Anbieter</dt>
                <dd>Fapez Medien / FPZ Web-Media Solutions</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 dark:bg-dark md:px-12 md:py-28 lg:px-16">
        <div className="grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              Kurzantwort
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4vw,4rem)] font-light italic leading-tight text-ink dark:text-cream">
              Was diese Seite beantwortet.
            </h2>
          </div>
          <div className="space-y-4">
            {page.facts.map((fact) => (
              <p key={fact} className="border-b border-stone/50 pb-4 text-sm leading-relaxed text-mid dark:border-stone/10 dark:text-muted md:text-base">
                {fact}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment px-6 py-20 dark:bg-dark-soft md:px-12 md:py-28 lg:px-16">
        <div className="max-w-6xl divide-y divide-stone/50 dark:divide-stone/10">
          {page.sections.map((section) => (
            <article key={section.title} className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
              <h2 className="text-xl font-medium tracking-tight text-ink dark:text-cream">
                {section.title}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-mid dark:text-muted md:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream px-6 py-20 dark:bg-dark md:px-12 md:py-28 lg:px-16">
        <div className="grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              Fragen
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4vw,4rem)] font-light italic leading-tight text-ink dark:text-cream">
              Direkt beantwortet.
            </h2>
          </div>
          <div className="divide-y divide-stone/50 border-y border-stone/50 dark:divide-stone/10 dark:border-stone/10">
            {page.faq.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="text-base font-medium tracking-tight text-ink dark:text-cream md:text-lg">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mid dark:text-muted md:text-base">
                  {item.answer}
                </p>
              </article>
            ))}
            <div className="flex flex-col gap-3 py-6 sm:flex-row">
              <Link
                href={`${page.parentPath}#kontakt`}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-cream transition-opacity hover:opacity-80 dark:bg-cream dark:text-ink"
              >
                Anfrage starten
              </Link>
              <Link
                href={page.parentPath}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink dark:border-stone/20 dark:text-cream dark:hover:border-cream"
              >
                {page.parentLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
