import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../tokens";
import { SCENE_DURATION, fadeIn, slideY } from "../utils/animation";

export const C1_Scene2 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, SCENE_DURATION], [1, 1.005], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = fadeIn(frame, 0, 30);
  const headlineY = slideY(frame, 0, 30);
  const subOpacity = fadeIn(frame, 20, 50);
  const subY = slideY(frame, 20, 50);

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
          gap: 32,
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
          Websites, die verkaufen.
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            color: "#888888",
            letterSpacing: "0.08em",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Web Design · SEO · E-Commerce
        </div>
      </div>
    </AbsoluteFill>
  );
};
