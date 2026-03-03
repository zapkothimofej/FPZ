# FPZ Media Video V2 — Fluid Core Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace V1 with a motion-graphics ad that shows FPZ Media's services (Web, Media, Automation) via animated SVGs, kinetic typography, and a Gemini-inspired pulsing orb + particle system.

**Architecture:** 6 independent scene components in a Remotion `<Series>`. Shared `Orb` and `Particles` components used in every scene. V1 scene files deleted. `tokens.ts` and `GrainOverlay.tsx` kept unchanged.

**Tech Stack:** Remotion 4.x, TypeScript, SVG, `spring()`/`interpolate()` from `remotion`, `@remotion/google-fonts`

**Project path:** `/d/fpz/fpz-media-video/`

**Frame map:**
| Scene | File | Duration |
|-------|------|----------|
| Hook | Scene1Hook.tsx | 90 fr |
| Web | Scene2Web.tsx | 210 fr |
| Media | Scene3Media.tsx | 210 fr |
| Automation | Scene4Automation.tsx | 180 fr |
| Manifesto | Scene5Manifesto.tsx | 120 fr |
| Endcard | Scene6Endcard.tsx | 90 fr |
| **Total** | | **900 fr** |

**Verify after each task:** `npm run dev` (already running on http://localhost:3000) — navigate to that frame range in the Remotion Studio.

---

### Task 0: Delete V1 scenes, stub Video.tsx

**Files:**
- Delete: `src/components/Scene1Hero.tsx`
- Delete: `src/components/Scene2Manifesto.tsx`
- Delete: `src/components/Scene3Services.tsx`
- Delete: `src/components/Scene4Stats.tsx`
- Delete: `src/components/Scene5CTA.tsx`
- Delete: `src/components/Scene6Endcard.tsx`
- Modify: `src/Video.tsx`

**Step 1: Delete V1 scene files**

```bash
cd /d/fpz/fpz-media-video
rm src/components/Scene1Hero.tsx src/components/Scene2Manifesto.tsx src/components/Scene3Services.tsx src/components/Scene4Stats.tsx src/components/Scene5CTA.tsx src/components/Scene6Endcard.tsx
```

**Step 2: Replace Video.tsx with stub**

```tsx
// src/Video.tsx
import { AbsoluteFill } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { C } from "./tokens";

export const FPZVideo = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <GrainOverlay />
  </AbsoluteFill>
);
```

**Step 3: Verify dev server compiles**

Run: `npm run dev` (already running) — check that http://localhost:3000 loads without errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore(v2): delete V1 scenes, stub Video.tsx"
```

---

### Task 1: Create Orb.tsx

**Files:**
- Create: `src/components/Orb.tsx`

**Step 1: Create Orb.tsx**

```tsx
// src/components/Orb.tsx
import { useVideoConfig } from "remotion";
import { C } from "../tokens";

interface OrbProps {
  frame: number;
  x?: number;
  y?: number;
  radius?: number;
  opacity?: number;
  intensity?: number;
}

export const Orb = ({
  frame,
  x = 960,
  y = 540,
  radius = 300,
  opacity = 1,
  intensity = 1,
}: OrbProps) => {
  const { fps } = useVideoConfig();
  const pulse = Math.sin((frame / fps) * 1.5 * Math.PI) * 0.08 * intensity;
  const driftX = Math.sin((frame / fps) * 0.7 * Math.PI) * 18;
  const driftY = Math.cos((frame / fps) * 0.5 * Math.PI) * 12;
  const r = radius * (1 + pulse);
  const cx = x + driftX;
  const cy = y + driftY;

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
      viewBox="0 0 1920 1080"
    >
      <defs>
        <radialGradient id={`orbGrad${x}${y}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="30%" stopColor={C.accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`orbBlur${x}${y}`}>
          <feGaussianBlur stdDeviation="25" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={`url(#orbGrad${x}${y})`}
        filter={`url(#orbBlur${x}${y})`}
      />
    </svg>
  );
};
```

**Step 2: Verify**

Import Orb in Video.tsx stub temporarily and check it renders without error.

**Step 3: Commit**

```bash
git add src/components/Orb.tsx
git commit -m "feat(v2): add Orb component – pulsing SVG gradient orb"
```

---

### Task 2: Create Particles.tsx

**Files:**
- Create: `src/components/Particles.tsx`

**Step 1: Create Particles.tsx**

```tsx
// src/components/Particles.tsx
import { useVideoConfig } from "remotion";
import { C } from "../tokens";

const rand = (seed: number): number => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

interface ParticlesProps {
  frame: number;
  opacity?: number;
  count?: number;
}

export const Particles = ({ frame, opacity = 1, count = 50 }: ParticlesProps) => {
  const { fps } = useVideoConfig();

  const dots = Array.from({ length: count }, (_, i) => {
    const baseX = rand(i * 3) * 1920;
    const baseY = rand(i * 3 + 1) * 1080;
    const r = 1 + rand(i * 3 + 2) * 2;
    const op = 0.15 + rand(i * 7) * 0.35;
    const phaseX = rand(i * 5) * Math.PI * 2;
    const phaseY = rand(i * 11) * Math.PI * 2;
    const ampX = (rand(i * 17) - 0.5) * 40;
    const ampY = (rand(i * 19) - 0.5) * 30;
    const x = baseX + Math.sin((frame / fps) * Math.PI + phaseX) * ampX;
    const y = baseY + Math.cos((frame / fps) * 0.8 * Math.PI + phaseY) * ampY;
    return { x, y, r, op };
  });

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
      viewBox="0 0 1920 1080"
    >
      {dots.map(({ x, y, r, op }, i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={C.accent} opacity={op} />
      ))}
    </svg>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Particles.tsx
git commit -m "feat(v2): add Particles component – 50 deterministic drifting dots"
```

---

### Task 3: Create Scene1Hook.tsx

**Files:**
- Create: `src/components/Scene1Hook.tsx`

Duration: 90 frames (3s). Two lines of kinetic type crash in from sides.

**Step 1: Create Scene1Hook.tsx**

```tsx
// src/components/Scene1Hook.tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const particleOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOp = interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 1: "Dein Unternehmen." — crashes from top-left, scale 4→1
  const s1 = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const scale1 = 1 + (1 - s1) * 3.5;
  const x1 = (1 - s1) * -500;

  // Line 2: "Komplett digital." — crashes from bottom-right, 18fr delay
  const s2 = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const scale2 = 1 + (1 - s2) * 3.5;
  const x2 = (1 - s2) * 500;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Orb frame={frame} opacity={orbOp} radius={350} x={960} y={540} />
      <Particles frame={frame} opacity={particleOp} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 110,
            color: C.text,
            lineHeight: 1.1,
            transform: `translateX(${x1}px) scale(${scale1})`,
            transformOrigin: "center center",
            filter: "drop-shadow(0 0 40px rgba(200,200,200,0.45))",
            whiteSpace: "nowrap",
          }}
        >
          Dein Unternehmen.
        </div>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 110,
            color: C.accent,
            lineHeight: 1.1,
            transform: `translateX(${x2}px) scale(${scale2})`,
            transformOrigin: "center center",
            filter: "drop-shadow(0 0 50px rgba(200,200,200,0.7))",
            whiteSpace: "nowrap",
          }}
        >
          Komplett digital.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

