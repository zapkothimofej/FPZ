import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONTS } from "../tokens";

const PANELS = [
  {
    counter: "01 / 03",
    title: "Webentwicklung",
    sub: "Dein digitales Schaufenster — entwickelt, um zu konvertieren.",
    num: "01",
  },
  {
    counter: "02 / 03",
    title: "Medienproduktion",
    sub: "Inhalte, die das Scrollen stoppen.",
    num: "02",
  },
  {
    counter: "03 / 03",
    title: "Automation",
    sub: "Dein Unternehmen auf Autopilot.",
    num: "03",
  },
];

export const Scene3Services = () => {
  const frame = useCurrentFrame();
  const activePanel = Math.min(2, Math.floor(frame / 90));

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgElevated, overflow: "hidden" }}>
      {PANELS.map((panel, i) => {
        const panelStart = i * 90;
        const panelEnd = panelStart + 90;
        const op = interpolate(
          frame,
          [panelStart, panelStart + 20, panelEnd - 20, panelEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const x = interpolate(frame, [panelStart, panelStart + 25], [80, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <AbsoluteFill
            key={i}
            style={{
              opacity: op,
              transform: `translateX(${x}px)`,
              padding: "0 120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Hintergrundnummer */}
            <div
              style={{
                position: "absolute",
                right: "8%",
                top: "38%",
                transform: "translateY(-50%)",
                fontFamily: FONTS.display,
                fontSize: 480,
                color: C.accent,
                opacity: 0.06,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {panel.num}
            </div>

            {/* Counter */}
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: C.textMuted,
                marginBottom: 24,
                position: "relative",
                zIndex: 1,
              }}
            >
              {panel.counter}
            </div>

            {/* Titel */}
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 130,
                color: C.text,
                lineHeight: 0.92,
                marginBottom: 32,
                position: "relative",
                zIndex: 1,
              }}
            >
              {panel.title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 32,
                color: C.accent,
                fontStyle: "italic",
                maxWidth: 700,
                position: "relative",
                zIndex: 1,
              }}
            >
              {panel.sub}
            </div>
          </AbsoluteFill>
        );
      })}

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {PANELS.map((_, i) => (
          <div
            key={i}
            style={{
              height: 6,
              borderRadius: 999,
              backgroundColor: i === activePanel ? C.accent : C.border,
              width: i === activePanel ? 24 : 6,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
