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

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOp = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyPerimeter = 1080;
  const bodyDraw = interpolate(frame, [20, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOffset = bodyPerimeter * (1 - bodyDraw);

  const lensPerimeter = 502;
  const lensDraw = interpolate(frame, [120, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lensOffset = lensPerimeter * (1 - lensDraw);

  const innerLensDraw = interpolate(frame, [180, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const detailOp = interpolate(frame, [220, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shutterS = spring({ frame: frame - 280, fps, config: { damping: 10, stiffness: 300, mass: 0.5 } });
  const shutterPulse = frame >= 280 && frame <= 330 ? 1 + shutterS * 0.08 : 1;

  const flashOp = interpolate(frame, [280, 284, 300, 316], [0, 0.5, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOp = interpolate(frame, [310, 350], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [310, 350], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineS = spring({ frame: frame - 330, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  const fadeOut = interpolate(frame, [380, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const camX = 800;
  const camY = 370;
  const camW = 320;
  const camH = 220;
  const lensX = camX + camW / 2;
  const lensY = camY + camH / 2;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeIn * fadeOut }}>
      <Particles frame={frame} opacity={0.5} />
      <Orb frame={frame} opacity={0.2} radius={260} x={960} y={580} />

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
        <rect x={camX} y={camY} width={camW} height={camH} rx={12} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray={bodyPerimeter} strokeDashoffset={bodyOffset} />
        <rect x={camX + 20} y={camY - 30} width={80} height={32} rx={6} fill="none" stroke={C.accent} strokeWidth={1.5} opacity={detailOp} />
        <circle cx={camX + camW - 35} cy={camY - 14} r={12} fill="none" stroke={C.accent} strokeWidth={1.5} opacity={detailOp} />
        <circle cx={lensX} cy={lensY} r={80} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray={lensPerimeter} strokeDashoffset={lensOffset} />
        <circle cx={lensX} cy={lensY} r={55} fill="none" stroke={C.accent} strokeWidth={1} opacity={innerLensDraw * 0.6} />
        <circle cx={lensX} cy={lensY} r={52} fill={C.bgElevated} opacity={innerLensDraw * 0.8} />
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
        <circle cx={lensX - 22} cy={lensY - 22} r={8} fill={C.accent} opacity={innerLensDraw * 0.3} />
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          opacity: flashOp,
          pointerEvents: "none",
        }}
      />

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
