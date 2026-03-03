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

  const labelOp = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [10, 50], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const browserPerimeter = 2760;
  const drawProgress = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashOffset = browserPerimeter * (1 - drawProgress);

  const block1 = spring({ frame: frame - 150, fps, config: { damping: 22, stiffness: 160 } });
  const block2 = spring({ frame: frame - 190, fps, config: { damping: 22, stiffness: 160 } });
  const block3 = spring({ frame: frame - 230, fps, config: { damping: 22, stiffness: 160 } });

  const tagOp = interpolate(frame, [260, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [260, 310], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineS = spring({ frame: frame - 280, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  const bx = 520;
  const by = 200;
  const bw = 880;
  const bh = 500;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Particles frame={frame} opacity={0.5} />
      <Orb frame={frame} opacity={0.2} radius={280} x={960} y={600} />

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

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1920 1080"
      >
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
        <line x1={bx} y1={by + 44} x2={bx + bw} y2={by + 44} stroke={C.border} strokeWidth={1} opacity={drawProgress} />
        <circle cx={bx + 22} cy={by + 22} r={7} fill="#ff5f57" opacity={drawProgress} />
        <circle cx={bx + 44} cy={by + 22} r={7} fill="#febc2e" opacity={drawProgress} />
        <circle cx={bx + 66} cy={by + 22} r={7} fill="#28c840" opacity={drawProgress} />
        <rect x={bx + 110} y={by + 10} width={280} height={24} rx={4} fill={C.bgElevated} opacity={drawProgress} />
        <text x={bx + 250} y={by + 27} fill={C.textMuted} fontSize={11} textAnchor="middle" fontFamily="monospace" opacity={drawProgress}>
          fpz-media.de
        </text>
        <rect x={bx + 20} y={by + 60} width={bw - 40} height={130} rx={4} fill={C.bgElevated} opacity={block1} />
        <rect x={bx + 40} y={by + 82} width={220} height={18} rx={3} fill={C.border} opacity={block1} />
        <rect x={bx + 40} y={by + 110} width={160} height={12} rx={3} fill={C.border} opacity={block1 * 0.6} />
        <rect x={bx + 40} y={by + 130} width={120} height={12} rx={3} fill={C.border} opacity={block1 * 0.6} />
        <rect x={bx + 40} y={by + 155} width={80} height={22} rx={4} fill={C.accent} opacity={block1} />
        <rect x={bx + bw - 200} y={by + 72} width={160} height={100} rx={4} fill={C.border} opacity={block1} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={bx + 20 + i * 290} y={by + 210} width={270} height={140} rx={4} fill={C.bgElevated} opacity={block2} />
            <rect x={bx + 40 + i * 290} y={by + 230} width={100} height={10} rx={3} fill={C.border} opacity={block2} />
            <rect x={bx + 40 + i * 290} y={by + 250} width={140} height={8} rx={3} fill={C.border} opacity={block2 * 0.5} />
            <rect x={bx + 40 + i * 290} y={by + 268} width={100} height={8} rx={3} fill={C.border} opacity={block2 * 0.4} />
          </g>
        ))}
        <rect x={bx + 20} y={by + 370} width={bw - 40} height={60} rx={4} fill={C.bgElevated} opacity={block3} />
        <rect x={bx + 40} y={by + 390} width={300} height={10} rx={3} fill={C.border} opacity={block3} />
        <rect x={bx + 40} y={by + 408} width={200} height={8} rx={3} fill={C.border} opacity={block3 * 0.5} />
      </svg>

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
