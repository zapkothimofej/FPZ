import { FadeIn } from "@/components/FadeIn"

const services = [
  {
    num: "01",
    title: "Websites, die erklären",
    body: "Eine gute Website sagt sofort, was Sie anbieten, für wen es ist und warum jemand Kontakt aufnehmen sollte. Wir strukturieren Inhalte, gestalten die Oberfläche und setzen sie technisch sauber um.",
    tags: ["Konzept", "Design", "Next.js", "SEO-Basis"],
  },
  {
    num: "02",
    title: "Automationen, die Arbeit sparen",
    body: "Wenn Daten immer wieder kopiert, E-Mails manuell sortiert oder Leads per Hand übertragen werden, bauen wir einfache, nachvollziehbare Workflows statt übergroßer Systeme.",
    tags: ["Workflows", "APIs", "Formulare", "KI-Anbindung"],
  },
]

export function WebKiServices() {
  return (
    <section
      id="leistungen"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-cream"
    >
      <FadeIn className="mb-20 md:mb-28">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">
          Leistungen
        </p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-ink">
          Was wirklich gebraucht wird.
        </h2>
      </FadeIn>

      <div className="divide-y divide-stone/50">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.06}>
            <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_200px] gap-4 md:gap-12 py-10 md:py-12 group">
              <span className="font-display text-3xl font-light text-ink/45 leading-none pt-1">
                {s.num}
              </span>

              <div>
                <h3 className="text-xl font-medium text-ink mb-3 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-mid leading-relaxed text-sm md:text-base max-w-xl">
                  {s.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end md:content-start pt-1">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-stone/60 text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-12 h-px bg-gold/20" />
    </section>
  )
}
