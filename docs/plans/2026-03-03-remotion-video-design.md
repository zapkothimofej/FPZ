# Remotion Werbevideo — FPZ Media

**Datum:** 2026-03-03
**Ziel:** 30-sekündiges Werbevideo (1920×1080, 30fps, 900 frames) als Remotion-Projekt

---

## Projektpfad

`/d/fpz/fpz-media-video/` — separates Verzeichnis neben `fpz-media`

## Stack

- Remotion 4.x, TypeScript, blank template (`npx create-video@latest`)
- `@remotion/google-fonts` für DM Serif Display + DM Sans
- Animationen: `spring()` + `interpolate()` aus `remotion`
- Keine externen Animationsbibliotheken

## Dateistruktur

```
src/
  Root.tsx           — registerRoot + <Composition fps=30 durationInFrames=900 width=1920 height=1080>
  Video.tsx          — <Series> mit 6 Segmenten
  tokens.ts          — Farb-Token (C) + loadFont-Calls
  components/
    GrainOverlay.tsx
    Scene1Hero.tsx       (frames 0–180)
    Scene2Manifesto.tsx  (frames 180–360)
    Scene3Services.tsx   (frames 360–630)
    Scene4Stats.tsx      (frames 630–720)
    Scene5CTA.tsx        (frames 720–840)
    Scene6Endcard.tsx    (frames 840–900)
```

## Szenen-Überblick

| # | Name | Frames | Dauer | Kernelemente |
|---|------|--------|-------|--------------|
| 1 | Hero | 0–180 | 6s | Marquee, 3 Wörter spring-in, Subtext, CTA |
| 2 | Manifesto | 180–360 | 6s | Word-by-word reveal, highlighted "unfairen" |
| 3 | Services | 360–630 | 9s | 3 Panels à 90fr, fade+slide, Dots |
| 4 | Stats | 630–720 | 3s | 4er Grid, spring-in |
| 5 | CTA | 720–840 | 4s | Headline, URL mit Underline-Animation |
| 6 | Endcard | 840–900 | 2s | Logo, Tagline, Fade-out |

## Design Tokens

```ts
const C = {
  bg: "#0a0a0a", bgElevated: "#141414",
  text: "#ebebeb", textMuted: "#707070",
  accent: "#c8c8c8", accentHover: "#ebebeb",
  border: "#222222", onAccent: "#0a0a0a",
}
// Fonts: DM Serif Display (400, italic), DM Sans (400)
```

## Grain Overlay

Globale `<GrainOverlay/>` Komponente — SVG `feTurbulence`, opacity 0.035, `zIndex: 999`, `pointerEvents: none`

## Setup-Schritte

1. `npx create-video@latest` → TypeScript, blank → Name: `fpz-media-video`
2. `npm install @remotion/google-fonts`
3. Alle Komponenten erstellen
4. `npm run dev` → Preview auf localhost:3000
