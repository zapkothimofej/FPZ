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
