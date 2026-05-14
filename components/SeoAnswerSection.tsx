import Link from "next/link"

export type SeoQuestion = {
  question: string
  answer: string
}

export function SeoAnswerSection({
  eyebrow,
  title,
  summary,
  facts,
  questions,
}: {
  eyebrow: string
  title: string
  summary: string
  facts: string[]
  questions: SeoQuestion[]
}) {
  return (
    <section className="bg-cream dark:bg-dark py-20 md:py-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-4 font-medium">
            {eyebrow}
          </p>
          <h2 className="font-display font-light italic text-[clamp(2.2rem,4vw,4rem)] leading-tight text-ink dark:text-cream mb-6">
            {title}
          </h2>
          <p className="text-mid dark:text-muted text-sm md:text-base leading-relaxed max-w-xl">
            {summary}
          </p>
          <ul className="mt-8 space-y-3">
            {facts.map((fact) => (
              <li key={fact} className="flex gap-3 text-sm text-mid dark:text-muted leading-relaxed">
                <span className="mt-[0.65em] h-px w-4 flex-shrink-0 bg-gold/60" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="divide-y divide-stone/50 dark:divide-stone/10 border-y border-stone/50 dark:border-stone/10">
          {questions.map((item) => (
            <article key={item.question} className="py-6">
              <h3 className="text-base md:text-lg font-medium tracking-tight text-ink dark:text-cream">
                {item.question}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-mid dark:text-muted">
                {item.answer}
              </p>
            </article>
          ))}
          <div className="py-6">
            <Link
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-cream transition-opacity hover:opacity-80 dark:bg-cream dark:text-ink"
            >
              Anfrage starten
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
