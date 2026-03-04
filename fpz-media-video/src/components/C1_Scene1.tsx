import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../tokens";
import { SCENE_DURATION, fadeIn, slideY } from "../utils/animation";

export const C1_Scene1 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, SCENE_DURATION], [1, 1.005], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = fadeIn(frame, 0, 30);
  const headlineY = slideY(frame, 0, 30);

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 140,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textAlign: "center",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          Wir bauen Marken.
        </div>
      </div>
    </AbsoluteFill>
  );
};
