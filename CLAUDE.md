# fpz — Monorepo

## Struktur
- `fpz-media/` — Next.js 16 Website (Marketing, Portfolio, Contact)
- `fpz-media-video/` — Remotion Video-Projekt (Apple-Style Promo)
- `docs/` — Pläne, Design-Docs

## Stack-Überblick
- **Website**: Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui, GSAP, Three.js/R3F
- **Video**: Remotion 4, React 19, TypeScript

## Wichtige Regeln
- Nicht in `node_modules` schreiben
- `.env.local` nicht committen
- Vor größeren Änderungen den relevanten Plan in `docs/plans/` lesen
- `fpz-media/` und `fpz-media-video/` sind separate npm-Projekte

## Commands (von jeweiligem Unterordner)
```bash
# fpz-media
npm run dev        # localhost:3000
npm run build      # Production Build
npm run lint       # ESLint
npx tsc --noEmit   # Type Check

# fpz-media-video
npm run dev        # Remotion Studio
npm run build      # Video rendern
```
