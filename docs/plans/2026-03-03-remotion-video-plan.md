# FPZ Media Remotion Werbevideo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 30-Sekunden Remotion Werbevideo (1920×1080, 30fps, 900 frames) für FPZ Media unter `/d/fpz/fpz-media-video`

**Architecture:** 6 sequentielle Szenen via Remotion `<Series>`, jede Szene als isolierte Komponente mit relativen Frames (0-basiert ab Szenenstart). Design-Token in `tokens.ts`. Globale `<GrainOverlay/>` als AbsoluteFill auf zIndex 999.

**Tech Stack:** Remotion 4.x, TypeScript, `@remotion/google-fonts` (DM Serif Display + DM Sans), `spring()` + `interpolate()` aus `remotion`

---

## Frame-Offsets (wichtig: alle Szenenkomponenten verwenden relative Frames)

| Szene | Absolute Frames | Relative Frames | Dauer |
|-------|----------------|-----------------|-------|
| Scene1Hero | 0–180 | 0–180 | 180fr |
| Scene2Manifesto | 180–360 | 0–180 | 180fr |
| Scene3Services | 360–630 | 0–270 | 270fr |
| Scene4Stats | 630–720 | 0–90 | 90fr |
| Scene5CTA | 720–840 | 0–120 | 120fr |
| Scene6Endcard | 840–900 | 0–60 | 60fr |

---

## Task 0: Bootstrap Remotion Project

**Files:**
- Create: `/d/fpz/fpz-media-video/` (via npx)

**Step 1: Projekt erstellen**
```bash
cd /d/fpz && npx create-video@latest
```
Wenn gefragt:
- Name: `fpz-media-video`
- Template: `Hello World (TypeScript)` → wähle blank/TypeScript

**Step 2: google-fonts installieren**
```bash
cd /d/fpz/fpz-media-video && npm install @remotion/google-fonts
```

**Step 3: Default-Dateien löschen**
```bash
rm -f src/HelloWorld.tsx src/HelloWorld.module.css src/Composition.tsx
```

**Step 4: Dev-Server starten und prüfen**
```bash
npm run dev
```
Erwartet: Remotion Studio öffnet auf http://localhost:3000

**Step 5: Commit**
```bash
git -C /d/fpz add fpz-media-video/
git -C /d/fpz commit -m "chore: bootstrap remotion video project"
```

---

## Task 1: tokens.ts erstellen

**Files:**
- Create: `src/tokens.ts`

**Step 1: Datei erstellen**
```ts
import {
  loadFont as loadSerifDisplay,
  fontFamily as displayFamily,
} from "@remotion/google-fonts/DMSerifDisplay";
import {
  loadFont as loadSans,
  fontFamily as sansFamily,
} from "@remotion/google-fonts/DMSans";

loadSerifDisplay();
loadSans();

export const C = {
  bg:          "#0a0a0a",
  bgElevated:  "#141414",
  text:        "#ebebeb",
  textMuted:   "#707070",
  accent:      "#c8c8c8",
  accentHover: "#ebebeb",
  border:      "#222222",
  onAccent:    "#0a0a0a",
} as const;

export const FONTS = {
  display: displayFamily,
  body:    sansFamily,
} as const;
```

**Step 2: Commit**
```bash
git add src/tokens.ts && git commit -m "feat: design tokens and google fonts"
```

---

## Task 2: GrainOverlay.tsx

**Files:**
- Create: `src/components/GrainOverlay.tsx`

**Step 1: Komponente erstellen**
```tsx
import { AbsoluteFill } from "remotion";

export const GrainOverlay = () => (
  <AbsoluteFill style={{ zIndex: 999, pointerEvents: "none" }}>
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
    >
      <filter id="g">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" opacity={0.035} />
    </svg>
  </AbsoluteFill>
);
```

**Step 2: Commit**
```bash
git add src/components/GrainOverlay.tsx && git commit -m "feat: GrainOverlay component"
```

---

## Task 3: Scene1Hero.tsx

Relative Frames: 0–180
Frame-Mapping (absolut → relativ):
- Marquee: 0
- "Lokal.": startet bei 10
- "Digital.": startet bei 20
- "Komplett.": startet bei 30
- Subtext: 60
- CTA: 75

**Files:**
- Create: `src/components/Scene1Hero.tsx`

