import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONTS } from "../tokens";

const STATS = [
  { value: "3",    label: "Kernleistungen" },
  { value: "100%", label: "Lokal im Ruhrgebiet" },
  { value: "1",    label: "Partner für Alles" },
  { value: "∞",    label: "Ambition" },
];

export const Scene4Stats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 48,
          width: "100%",
        }}
      >
        {STATS.map((stat, i) => {
          const startF = 10 + i * 15;
          const s = spring({
            fps,
            frame: Math.max(0, frame - startF),
            config: { damping: 20, stiffness: 80 },
            from: 0,
            to: 1,
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: s,
                transform: `translateY(${(1 - s) * 30}px)`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 72,
                  color: C.accent,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.textMuted,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
