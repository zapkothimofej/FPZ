import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SCORE_THRESHOLDS } from "./constants";
import type { ScoreColor } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreColor(
  score: number | null | undefined
): ScoreColor {
  if (score == null) return "gray";
  if (score <= SCORE_THRESHOLDS.red) return "red";
  if (score <= SCORE_THRESHOLDS.yellow) return "yellow";
  return "green";
}

export function getScoreColorClass(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "text-red-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    gray: "text-zinc-500",
  };
  return map[getScoreColor(score)];
}

export function getScoreBgClass(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    gray: "bg-zinc-600",
  };
  return map[getScoreColor(score)];
}

export function getScoreDotClass(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    gray: "bg-zinc-600",
  };
  return map[getScoreColor(score)];
}

export function getScoreColorHex(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "#ef4444",
    yellow: "#eab308",
    green: "#22c55e",
    gray: "#52525b",
  };
  return map[getScoreColor(score)];
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseJsonSafe<T>(
  json: string | null | undefined,
  fallback: T
): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function ensureHttps(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
