import { FadeIn } from "@/components/FadeIn"

const steps = [
  {
    num: "01",
    title: "Erstgespräch",
    desc: "Kostenlos, unverbindlich. Wir hören zu — verstehen Ihr Unternehmen, Ihre Ziele, Ihre Engpässe. Kein Pitch, kein Druck.",
  },
  {
    num: "02",
    title: "Konzept & Angebot",
    desc: "Klare Roadmap, transparente Kalkulation. Sie wissen vorab genau, was zu welchem Preis geliefert wird — keine Überraschungen.",
  },
  {
    num: "03",
    title: "Entwicklung",
    desc: "Wir bauen schnell und strukturiert. Regelmäßige Updates, kurze Feedbackschleifen, direkter Draht zum Team — aus Bochum.",
  },
  {
    num: "04",
    title: "Go-Live & Support",
    desc: "Launch, Übergabe, Einweisung. Sie erhalten alles für den eigenständigen Betrieb — und wir bleiben langfristig erreichbar.",
  },
]

export function WebKiProcess() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-ink dark:bg-dark">
      <FadeIn className="mb-20 md:mb-28">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">
          Vorgehen
        </p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-white">
          Wie wir arbeiten.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {steps.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.08}>
            <div className="group p-8 md:p-10 border-white/10 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0 hover:bg-white/[0.03] transition-colors">
              <span className="font-display text-[3.5rem] font-light leading-none text-white/40 block mb-6">
                {step.num}
              </span>
              <h3 className="text-base font-medium text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="h-px bg-gold/20" />
    </section>
  )
}
