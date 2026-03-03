# Remotion Werbevideo V2 — "Fluid Core" Design

**Datum:** 2026-03-03
**Inspiration:** Google Gemini visual design language
**Ziel:** 30s Werbespot (900fr, 30fps, 1920×1080) mit Orb + Kinetic Typography

---

## Konzept

Zentraler pulsierender Glow-Orb (SVG radialGradient + feGaussianBlur) als visueller Anker durch alle Szenen. Wörter kommen als Riesen (300–500% Scale) ins Bild und crashen auf Endposition. 50 Partikel treiben konstant im Hintergrund.

## Design Tokens

Identisch mit V1 (v6-theme.css):
- bg: #0a0a0a, accent: #c8c8c8, text: #ebebeb, textMuted: #707070
- Fonts: DM Serif Display (display), DM Sans (body)

## Orb-Komponente

SVG-Kreis mit:
- `radialGradient`: weiß (0%) → C.accent (30%) → transparent (100%)
- `feGaussianBlur` stdDeviation=25 für Glow-Ring
- `feMerge`: blur + SourceGraphic (harter Kern + weiches Leuchten)
- Pulsation: `Math.sin(frame / fps * 1.5 * Math.PI) * 0.08` auf scale
- Drift: leichte x/y-Bewegung via sin mit verschiedenen Phasen

## Partikel-System

50 Partikel, deterministisch (seeded via index), je mit:
- Zufällige Startposition (gleichmäßig über Bildschirm)
- Langsame sin-basierte Drift (uniquer Phasen-Offset per Partikel)
- Radius: 1–3px, Opacity: 0.15–0.5
- Keine Kollisions-Logik, reines Drift

## Szenen

| # | Name | Frames | Dauer | Kernanimation |
|---|------|--------|-------|---------------|
| 1 | Genesis | 0–150 | 5s | Orb materializes (scale 0→1, spring), Partikel fade in |
| 2 | Reveal | 150–300 | 5s | Lokal/Digital/Komplett: scale 5→1 mit spring, opacity fade |
| 3 | Services | 300–540 | 8s | 3×90fr Panels: Titel fällt von oben, fade+slide |
| 4 | Manifesto | 540–690 | 5s | "UNFAIREN" scale 3→1, word-by-word crashes |
| 5 | CTA | 690–840 | 5s | Orb-Puls intensiviert, URL + Scan-Underline |
| 6 | Endcard | 840–900 | 2s | Fade-out, Orb kollabiert, "FPZ." bleibt, Blackout |

## Dateistruktur

```
src/
  Root.tsx
  Video.tsx
  tokens.ts          (unverändert)
  components/
    GrainOverlay.tsx  (unverändert)
    Orb.tsx           (NEU – wiederverwendbar in allen Szenen)
    Particles.tsx     (NEU – 50-Partikel-System)
    Scene1Genesis.tsx
    Scene2Reveal.tsx
    Scene3Services.tsx
    Scene4Manifesto.tsx
    Scene5CTA.tsx
    Scene6Endcard.tsx
```

## Key Technical Decisions

- Orb und Particles sind eigenständige Komponenten, in jeder Szene verwendbar
- `useVideoConfig().fps` für alle timing-abhängigen sin-Berechnungen
- Kein Three.js / externe 3D-Deps — alles SVG + CSS
- `filter: drop-shadow(0 0 20px rgba(200,200,200,0.4))` auf Glow-Texten
- Scale-Animationen: `spring({ from: 5, to: 1 })` für crash-to-position