**Step 1: Komponente erstellen**
```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene1Hero = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Marquee: 0% → -50% über 180 frames
  const marqueeX = interpolate(frame, [0, 180], [0, -50]);

  const sc = { damping: 18, stiffness: 80 };

  const sLokal = spring({ fps, frame: Math.max(0, frame - 10), config: sc, from: 0, to: 1 });
  const sDigital = spring({ fps, frame: Math.max(0, frame - 20), config: sc, from: 0, to: 1 });
  const sKomplett = spring({ fps, frame: Math.max(0, frame - 30), config: sc, from: 0, to: 1 });

  const subtextOp = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtextY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOp = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Marquee */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          overflow: "hidden",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: C.accent,
          opacity: 0.4,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          fontFamily: FONTS.body,
        }}
      >
        <div style={{ display: "inline-flex", transform: `translateX(${marqueeX}%)` }}>
          {"WEBENTWICKLUNG · MEDIENPRODUKTION · AUTOMATION · RUHRGEBIET · ".repeat(8)}
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, #0a0a0a 30%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.1) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        {/* Lokal. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            lineHeight: 0.9,
            color: C.text,
            fontStyle: "italic",
            transform: `translateX(${-270 + sLokal * 270}px)`,
            opacity: sLokal,
          }}
        >
          Lokal.
        </div>

        {/* Digital. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            lineHeight: 0.9,
            color: C.text,
            textAlign: "center",
            transform: `translateX(${270 - sDigital * 270}px)`,
            opacity: sDigital,
          }}
        >
          Digital.
        </div>

        {/* Komplett. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            lineHeight: 0.9,
            color: C.accent,
            fontStyle: "italic",
            alignSelf: "flex-end",
            transform: `translateY(${120 - sKomplett * 120}px)`,
            opacity: sKomplett,
          }}
        >
          Komplett.
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: C.textMuted,
            maxWidth: 480,
            marginTop: 40,
            opacity: subtextOp,
            transform: `translateY(${subtextY}px)`,
          }}
        >
          Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.
        </div>

        {/* CTA Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 32,
            opacity: ctaOp,
          }}
        >
          <div
            style={{
              backgroundColor: C.accent,
              color: C.onAccent,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "14px 28px",
              fontFamily: FONTS.body,
            }}
          >
            Unsere Leistungen
          </div>
          <div
            style={{
              color: C.accent,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: FONTS.body,
            }}
          >
            Projekt starten →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/Scene1Hero.tsx && git commit -m "feat: Scene1Hero"
```

---

## Task 4: Scene2Manifesto.tsx

Relative Frames: 0–180 (absoluter Offset: 180)
Frame-Mapping (absolut - 180 = relativ):
- Label: abs 185 → rel 5
- Zeile 1 Wörter: abs 200+i*8 → rel 20+i*8
- Zeile 2 Wörter: abs 260+i*8 → rel 80+i*8
- Linie: abs 310 → rel 130
- Subtext: abs 320 → rel 140

**Files:**
- Create: `src/components/Scene2Manifesto.tsx`

**Step 1: Komponente erstellen**
```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene2Manifesto = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const words1 = "Wir bauen keine Webseiten.".split(" ");
  const words2 = "Wir bauen deinen unfairen Vorteil.".split(" ");

  const lineScaleX = interpolate(frame, [130, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtextOp = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtextY = interpolate(frame, [140, 170], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        padding: "0 120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: C.textMuted,
          marginBottom: 32,
          opacity: labelOp,
        }}
      >
        Unser Manifest
      </div>

      {/* Zeile 1 – Wort für Wort */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", marginBottom: 8 }}>
        {words1.map((word, i) => {
          const startF = 20 + i * 8;
          const s = spring({
            fps,
            frame: Math.max(0, frame - startF),
            config: { damping: 20, stiffness: 90, overshootClamping: true },
            from: 105,
            to: 0,
          });
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: FONTS.display,
                  fontSize: 88,
                  lineHeight: 1.05,
                  color: C.text,
                  transform: `translateY(${s}%)`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>

      {/* Zeile 2 – "unfairen" hervorgehoben */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", marginBottom: 40 }}>
        {words2.map((word, i) => {
          const startF = 80 + i * 8;
          const isHighlighted = word === "unfairen";
          const s = spring({
            fps,
            frame: Math.max(0, frame - startF),
            config: { damping: 20, stiffness: 90, overshootClamping: true },
            from: 105,
            to: 0,
          });
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: FONTS.display,
                  fontSize: 88,
                  lineHeight: 1.05,
                  color: isHighlighted ? C.onAccent : C.text,
                  transform: `translateY(${s}%)`,
                  ...(isHighlighted
                    ? {
                        backgroundColor: C.accent,
                        padding: "0 12px",
                        rotate: "-2deg",
                      }
                    : {}),
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>

      {/* Trennlinie */}
      <div
        style={{
          height: 1,
          backgroundColor: C.accent,
          width: "100%",
          transform: `scaleX(${lineScaleX})`,
          transformOrigin: "left center",
          marginBottom: 32,
        }}
      />

      {/* Subtext */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          color: C.textMuted,
          maxWidth: 480,
          opacity: subtextOp,
          transform: `translateY(${subtextY}px)`,
        }}
      >
        Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/Scene2Manifesto.tsx && git commit -m "feat: Scene2Manifesto word-reveal"
```

