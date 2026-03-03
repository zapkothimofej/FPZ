import { useId } from "react";
import { useVideoConfig } from "remotion";
import { C } from "../tokens";

interface OrbProps {
  frame: number;
  x?: number;
  y?: number;
  radius?: number;
  opacity?: number;
  intensity?: number;
}

export const Orb = ({
  frame,
  x = 960,
  y = 540,
  radius = 300,
  opacity = 1,
  intensity = 1,
}: OrbProps) => {
  const { fps } = useVideoConfig();
  const uid = useId().replace(/:/g, "");
  const pulse = Math.sin((frame / fps) * 1.5 * Math.PI) * 0.08 * intensity;
  const driftX = Math.sin((frame / fps) * 0.7 * Math.PI) * 18;
  const driftY = Math.cos((frame / fps) * 0.5 * Math.PI) * 12;
  const r = radius * (1 + pulse);
  const cx = x + driftX;
  const cy = y + driftY;

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
      }}
      viewBox="0 0 1920 1080"
    >
      <defs>
        <radialGradient id={`orbGrad${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="30%" stopColor={C.accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`orbBlur${uid}`}>
          <feGaussianBlur stdDeviation="25" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={`url(#orbGrad${uid})`}
        filter={`url(#orbBlur${uid})`}
      />
    </svg>
  );
};
