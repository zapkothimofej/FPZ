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

  const orbIntensity = interpolate(frame, [0, 120], [0.5, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOp = interpolate(frame, [0, 40], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const scale1 = 1 + (1 - s1) * 3.5;

  const s2 = spring({ frame: frame - 24, fps, config: { damping: 14, stiffness: 100 } });
  const scale2 = 1 + (1 - s2) * 3.5;

  const subOp = interpolate(frame, [110, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [110, 160], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [200, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particleOp = interpolate(frame, [0, 30], [0, 0.8], {
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