---

## Task 5: Scene3Services.tsx

Relative Frames: 0–270 (absoluter Offset: 360)
Panel-Timing (relativ):
- Panel 0: 0–90
- Panel 1: 90–180
- Panel 2: 180–270

**Files:**
- Create: `src/components/Scene3Services.tsx`

**Step 1: Komponente erstellen**
```tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONTS } from "../tokens";

const PANELS = [
  {
    counter: "01 / 03",
    title: "Webentwicklung",
    sub: "Dein digitales Schaufenster — entwickelt, um zu konvertieren.",
    num: "01",
  },
  {
    counter: "02 / 03",
    title: "Medienproduktion",
    sub: "Inhalte, die das Scrollen stoppen.",
    num: "02",
  },
  {
    counter: "03 / 03",
    title: "Automation",
    sub: "Dein Unternehmen auf Autopilot.",
    num: "03",
  },
];

export const Scene3Services = () => {
  const frame = useCurrentFrame();
  const activePanel = Math.min(2, Math.floor(frame / 90));

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgElevated, overflow: "hidden" }}>
      {PANELS.map((panel, i) => {
        const panelStart = i * 90;
        const panelEnd = panelStart + 90;
        const op = interpolate(
          frame,
          [panelStart, panelStart + 20, panelEnd - 20, panelEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const x = interpolate(frame, [panelStart, panelStart + 25], [80, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <AbsoluteFill
            key={i}
            style={{
              opacity: op,
              transform: `translateX(${x}px)`,
              padding: "0 120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Hintergrundnummer */}
            <div
              style={{
                position: "absolute",
                right: "8%",
                top: "38%",
                transform: "translateY(-50%)",
                fontFamily: FONTS.display,
                fontSize: 480,
                color: C.accent,
                opacity: 0.06,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {panel.num}
            </div>

            {/* Counter */}
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: C.textMuted,
                marginBottom: 24,
                position: "relative",
                zIndex: 1,
              }}
            >
              {panel.counter}
            </div>

            {/* Titel */}
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 130,
                color: C.text,
                lineHeight: 0.92,
                marginBottom: 32,
                position: "relative",
                zIndex: 1,
              }}
            >
              {panel.title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 32,
                color: C.accent,
                fontStyle: "italic",
                maxWidth: 700,
                position: "relative",
                zIndex: 1,
              }}
            >
              {panel.sub}
            </div>
          </AbsoluteFill>
        );
      })}

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {PANELS.map((_, i) => (
          <div
            key={i}
            style={{
              height: 6,
              borderRadius: 999,
              backgroundColor: i === activePanel ? C.accent : C.border,
              width: i === activePanel ? 24 : 6,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/Scene3Services.tsx && git commit -m "feat: Scene3Services panels"
```

---

## Task 6: Scene4Stats.tsx

Relative Frames: 0–90 (absoluter Offset: 630)
Stats starten bei rel 10 (abs 640), je +15 Frames.

**Files:**
- Create: `src/components/Scene4Stats.tsx`

**Step 1: Komponente erstellen**
```tsx
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONTS } from "../tokens";

const STATS = [
  { value: "3",    label: "Kernleistungen" },
  { value: "100%", label: "Lokal im Ruhrgebiet" },
  { value: "1",    label: "Partner für Alles" },
  { value: "∞",    label: "Ambition" },
];

export const Scene4Stats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 48,
          width: "100%",
        }}
      >
        {STATS.map((stat, i) => {
          const startF = 10 + i * 15;
          const s = spring({
            fps,
            frame: Math.max(0, frame - startF),
            config: { damping: 20, stiffness: 80 },
            from: 0,
            to: 1,
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: s,
                transform: `translateY(${(1 - s) * 30}px)`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 72,
                  color: C.accent,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.textMuted,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/Scene4Stats.tsx && git commit -m "feat: Scene4Stats grid"
```

---

## Task 7: Scene5CTA.tsx

