import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../tokens";

const DURATION = 325;
const EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

const fadeIn = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

const slideY = (frame: number, start: number, end: number, from = 20, to = 0) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const C1_Scene6 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, DURATION], [1, 1.005], {
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
          FPZ Media.
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 18,
            color: "#555555",
            letterSpacing: "0.15em",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          fpz-media.de
        </div>
      </div>
    </AbsoluteFill>
  );
};
