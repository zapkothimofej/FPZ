import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../tokens";

export const C3_Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 250, mass: 0.6 },
    durationInFrames: 25,
  });

  const scale = interpolate(progress, [0, 1], [1.3, 1]);
  const opacity = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
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
            transform: `scale(${scale})`,
          }}
        >
          Automatisiert.
        </div>
      </div>
    </AbsoluteFill>
  );
};
