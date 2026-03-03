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

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particleOp = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOp = interpolate(frame, [0, 60], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s1 = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const scale1 = 1 + (1 - s1) * 3.5;
  const x1 = (1 - s1) * -500;

  const s2 = spring({
    frame: frame - 36,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const scale2 = 1 + (1 - s2) * 3.5;
  const x2 = (1 - s2) * 500;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeIn * fadeOut }}>
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
