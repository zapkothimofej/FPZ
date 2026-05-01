"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Link from "next/link"

gsap.registerPlugin(useGSAP)

export function WebKiHero() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } })

      tl.from(".wk-reveal", {
        yPercent: 110,
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
      className="relative min-h-screen flex flex-col justify-between bg-ink dark:bg-dark px-6 md:px-12 lg:px-16 pt-28 pb-14 overflow-hidden"
    >
      {/* Large background FPZ watermark */}
      <span
        className="absolute -bottom-8 -right-4 font-display font-light text-[22vw] leading-none text-white/[0.03] pointer-events-none select-none"
        aria-hidden="true"
      >
        FPZ
      </span>

      {/* Top */}
      <div className="flex items-end justify-between pt-4">
        <div className="overflow-hidden">
          <p className="wk-reveal text-[10px] tracking-[0.28em] uppercase text-white/40 font-medium">
            FPZ — Web &amp; KI
          </p>
        </div>
        <div className="overflow-hidden">
          <span className="wk-reveal text-[10px] tracking-[0.28em] uppercase text-white/30">
            B2B
          </span>
        </div>
      </div>

      {/* Main heading */}
      <div className="py-16 md:py-20 max-w-4xl">
        <div className="space-y-0">
          {["Digitale Präsenz,", "die überzeugt."].map((line) => (
            <div key={line} className="overflow-hidden leading-none">
              <h1 className="wk-reveal font-display font-light italic text-[clamp(3rem,7.5vw,7.5rem)] leading-[1.05] tracking-[-0.01em] text-white">
                {line}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
        <p className="wk-fade text-white/55 text-base md:text-lg leading-relaxed max-w-md">
          Wir entwickeln Websites und KI-Systeme, die Ihr Unternehmen
          voranbringen — messbar, zuverlässig, modern.
        </p>

        <div className="wk-fade flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href="#kontakt"
            className="inline-flex items-center justify-center px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium bg-cream text-ink hover:bg-white transition-colors rounded-full"
          >
            Projekt starten
          </Link>
          <Link
            href="#leistungen"
            className="inline-flex items-center justify-center px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-colors rounded-full"
          >
            Leistungen
          </Link>
        </div>
      </div>

      {/* Thin gold bottom rule */}
      <div className="mt-14 h-px bg-gold/30" />
    </section>
  )
}
