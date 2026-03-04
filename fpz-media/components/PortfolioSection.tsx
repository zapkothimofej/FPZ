"use client"

import Link from "next/link"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { portfolioItems, type PortfolioItem } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

// Card size → layout/dimension classes, looked up by size key
const CARD_SIZE_CONFIG = {
  large: {
    sizeClasses: "md:col-span-2 md:row-span-2",
    height: "min-h-[360px]",
    previewHeight: "min-h-[160px] md:min-h-[50%]",
  },
  medium: {
    sizeClasses: "md:col-span-1 md:row-span-2",
    height: "min-h-[300px]",
    previewHeight: "min-h-[100px] md:min-h-[42%]",
  },
  small: {
    sizeClasses: "md:col-span-1 md:row-span-1",
    height: "min-h-[240px]",
    previewHeight: "min-h-[88px] md:min-h-[38%]",
  },
} as const

// Per-card gradient variants
const CARD_GRADIENTS: Record<number, string> = {
  1: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
  2: "linear-gradient(150deg, #1a1a1a 0%, #2d1b1b 40%, #4a1515 100%)",
  3: "linear-gradient(160deg, #0d1f0d 0%, #1a2e1a 40%, #0d3320 100%)",
  4: "linear-gradient(140deg, #1e1a0f 0%, #2e2510 40%, #3d3010 100%)",
  5: "linear-gradient(155deg, #1a0d2e 0%, #2d1b4a 40%, #3d1560 100%)",
  6: "linear-gradient(165deg, #0d1e2e 0%, #0f2d3d 40%, #103d4a 100%)",
}

