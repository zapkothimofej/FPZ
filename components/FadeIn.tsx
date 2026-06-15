"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function FadeIn({ children, className = "", delay = 0, y = 28 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.from(ref.current, {
        y,
        autoAlpha: 0,
        duration: 0.95,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
