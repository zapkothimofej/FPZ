"use client"

import { useRef, useCallback } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { portfolioPlaceholders } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

// Per-card gradient variants — each card gets a distinct colour accent
const CARD_GRADIENTS: Record<number, string> = {
  1: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
  2: "linear-gradient(150deg, #1a1a1a 0%, #2d1b1b 40%, #4a1515 100%)",
  3: "linear-gradient(160deg, #0d1f0d 0%, #1a2e1a 40%, #0d3320 100%)",
  4: "linear-gradient(140deg, #1e1a0f 0%, #2e2510 40%, #3d3010 100%)",
  5: "linear-gradient(155deg, #1a0d2e 0%, #2d1b4a 40%, #3d1560 100%)",
  6: "linear-gradient(165deg, #0d1e2e 0%, #0f2d3d 40%, #103d4a 100%)",
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

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const inner = e.currentTarget.querySelector(".v6-portfolio-inner") as HTMLElement
    const arrow = e.currentTarget.querySelector(".v6-portfolio-arrow") as HTMLElement
    if (inner) gsap.to(inner, { scale: 1.02, duration: 0.3, ease: "power2.out" })
    if (arrow) gsap.to(arrow, { opacity: 1, y: 0, duration: 0.2 })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const inner = e.currentTarget.querySelector(".v6-portfolio-inner") as HTMLElement
    const arrow = e.currentTarget.querySelector(".v6-portfolio-arrow") as HTMLElement
    if (inner) gsap.to(inner, { scale: 1, duration: 0.3, ease: "power2.out" })
    if (arrow) gsap.to(arrow, { opacity: 0, y: 4, duration: 0.2 })
  }, [])

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"
      case "medium":
        return "md:col-span-1 md:row-span-2"
      default:
        return "md:col-span-1 md:row-span-1"
    }
  }

  const getHeight = (size: string) => {
    switch (size) {
      case "large":
        return "min-h-[360px]"
      case "medium":
        return "min-h-[300px]"
      default:
        return "min-h-[240px]"
    }
  }

  const getPreviewHeight = (size: string) => {
    switch (size) {
      case "large":
        return "min-h-[160px] md:min-h-[50%]"
      case "medium":
        return "min-h-[100px] md:min-h-[42%]"
      default:
        return "min-h-[88px] md:min-h-[38%]"
    }
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
          {portfolioPlaceholders.map((item) => (
            <div
              key={item.id}
              role="article"
              tabIndex={0}
              aria-label={`Projekt: ${item.title} — ${item.industry} (demnächst)`}
              className={`v6-portfolio-card group cursor-pointer overflow-hidden rounded-xl ${getSizeClasses(item.size)} ${getHeight(item.size)}`}
              style={{ opacity: 0 }}
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
                  className={`relative shrink-0 ${getPreviewHeight(item.size)}`}
                  style={{
                    background: CARD_GRADIENTS[item.id] ?? "linear-gradient(180deg, var(--v6-bg-elevated) 0%, var(--v6-bg) 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent 0, transparent 19px, var(--v6-border) 20px), repeating-linear-gradient(90deg, transparent 0, transparent 19px, var(--v6-border) 20px)",
                    }}
                  />
                  {/* Demnächst-Badge */}
                  <span
                    className="absolute top-4 left-4 text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-md font-semibold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "var(--font-body)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Demnächst
                  </span>
                  <span
                    className="absolute top-4 right-4 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,56px)] leading-none select-none"
                    style={{ color: "rgba(255,255,255,0.1)", opacity: 0.8 }}
                    aria-hidden
                  >
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="v6-portfolio-arrow absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full border opacity-0 transition-colors duration-200 group-hover:bg-[var(--v6-accent)] group-hover:text-[var(--v6-text-on-accent)] group-hover:border-[var(--v6-accent)]"
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
                    className="text-[12px] tracking-[0.08em] uppercase"
                    style={{
                      color: "var(--v6-text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {item.industry}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* CTA-Karte: Dein Projekt hier? */}
          <div
            role="article"
            className={`v6-portfolio-card group overflow-hidden rounded-xl ${getSizeClasses("small")} ${getHeight("small")}`}
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
            Echte Kundenprojekte folgen — Demnächst
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
