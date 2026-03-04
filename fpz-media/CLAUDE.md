# fpz-media

FPZ Media Agentur-Website. Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui, Three.js/R3F, GSAP.

## Tech Stack
- **Framework**: Next.js 16 — App Router (`/app` dir, NICHT `/pages`)
- **React**: 19 — Server Components default; `'use client'` nur bei Hooks/Events/Browser-APIs
- **Styling**: Tailwind CSS v4 — Config in `app/globals.css` via `@theme {}`, NICHT `tailwind.config.ts`
- **Components**: shadcn/ui + `radix-ui` (unified package, nicht `@radix-ui/react-*` einzeln)
- **3D**: `@react-three/fiber` v9 + `@react-three/drei` — Canvas muss `'use client'` sein
- **Animation**: GSAP 3 mit `@gsap/react` — `useGSAP()` hook, NIE `useEffect` für GSAP
- **Utils**: `cn()` aus `lib/utils` (clsx + tailwind-merge)
- **Deployment**: Vercel, auto von `main`

## Commands
```bash
npm run dev          # localhost:3000
npm run build        # Production Build — vor jedem Commit prüfen
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript Check
npx shadcn add [x]   # shadcn Komponente hinzufügen
```

## Projektstruktur
```
app/            # App Router Routes + Layouts
components/     # UI Komponenten
  shared/       # Wiederverwendbare Komponenten (z.B. ContactForm)
lib/            # Utilities, Helpers, navigation.ts
public/         # Statische Assets
```

## Kritische Regeln

### Tailwind v4
- Config AUSSCHLIESSLICH in `app/globals.css` via `@theme {}` Blöcke
- Keine `tailwind.config.ts` erstellen — existiert nicht und soll nicht existieren
- Custom Tokens (Farben, Spacing) leben in `globals.css`

### GSAP
- IMMER `useGSAP()` aus `@gsap/react` nutzen — NIEMALS `useEffect` für GSAP
- Cleanup wird von `useGSAP` automatisch gemacht
- ScrollTrigger einmalig in Layout-Komponente registrieren

### React 19 / Next.js 16
- Server Components sind Standard — kein `'use client'` ohne Grund
- `next/image` für ALLE Bilder — nie `<img>`
- `next/font` für Fonts
- Forms: Server Actions mit `useActionState`

### TypeScript
- Strict Mode — kein `any`, `unknown` mit Type Guards
- `type` statt `interface` für Component Props
- Props-Types zusammen mit Komponente exportieren

### Three.js / R3F
- Vor eigener Implementation immer `@react-three/drei` prüfen (via Context7)
- Canvas-Komponenten immer in `Suspense` wrappen
- R3F Canvas = `'use client'` Pflicht

## Was NICHT tun
- Kein `useEffect` für GSAP — `useGSAP` nutzen
- Keine `tailwind.config.ts` erstellen
- Kein `pages/` Directory — nur App Router
- Kein `.env.local` committen
- Kein `@radix-ui/react-*` einzeln — nutze `radix-ui`

## GSAP Pattern (korrekt)
```tsx
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, { opacity: 0, y: 20, duration: 0.6 })
  }, { scope: ref })

  return <div ref={ref}>...</div>
}
```

## Component Pattern
```tsx
// Server Component (Standard)
type Props = { title: string }

export default function Section({ title }: Props) {
  return <section className="...">{title}</section>
}
```

## Core Files (wichtigste Dateien)
- `app/layout.tsx` — Root Layout, Fonts, ThemeProvider, Lenis
- `app/globals.css` — ALLE Tailwind v4 Config via `@theme {}`
- `components/Navbar.tsx` — Nav State, Dark Mode Toggle
- `components/shared/ContactForm.tsx` — Contact Form mit Retry-Logik
- `lib/navigation.ts` — Shared Nav Links (Single Source of Truth)
- `lib/utils.ts` — `cn()` Utility
- `app/api/contact/route.ts` — Contact Form API (n8n Webhook)

## Externe Integrationen
- Contact Form → n8n Cloud Webhook (`NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`)
- Retry-Logik: 3 Versuche mit Exponential Backoff in `shared/ContactForm.tsx`
- Kein direktes E-Mail-Senden — immer über n8n

## Bereits gelöst — NICHT neu implementieren
- Dark Mode: Live-Sync via ThemeProvider + localStorage
- Contact Retry: Exponential Backoff in `shared/ContactForm.tsx`
- Lenis Smooth Scroll: initialisiert in Layout, cleanup on unmount
- Cookie Banner: bereits vorhanden
