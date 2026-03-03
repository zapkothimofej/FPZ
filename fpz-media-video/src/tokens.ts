import {
  loadFont as loadSerifDisplay,
  fontFamily as displayFamily,
} from "@remotion/google-fonts/DMSerifDisplay";
import {
  loadFont as loadSans,
  fontFamily as sansFamily,
} from "@remotion/google-fonts/DMSans";

loadSerifDisplay();
loadSans();

export const C = {
  bg:          "#0a0a0a",
  bgElevated:  "#141414",
  text:        "#ebebeb",
  textMuted:   "#707070",
  accent:      "#c8c8c8",
  accentHover: "#ebebeb",
  border:      "#222222",
  onAccent:    "#0a0a0a",
} as const;

export const FONTS = {
  display: displayFamily,
  body:    sansFamily,
} as const;
