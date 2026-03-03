import { AbsoluteFill } from "remotion";

export const GrainOverlay = () => (
  <AbsoluteFill style={{ zIndex: 999, pointerEvents: "none" }}>
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0 }}
    >
      <filter id="g">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves={3}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" opacity={0.035} />
    </svg>
  </AbsoluteFill>
);