Relative Frames: 0–120 (absoluter Offset: 720)
Frame-Mapping:
- Headline spring: rel 10 (abs 730)
- URL opacity: rel 40→65 (abs 760→785)
- Underline scaleX: rel 40→80 (abs 760→800)

**Files:**
- Create: `src/components/Scene5CTA.tsx`

**Step 1: Komponente erstellen**
```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineSpring = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 20, stiffness: 80 },
    from: 0,
    to: 1,
  });

  const urlOp = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underlineScale = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Headline */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 96,
          color: C.text,
          fontStyle: "italic",
          textAlign: "center",
          opacity: headlineSpring,
          transform: `translateY(${(1 - headlineSpring) * 60}px)`,
        }}
      >
        Bereit für deinen Vorteil?
      </div>

      {/* URL + Underline */}
      <div
        style={{
          opacity: urlOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: C.accent,
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          fpz-media.de
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: C.accent,
            width: "100%",
            transform: `scaleX(${underlineScale})`,
            transformOrigin: "left center",
            marginTop: 6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/Scene5CTA.tsx && git commit -m "feat: Scene5CTA"
```

---

## Task 8: Scene6Endcard.tsx

Relative Frames: 0–60 (absoluter Offset: 840)
Frame-Mapping:
- Logo spring: rel 5 (abs 845)
- Tagline: rel 25→50 (abs 865→890)
- Fade-out: rel 40→60 (abs 880→900)

**Files:**
- Create: `src/components/Scene6Endcard.tsx`

**Step 1: Komponente erstellen**
```tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene6Endcard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    fps,
    frame: Math.max(0, frame - 5),
    config: { damping: 20, stiffness: 80 },
    from: 0,
    to: 1,
  });

  const taglineOp = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalFadeOut = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity: globalFadeOut,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 120,
          color: C.accent,
          fontStyle: "italic",
          textAlign: "center",
          opacity: logoSpring,
          transform: `translateY(${(1 - logoSpring) * 40}px)`,
        }}
      >
        FPZ.
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          color: C.textMuted,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          textAlign: "center",
          opacity: taglineOp,
        }}
      >
        Web · Film · Automation
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**
```bash
git add src/components/Scene6Endcard.tsx && git commit -m "feat: Scene6Endcard"
```

---

## Task 9: Video.tsx + Root.tsx verdrahten

**Files:**
- Create: `src/Video.tsx`
- Modify: `src/Root.tsx`

**Step 1: Video.tsx erstellen**
```tsx
import { AbsoluteFill, Series } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { Scene1Hero } from "./components/Scene1Hero";
import { Scene2Manifesto } from "./components/Scene2Manifesto";
import { Scene3Services } from "./components/Scene3Services";
import { Scene4Stats } from "./components/Scene4Stats";
import { Scene5CTA } from "./components/Scene5CTA";
import { Scene6Endcard } from "./components/Scene6Endcard";

export const FPZVideo = () => (
  <AbsoluteFill>
    <Series>
      <Series.Sequence durationInFrames={180}>
        <Scene1Hero />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <Scene2Manifesto />
      </Series.Sequence>
      <Series.Sequence durationInFrames={270}>
        <Scene3Services />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <Scene4Stats />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <Scene5CTA />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Scene6Endcard />
      </Series.Sequence>
    </Series>
    <GrainOverlay />
  </AbsoluteFill>
);
```

**Step 2: Root.tsx ersetzen**
```tsx
import { Composition } from "remotion";
import { FPZVideo } from "./Video";
import "./tokens"; // Font-Loading sicherstellen

export const RemotionRoot = () => (
  <>
    <Composition
      id="FPZMediaAd"
      component={FPZVideo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
```

**Step 3: Entry-Point prüfen**
Öffne `src/index.ts` (oder `src/index.tsx`). Es muss enthalten:
```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
registerRoot(RemotionRoot);
```
Falls dort noch alte Imports stehen, ersetzen.

**Step 4: Vollständigen Durchlauf prüfen**
```bash
npm run dev
```
Prüfen:
- Composition "FPZMediaAd" sichtbar
- Alle 6 Szenen spielen korrekt durch
- 900 Frames total (30s bei 30fps)
- Grain-Overlay sichtbar (leicht)
- Fonts laden korrekt (DM Serif Display + DM Sans)

**Step 5: Final-Commit**
```bash
git add src/ && git commit -m "feat: FPZVideo composition – alle 6 Szenen verdrahtet"
git -C /d/fpz add fpz-media-video/ && git -C /d/fpz commit -m "feat: remotion werbevideo vollständig implementiert"
```
