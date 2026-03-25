"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { services } from "@/lib/content-de"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      gsap.utils.toArray<HTMLElement>(".v6-service-block").forEach((block) => {
        gsap.fromTo(
          block,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="services" style={{ backgroundColor: "var(--v6-bg)" }}>
      {/* Section heading */}
      <div className="pt-16 md:pt-32 pb-12 px-8 md:px-16 lg:px-24">
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
        >
          Leistungen
        </p>
        <h2
          className="font-[family-name:var(--font-display)]"
          style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "var(--v6-text)" }}
        >
          Unsere Leistungen
        </h2>
      </div>

      {/* Service blocks */}
      {services.map((service, i) => (
        <div
          key={service.id}
          className="v6-service-block relative overflow-hidden"
          style={{
            backgroundColor: i % 2 === 0 ? "var(--v6-bg)" : "var(--v6-bg-elevated)",
            opacity: 0,
          }}
        >
          {/* Divider top */}
          <div
            className="absolute top-0 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24"
            style={{ height: "1px", backgroundColor: "var(--v6-border)" }}
          />

          <div className="py-20 md:py-28 px-8 md:px-16 lg:px-24 relative">
            {/* Background number */}
            <div
              className="absolute select-none pointer-events-none font-[family-name:var(--font-display)]"
              aria-hidden="true"
              style={{
                top: "50%",
                right: "5%",
                transform: "translateY(-50%)",
                fontSize: "clamp(180px, 28vw, 420px)",
                color: "var(--v6-accent)",
                opacity: 0.04,
                lineHeight: 1,
              }}
            >
              {service.number}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
              <p
                className="text-[13px] tracking-[0.3em] uppercase mb-8 font-semibold"
                style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)" }}
              >
                {service.number} / {String(services.length).padStart(2, "0")}
              </p>

              <h3
                className="font-[family-name:var(--font-display)] mb-6 tracking-tight"
                style={{
                  fontSize: "clamp(40px, 7vw, 100px)",
                  color: "var(--v6-text)",
                  lineHeight: 0.92,
                }}
              >
                {service.title}
              </h3>

              <p
                className="mb-8 italic"
                style={{
                  color: "var(--v6-accent)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2.2vw, 28px)",
                }}
              >
                {service.headline}
              </p>

              <p
                className="leading-relaxed mb-10"
                style={{
                  color: "var(--v6-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  maxWidth: "520px",
                }}
              >
                {service.description}
              </p>

              <div className="mb-8" style={{ height: "1px", backgroundColor: "var(--v6-border)", maxWidth: "520px" }} />

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ maxWidth: "520px" }}>
                {service.deliverables.map((d, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3"
                    style={{
                      color: "var(--v6-text-muted)",
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(13px, 1vw, 15px)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--v6-accent)" }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ServicesSection