**Step 2: Wire into Video.tsx temporarily to preview**

Add to Video.tsx to check it renders.

**Step 3: Commit**

```bash
git add src/components/Scene1Hook.tsx
git commit -m "feat(v2): Scene1Hook – kinetic type crash-in from sides"
```

---

### Task 4: Create Scene2Web.tsx

**Files:**
- Create: `src/components/Scene2Web.tsx`

Duration: 210 frames (7s). Animated browser window SVG revealing FPZ's web service.

**Step 1: Create Scene2Web.tsx**

```tsx
// src/components/Scene2Web.tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

export const Scene2Web = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene label slides down
  const labelOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [5, 25], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Browser outline draw-in: perimeter of 880×500 rect = 2*(880+500) = 2760
  const browserPerimeter = 2760;
  const drawProgress = interpolate(frame, [10, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashOffset = browserPerimeter * (1 - drawProgress);

  // Content blocks pop in sequentially
  const block1 = spring({ frame: frame - 75, fps, config: { damping: 22, stiffness: 160 } });
  const block2 = spring({ frame: frame - 95, fps, config: { damping: 22, stiffness: 160 } });
  const block3 = spring({ frame: frame - 115, fps, config: { damping: 22, stiffness: 160 } });

  // Service tags
  const tagOp = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [130, 155], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineS = spring({ frame: frame - 140, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  // Fade out at end
  const fadeOut = interpolate(frame, [190, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Browser box position
  const bx = 520;
  const by = 200;
  const bw = 880;
  const bh = 500;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <Particles frame={frame} opacity={0.5} />
      <Orb frame={frame} opacity={0.2} radius={280} x={960} y={600} />

      {/* Scene label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: labelOp,
          transform: `translateY(${labelY}px)`,
          fontFamily: FONTS.body,
          fontSize: 22,
          color: C.textMuted,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        01 — Web & Digital
      </div>

      {/* Browser SVG */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1920 1080"
      >
        {/* Browser frame */}
        <rect
          x={bx}
          y={by}
          width={bw}
          height={bh}
          rx={8}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.5}
          strokeDasharray={browserPerimeter}
          strokeDashoffset={dashOffset}
        />

        {/* Top bar separator */}
        <line
          x1={bx}
          y1={by + 44}
          x2={bx + bw}
          y2={by + 44}
          stroke={C.border}
          strokeWidth={1}
          opacity={drawProgress}
        />

        {/* Window dots */}
        <circle cx={bx + 22} cy={by + 22} r={7} fill="#ff5f57" opacity={drawProgress} />
        <circle cx={bx + 44} cy={by + 22} r={7} fill="#febc2e" opacity={drawProgress} />
        <circle cx={bx + 66} cy={by + 22} r={7} fill="#28c840" opacity={drawProgress} />

        {/* URL bar */}
        <rect x={bx + 110} y={by + 10} width={280} height={24} rx={4} fill={C.bgElevated} opacity={drawProgress} />
        <text
          x={bx + 250}
          y={by + 27}
          fill={C.textMuted}
          fontSize={11}
          textAnchor="middle"
          fontFamily="monospace"
          opacity={drawProgress}
        >
          fpz-media.de
        </text>

        {/* Hero block */}
        <rect x={bx + 20} y={by + 60} width={bw - 40} height={130} rx={4} fill={C.bgElevated} opacity={block1} />
        <rect x={bx + 40} y={by + 82} width={220} height={18} rx={3} fill={C.border} opacity={block1} />
        <rect x={bx + 40} y={by + 110} width={160} height={12} rx={3} fill={C.border} opacity={block1 * 0.6} />
        <rect x={bx + 40} y={by + 130} width={120} height={12} rx={3} fill={C.border} opacity={block1 * 0.6} />
        <rect x={bx + 40} y={by + 155} width={80} height={22} rx={4} fill={C.accent} opacity={block1} />
        <rect x={bx + bw - 200} y={by + 72} width={160} height={100} rx={4} fill={C.border} opacity={block1} />

        {/* Card grid */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={bx + 20 + i * 290}
              y={by + 210}
              width={270}
              height={140}
              rx={4}
              fill={C.bgElevated}
              opacity={block2}
            />
            <rect
              x={bx + 40 + i * 290}
              y={by + 230}
              width={100}
              height={10}
              rx={3}
              fill={C.border}
              opacity={block2}
            />
            <rect
              x={bx + 40 + i * 290}
              y={by + 250}
              width={140}
              height={8}
              rx={3}
              fill={C.border}
              opacity={block2 * 0.5}
            />
            <rect
              x={bx + 40 + i * 290}
              y={by + 268}
              width={100}
              height={8}
              rx={3}
              fill={C.border}
              opacity={block2 * 0.4}
            />
          </g>
        ))}

        {/* Footer bar */}
        <rect x={bx + 20} y={by + 370} width={bw - 40} height={60} rx={4} fill={C.bgElevated} opacity={block3} />
        <rect x={bx + 40} y={by + 390} width={300} height={10} rx={3} fill={C.border} opacity={block3} />
        <rect x={bx + 40} y={by + 408} width={200} height={8} rx={3} fill={C.border} opacity={block3 * 0.5} />
      </svg>

      {/* Service tags */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
        }}
      >
        {["Web Design", "SEO", "E-Commerce", "CMS"].map((tag) => (
          <div
            key={tag}
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              color: C.textMuted,
              border: `1px solid ${C.border}`,
              padding: "6px 20px",
              borderRadius: 100,
              letterSpacing: "0.05em",
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontSize: 64,
          color: C.text,
          transform: `scale(${headlineScale})`,
          filter: "drop-shadow(0 0 30px rgba(200,200,200,0.4))",
        }}
      >
        Deine digitale Präsenz.
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Scene2Web.tsx
git commit -m "feat(v2): Scene2Web – animated browser window SVG"
```

