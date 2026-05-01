"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Logo } from "./Logo"

gsap.registerPlugin(useGSAP)

const SIDES = {
  "web-ki": {
    label: "Web & KI",
    sub: "Digitale Systeme für Ihr Unternehmen",
    tags: ["Webseiten", "Automatisierungen", "OpenAI-Anbindungen"],
    href: "/web-ki",
    bg: "#0A0A0A",
    fg: "#FAFAF9",
    fgMuted: "#9A9A97",
  },
  "foto-video": {
    label: "Foto & Video",
    sub: "Visuals, die Ihre Geschichte erzählen",
    tags: ["Produktfotografie", "Imagefilm", "Social Content"],
    href: "/foto-video",
    bg: "#FAFAF9",
    fg: "#0A0A0A",
    fgMuted: "#6B6B68",
  },
}

export function SplitLanding() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useGSAP(
    () => {
      gsap.from([leftRef.current, rightRef.current], {
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      })
    },
    { scope: containerRef }
  )

  function onHover(side: "left" | "right") {
    if (window.innerWidth < 768) return
    const [hovered, other] = side === "left" ? [leftRef, rightRef] : [rightRef, leftRef]
    gsap.to(hovered.current, { flexBasis: "60%", duration: 0.55, ease: "power2.out" })
    gsap.to(other.current, { flexBasis: "40%", duration: 0.55, ease: "power2.out" })
  }

  function onLeave() {
    gsap.to([leftRef.current, rightRef.current], {
      flexBasis: "50%",
      duration: 0.55,
      ease: "power2.out",
    })
  }

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left — Web & KI */}
      <div
        ref={leftRef}
        className="relative flex-1 md:basis-1/2 flex flex-col justify-between p-10 md:p-16 cursor-pointer group overflow-hidden"
        style={{ backgroundColor: SIDES["web-ki"].bg, color: SIDES["web-ki"].fg }}
        onMouseEnter={() => onHover("left")}
        onMouseLeave={onLeave}
        onClick={() => router.push(SIDES["web-ki"].href)}
        role="link"
        tabIndex={0}
        aria-label="Web & KI — Digitale Systeme für Ihr Unternehmen"
        onKeyDown={(e) => e.key === "Enter" && router.push(SIDES["web-ki"].href)}
      >
        <Logo inverted size="md" />

        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: SIDES["web-ki"].fgMuted }}>
              01
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Web &amp; KI
            </h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: SIDES["web-ki"].fgMuted }}>
              {SIDES["web-ki"].sub}
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {SIDES["web-ki"].tags.map((t) => (
              <li
                key={t}
                className="text-sm tracking-wide"
                style={{ color: SIDES["web-ki"].fgMuted }}
              >
                — {t}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm font-medium transition-gap group-hover:gap-4">
            <span>Entdecken</span>
            <ArrowRight color={SIDES["web-ki"].fg} />
          </div>
        </div>

        {/* Subtle grid line decoration */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${SIDES["web-ki"].fg} 0, ${SIDES["web-ki"].fg} 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, ${SIDES["web-ki"].fg} 0, ${SIDES["web-ki"].fg} 1px, transparent 1px, transparent 20px)`,
          }}
        />
      </div>

      {/* Divider line */}
      <div className="hidden md:block w-px bg-stone/20 self-stretch" />

      {/* Right — Foto & Video */}
      <div
        ref={rightRef}
        className="relative flex-1 md:basis-1/2 flex flex-col justify-between p-10 md:p-16 cursor-pointer group overflow-hidden"
        style={{ backgroundColor: SIDES["foto-video"].bg, color: SIDES["foto-video"].fg }}
        onMouseEnter={() => onHover("right")}
        onMouseLeave={onLeave}
        onClick={() => router.push(SIDES["foto-video"].href)}
        role="link"
        tabIndex={0}
        aria-label="Foto & Video — Visuals, die Ihre Geschichte erzählen"
        onKeyDown={(e) => e.key === "Enter" && router.push(SIDES["foto-video"].href)}
      >
        <Logo size="md" />

        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: SIDES["foto-video"].fgMuted }}>
              02
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Foto &amp; Video
            </h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: SIDES["foto-video"].fgMuted }}>
              {SIDES["foto-video"].sub}
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {SIDES["foto-video"].tags.map((t) => (
              <li
                key={t}
                className="text-sm tracking-wide"
                style={{ color: SIDES["foto-video"].fgMuted }}
              >
                — {t}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm font-medium">
            <span>Entdecken</span>
            <ArrowRight color={SIDES["foto-video"].fg} />
          </div>
        </div>

        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${SIDES["foto-video"].fg} 0, ${SIDES["foto-video"].fg} 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, ${SIDES["foto-video"].fg} 0, ${SIDES["foto-video"].fg} 1px, transparent 1px, transparent 20px)`,
          }}
        />
      </div>
    </div>
  )
}

function ArrowRight({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
