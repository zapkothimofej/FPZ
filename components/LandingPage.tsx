"use client"

import { useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MARQUEE_ITEMS = [
  "Webseitenerstellung",
  "Automatisierungen",
  "OpenAI-Anbindungen",
  "Produktfotografie",
  "Imagefilm",
  "Event-Dokumentation",
  "Social Media Content",
]

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
        yPercent: 115,
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
        y: 28,
        duration: 0.85,
        stagger: 0.14,
      }, "-=0.3")
    },
    { scope: root }
  )

  return (
    <div ref={root} className="min-h-screen flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col px-6 md:px-12 lg:px-16 pt-24 pb-0">

        {/* Top meta row */}
        <div className="flex items-end justify-between pt-8 pb-12">
          <span className="hero-meta flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
            Bochum, NRW
          </span>
          <span className="hero-meta text-xs tracking-[0.22em] uppercase text-muted">
            2025
          </span>
        </div>

        {/* Decorative rule */}
        <div className="deco-rule h-px bg-stone dark:bg-stone/25 mb-14" />

        {/* Main heading — three lines, each in overflow-hidden */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-1">
            {["Websites.", "KI-Systeme.", "Visuals."].map((word) => (
              <div key={word} className="overflow-hidden leading-[1.05]">
                <h1 className="reveal-line font-display font-light italic text-[clamp(3.8rem,8.5vw,8.5rem)] leading-none tracking-[-0.01em] text-ink dark:text-cream">
                  {word}
                </h1>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-end gap-6 sm:justify-between max-w-5xl">
            <p className="hero-meta text-mid dark:text-muted text-base md:text-lg leading-relaxed max-w-sm">
              Zwei Bereiche. Ein Anspruch.
              <br />
              Digitale Exzellenz für moderne Unternehmen.
            </p>
            <Link
              href="#bereiche"
              className="hero-meta inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted hover:text-ink dark:hover:text-cream transition-colors self-start sm:self-auto"
            >
              <span>Entdecken</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-stone/60 dark:border-stone/15 py-4 mt-14">
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-10 pl-10">
              <span className="text-[11px] tracking-[0.22em] uppercase text-muted dark:text-muted/70">
                {item}
              </span>
              <span className="text-stone dark:text-stone/30 text-xs select-none">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Section cards ────────────────────────────────── */}
      <section
        id="bereiche"
        className="grid grid-cols-1 md:grid-cols-2 border-t border-stone/60 dark:border-stone/15"
      >
        <SectionCard
          num="01"
          href="/web-ki"
          title="Web & KI"
          tagline="B2B — Digitale Systeme"
          desc="Professionelle Websites, Prozessautomatisierungen und KI-Integrationen — für Unternehmen, die wachsen wollen."
          services={["Webseitenerstellung", "Automatisierungen", "OpenAI-Anbindungen"]}
          borderRight
        />
        <SectionCard
          num="02"
          href="/foto-video"
          title="Foto & Video"
          tagline="B2C — Visuelle Produktion"
          desc="Produktfotografie, Imagefilme, Event-Dokumentationen und Social Media Content, der bleibt."
          services={["Produktfotografie", "Imagefilm", "Social Content"]}
        />
      </section>
    </div>
  )
}

function SectionCard({
  num,
  href,
  title,
  tagline,
  desc,
  services,
  borderRight,
}: {
  num: string
  href: string
  title: string
  tagline: string
  desc: string
  services: string[]
  borderRight?: boolean
}) {
  return (
    <Link
      href={href}
      className={`section-card group block p-10 md:p-14 lg:p-16 relative overflow-hidden transition-colors hover:bg-parchment dark:hover:bg-dark-soft ${
        borderRight ? "md:border-r border-stone/60 dark:border-stone/15" : ""
      }`}
    >
      {/* Giant decorative number */}
      <span
        className="absolute top-6 right-8 font-display font-light text-[7rem] leading-none text-stone/25 dark:text-stone/10 pointer-events-none select-none transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1"
        aria-hidden="true"
      >
        {num}
      </span>

      <div className="relative space-y-8">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4 font-medium">
            {tagline}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-ink dark:text-cream leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-mid dark:text-muted text-sm md:text-base leading-relaxed max-w-xs">
            {desc}
          </p>
        </div>

        <ul className="space-y-1.5">
          {services.map((s) => (
            <li
              key={s}
              className="text-xs tracking-[0.1em] text-muted dark:text-muted/70 flex items-center gap-2"
            >
              <span className="w-3 h-px bg-gold/60 inline-block flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-ink dark:text-cream font-medium transition-gap duration-300 group-hover:gap-3">
          <span>Mehr erfahren</span>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M1 5h12M8 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}
