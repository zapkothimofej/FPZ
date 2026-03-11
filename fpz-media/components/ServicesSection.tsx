"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { services } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sliderRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const wrapper = wrapperRef.current
    const slider  = sliderRef.current
    if (!wrapper || !slider) return

    const totalScrollWidth = (services.length - 1) * window.innerWidth

    const updateDots = (progress: number) => {
      const activeIdx = Math.round(progress * (services.length - 1))
      document.querySelectorAll<HTMLElement>(".v6-panel-dot").forEach((dot, i) => {
        dot.style.width           = i === activeIdx ? "24px" : "6px"
        dot.style.backgroundColor = i === activeIdx ? "var(--v6-accent)" : "var(--v6-border)"
      })
    }

    ScrollTrigger.create({
      trigger : wrapper,
      start   : "top top",
      end     : "bottom bottom",
      scrub   : 1,
      snap    : {
        snapTo  : 1 / (services.length - 1),
        duration: { min: 0.2, max: 0.5 },
        ease    : "power2.inOut",
      },
      onUpdate: (self) => {
        slider.scrollLeft = self.progress * totalScrollWidth
        updateDots(self.progress)
      },
    })
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} id="services" style={{ height: `${services.length * 100}vh` }}>
      <section className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* Section heading */}
        <div className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 pointer-events-none">
          <h2 className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)", fontWeight: "normal" }}>
            Unsere Leistungen
          </h2>
        </div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {services.map((_, i) => (
            <span key={i} className="v6-panel-dot rounded-full transition-all duration-300"
              style={{ width: "6px", height: "6px", backgroundColor: "var(--v6-border)" }} />
          ))}
        </div>

        {/* Horizontal slider — scrollLeft driven by ScrollTrigger, not user interaction */}
        <div
          ref={sliderRef}
          className="flex h-full"
          style={{ overflowX: "hidden" }}
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              className="v6-service-panel relative flex flex-col justify-center overflow-hidden"
              style={{
                minWidth       : "100vw",
                height         : "100%",
                backgroundColor: "var(--v6-bg-elevated)",
                borderRight    : i < services.length - 1 ? "1px solid var(--v6-border)" : "none",
                flexShrink     : 0,
              } as React.CSSProperties}
            >
              {/* Background number */}
              <div className="absolute select-none pointer-events-none font-[family-name:var(--font-display)]"
                aria-hidden
                style={{
                  top      : "38%",
                  right    : "8%",
                  transform: "translateY(-50%)",
                  fontSize : "clamp(200px, 32vw, 480px)",
                  color    : "var(--v6-accent)",
                  opacity  : 0.06,
                  lineHeight: 1,
                }}>
                {service.number}
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 md:px-24 lg:px-32 max-w-4xl">
                <p className="text-[13px] tracking-[0.3em] uppercase mb-8 font-semibold"
                  style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}>
                  {service.number} / {String(services.length).padStart(2, "0")}
                </p>
                <h3 className="font-[family-name:var(--font-display)] mb-6 tracking-tight"
                  style={{ fontSize: "clamp(56px, 9vw, 130px)", color: "var(--v6-text)", lineHeight: 0.92 }}>
                  {service.title}
                </h3>
                <p className="mb-8 italic"
                  style={{ color: "var(--v6-accent)", fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.5vw, 32px)" }}>
                  {service.headline}
                </p>
                <p className="leading-relaxed mb-10"
                  style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.2vw, 18px)", maxWidth: "520px" }}>
                  {service.description}
                </p>
                <div className="mb-8" style={{ height: "1px", backgroundColor: "var(--v6-border)", maxWidth: "520px" }} />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ maxWidth: "520px" }}>
                  {service.deliverables.map((d, j) => (
                    <li key={j} className="flex items-center gap-3"
                      style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1vw, 15px)" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--v6-accent)" }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {i === 0 && (
                <div className="absolute bottom-10 right-14 flex items-center gap-2 animate-pulse"
                  style={{ color: "var(--v6-text-muted)", fontSize: "11px", letterSpacing: "0.15em", fontWeight: 600 }}>
                  <span>SCROLLEN ZUM ENTDECKEN</span>
                  <svg width="28" height="10" viewBox="0 0 28 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M0 5h26M21 1l6 4-6 4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ServicesSection
