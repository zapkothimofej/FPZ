"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap, useGSAP } from "@/lib/gsap"

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.from(".deco-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.inOut",
      })

      tl.from(".reveal-line", {
        yPercent: 145,
        duration: 1.05,
        stagger: 0.09,
        ease: "power4.out",
      }, "-=0.55")

      tl.from(".hero-meta", {
        autoAlpha: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.08,
      }, "-=0.45")

      tl.from(".section-card", {
        autoAlpha: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.12,
      }, "-=0.3")
    },
    { scope: root }
  )

  return (
    <div ref={root} className="md:min-h-svh flex flex-col bg-ink">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col px-6 md:px-12 lg:px-16 pt-24 pb-0">

        {/* Top meta row */}
        <div className="flex items-end justify-between pt-8 pb-12">
          <span className="hero-meta flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-white/62">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
            Bochum, NRW
          </span>
          <span className="hero-meta text-xs tracking-[0.22em] uppercase text-white/55">
            2025
          </span>
        </div>

        {/* Decorative rule */}
        <div className="deco-rule h-px bg-white/10 mb-14" />

        {/* Main heading */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-display font-light italic text-[clamp(3.8rem,8.5vw,8.5rem)] leading-[1.05] tracking-[-0.01em] text-white space-y-1">
            {["Klarer Auftritt.", "Smarte Abläufe.", "Starke Bilder."].map((word) => (
              <div key={word} style={{ clipPath: "inset(-30% 0 -30% 0)" }}>
                <span className="reveal-line block">{word}</span>
              </div>
            ))}
          </h1>

          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-end gap-6 sm:justify-between max-w-5xl">
            <p className="hero-meta text-white/72 text-base md:text-lg leading-relaxed max-w-md">
              Websites, Automatisierungen und visuelle Inhalte, die nicht nur gut aussehen.
              <br />
              Sondern Kunden schneller verstehen lassen, warum sie anfragen sollen.
            </p>
            <Link
              href="#bereiche"
              aria-label="Bereiche entdecken"
              className="hero-meta inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors self-start sm:self-auto"
            >
              <span>Entdecken</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-bounce">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-white/8 py-4 mt-14">
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-10 pl-10">
              <span className="text-[11px] tracking-[0.22em] uppercase text-white/48">
                {item}
              </span>
              <span className="text-white/15 text-xs select-none">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Section cards ────────────────────────────────── */}
      <section
        id="bereiche"
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <SectionCard
          num="01"
          href="/web-ki"
          title="Web & KI"
          tagline="B2B — Website & Automation"
          desc="Für Unternehmen, die eine bessere Website brauchen oder wiederkehrende Arbeit aus ihren Abläufen holen wollen."
          services={["Websites", "Automationen", "KI-Anbindungen"]}
          image="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=900&q=80"
          borderRight
        />
        <SectionCard
          num="02"
          href="/foto-video"
          title="Foto & Video"
          tagline="B2C — Foto & Video"
          desc="Für Marken, Produkte und Events, die klarer, hochwertiger und verkaufsnäher gezeigt werden sollen."
          services={["Produktfotos", "Imagefilm", "Social Content"]}
          image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80"
        />
      </section>
    </div>
  )
}

const MARQUEE_ITEMS = [
  "Webseitenerstellung",
  "Automatisierungen",
  "Produktfotografie",
  "Imagefilm",
  "Event-Dokumentation",
  "Social Media Content",
]

function SectionCard({
  num,
  href,
  title,
  tagline,
  desc,
  services,
  image,
  borderRight,
}: {
  num: string
  href: string
  title: string
  tagline: string
  desc: string
  services: string[]
  image: string
  borderRight?: boolean
}) {
  return (
    <Link
      href={href}
      className={`section-card group relative block overflow-hidden min-h-[480px] md:min-h-[560px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/60 ${
        borderRight ? "md:border-r border-white/8" : ""
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-ink/75 group-hover:bg-ink/65 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-14 lg:p-16">
        <div className="flex items-start justify-between">
          <span className="font-display text-5xl font-light text-white/50 leading-none">
            {num}
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
            {tagline}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-display font-light italic text-[clamp(2.5rem,4vw,4rem)] leading-tight text-white mb-4">
              {title}
            </h2>
            <p className="text-white/72 text-sm md:text-base leading-relaxed max-w-sm group-hover:text-white/85 transition-colors duration-300">
              {desc}
            </p>
          </div>

          <ul className="space-y-1.5">
            {services.map((s) => (
              <li
                key={s}
                className="text-xs tracking-[0.1em] text-white/58 flex items-center gap-2 group-hover:text-white/75 transition-colors duration-300"
              >
                <span className="w-3 h-px bg-gold/50 inline-block flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/78 font-medium group-hover:gap-3 transition-all duration-300 group-hover:text-white">
            <span>Mehr erfahren</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
