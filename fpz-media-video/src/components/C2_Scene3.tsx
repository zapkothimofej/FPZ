import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "../tokens";

const EASE = Easing.bezier(0.4, 0, 0.2, 1);

const fadeIn = (frame: number, start: number, end: number): number =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

const slideY = (frame: number, start: number, end: number, from = 15, to = 0): number =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const C2_Scene3 = () => {
  const frame = useCurrentFrame();

  const headlineOpacity = fadeIn(frame, 0, 40);
  const headlineY = slideY(frame, 0, 40);
  const subOpacity = fadeIn(frame, 40, 80);
  const subY = slideY(frame, 40, 80);

  return (
    <AbsoluteFill style={{ background: "#ffffff" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            color: "#111111",
            lineHeight: 1,
            letterSpacing: "-0.03em",
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
            color: "#bbbbbb",
            letterSpacing: "0.15em",
            textAlign: "center",
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
