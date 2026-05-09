import { FadeIn } from "@/components/FadeIn"

const services = [
  {
    num: "01",
    title: "Produktfotografie",
    body: "Klare Produktbilder für Shop, Website und Anzeigen. Der Fokus liegt auf Wiedererkennbarkeit, sauberem Licht und Bildern, die den Kauf leichter machen.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M1 7h2l1.5-2.5h9L15 7h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
        <circle cx="10" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.25"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Imagefilm",
    body: "Kurze Unternehmensvideos, die erklären, wer Sie sind und warum Ihr Angebot relevant ist. Kein endloser Imagefilm, sondern ein verständlicher Auftritt.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="1" y="5" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M15 8.5l4-2v7l-4-2V8.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
        <path d="M4 5V3.5L7 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 5V3l3 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Event-Dokumentation",
    body: "Fotos und kurze Clips von Veranstaltungen, Launches oder internen Momenten. Geplant, unaufdringlich und in Formaten, die danach direkt nutzbar sind.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M6 2v3M14 2v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M6 12h2M10 12h4M6 15h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Social Media Content",
    body: "Content-Pakete für Instagram, TikTok oder LinkedIn. Weniger Zufallsclips, mehr wiederverwendbare Motive, Hooks und Formate.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="1" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M8 15h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="10" cy="4.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
]

export function FotoVideoServices() {
  return (
    <section id="leistungen" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-cream">
      <FadeIn>
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">Leistungen</p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-ink mb-16 md:mb-24">
          Was Sie wirklich nutzen können.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.08}>
            <div className="p-8 md:p-10 border border-stone/60 rounded-2xl hover:border-ink transition-colors group h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-3xl font-light text-ink/45 leading-none">{s.num}</span>
                <span className="text-ink/55 group-hover:text-gold transition-colors duration-300">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-xl font-medium text-ink mb-3 tracking-tight">
                {s.title}
              </h3>
              <p className="text-mid leading-relaxed text-sm">
                {s.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
