import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene6Endcard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    fps,
    frame: Math.max(0, frame - 5),
    config: { damping: 20, stiffness: 80 },
    from: 0,
    to: 1,
  });

  const taglineOp = interpolate(frame, [25, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalFadeOut = interpolate(frame, [40, 60], [1, 0], {
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
        gap: 24,
        opacity: globalFadeOut,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 120,
          color: C.accent,
          fontStyle: "italic",
          textAlign: "center",
          opacity: logoSpring,
          transform: `translateY(${(1 - logoSpring) * 40}px)`,
        }}
      >
        FPZ.
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          color: C.textMuted,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          textAlign: "center",
          opacity: taglineOp,
        }}
      >
        Web · Film · Automation
      </div>
    </AbsoluteFill>
  );
};
