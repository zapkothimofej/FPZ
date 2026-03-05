# FPZ Media Video V3 — Drei Versionen Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Drei komplett neue Remotion-Werbevideos für FPZ Media Eigenwerbung erstellen und die alten Videos (FPZMediaAd, FPZAppleAd) entfernen.

**Architecture:** Jede Version bekommt eigene Scene-Komponenten mit Prefix (C1_, C2_, C3_), eigene Video-Composition und eigene Eintragung in Root.tsx. tokens.ts bleibt unverändert. Alle alten Dateien (Video.tsx, VideoApple.tsx, SceneA*, Scene*) werden gelöscht.

**Tech Stack:** Remotion 4.x, React 19, TypeScript, @remotion/transitions, @remotion/google-fonts, interpolate/useCurrentFrame/spring

---

## Versionen Übersicht

| Version | ID | Stil | Dauer | FPS | Frames |
|---------|-----|------|-------|-----|--------|
| V1 | FPZCinematic | Cinematic Dark | 30s | 60 | 1800 |
| V2 | FPZClean | Minimalist Clean | 15s | 60 | 900 |
| V3 | FPZMotion | Energetisch Motion | 15s | 60 | 900 |

## Design Specs

### V1 — Cinematic Dark (1800 Frames)

**Farben:** `#000000` Background, `#ffffff` Text, `#888888` Subtext
**Fonts:** FONTS.display (DM Serif Display) für Headlines, FONTS.body (DM Sans) für Sub
**Szenen (6 × ~300fr, 5 Transitionen × 30fr = 150fr → 6×275+5×30=1800):**

| # | Frames (inkl. Transition) | Headline | Sub |
|---|--------------------------|----------|-----|
| 1 | 275 | "Wir bauen Marken." | — |
| 2 | 275 | "Websites, die verkaufen." | "Web Design · SEO · E-Commerce" |
| 3 | 275 | "Visuals, die bleiben." | "Foto · Video · Reels" |
| 4 | 275 | "Prozesse, die skalieren." | "Automation · CRM · Leads" |
| 5 | 275 | "Dein unfairer Vorteil." | — |
| 6 | 275 | "FPZ Media." | "fpz-media.de" |

**Animation:** Text faded mit Y-offset (20px→0px, opacity 0→1), Easing.bezier(0.25,0.1,0.25,1). Sub kommt 20fr nach Headline. 0.5% slow zoom über gesamte Scene. Headline: 140px DM Serif. Sub: 24px DM Sans, #888888.

**Transition:** fade() + linearTiming(30fr)

### V2 — Minimalist Clean (900 Frames)

**Farben:** `#ffffff` Background, `#111111` Text, `#999999` Subtext
**Szenen (4 Szenen: 3×225 + 1×225, 3 Transitionen × 30fr → 3×225+3×30=675+225=900):**

Berechnung: 4 Szenen × 225fr + 3 Transitionen × 30fr = 900 + 90 = 990 → zu viel.
Korrektur: 3 Szenen × 270fr + 2 Transitionen × 30fr = 810 + 60 = 870 → + 30fr Endszene = zu komplex.
Korrekte Berechnung mit TransitionSeries: Gesamtdauer = Summe(Szenen) - (n-1)×Transition
900 = 4×S - 3×30 → 4S = 990 → S = 247.5 → nicht ganzzahlig.
Besser: 3 Szenen × 320fr - 2 × 30fr = 960 - 60 = 900 ✓

| # | Frames (Sequence-Duration) | Headline | Sub |
|---|---------------------------|----------|-----|
| 1 | 320 | "Klar." | "Web · Media · Automation" |
| 2 | 320 | "Präzise." | "Jedes Projekt. Jedes Mal." |
| 3 | 320 | "FPZ Media." | "fpz-media.de" |

**Animation:** Text faded mit Y-offset (15px→0px). Sehr ruhig. Easing.bezier(0.4,0,0.2,1). Headline: 180px DM Serif, #111111. Sub: 22px DM Sans, #999999, 40fr nach Headline. Kein zoom.

**Transition:** fade() + linearTiming(30fr)

### V3 — Energetisch Motion (900 Frames)

**Farben:** `#0a0a0a` Background, `#ffffff` Text, `#ff4444` Accent
**Szenen (6 kurze Szenen):**

Berechnung: 6×S - 5×30 = 900 → 6S = 1050 → S = 175fr

| # | Frames (Sequence) | Headline | Animation |
|---|------------------|----------|-----------|
| 1 | 175 | "FPZ." | Text crasht von unten (Y: +60→0, 10fr) |
| 2 | 175 | "Web." | Text von rechts (X: +100→0, 10fr) |
| 3 | 175 | "Media." | Text von links (X: -100→0, 10fr) |
| 4 | 175 | "Auto." | Text spring() rein, scale 1.2→1 |
| 5 | 175 | "Alles." | Text fade, dann scale punch |
| 6 | 175 | "fpz-media.de" | Ruhiges fade |