---

### Task 5: Create Scene3Media.tsx

**Files:**
- Create: `src/components/Scene3Media.tsx`

Duration: 210 frames (7s). SVG camera assembles with stroke-dashoffset, shutter click flash.

**Step 1: Create Scene3Media.tsx**

Camera SVG: body 320×220 rect, lens circle r=80, viewfinder bump, shutter button.
Body perimeter: 2*(320+220) = 1080. Lens circumference: 2*π*80 ≈ 502.

```tsx
// src/components/Scene3Media.tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

export const Scene3Media = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene label
  const labelOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera body draws in
  const bodyPerimeter = 1080;
  const bodyDraw = interpolate(frame, [10, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOffset = bodyPerimeter * (1 - bodyDraw);

  // Lens ring draws in
  const lensPerimeter = 502;
  const lensDraw = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lensOffset = lensPerimeter * (1 - lensDraw);

  // Inner lens ring
  const innerLensDraw = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Details: viewfinder, buttons
  const detailOp = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shutter click at frame 140: scale pulse
  const shutterS = spring({ frame: frame - 140, fps, config: { damping: 10, stiffness: 300, mass: 0.5 } });
  const shutterPulse = frame >= 140 && frame <= 165 ? 1 + shutterS * 0.08 : 1;

  // Flash effect
  const flashOp = interpolate(frame, [140, 142, 150, 158], [0, 0.5, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Service tags
  const tagOp = interpolate(frame, [155, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [155, 175], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineS = spring({ frame: frame - 165, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  // Fade out
  const fadeOut = interpolate(frame, [190, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera centered at 960, 480
  const camX = 800; // left edge of camera body
  const camY = 370; // top edge
  const camW = 320;
  const camH = 220;
  const lensX = camX + camW / 2; // lens center X
  const lensY = camY + camH / 2; // lens center Y

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <Particles frame={frame} opacity={0.5} />
      <Orb frame={frame} opacity={0.2} radius={260} x={960} y={580} />

      {/* Scene label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: labelOp,
          fontFamily: FONTS.body,
          fontSize: 22,
          color: C.textMuted,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        02 — Foto & Video
      </div>

      {/* Camera SVG */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform: `scale(${shutterPulse})`,
          transformOrigin: "center center",
        }}
        viewBox="0 0 1920 1080"
      >
        {/* Camera body */}
        <rect
          x={camX}
          y={camY}
          width={camW}
          height={camH}
          rx={12}
          fill="none"
          stroke={C.accent}
          strokeWidth={2}
          strokeDasharray={bodyPerimeter}
          strokeDashoffset={bodyOffset}
        />

        {/* Viewfinder bump on top */}
        <rect
          x={camX + 20}
          y={camY - 30}
          width={80}
          height={32}
          rx={6}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.5}
          opacity={detailOp}
        />

        {/* Shutter button */}
        <circle
          cx={camX + camW - 35}
          cy={camY - 14}
          r={12}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.5}
          opacity={detailOp}
        />

        {/* Lens outer ring */}
        <circle
          cx={lensX}
          cy={lensY}
          r={80}
          fill="none"
          stroke={C.accent}
          strokeWidth={2}
          strokeDasharray={lensPerimeter}
          strokeDashoffset={lensOffset}
        />

        {/* Lens inner ring */}
        <circle
          cx={lensX}
          cy={lensY}
          r={55}
          fill="none"
          stroke={C.accent}
          strokeWidth={1}
          opacity={innerLensDraw * 0.6}
        />

        {/* Lens center fill */}
        <circle
          cx={lensX}
          cy={lensY}
          r={52}
          fill={C.bgElevated}
          opacity={innerLensDraw * 0.8}
        />

        {/* Lens aperture blades (simplified) */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={lensX}
            y1={lensY}
            x2={lensX + Math.cos((angle * Math.PI) / 180) * 40}
            y2={lensY + Math.sin((angle * Math.PI) / 180) * 40}
            stroke={C.border}
            strokeWidth={1}
            opacity={innerLensDraw * 0.7}
          />
        ))}

        {/* Lens highlight dot */}
        <circle
          cx={lensX - 22}
          cy={lensY - 22}
          r={8}
          fill={C.accent}
          opacity={innerLensDraw * 0.3}
        />

        {/* Camera grip/detail lines on right */}
        {[0, 10, 20].map((offset) => (
          <line
            key={offset}
            x1={camX + camW - 25}
            y1={camY + 60 + offset}
            x2={camX + camW - 10}
            y2={camY + 60 + offset}
            stroke={C.border}
            strokeWidth={1}
            opacity={detailOp}
          />
        ))}
      </svg>

      {/* Flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          opacity: flashOp,
          pointerEvents: "none",
        }}
      />

      {/* Service tags */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
        }}
      >
        {["Fotografie", "Videoproduktion", "Reels & Content"].map((tag) => (
          <div
            key={tag}
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              color: C.textMuted,
              border: `1px solid ${C.border}`,
              padding: "6px 20px",
              borderRadius: 100,
              letterSpacing: "0.05em",
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontSize: 64,
          color: C.text,
          transform: `scale(${headlineScale})`,
          filter: "drop-shadow(0 0 30px rgba(200,200,200,0.4))",
        }}
      >
        Visuals, die überzeugen.
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Scene3Media.tsx
git commit -m "feat(v2): Scene3Media – camera SVG draw-in with shutter flash"
```

