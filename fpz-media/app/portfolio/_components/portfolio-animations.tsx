'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function ScrollReveal({ children, className, delay = 0, y = 32 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: ref })

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

type StaggerRevealProps = {
  children: React.ReactNode
  className?: string
  selector?: string
  stagger?: number
}

export function StaggerReveal({ children, className, selector = ':scope > *', stagger = 0.1 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = ref.current?.querySelectorAll(selector)
    if (!items?.length) return

    gsap.fromTo(
      items,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

type AnimatedCounterProps = {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({ value, suffix = '', prefix = '', className, duration = 1.5 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
        }
      },
    })
  }, { scope: ref })

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}
