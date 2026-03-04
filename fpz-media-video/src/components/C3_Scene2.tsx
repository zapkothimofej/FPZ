import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../tokens";

export const C3_Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200, mass: 0.8 },
    durationInFrames: 25,
  });

  const x = interpolate(progress, [0, 1], [120, 0]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
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
            transform: `translateX(${x}px)`,
          }}
        >
          Web.
        </div>
      </div>
    </AbsoluteFill>
  );
};
