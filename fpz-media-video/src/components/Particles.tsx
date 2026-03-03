import { useVideoConfig } from "remotion";
import { C } from "../tokens";

const rand = (seed: number): number => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

interface ParticlesProps {
  frame: number;
  opacity?: number;
  count?: number;
}

export const Particles = ({ frame, opacity = 1, count = 50 }: ParticlesProps) => {
  const { fps } = useVideoConfig();

  const dots = Array.from({ length: count }, (_, i) => {
    const baseX = rand(i * 3) * 1920;
    const baseY = rand(i * 3 + 1) * 1080;
    const r = 1 + rand(i * 3 + 2) * 2;
    const op = 0.15 + rand(i * 7) * 0.35;
    const phaseX = rand(i * 5) * Math.PI * 2;
    const phaseY = rand(i * 11) * Math.PI * 2;
    const ampX = (rand(i * 17) - 0.5) * 40;
    const ampY = (rand(i * 19) - 0.5) * 30;
    const x = baseX + Math.sin((frame / fps) * Math.PI + phaseX) * ampX;
    const y = baseY + Math.cos((frame / fps) * 0.8 * Math.PI + phaseY) * ampY;
    return { x, y, r, op };
  });

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
      {dots.map(({ x, y, r, op }, i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={C.accent} opacity={op} />
      ))}
    </svg>
  );
};