---

### Task 6: Create Scene4Automation.tsx

**Files:**
- Create: `src/components/Scene4Automation.tsx`

Duration: 180 frames (6s). Workflow diagram: Lead → FPZ → CRM with stroke-dashoffset lines.

**Step 1: Create Scene4Automation.tsx**

Node positions: y=540 (vertical center). x: 380, 960, 1540 (equal spacing).
Line between nodes: 380→960 (length 580) and 960→1540 (length 580).

```tsx
// src/components/Scene4Automation.tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

const NODE_Y = 500;
const NODES = [
  { x: 380, label: "Lead", sublabel: "Anfrage eingeht" },
  { x: 960, label: "FPZ", sublabel: "Automatisierung" },
  { x: 1540, label: "CRM", sublabel: "Kunde gespeichert" },
];
const LINE_LENGTH = 580;

export const Scene4Automation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene label
  const labelOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Nodes spring in
  const nodeS = [
    spring({ frame, fps, config: { damping: 20, stiffness: 130 } }),
    spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 130 } }),
    spring({ frame: frame - 24, fps, config: { damping: 20, stiffness: 130 } }),
  ];

  // Lines draw in
  const line1Progress = interpolate(frame, [35, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Progress = interpolate(frame, [65, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse dot along line 1
  const pulse1X = NODES[0].x + 40 + (NODES[1].x - NODES[0].x - 80) * ((frame % 40) / 40);
  const pulse1Op = frame >= 90 && frame < 160
    ? interpolate((frame % 40), [0, 5, 35, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Pulse dot along line 2
  const pulse2X = NODES[1].x + 40 + (NODES[2].x - NODES[1].x - 80) * (((frame + 20) % 40) / 40);
  const pulse2Op = frame >= 110 && frame < 160
    ? interpolate(((frame + 20) % 40), [0, 5, 35, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Stat reveal
  const statS = spring({ frame: frame - 130, fps, config: { damping: 18, stiffness: 120 } });
  const statScale = 1 + (1 - statS) * 1.8;
  const statOp = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineS = spring({ frame: frame - 140, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  // Fade out
  const fadeOut = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodeR = 50;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <Particles frame={frame} opacity={0.4} />
      <Orb frame={frame} opacity={0.15} radius={220} x={960} y={540} />

      {/* Scene label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: labelOp,
          fontFamily: FONTS.body,
          fontSize: 22,
          color: C.textMuted,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        03 — Automation
      </div>

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1920 1080"
      >
        {/* Line 1: Node 0 → Node 1 */}
        <line
          x1={NODES[0].x + nodeR}
          y1={NODE_Y}
          x2={NODES[1].x - nodeR}
          y2={NODE_Y}
          stroke={C.accent}
          strokeWidth={1.5}
          strokeDasharray={LINE_LENGTH - nodeR * 2}
          strokeDashoffset={(LINE_LENGTH - nodeR * 2) * (1 - line1Progress)}
          opacity={0.5}
        />

        {/* Arrow head line 1 */}
        <polygon
          points={`${NODES[1].x - nodeR - 2},${NODE_Y} ${NODES[1].x - nodeR - 14},${NODE_Y - 8} ${NODES[1].x - nodeR - 14},${NODE_Y + 8}`}
          fill={C.accent}
          opacity={line1Progress}
        />

        {/* Line 2: Node 1 → Node 2 */}
        <line
          x1={NODES[1].x + nodeR}
          y1={NODE_Y}
          x2={NODES[2].x - nodeR}
          y2={NODE_Y}
          stroke={C.accent}
          strokeWidth={1.5}
          strokeDasharray={LINE_LENGTH - nodeR * 2}
          strokeDashoffset={(LINE_LENGTH - nodeR * 2) * (1 - line2Progress)}
          opacity={0.5}
        />

        {/* Arrow head line 2 */}
        <polygon
          points={`${NODES[2].x - nodeR - 2},${NODE_Y} ${NODES[2].x - nodeR - 14},${NODE_Y - 8} ${NODES[2].x - nodeR - 14},${NODE_Y + 8}`}
          fill={C.accent}
          opacity={line2Progress}
        />

        {/* Pulse dots */}
        <circle cx={pulse1X} cy={NODE_Y} r={5} fill={C.text} opacity={pulse1Op} />
        <circle cx={pulse2X} cy={NODE_Y} r={5} fill={C.text} opacity={pulse2Op} />

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={node.label} style={{ opacity: nodeS[i] }}>
            {/* Outer ring */}
            <circle
              cx={node.x}
              cy={NODE_Y}
              r={nodeR}
              fill="none"
              stroke={C.accent}
              strokeWidth={1.5}
              opacity={0.7}
            />
            {/* Inner fill */}
            <circle cx={node.x} cy={NODE_Y} r={nodeR - 6} fill={C.bgElevated} />
            {/* Node label */}
            <text
              x={node.x}
              y={NODE_Y + 6}
              fill={C.text}
              fontSize={22}
              fontWeight="600"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Node sublabels below */}
        {NODES.map((node, i) => (
          <text
            key={`sub${node.label}`}
            x={node.x}
            y={NODE_Y + nodeR + 32}
            fill={C.textMuted}
            fontSize={16}
            textAnchor="middle"
            fontFamily="sans-serif"
            opacity={nodeS[i]}
          >
            {node.sublabel}
          </text>
        ))}

        {/* Stat badge */}
        <g opacity={statOp} transform={`translate(960, 350) scale(${statScale})`}>
          <rect x={-100} y={-30} width={200} height={60} rx={8} fill={C.bgElevated} />
          <rect x={-100} y={-30} width={200} height={60} rx={8} fill="none" stroke={C.accent} strokeWidth={1} opacity={0.4} />
          <text x={0} y={8} fill={C.accent} fontSize={28} fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            +87% Leads
          </text>
        </g>
      </svg>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontSize: 64,
          color: C.text,
          transform: `scale(${headlineScale})`,
          filter: "drop-shadow(0 0 30px rgba(200,200,200,0.4))",
        }}
      >
        Prozesse, die arbeiten.
      </div>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Scene4Automation.tsx
git commit -m "feat(v2): Scene4Automation – workflow diagram with draw-in lines + pulse dots"
```

