import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineSpring = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 20, stiffness: 80 },
    from: 0,
    to: 1,
  });

  const urlOp = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underlineScale = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Headline */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 96,
          color: C.text,
          fontStyle: "italic",
          textAlign: "center",
          opacity: headlineSpring,
          transform: `translateY(${(1 - headlineSpring) * 60}px)`,
        }}
      >
        Bereit für deinen Vorteil?
      </div>

      {/* URL + Underline */}
      <div
        style={{
          opacity: urlOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: C.accent,
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          fpz-media.de
        </div>
        <div
          style={{
            height: 1,
            backgroundColor: C.accent,
            width: "100%",
            transform: `scaleX(${underlineScale})`,
            transformOrigin: "left center",
            marginTop: 6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