// Animated CSS mockup per project ID
function PortfolioMockup({ id }: { id: number }) {
  const base = "absolute rounded-sm"
  const el = `${base} bg-white`

  if (id === 1) {
    // Browser frame: navbar + hero + 2 cols
    return (
      <div className="v6-mockup-wrapper absolute inset-0 overflow-hidden" style={{ animation: "float 3s ease-in-out infinite" }}>
        <div className={`${el} left-6 right-6 top-6 h-4 opacity-20`} style={{ borderRadius: 3 }} />
        <div className={`${el} left-6 right-6 top-14 h-16 opacity-10`} />
        <div className={`${el} left-6 top-34 right-[52%] h-10 opacity-15`} style={{ top: "7.5rem" }} />
        <div className={`${el} right-6 top-34 left-[52%] h-10 opacity-10`} style={{ top: "7.5rem", marginLeft: 2 }} />
      </div>
    )
  }

  if (id === 2) {
    // Smartphone frame: Reel + play + icons
    return (
      <div className="v6-mockup-wrapper absolute inset-0 flex items-center justify-center overflow-hidden" style={{ animation: "float 3.5s ease-in-out infinite" }}>
        <div className="relative" style={{ width: 56, height: 96 }}>
          <div className={`${el} inset-0 opacity-10`} style={{ borderRadius: 8 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border-2 border-white flex items-center justify-center" style={{ width: 24, height: 24, opacity: 0.5 }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="white"><polygon points="3,2 8,5 3,8" /></svg>
            </div>
          </div>
          <div className={`${el} opacity-20`} style={{ width: 8, height: 8, bottom: 16, left: 8, borderRadius: 2 }} />
          <div className={`${el} opacity-20`} style={{ width: 8, height: 8, bottom: 16, left: 22, borderRadius: 2 }} />
        </div>
      </div>
    )
  }

  if (id === 3) {
    // 3-column product grid with price badges
    return (
      <div className="v6-mockup-wrapper absolute inset-0 overflow-hidden" style={{ animation: "float 4s ease-in-out infinite", padding: "1.5rem" }}>
        {[0, 1, 2].map((col) => (
          <div key={col} className={`${el} absolute opacity-15`} style={{ top: "1.5rem", left: `calc(${col * 33.33}% + 6px + 1.5rem)`, width: "calc(33.33% - 12px)", bottom: "2.5rem", borderRadius: 4 }} />
        ))}
        {[0, 1, 2].map((col) => (
          <div key={col} className={`${el} absolute opacity-30`} style={{ bottom: "1.5rem", right: `calc(${(2 - col) * 33.33}% + 6px + 1rem)`, width: 24, height: 10, borderRadius: 2 }} />
        ))}
      </div>
    )
  }

  if (id === 4) {
    // Logo circle + color swatches + typo bars
    return (
      <div className="v6-mockup-wrapper absolute inset-0 flex items-center justify-center overflow-hidden" style={{ animation: "float 3.2s ease-in-out infinite" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full border-2 border-white opacity-20" style={{ width: 48, height: 48 }} />
          <div className="flex gap-2">
            {["rgba(255,255,255,0.4)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.15)"].map((c, i) => (
              <div key={i} className="rounded-full" style={{ width: 14, height: 14, backgroundColor: c }} />
            ))}
          </div>
          {[80, 60, 45].map((w, i) => (
            <div key={i} className={`${el}`} style={{ width: w, height: 5, opacity: 0.15 + i * 0.05, borderRadius: 2 }} />
          ))}
        </div>
      </div>
    )
  }

  if (id === 5) {
    // Dashboard: big metric + bar chart + pulse ring
    return (
      <div className="v6-mockup-wrapper absolute inset-0 flex items-center justify-center overflow-hidden" style={{ animation: "float 2.8s ease-in-out infinite" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center" style={{ width: 48, height: 48 }}>
            <div className="absolute rounded-full border border-white" style={{ width: 48, height: 48, opacity: 0.2, animation: "pulse-ring 2s ease-out infinite" }} />
            <div className={`${el} opacity-30`} style={{ width: 28, height: 28, borderRadius: "50%" }} />
          </div>
          <div className="flex items-end gap-1">
            {[18, 28, 22, 32, 24].map((h, i) => (
              <div key={i} className={`${el} opacity-20`} style={{ width: 8, height: h, borderRadius: 2 }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // id === 6: Property card with house + stats + map pin
  return (
    <div className="v6-mockup-wrapper absolute inset-0 overflow-hidden" style={{ animation: "float 3.8s ease-in-out infinite", padding: "1.25rem" }}>
      <div className={`${el} opacity-20`} style={{ position: "absolute", top: "1.25rem", left: "1.25rem", right: "1.25rem", height: 40, borderRadius: 6 }} />
      {/* map pin top right */}
      <div className={`${el} opacity-40`} style={{ position: "absolute", top: "1.5rem", right: "1.75rem", width: 8, height: 8, borderRadius: "50%" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} className={`${el} opacity-15`} style={{ position: "absolute", top: `${5.5 + i * 1.2}rem`, left: "1.25rem", width: `${60 - i * 10}%`, height: 5, borderRadius: 2 }} />
      ))}
    </div>
  )
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const cards = gsap.utils.toArray<HTMLElement>(".v6-portfolio-card")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            delay: 0.05 * i,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const inner = e.currentTarget.querySelector(".v6-portfolio-inner") as HTMLElement | null
    const arrow = e.currentTarget.querySelector(".v6-portfolio-arrow") as HTMLElement | null
    const mockup = e.currentTarget.querySelector(".v6-mockup-wrapper") as HTMLElement | null
    if (inner) gsap.to(inner, { scale: 1.02, duration: 0.3, ease: "power2.out" })
    if (arrow) gsap.to(arrow, { opacity: 1, y: 0, duration: 0.2 })
    if (mockup) gsap.to(mockup, { scale: 1.06, duration: 0.4, ease: "power2.out" })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const inner = e.currentTarget.querySelector(".v6-portfolio-inner") as HTMLElement | null
    const arrow = e.currentTarget.querySelector(".v6-portfolio-arrow") as HTMLElement | null
    const mockup = e.currentTarget.querySelector(".v6-mockup-wrapper") as HTMLElement | null
    if (inner) gsap.to(inner, { scale: 1, duration: 0.3, ease: "power2.out" })
    if (arrow) gsap.to(arrow, { opacity: 0, y: 4, duration: 0.2 })
    if (mockup) gsap.to(mockup, { scale: 1, duration: 0.4, ease: "power2.out" })
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 md:py-32 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--v6-bg-elevated)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-3"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
          >
            Ausgewählte Arbeiten
          </p>
          <h2
            className="font-[family-name:var(--font-display)] mb-4"
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              color: "var(--v6-text)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Portfolio
          </h2>
          <p
            className="max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
          >
            Web, Film und Automation — Projekte aus dem Ruhrgebiet.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:[grid-auto-flow:dense] md:[grid-auto-rows:240px]">
          {portfolioItems.map((item: PortfolioItem) => {
            const { sizeClasses, height, previewHeight } = CARD_SIZE_CONFIG[item.size]
            return (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className={`v6-portfolio-card group overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${sizeClasses} ${height}`}
                style={{ opacity: 0, "--tw-ring-color": "var(--v6-accent)", display: "block" } as React.CSSProperties}
                aria-label={`Projekt: ${item.title} — ${item.industry}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="v6-portfolio-inner w-full h-full flex flex-col relative rounded-xl overflow-hidden transition-[box-shadow] duration-300 group-hover:shadow-[var(--v6-shadow-card-hover)]"
                  style={{
                    backgroundColor: "var(--v6-bg)",
                    minHeight: "inherit",
                    height: "100%",
                    border: "1px solid var(--v6-border)",
                  }}
                >
                  {/* Preview-Bereich */}
                  <div
                    className={`relative shrink-0 ${previewHeight}`}
                    style={{
                      background: CARD_GRADIENTS[item.id] ?? "linear-gradient(180deg, var(--v6-bg-elevated) 0%, var(--v6-bg) 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent 0, transparent 19px, var(--v6-border) 20px), repeating-linear-gradient(90deg, transparent 0, transparent 19px, var(--v6-border) 20px)",
                      }}
                    />

                    {/* Animiertes Mockup */}
                    <PortfolioMockup id={item.id} />

                    {/* Result-Badge oben links */}
                    <span
                      className="absolute top-4 left-4 text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-md font-semibold z-10"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontFamily: "var(--font-body)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {item.result}
                    </span>

                    {/* Jahr oben rechts */}
                    <span
                      className="absolute top-4 right-4 text-[11px] font-semibold z-10"
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {item.year}
                    </span>

                    {/* Arrow bottom right */}
                    <span
                      aria-hidden="true"
                      className="v6-portfolio-arrow absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full border opacity-0 transition-colors duration-200 group-hover:bg-[var(--v6-accent)] group-hover:text-[var(--v6-text-on-accent)] group-hover:border-[var(--v6-accent)] z-10"
                      style={{
                        borderColor: "var(--v6-border)",
                        color: "var(--v6-accent)",
                        transform: "translateY(4px)",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </div>

                  {/* Inhalt */}
                  <div className="flex flex-col justify-end flex-1 p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-md"
                          style={{
                            backgroundColor: "var(--v6-bg-elevated)",
                            color: "var(--v6-text-muted)",
                            fontFamily: "var(--font-body)",
                            border: "1px solid var(--v6-border)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="font-[family-name:var(--font-display)] mb-1"
                      style={{
                        fontSize: "clamp(18px, 2.2vw, 26px)",
                        color: "var(--v6-text)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[12px] leading-relaxed mt-1"
                      style={{
                        color: "var(--v6-text-muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {item.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}

          {/* CTA-Karte */}
          <div
            className={`v6-portfolio-card group overflow-hidden rounded-xl ${CARD_SIZE_CONFIG.small.sizeClasses} ${CARD_SIZE_CONFIG.small.height}`}
            style={{ opacity: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#contact"
              className="v6-portfolio-inner w-full h-full flex flex-col items-center justify-center relative rounded-xl overflow-hidden transition-[box-shadow] duration-300 group-hover:shadow-[var(--v6-shadow-card-hover)]"
              style={{
                display: "flex",
                background: "linear-gradient(135deg, var(--v6-bg) 0%, var(--v6-bg-elevated) 100%)",
                minHeight: "inherit",
                height: "100%",
                border: "1px dashed var(--v6-border)",
                textDecoration: "none",
              }}
              aria-label="Dein Projekt hier? Jetzt anfragen"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-[var(--v6-accent)]"
                style={{ border: "1px solid var(--v6-border)" }}
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--v6-accent)" }}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <p
                className="font-[family-name:var(--font-display)] text-center px-6"
                style={{
                  fontSize: "clamp(16px, 2vw, 22px)",
                  color: "var(--v6-text)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                Dein Projekt hier?
              </p>
              <p
                className="text-[11px] tracking-[0.1em] uppercase mt-2"
                style={{ color: "var(--v6-accent)", fontFamily: "var(--font-body)" }}
              >
                Jetzt anfragen →
              </p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 md:mt-20 text-center">
          <p
            className="text-[13px] tracking-[0.06em] mb-3"
            style={{
              color: "var(--v6-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Alle Projekte auf Anfrage
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-semibold transition-colors duration-200 hover:text-[var(--v6-accent)]"
            style={{
              color: "var(--v6-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Projekt anfragen
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