**Animation:** Aggressiv — spring({ damping: 20, stiffness: 200 }) für bounce. Headline: 200px DM Serif. Accent-Farbe (#ff4444) für Highlights. Kurze Hold-Zeit, dann fade out.

**Transition:** fade() + linearTiming(15fr) — schnellere Cuts

---

## Task 1: Alte Dateien löschen

**Files:**
- Delete: `fpz-media-video/src/Video.tsx`
- Delete: `fpz-media-video/src/VideoApple.tsx`
- Delete: `fpz-media-video/src/components/Scene1Hook.tsx`
- Delete: `fpz-media-video/src/components/Scene2Web.tsx`
- Delete: `fpz-media-video/src/components/Scene3Media.tsx`
- Delete: `fpz-media-video/src/components/Scene4Automation.tsx`
- Delete: `fpz-media-video/src/components/Scene5Manifesto.tsx`
- Delete: `fpz-media-video/src/components/Scene6Endcard.tsx`
- Delete: `fpz-media-video/src/components/SceneA1Intro.tsx`
- Delete: `fpz-media-video/src/components/SceneA2Web.tsx`
- Delete: `fpz-media-video/src/components/SceneA3Media.tsx`
- Delete: `fpz-media-video/src/components/SceneA4Auto.tsx`
- Delete: `fpz-media-video/src/components/SceneA5Manifesto.tsx`
- Delete: `fpz-media-video/src/components/SceneA6End.tsx`
- Delete: `fpz-media-video/src/components/GrainOverlay.tsx`
- Delete: `fpz-media-video/src/components/Particles.tsx`
- Delete: `fpz-media-video/src/components/Orb.tsx`
- Modify: `fpz-media-video/src/Root.tsx` — alle Compositions entfernen, leer lassen

**Step 1: Dateien löschen**

```bash
cd fpz-media-video
rm src/Video.tsx src/VideoApple.tsx
rm src/components/Scene1Hook.tsx src/components/Scene2Web.tsx src/components/Scene3Media.tsx
rm src/components/Scene4Automation.tsx src/components/Scene5Manifesto.tsx src/components/Scene6Endcard.tsx
rm src/components/SceneA1Intro.tsx src/components/SceneA2Web.tsx src/components/SceneA3Media.tsx
rm src/components/SceneA4Auto.tsx src/components/SceneA5Manifesto.tsx src/components/SceneA6End.tsx
rm src/components/GrainOverlay.tsx src/components/Particles.tsx src/components/Orb.tsx
```

**Step 2: Root.tsx leeren**

```tsx
// src/Root.tsx
export const RemotionRoot = (): React.ReactElement => <></>;
```

**Step 3: Commit**

```bash
git add -A
git commit -m "chore(video): remove all old video compositions"
```

---

## Task 2: V1 Cinematic Dark — Scene-Komponenten

**Files:**
- Create: `fpz-media-video/src/components/C1_Scene1.tsx`
- Create: `fpz-media-video/src/components/C1_Scene2.tsx`
- Create: `fpz-media-video/src/components/C1_Scene3.tsx`
- Create: `fpz-media-video/src/components/C1_Scene4.tsx`
- Create: `fpz-media-video/src/components/C1_Scene5.tsx`
- Create: `fpz-media-video/src/components/C1_Scene6.tsx`

Alle Szenen folgen diesem Pattern (Beispiel C1_Scene1):

```tsx
// C1_Scene1.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../tokens";

const DURATION = 275;
const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

const slideY = (frame: number, start: number, end: number, from = 20, to = 0) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const C1_Scene1 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, DURATION], [1, 1.005], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = fade(frame, 0, 30);
  const headlineY = slideY(frame, 0, 30);

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 140,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textAlign: "center",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Wir bauen Marken.
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

Szenen 2–4 haben zusätzlich Sub-Text (Opacity/Y mit +20fr Delay):
```tsx
// Sub-Text zusätzlich in Szenen 2-4:
const subOpacity = fade(frame, 20, 50);
const subY = slideY(frame, 20, 50);

// Im JSX:
<div style={{
  fontFamily: FONTS.body,
  fontSize: 24,
  color: "#888888",
  letterSpacing: "0.08em",
  opacity: subOpacity,
  transform: `translateY(${subY}px)`,
}}>
  Web Design · SEO · E-Commerce
</div>
```

Szene 6 (End): Headline "FPZ Media." + Sub "fpz-media.de" (18px, #555555, letter-spacing 0.15em)

**Step 1:** Alle 6 Scene-Dateien erstellen mit den entsprechenden Texten:
- C1_Scene1: "Wir bauen Marken." (kein Sub)
- C1_Scene2: "Websites, die verkaufen." / "Web Design · SEO · E-Commerce"
- C1_Scene3: "Visuals, die bleiben." / "Foto · Video · Reels"
- C1_Scene4: "Prozesse, die skalieren." / "Automation · CRM · Leads"
- C1_Scene5: "Dein unfairer Vorteil." (kein Sub, Headline bleibt länger sichtbar)
- C1_Scene6: "FPZ Media." / "fpz-media.de"

**Step 2: Commit**
```bash
git add src/components/C1_*.tsx
git commit -m "feat(video): add V1 Cinematic Dark scene components"
```

---

## Task 3: V1 Cinematic — VideoC1.tsx + Root.tsx registrieren

**Files:**
- Create: `fpz-media-video/src/VideoC1.tsx`
- Modify: `fpz-media-video/src/Root.tsx`

**Step 1: VideoC1.tsx**

```tsx
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C1_Scene1 } from "./components/C1_Scene1";
import { C1_Scene2 } from "./components/C1_Scene2";
import { C1_Scene3 } from "./components/C1_Scene3";
import { C1_Scene4 } from "./components/C1_Scene4";
import { C1_Scene5 } from "./components/C1_Scene5";
import { C1_Scene6 } from "./components/C1_Scene6";