---

### Task 7: Create Scene5Manifesto.tsx

**Files:**
- Create: `src/components/Scene5Manifesto.tsx`

Duration: 120 frames (4s). "UNFAIREN VORTEIL." crashes from scale 4 to 1. High-impact kinetic type.

**Step 1: Create Scene5Manifesto.tsx**

```tsx
// src/components/Scene5Manifesto.tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

export const Scene5Manifesto = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Orb intensifies
  const orbIntensity = interpolate(frame, [0, 60], [0.5, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOp = interpolate(frame, [0, 20], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "UNFAIREN" crashes in from scale 4
  const s1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const scale1 = 1 + (1 - s1) * 3.5;

  // "VORTEIL." crashes in from scale 4, 12fr delay
  const s2 = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 100 } });
  const scale2 = 1 + (1 - s2) * 3.5;

  // Subtext fades in
  const subOp = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [55, 80], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particleOp = interpolate(frame, [0, 15], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <Orb frame={frame} opacity={orbOp} radius={380} x={960} y={540} intensity={orbIntensity} />
      <Particles frame={frame} opacity={particleOp} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 160,
            color: C.text,
            lineHeight: 1,
            transform: `scale(${scale1})`,
            transformOrigin: "center bottom",
            filter: "drop-shadow(0 0 60px rgba(200,200,200,0.6))",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          UNFAIREN
        </div>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 160,
            color: C.accent,
            lineHeight: 1,
            transform: `scale(${scale2})`,
            transformOrigin: "center top",
            filter: "drop-shadow(0 0 80px rgba(200,200,200,0.8))",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          VORTEIL.
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: FONTS.body,
            fontSize: 32,
            color: C.textMuted,
            opacity: subOp,
            transform: `translateY(${subY}px)`,
            letterSpacing: "0.1em",
          }}
        >
          Wir machen's möglich.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Scene5Manifesto.tsx
git commit -m "feat(v2): Scene5Manifesto – UNFAIREN VORTEIL. kinetic crash"
```

