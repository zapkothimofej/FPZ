# GSAP Patterns für fpz-media

## Grundprinzip
Immer `useGSAP()` aus `@gsap/react` nutzen. NIEMALS `useEffect` für GSAP.

## Basic Animation
```tsx
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}
```

## ScrollTrigger
```tsx
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRef } from 'react'

// ScrollTrigger einmal im Root Layout registrieren:
// gsap.registerPlugin(ScrollTrigger)

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}
```

## Stagger Animation
```tsx
useGSAP(() => {
  gsap.from('.stagger-item', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })
}, { scope: containerRef })
```

## Timeline
```tsx
useGSAP(() => {
  const tl = gsap.timeline()
  tl.from('.title', { opacity: 0, y: -20, duration: 0.5 })
    .from('.subtitle', { opacity: 0, duration: 0.4 }, '-=0.2')
    .from('.cta', { opacity: 0, scale: 0.9, duration: 0.3 }, '-=0.1')
}, { scope: ref })
```
