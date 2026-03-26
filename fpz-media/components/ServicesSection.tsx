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

      // Animate each service block with staggered children
      gsap.utils.toArray<HTMLElement>(".v6-service-block").forEach((block) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        })

        // Background number scales + fades in
        const bgNum = block.querySelector(".v6-bg-number")
        if (bgNum) {
          tl.fromTo(
            bgNum,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 0.04, duration: 1.2, ease: "power2.out" },
            0
          )
        }

        // Divider line draws in from left
        const dividerTop = block.querySelector(".v6-divider-top")
        if (dividerTop) {
          tl.fromTo(
            dividerTop,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
            0
          )
        }

        // Counter slides up
        const counter = block.querySelector(".v6-counter")
        if (counter) {
          tl.fromTo(
            counter,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            0.1
          )
        }

        // Title slides up
        const title = block.querySelector(".v6-title")
        if (title) {
          tl.fromTo(
            title,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.2
          )
        }

        // Headline slides up
        const headline = block.querySelector(".v6-headline")
        if (headline) {
          tl.fromTo(
            headline,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.35
          )
        }

        // Description fades in
        const desc = block.querySelector(".v6-desc")
        if (desc) {
          tl.fromTo(
            desc,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.45
          )
        }

        // Content divider draws in
        const contentDivider = block.querySelector(".v6-content-divider")
        if (contentDivider) {
          tl.fromTo(
            contentDivider,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
            0.55
          )
        }

        // Deliverables stagger in
        const items = block.querySelectorAll(".v6-deliverable")
        if (items.length) {
          tl.fromTo(
            items,
            { x: -15, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 },
            0.6
          )
        }
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
          }}
        >
          {/* Divider top */}
          <div
            className="v6-divider-top absolute top-0 left-8 right-8 md:left-16 md:right-16 lg:left-24 lg:right-24"
            style={{ height: "1px", backgroundColor: "var(--v6-border)" }}
          />

          <div className="py-20 md:py-28 px-8 md:px-16 lg:px-24 relative">
            {/* Background number */}
            <div
              className="v6-bg-number absolute select-none pointer-events-none font-[family-name:var(--font-display)]"
              aria-hidden="true"
              style={{
                top: "50%",
                right: "5%",
                transform: "translateY(-50%)",
                fontSize: "clamp(180px, 28vw, 420px)",
                color: "var(--v6-accent)",
                opacity: 0,
                lineHeight: 1,
              }}
            >
              {service.number}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
              <p
                className="v6-counter text-[13px] tracking-[0.3em] uppercase mb-8 font-semibold"
                style={{ color: "var(--v6-text-muted)", fontFamily: "var(--font-body)", opacity: 0 }}
              >
                {service.number} / {String(services.length).padStart(2, "0")}
              </p>

              <h3
                className="v6-title font-[family-name:var(--font-display)] mb-6 tracking-tight"
                style={{
                  fontSize: "clamp(40px, 7vw, 100px)",
                  color: "var(--v6-text)",
                  lineHeight: 0.92,
                  opacity: 0,
                }}
              >
                {service.title}
              </h3>

              <p
                className="v6-headline mb-8 italic"
                style={{
                  color: "var(--v6-accent)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2.2vw, 28px)",
                  opacity: 0,
                }}
              >
                {service.headline}
              </p>

              <p
                className="v6-desc leading-relaxed mb-10"
                style={{
                  color: "var(--v6-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  maxWidth: "520px",
                  opacity: 0,
                }}
              >
                {service.description}
              </p>

              <div
                className="v6-content-divider mb-8"
                style={{ height: "1px", backgroundColor: "var(--v6-border)", maxWidth: "520px" }}
              />

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ maxWidth: "520px" }}>
                {service.deliverables.map((d, j) => (
                  <li
                    key={j}
                    className="v6-deliverable flex items-center gap-3"
                    style={{
                      color: "var(--v6-text-muted)",
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(13px, 1vw, 15px)",
                      opacity: 0,
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
