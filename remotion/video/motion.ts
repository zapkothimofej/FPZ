import { Easing, interpolate } from "remotion"

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
}

export const ease = Easing.bezier(0.16, 1, 0.3, 1)

export const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { ...clamp, easing: ease })

export const drift = (frame: number, fps: number, offset = 0) =>
  Math.sin((frame + offset) / fps) * 10
