import { Easing, interpolate } from "remotion";

export const SCENE_DURATION = 325;

export const CINEMATIC_EASE = Easing.bezier(0.25, 0.1, 0.25, 1);

export const fadeIn = (frame: number, start: number, end: number): number =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CINEMATIC_EASE,
  });

export const slideY = (
  frame: number,
  start: number,
  end: number,
  from = 20,
  to = 0
): number =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: CINEMATIC_EASE,
  });
