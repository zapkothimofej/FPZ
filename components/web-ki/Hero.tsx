"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap, useGSAP } from "@/lib/gsap"
import Link from "next/link"

export function WebKiHero() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(".wk-img", { scale: 1.08 }, {
        scale: 1.0,
        duration: 2.2,
        ease: "power2.out",
      })

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } })

      tl.from(".wk-reveal", {
        yPercent: 145,
        duration: 1.0,
        stagger: 0.08,
      })

      tl.from(".wk-fade", {
        autoAlpha: 0,
        y: 18,
        duration: 0.75,
        stagger: 0.1,
      }, "-=0.4")
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="relative min-h-svh flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-28 pb-14 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1800&q=80"
          alt=""
          fill
          priority
          className="wk-img object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" />
      </div>

      {/* Top */}
      <div className="relative z-10 flex items-end justify-between pt-4">
        <div className="overflow-hidden">
          <p className="wk-reveal text-[10px] tracking-[0.28em] uppercase text-white/62 font-medium">
            FPZ — Web &amp; KI
          </p>
        </div>
        <div className="overflow-hidden">
          <span className="wk-reveal text-[10px] tracking-[0.28em] uppercase text-white/50">
            Websites + Automationen
          </span>
        </div>
      </div>

      {/* Main heading */}
      <div className="relative z-10 py-16 md:py-20 max-w-4xl">
        <h1 className="font-display font-light italic text-[clamp(3rem,7.5vw,7.5rem)] leading-[1.05] tracking-[-0.01em] text-white">
          {["Mehr Anfragen.", "Weniger Handarbeit."].map((line) => (
            <div key={line} style={{ clipPath: "inset(-30% 0 -30% 0)" }}>
              <span className="wk-reveal block">{line}</span>
            </div>
          ))}
        </h1>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
        <p className="wk-fade text-white/76 text-base md:text-lg leading-relaxed max-w-md">
          Wir bauen klare Websites und kleine Automationen für Unternehmen,
          die online professioneller wirken und interne Arbeit reduzieren wollen.
        </p>

        <div className="wk-fade grid grid-cols-1 sm:flex sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
          <Link
            href="#kontakt"
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium bg-cream text-ink hover:bg-white transition-colors rounded-full"
          >
            Gespräch anfragen
          </Link>
          <Link
            href="#leistungen"
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium border border-white/35 text-white/82 hover:border-white/55 hover:text-white transition-colors rounded-full"
          >
            Leistungen
          </Link>
        </div>
      </div>

      {/* Thin gold bottom rule */}
      <div className="relative z-10 mt-14 h-px bg-gold/30" />
    </section>
  )
}
