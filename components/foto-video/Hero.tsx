"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import Link from "next/link"
import Image from "next/image"

export function FotoVideoHero() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } })

      tl.from(".fv-img", {
        scale: 1.08,
        duration: 1.6,
        ease: "power2.out",
      })

      tl.from(".fv-reveal", {
        yPercent: 145,
        duration: 1.0,
        stagger: 0.08,
      }, "-=1.0")

      tl.from(".fv-fade", {
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
      {/* Background */}
      <div className="fv-img absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1800&q=80"
          alt="Professionelle Kameratechnik"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
      </div>

      {/* Top */}
      <div className="relative z-10 flex items-end justify-between pt-4">
        <div className="overflow-hidden">
          <p className="fv-reveal text-[10px] tracking-[0.28em] uppercase text-white/50 font-medium">
            FPZ — Foto &amp; Video
          </p>
        </div>
        <div className="overflow-hidden">
          <span className="fv-reveal text-[10px] tracking-[0.28em] uppercase text-white/50">
            Foto + Video
          </span>
        </div>
      </div>

      {/* Main heading */}
      <div className="relative z-10 py-16 md:py-20 max-w-4xl">
        <h1 className="font-display font-light italic text-[clamp(3rem,7.5vw,7.5rem)] leading-[1.05] tracking-[-0.01em] text-white">
          {["Bilder,", "die verkaufen."].map((line) => (
            <div key={line} style={{ clipPath: "inset(-30% 0 -30% 0)" }}>
              <span className="fv-reveal block">{line}</span>
            </div>
          ))}
        </h1>
      </div>

      {/* Bottom */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
        <p className="fv-fade text-white/76 text-base md:text-lg leading-relaxed max-w-md">
          Produktfotos, kurze Videos und Content-Pakete für Marken, die
          hochwertiger auftreten und schneller verstanden werden wollen.
        </p>

        <div className="fv-fade grid grid-cols-1 sm:flex sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
          <Link
            href="#kontakt"
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium bg-white text-ink hover:bg-cream transition-colors rounded-full"
          >
            Angebot anfragen
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-medium border border-white/35 text-white/82 hover:border-white/55 hover:text-white transition-colors rounded-full"
          >
            Portfolio
          </Link>
        </div>
      </div>

      {/* Gold rule */}
      <div className="relative z-10 mt-14 h-px bg-gold/30" />
    </section>
  )
}
