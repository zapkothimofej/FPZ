import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";

export const Scene1Hero = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Marquee: 0% → -50% über 180 frames
  const marqueeX = interpolate(frame, [0, 180], [0, -50]);

  const sc = { damping: 18, stiffness: 80 };

  const sLokal = spring({ fps, frame: Math.max(0, frame - 10), config: sc, from: 0, to: 1 });
  const sDigital = spring({ fps, frame: Math.max(0, frame - 20), config: sc, from: 0, to: 1 });
  const sKomplett = spring({ fps, frame: Math.max(0, frame - 30), config: sc, from: 0, to: 1 });

  const subtextOp = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtextY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOp = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Marquee */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          overflow: "hidden",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: C.accent,
          opacity: 0.4,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          fontFamily: FONTS.body,
        }}
      >
        <div style={{ display: "inline-flex", transform: `translateX(${marqueeX}%)` }}>
          {"WEBENTWICKLUNG · MEDIENPRODUKTION · AUTOMATION · RUHRGEBIET · ".repeat(8)}
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, #0a0a0a 30%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.1) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        {/* Lokal. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            lineHeight: 0.9,
            color: C.text,
            fontStyle: "italic",
            transform: `translateX(${-270 + sLokal * 270}px)`,
            opacity: sLokal,
          }}
        >
          Lokal.
        </div>

        {/* Digital. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            lineHeight: 0.9,
            color: C.text,
            textAlign: "center",
            transform: `translateX(${270 - sDigital * 270}px)`,
            opacity: sDigital,
          }}
        >
          Digital.
        </div>

        {/* Komplett. */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            lineHeight: 0.9,
            color: C.accent,
            fontStyle: "italic",
            alignSelf: "flex-end",
            transform: `translateY(${120 - sKomplett * 120}px)`,
            opacity: sKomplett,
          }}
        >
          Komplett.
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: C.textMuted,
            maxWidth: 480,
            marginTop: 40,
            opacity: subtextOp,
            transform: `translateY(${subtextY}px)`,
          }}
        >
          Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.
        </div>

        {/* CTA Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 32,
            opacity: ctaOp,
          }}
        >
          <div
            style={{
              backgroundColor: C.accent,
              color: C.onAccent,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "14px 28px",
              fontFamily: FONTS.body,
            }}
          >
            Unsere Leistungen
          </div>
          <div
            style={{
              color: C.accent,
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: FONTS.body,
            }}
          >
            Projekt starten →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
