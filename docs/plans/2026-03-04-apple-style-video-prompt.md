# FPZ Media — Apple Style Video Prompt

**Datum:** 2026-03-04
**Ziel:** 30-sekündiges Remotion-Werbevideo im Apple-Stil (1920×1080, 60fps, 1800fr)

---

## Prompt (für neue Session / Subagent)

> Erstelle ein 30-sekündiges Remotion-Werbevideo für **FPZ Media** im Apple-Stil.
>
> **Projekt:** `/d/fpz/fpz-media-video/` (Remotion 4.x, TypeScript, bereits aufgesetzt)
> **Stack:** `remotion`, `@remotion/google-fonts`, `@remotion/transitions` — bereits installiert
> **Fonts:** DM Serif Display (display), DM Sans (body) — in `tokens.ts`
> **Design Tokens:** `C.bg="#0a0a0a"`, `C.text="#ebebeb"`, `C.accent="#c8c8c8"`, `C.textMuted="#707070"`
>
> ---
>
> ### Apple-Stil-Regeln
>
> **Timing:** Alles präzise. Animationen kommen pünktlich und gehen pünktlich — kein Overshoot, kein Bounce. `spring({ damping: 40, stiffness: 100 })` oder `interpolate` mit `Easing.bezier(0.25, 0.1, 0.25, 1)`.
>
> **Typografie:** Große Headlines (120–200px), sehr wenig Text pro Szene. Max. 1–2 Zeilen sichtbar gleichzeitig. Weißraum ist das Design.
>
> **Farbe:** Fast ausschließlich `#ffffff` auf `#000000`. Kein Glow, keine Partikel, kein Orb. Reines Licht-auf-Dunkel oder Dunkel-auf-Hell.
>
> **Animationen:** Text faded in mit leichtem Y-offset (20px → 0px, opacity 0 → 1). Nie scale-crash. Nie explosion. Ruhig, präzise, selbstbewusst.
>
> **Copy:** Ultra-kurz. Apple-Copy-Stil: Adjektiv + Substantiv, oder einfache Aussage. Beispiele:
> - "Außergewöhnlich." — statt "Dein Unternehmen. Komplett digital."
> - "Web. Neu gedacht." — statt "Web Design SEO E-Commerce"
> - "Mehr Leads. Automatisch." — statt "+87% Leads"
>
> **Übergänge:** Simples fade-through-black. Kein Flip, kein Wipe, kein Clock. `linearTiming({ durationInFrames: 30 })` + `fade()` von `@remotion/transitions/fade`.
>
> **Kamera:** Sehr subtil. Einziger erlaubter Move: 0.5% slow zoom über die gesamte Szene. `scale(1.0 → 1.005)`.
>
> ---
>
> ### Szenen (6 Szenen × ~5s)
>
> | # | Frames | Headline | Subline | Visual |
> |---|--------|----------|---------|--------|
> | 1 | 0–180 | — | — | Schwarzer Screen. Nach 1s: "FPZ." faded ein (DM Serif, 200px, weiß). Bleibt stehen. |
> | 2 | 180–360 | "Websites, die verkaufen." | "Web Design · SEO · E-Commerce" erscheint klein darunter (1s delay) | Kein weiteres Visual |
> | 3 | 360–540 | "Visuals, die bleiben." | "Foto · Video · Reels" | Kein weiteres Visual |
> | 4 | 540–720 | "Prozesse, die skalieren." | "Automation · CRM · Leads" | Kein weiteres Visual |
> | 5 | 720–840 | "Dein unfairer Vorteil." | — | Headline in DM Serif, 160px. Bleibt länger als normal. |
> | 6 | 840–900 | "FPZ Media." | "fpz-media.de" darunter (klein, gemuted) | Fade to black |
>
> ### Timing pro Szene
>
> - Frame 0–30: fade in (opacity 0→1, Y: +15→0)
> - Frame 30–(N-30): statisch / leichter Zoom
> - Frame (N-30)–N: fade out (opacity 1→0)
>
> ### Technische Details
>
> - `fps={60}`, `durationInFrames={1800}`, `width={1920}`, `height={1080}`
> - Alle Übergänge: `fade()` + `linearTiming({ durationInFrames: 30 })`
> - `TransitionSeries` aus `@remotion/transitions`
> - Kein Orb, keine Particles, kein GrainOverlay
> - Einzige Animation: fade in/out + 0.5% slow zoom
> - Easing für fade: `Easing.bezier(0.4, 0, 0.2, 1)` (Material Motion standard, Apple-ähnlich)
>
> ### Dateistruktur (neu, parallel zu V2)
>
> ```
> src/
>   RootApple.tsx        — registerRoot mit "FPZApple" Composition
>   VideoApple.tsx       — TransitionSeries mit 6 Szenen
>   components/
>     SceneA1Intro.tsx
>     SceneA2Web.tsx
>     SceneA3Media.tsx
>     SceneA4Auto.tsx
>     SceneA5Manifesto.tsx
>     SceneA6End.tsx
> ```
>
> Prefix `A` um Konflikte mit V2-Komponenten zu vermeiden. `RootApple.tsx` mit zweiter `<Composition id="FPZAppleAd" ... />`.

---

## Was "Apple Style" bedeutet (Referenz)

| Apple | Nicht-Apple |
|-------|-------------|
| Text faded sanft ein | Text crasht von der Seite |
| 1 Aussage pro Szene | 3 Aussagen gleichzeitig |
| Viel Luft um den Text | Vollgepackter Screen |
| Präzise Easing-Kurven | Bounce/Overshoot |
| Fade-through-black | Flip/Wipe/Clock |
| Subtiler slow zoom | Dramatische Kamerabewegung |
| Kurze, selbstbewusste Copy | Erklärender Fließtext |
| Kein Glow/Blur/Filter | Viele Filtereffekte |
| Stille dominiert | Jede Sekunde ist gefüllt |