---

### Task 8: Create Scene6Endcard.tsx

**Files:**
- Create: `src/components/Scene6Endcard.tsx`

Duration: 90 frames (3s). FPZ. logo spring in, URL with scan underline, orb fades, blackout.

**Step 1: Create Scene6Endcard.tsx**

```tsx
// src/components/Scene6Endcard.tsx
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

export const Scene6Endcard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // FPZ. logo spring in
  const logoS = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const logoScale = 1 + (1 - logoS) * 1.5;
  const logoOp = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline slides up
  const taglineOp = interpolate(frame, [15, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [15, 32], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL appears
  const urlOp = interpolate(frame, [28, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL underline scan: 0→100% width from frame 40 to 60
  const underlineW = interpolate(frame, [40, 60], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orb fades out
  const orbOp = interpolate(frame, [0, 15, 65, 80], [0, 0.35, 0.35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particles fade
  const particleOp = interpolate(frame, [0, 15, 65, 80], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Global blackout
  const blackout = interpolate(frame, [72, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Orb frame={frame} opacity={orbOp} radius={300} x={960} y={540} intensity={1.5} />
      <Particles frame={frame} opacity={particleOp} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {/* FPZ. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 160,
            color: C.text,
            lineHeight: 1,
            opacity: logoOp,
            transform: `scale(${logoScale})`,
            filter: "drop-shadow(0 0 60px rgba(200,200,200,0.5))",
            letterSpacing: "-0.02em",
          }}
        >
          FPZ.
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: C.textMuted,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: taglineOp,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Media & Marketing
        </div>

        {/* URL with scan underline */}
        <div
          style={{
            position: "relative",
            marginTop: 24,
            opacity: urlOp,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 28,
              color: C.accent,
              letterSpacing: "0.08em",
            }}
          >
            fpz-media.de
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -4,
              left: 0,
              height: 1,
              width: `${underlineW}%`,
              background: C.accent,
              boxShadow: `0 0 8px ${C.accent}`,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Blackout overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          opacity: blackout,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Scene6Endcard.tsx
git commit -m "feat(v2): Scene6Endcard – FPZ. spring in, URL scan underline, blackout"
```

