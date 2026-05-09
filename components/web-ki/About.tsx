import { FadeIn } from "@/components/FadeIn"
import Image from "next/image"

const stats = [
  { val: "01", label: "Keine erfundenen Referenzen" },
  { val: "02", label: "Umfang vor Start schriftlich" },
  { val: "03", label: "Direkter Kontakt ohne Agentur-Umweg" },
  { val: "04", label: "Saubere Übergabe nach Launch" },
]

export function WebKiAbout() {
  return (
    <section id="ueber-uns" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-parchment">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <FadeIn>
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-4 font-medium">
            Über FPZ
          </p>
          <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-ink mb-8">
            Jung, direkt,
            <br />
            transparent.
          </h2>
          <div className="space-y-4 text-mid leading-relaxed text-sm md:text-base max-w-md">
            <p>
              FPZ ist noch kein großes Studio mit langer Kundenwand. Deshalb
              behaupten wir das auch nicht. Der Vorteil ist ein schlanker
              Prozess, direkter Kontakt und die Bereitschaft, jedes Detail
              nachvollziehbar zu machen.
            </p>
            <p>
              Vor dem Start legen wir offen, was realistisch ist, was nicht
              im Umfang liegt und welche Inhalte von Ihnen kommen müssen.
              Das ist weniger glänzend als Fake-Referenzen, aber deutlich
              brauchbarer für ein echtes Projekt.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
              Bochum, Ruhrgebiet — deutschlandweit tätig
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 mt-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display font-light text-[3rem] leading-none text-ink">
                  {s.val}
                </dt>
                <dd className="text-xs tracking-[0.1em] uppercase text-mid mt-2">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone/30">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
              alt="Code Editor — dunkles Setup"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-ink/5" />
          </div>
          {/* Gold accent below image */}
          <div className="mt-3 h-px bg-gold/40 w-24" />
        </FadeIn>
      </div>
    </section>
  )
}
