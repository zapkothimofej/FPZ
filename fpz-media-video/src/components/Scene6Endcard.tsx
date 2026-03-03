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