---

### Task 9: Wire Video.tsx + final verification

**Files:**
- Modify: `src/Video.tsx`
- Verify: `src/Root.tsx` (should be unchanged)

**Step 1: Update Video.tsx**

```tsx
// src/Video.tsx
import { AbsoluteFill, Series } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { Scene1Hook } from "./components/Scene1Hook";
import { Scene2Web } from "./components/Scene2Web";
import { Scene3Media } from "./components/Scene3Media";
import { Scene4Automation } from "./components/Scene4Automation";
import { Scene5Manifesto } from "./components/Scene5Manifesto";
import { Scene6Endcard } from "./components/Scene6Endcard";

export const FPZVideo = () => (
  <AbsoluteFill>
    <Series>
      <Series.Sequence durationInFrames={90}>
        <Scene1Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <Scene2Web />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <Scene3Media />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <Scene4Automation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <Scene5Manifesto />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <Scene6Endcard />
      </Series.Sequence>
    </Series>
    <GrainOverlay />
  </AbsoluteFill>
);
```

**Step 2: Verify Root.tsx is unchanged**

```tsx
// src/Root.tsx should still be:
import { Composition } from "remotion";
import { FPZVideo } from "./Video";
import "./tokens";

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

**Step 3: Verify total frames**

Sum: 90 + 210 + 210 + 180 + 120 + 90 = 900. Must match `durationInFrames={900}` in Root.tsx.

**Step 4: Check dev server**

Go to http://localhost:3000, navigate through all frames 0–899. Verify:
- Frame 0: Scene1Hook text crash
- Frame 90: Scene2Web browser draws
- Frame 300: Scene3Media camera
- Frame 510: Scene4Automation workflow
- Frame 690: Scene5Manifesto crash
- Frame 810: Scene6Endcard

**Step 5: Commit**

```bash
git add src/Video.tsx
git commit -m "feat(v2): wire all V2 scenes in Video.tsx – 900fr complete"
```

---

### Done

After Task 9 completes, invoke `superpowers:finishing-a-development-branch`.
