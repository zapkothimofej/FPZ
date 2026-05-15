import { FadeIn } from "@/components/FadeIn"

const steps = [
  {
    num: "01",
    title: "Briefing",
    desc: "Telefonat oder Meeting — wir klären Stil, Stimmung, Zielgruppe und Budget. Kein Fragebogen, direktes Gespräch.",
  },
  {
    num: "02",
    title: "Konzept & Moodboard",
    desc: "Visuelles Konzept mit Bildsprache, Locations, Equipment-Liste. Sie wissen vorab, wie das Ergebnis aussehen wird.",
  },
  {
    num: "03",
    title: "Shooting / Dreh",
    desc: "Professionelles Equipment, effiziente Drehtage. Wir kommen zu Ihnen — in Bochum, NRW oder bundesweit.",
  },
  {
    num: "04",
    title: "Schnitt & Lieferung",
    desc: "Erstentwurf in 48 Stunden. Revisionen inklusive. Finale Dateien in allen benötigten Formaten und Auflösungen.",
  },
]

export function FotoVideoProcess() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-ink">
      <FadeIn className="mb-20 md:mb-28">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">
          Ablauf
        </p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-white">
          Von Idee bis Bild.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {steps.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.08}>
            <div className="p-8 md:p-10 border-t border-white/10 lg:border-t-0 lg:border-l lg:first:border-l-0 hover:bg-white/[0.03] transition-colors">
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

      <div className="mt-0 h-px bg-gold/20" />
    </section>
  )
}
