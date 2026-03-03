import { AbsoluteFill } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { C } from "./tokens";

export const FPZVideo = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <GrainOverlay />
  </AbsoluteFill>
);