// 6 × 275 - 5 × 30 = 1650 - 150 = 1500 ← falsch
// Korrekt: TransitionSeries subtrahiert Transitions automatisch
// Total = 6×275 - 5×30 = 1500 → durationInFrames muss 1500 sein
// ODER: Sequences so kalkulieren dass Total = 1800
// 6×S - 5×30 = 1800 → S = 1950/6 = 325
// Verwende S=325: 6×325 - 5×30 = 1950 - 150 = 1800 ✓

export const VideoC1 = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene4 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene5 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene6 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
```

**Step 2: Root.tsx aktualisieren**

```tsx
import { Composition } from "remotion";
import { VideoC1 } from "./VideoC1";

export const RemotionRoot = (): React.ReactElement => (
  <>
    <Composition
      id="FPZCinematic"
      component={VideoC1}
      durationInFrames={1800}
      fps={60}
      width={1920}
      height={1080}
    />
  </>
);
```

**Step 3: TypeScript Check**
```bash
cd fpz-media-video && npx tsc --noEmit
```

**Step 4: Commit**
```bash
git add src/VideoC1.tsx src/Root.tsx
git commit -m "feat(video): add V1 FPZCinematic composition"
```

---

## Task 4: V2 Minimalist Clean — Scene-Komponenten + VideoC2.tsx

**Files:**
- Create: `fpz-media-video/src/components/C2_Scene1.tsx`
- Create: `fpz-media-video/src/components/C2_Scene2.tsx`
- Create: `fpz-media-video/src/components/C2_Scene3.tsx`
- Create: `fpz-media-video/src/VideoC2.tsx`

**Timing:** 3×S - 2×30 = 900 → 3S = 960 → S = 320fr

**C2_Scene1.tsx Pattern:**

```tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../tokens";

const DURATION = 320;
const EASE = Easing.bezier(0.4, 0, 0.2, 1);

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

