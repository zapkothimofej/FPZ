import { FadeIn } from "@/components/FadeIn"
import Image from "next/image"

const stats = [
  { val: "NRW", label: "vor Ort & mobil" },
  { val: "4K", label: "Videoqualität Standard" },
  { val: "48h", label: "Lieferzeit Erstentwurf" },
  { val: "2×", label: "Korrekturschleifen inkl." },
]

export function FotoVideoAbout() {
  return (
    <section id="ueber-uns" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-parchment">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <FadeIn delay={0.1}>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone/30">
            <Image
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80"
              alt="FPZ Kamera-Setup in Bochum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-ink/10" />
            {/* Location tag */}
            <div className="absolute bottom-5 left-5 px-3 py-1.5 bg-ink/70 backdrop-blur-sm rounded-full">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">
                Ruhrgebiet, NRW
              </span>
            </div>
          </div>
          <div className="mt-3 h-px bg-gold/40 w-16" />
        </FadeIn>

        <FadeIn>
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-4 font-medium">
            Über FPZ Foto &amp; Video
          </p>
          <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-ink mb-8">
            Aus dem Ruhrgebiet.
            <br />
            Für NRW und Deutschland.
          </h2>
          <div className="space-y-4 text-mid leading-relaxed text-sm md:text-base max-w-md">
            <p>
              Fapez Medien ist in Waltrop im Ruhrgebiet registriert
              und produziert mit Fokus auf Bochum, NRW und deutschlandweite
              Einsätze für Marken, Unternehmen und Privatpersonen.
            </p>
            <p>
              Ob Produktbild für den Online-Shop, Imagefilm für die Karriereseite
              oder Content-Pakete für Social Media: Wir liefern in professioneller
              Qualität, ohne unnötig lange Vorlaufzeiten.
            </p>
            <p>
              Bundesweite Einsätze möglich. Mobile Equipment. Kein Overhead.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 mt-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display font-light text-[3rem] leading-none text-ink">
                  {s.val}
                </dt>
                <dd className="text-xs tracking-[0.1em] uppercase text-muted mt-2">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

      </div>
    </section>
  )
}
