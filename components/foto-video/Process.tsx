import { FadeIn } from "@/components/FadeIn"

const steps = [
  {
    num: "01",
    title: "Ziel zuerst",
    desc: "Wir klären, wo die Bilder eingesetzt werden: Website, Shop, Social, Recruiting oder Event-Kommunikation. Daraus entsteht der Umfang.",
  },
  {
    num: "02",
    title: "Shotlist statt Raten",
    desc: "Vor dem Termin steht fest, welche Motive gebraucht werden, welche Formate entstehen und welche Vorbereitung nötig ist.",
  },
  {
    num: "03",
    title: "Produktion vor Ort",
    desc: "Wir arbeiten konzentriert, mit kleinem Setup und klarer Reihenfolge. In Bochum, NRW oder nach Absprache bundesweit.",
  },
  {
    num: "04",
    title: "Lieferung in Formaten",
    desc: "Sie erhalten nutzbare Dateien für die geplanten Kanäle. Korrekturen werden vorher begrenzt und transparent vereinbart.",
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
          Von Bedarf bis fertiger Datei.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {steps.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.08}>
            <div className="p-8 md:p-10 border-t border-white/10 lg:border-t-0 lg:border-l lg:first:border-l-0 hover:bg-white/[0.03] transition-colors">
              <span className="font-display text-[3.5rem] font-light leading-none text-white/55 block mb-6">
                {step.num}
              </span>
              <h3 className="text-base font-medium text-white mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-white/68 leading-relaxed">
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
