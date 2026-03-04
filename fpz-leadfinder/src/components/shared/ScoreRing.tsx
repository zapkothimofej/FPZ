"use client";

import { cn } from "@/lib/utils";
import { getScoreColor } from "@/lib/utils";
import type { ScoreColor } from "@/types";

interface ScoreRingProps {
  score: number | null;
  size?: "sm" | "md" | "lg";
  label?: string;
  showLabel?: boolean;
  animated?: boolean;
}

const SIZE_MAP = { sm: 56, md: 80, lg: 120 } as const;
const STROKE_MAP = { sm: 4, md: 5, lg: 6 } as const;
const FONT_MAP = { sm: "text-sm", md: "text-xl", lg: "text-3xl" } as const;

const COLOR_HEX: Record<ScoreColor, string> = {
  red: "#ef4444",
  yellow: "#eab308",
  green: "#22c55e",
  gray: "#52525b",
};

const COLOR_TEXT: Record<ScoreColor, string> = {
  red: "text-red-500",
  yellow: "text-yellow-500",
  green: "text-green-500",
  gray: "text-zinc-500",
};

export function ScoreRing({
  score,
  size = "md",
  label,
  showLabel = false,
  animated = true,
}: ScoreRingProps) {
  const sizePx = SIZE_MAP[size];
  const strokeWidth = STROKE_MAP[size];
  const radius = (sizePx - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score != null ? (score / 100) * circumference : 0;
  const offset = circumference - progress;
  const color = getScoreColor(score);
  const strokeColor = COLOR_HEX[color];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: sizePx, height: sizePx }}>
        <svg
          width={sizePx}
          height={sizePx}
          className="transform -rotate-90"
        >
          <circle
            cx={sizePx / 2}
            cy={sizePx / 2}
            r={radius}
            stroke="#27272a"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={sizePx / 2}
            cy={sizePx / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={
              animated ? "transition-all duration-1000 ease-out" : ""
            }
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", FONT_MAP[size], COLOR_TEXT[color])}>
            {score ?? "—"}
          </span>
        </div>
      </div>
      {showLabel && label && (
        <span className="text-xs text-zinc-400 text-center">{label}</span>
      )}
    </div>
  );
}
