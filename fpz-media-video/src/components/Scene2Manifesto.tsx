import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene2Manifesto = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const words1 = "Wir bauen keine Webseiten.".split(" ");
  const words2 = "Wir bauen deinen unfairen Vorteil.".split(" ");

  const lineScaleX = interpolate(frame, [130, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtextOp = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtextY = interpolate(frame, [140, 170], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        padding: "0 120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: C.textMuted,
          marginBottom: 32,
          opacity: labelOp,
        }}
      >
        Unser Manifest
      </div>

      {/* Zeile 1 – Wort für Wort */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", marginBottom: 8 }}>
        {words1.map((word, i) => {
          const startF = 20 + i * 8;
          const s = spring({
            fps,
            frame: Math.max(0, frame - startF),
            config: { damping: 20, stiffness: 90, overshootClamping: true },
            from: 105,
            to: 0,
          });
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: FONTS.display,
                  fontSize: 88,
                  lineHeight: 1.05,
                  color: C.text,
                  transform: `translateY(${s}%)`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>

      {/* Zeile 2 – "unfairen" hervorgehoben */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", marginBottom: 40 }}>
        {words2.map((word, i) => {
          const startF = 80 + i * 8;
          const isHighlighted = word === "unfairen";
          const s = spring({
            fps,
            frame: Math.max(0, frame - startF),
            config: { damping: 20, stiffness: 90, overshootClamping: true },
            from: 105,
            to: 0,
          });
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: FONTS.display,
                  fontSize: 88,
                  lineHeight: 1.05,
                  color: isHighlighted ? C.onAccent : C.text,
                  transform: `translateY(${s}%)`,
                  ...(isHighlighted
                    ? {
                        backgroundColor: C.accent,
                        padding: "0 12px",
                        rotate: "-2deg",
                      }
                    : {}),
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>

      {/* Trennlinie */}
      <div
        style={{
          height: 1,
          backgroundColor: C.accent,
          width: "100%",
          transform: `scaleX(${lineScaleX})`,
          transformOrigin: "left center",
          marginBottom: 32,
        }}
      />

      {/* Subtext */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          color: C.textMuted,
          maxWidth: 480,
          opacity: subtextOp,
          transform: `translateY(${subtextY}px)`,
        }}
      >
        Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.
      </div>
    </AbsoluteFill>
  );
};
