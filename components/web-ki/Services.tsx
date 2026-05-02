import { FadeIn } from "@/components/FadeIn"

const services = [
  {
    num: "01",
    title: "Webseitenerstellung",
    body: "Professionelle Websites, die konvertieren. Von der Konzeption über das Design bis zum Go-Live — wir liefern digitale Präsenzen, die Vertrauen aufbauen und Anfragen generieren.",
    tags: ["Next.js", "React", "Tailwind", "CMS"],
  },
  {
    num: "02",
    title: "Automatisierungen",
    body: "Manuelle Prozesse kosten Zeit und Geld. Wir digitalisieren Ihre Workflows — von E-Mail-Automation über Datenpipelines bis zu integrierten Geschäftsprozessen.",
    tags: ["n8n", "Zapier", "API-Integration", "Webhooks"],
  },
  {
    num: "03",
    title: "OpenAI-Anbindungen",
    body: "Intelligente KI-Assistenten, die in Ihre bestehenden Systeme integriert werden. Chatbots, automatisierte Datenauswertung, individuelle Sprachmodell-Lösungen.",
    tags: ["GPT-4o", "Assistants API", "RAG", "Fine-tuning"],
  },
]

export function WebKiServices() {
  return (
    <section
      id="leistungen"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-cream dark:bg-dark"
    >
      <FadeIn className="mb-20 md:mb-28">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">
          Leistungen
        </p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-ink dark:text-cream">
          Was wir für Sie tun.
        </h2>
      </FadeIn>

      <div className="divide-y divide-stone/50 dark:divide-stone/10">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.06}>
            <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_200px] gap-4 md:gap-12 py-10 md:py-12 group">
              <span className="font-display text-3xl font-light text-stone dark:text-stone/50 leading-none pt-1">
                {s.num}
              </span>

              <div>
                <h3 className="text-xl font-medium text-ink dark:text-cream mb-3 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-mid dark:text-muted leading-relaxed text-sm md:text-base max-w-lg">
                  {s.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end md:content-start pt-1">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-stone/60 dark:border-stone/20 text-muted"
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
