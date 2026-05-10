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

      tl.from(".hero-copy", {
        y: 12,
        duration: 0.8,
        stagger: 0.08,
      }, "-=0.45")

      tl.from(".section-card", {
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
      <section className="flex-1 flex flex-col px-6 md:px-12 lg:px-16 pt-24 pb-0 overflow-hidden">

        {/* Top meta row */}
        <div className="flex items-end justify-between pt-8 pb-10">
          <span className="hero-copy flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-white/62">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
            FPZ aus Bochum
          </span>
          <span className="hero-copy hidden sm:inline text-xs tracking-[0.22em] uppercase text-white/55">
            Web · KI · Foto · Video
          </span>
        </div>

        {/* Decorative rule */}
        <div className="deco-rule h-px bg-white/10 mb-12" />

        {/* Main heading */}
        <div className="flex-1 flex flex-col justify-center min-w-0 w-full">
          <h1 className="hero-copy font-display font-light italic text-[clamp(2.55rem,7.5vw,8rem)] leading-[1.03] text-white max-w-full md:max-w-6xl">
            <span className="block md:inline">Websites &amp;</span>{" "}
            <span className="block md:inline">Automationen.</span>
            <span className="block">Foto &amp; Video für Unternehmen.</span>
          </h1>

          <div className="mt-8 md:mt-10 flex flex-col lg:flex-row lg:items-start gap-8 lg:justify-between w-full max-w-80 md:max-w-6xl">
            <p className="hero-copy text-white/74 text-base md:text-lg leading-relaxed max-w-full md:max-w-xl">
              Wählen Sie direkt, was Sie brauchen: Web &amp; KI für Websites und
              Workflows oder Foto &amp; Video für Produkte, Events und Content.
            </p>

            <div className="hero-copy grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-full lg:max-w-xl">
              <HeroChoice
                href="/web-ki"
                label="Website / Automation"
                title="Web & KI"
                body="Für Unternehmen, die online klarer wirken oder manuelle Arbeit reduzieren wollen."
              />
              <HeroChoice
                href="/foto-video"
                label="Fotos / Videos"
                title="Foto & Video"
                body="Für Produkte, Marken und Events, die hochwertiger gezeigt werden sollen."
              />
            </div>
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
          tagline="Website & Automation"
          desc="Für Unternehmen, die eine bessere Website brauchen oder wiederkehrende Arbeit aus ihren Abläufen holen wollen."
          services={["Websites", "Automationen", "KI-Anbindungen"]}
          image="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=900&q=80"
          borderRight
        />
        <SectionCard
          num="02"
          href="/foto-video"
          title="Foto & Video"
          tagline="Fotos, Video, Social"
          desc="Für Marken, Produkte und Events, die klarer, hochwertiger und verkaufsnäher gezeigt werden sollen."
          services={["Produktfotos", "Imagefilm", "Social Content"]}
          image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80"
        />
      </section>
    </div>
  )
}

function HeroChoice({
  href,
  label,
  title,
  body,
}: {
  href: string
  label: string
  title: string
  body: string
}) {
  return (
    <Link
      href={href}
      className="group min-w-0 border border-white/14 rounded-lg p-4 md:p-5 bg-white/[0.035] hover:bg-white/[0.07] hover:border-gold/45 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-gold/82">
        {label}
      </span>
      <span className="mt-3 flex items-center justify-between gap-4">
        <span className="font-display text-3xl font-light italic text-white leading-none">
          {title}
        </span>
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          className="text-white/62 group-hover:text-white group-hover:translate-x-1 transition-all"
          aria-hidden="true"
        >
          <path d="M1 6h14M10 1l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="mt-3 block text-sm leading-relaxed text-white/64 group-hover:text-white/76 transition-colors">
        {body}
      </span>
    </Link>
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