const slideY = (frame: number, start: number, end: number, from = 15, to = 0) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const C2_Scene1 = () => {
  const frame = useCurrentFrame();

  const headlineOpacity = fade(frame, 0, 40);
  const headlineY = slideY(frame, 0, 40);
  const subOpacity = fade(frame, 40, 80);
  const subY = slideY(frame, 40, 80);

  return (
    <AbsoluteFill style={{ background: "#ffffff" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            color: "#111111",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Klar.
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 22,
            color: "#999999",
            letterSpacing: "0.1em",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Web · Media · Automation
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

Szenen:
- C2_Scene1: "Klar." / "Web · Media · Automation"
- C2_Scene2: "Präzise." / "Jedes Projekt. Jedes Mal."
- C2_Scene3: "FPZ Media." / "fpz-media.de" (Sub: #bbbbbb, 18px, letter-spacing 0.15em)

**VideoC2.tsx:**

```tsx
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C2_Scene1 } from "./components/C2_Scene1";
import { C2_Scene2 } from "./components/C2_Scene2";
import { C2_Scene3 } from "./components/C2_Scene3";

export const VideoC2 = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={320}>
        <C2_Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={320}>
        <C2_Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />
      <TransitionSeries.Sequence durationInFrames={320}>
        <C2_Scene3 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
```

**Root.tsx erweitern:**
```tsx
import { VideoC2 } from "./VideoC2";

// In RemotionRoot hinzufügen:
<Composition
  id="FPZClean"
  component={VideoC2}
  durationInFrames={900}
  fps={60}
  width={1920}
  height={1080}
/>
```

**Step: TypeScript Check + Commit**
```bash
npx tsc --noEmit
git add src/components/C2_*.tsx src/VideoC2.tsx src/Root.tsx
git commit -m "feat(video): add V2 FPZClean composition"
```

---

## Task 5: V3 Energetisch Motion — Scene-Komponenten + VideoC3.tsx

**Files:**
- Create: `fpz-media-video/src/components/C3_Scene1.tsx` bis `C3_Scene6.tsx`
- Create: `fpz-media-video/src/VideoC3.tsx`

**Timing:** 6×S - 5×15 = 900 → 6S = 975 → S = 162.5 → nicht ganzzahlig
Alternative: 6×160 - 5×15 = 960 - 75 = 885 → zu kurz
Beste Option: 5 Szenen × S - 4 × 15 = 900 → 5S = 960 → S = 192fr

Szenen reduziert auf 5:
| # | Frames | Headline | Animation |
|---|--------|----------|-----------|
| 1 | 192 | "FPZ." | Y: +80→0 in 8fr (spring damping:15, stiffness:200) |
| 2 | 192 | "Web." | X: +120→0 in 8fr |
| 3 | 192 | "Media." | X: -120→0 in 8fr |
| 4 | 192 | "Automatisiert." | scale: 1.3→1 in 10fr + fade |
| 5 | 192 | "fpz-media.de" | Ruhiges fade, 24px DM Sans |

**C3_Scene1.tsx Pattern:**

```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../tokens";

export const C3_Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200, mass: 0.8 },
    durationInFrames: 20,
  });

  const y = interpolate(progress, [0, 1], [80, 0]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 240,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            opacity,
            transform: `translateY(${y}px)`,
          }}
        >
          FPZ.
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

C3_Scene2 (X rechts): `transform: translateX(${x}px)` mit x von +120→0
C3_Scene3 (X links): `transform: translateX(${x}px)` mit x von -120→0
C3_Scene4 (scale): scale von 1.3→1 via spring, Headline "Automatisiert."
C3_Scene5 (fade, ruhig): Easing.bezier fade, "fpz-media.de", FONTS.body 28px, #888888

**VideoC3.tsx:**

```tsx
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C3_Scene1 } from "./components/C3_Scene1";
import { C3_Scene2 } from "./components/C3_Scene2";
import { C3_Scene3 } from "./components/C3_Scene3";
import { C3_Scene4 } from "./components/C3_Scene4";
import { C3_Scene5 } from "./components/C3_Scene5";

// 5×192 - 4×15 = 960 - 60 = 900 ✓
export const VideoC3 = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene4 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene5 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
```

**Root.tsx final:**
```tsx
import { Composition } from "remotion";
import { VideoC1 } from "./VideoC1";
import { VideoC2 } from "./VideoC2";
import { VideoC3 } from "./VideoC3";

export const RemotionRoot = (): React.ReactElement => (
  <>
    <Composition id="FPZCinematic" component={VideoC1} durationInFrames={1800} fps={60} width={1920} height={1080} />
    <Composition id="FPZClean" component={VideoC2} durationInFrames={900} fps={60} width={1920} height={1080} />
    <Composition id="FPZMotion" component={VideoC3} durationInFrames={900} fps={60} width={1920} height={1080} />
  </>
);
```

**Step: TypeScript Check + Commit**
```bash
npx tsc --noEmit
git add src/components/C3_*.tsx src/VideoC3.tsx src/Root.tsx
git commit -m "feat(video): add V3 FPZMotion composition"
```

---

## Task 6: Verifikation

**Step 1: Remotion Studio starten**
```bash
cd fpz-media-video && npm run dev
```
Erwartet: Studio auf localhost:3001, drei Compositions sichtbar: FPZCinematic, FPZClean, FPZMotion

**Step 2: Jede Composition durchschauen**
- FPZCinematic: 1800fr = 30s, 6 Szenen, Text faded sanft
- FPZClean: 900fr = 15s, 3 Szenen, weißer BG, clean
- FPZMotion: 900fr = 15s, 5 Szenen, aggressiv springend

**Step 3: Kein TypeScript Fehler**
```bash
npx tsc --noEmit
```
Erwartet: Kein Output (keine Fehler)

**Step 4: Abschließender Commit**
```bash
git add -A
git commit -m "feat(video): complete V3 three-version video rebuild"
```
