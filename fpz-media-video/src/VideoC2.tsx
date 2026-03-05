import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C2_Scene1 } from "./components/C2_Scene1";
import { C2_Scene2 } from "./components/C2_Scene2";
import { C2_Scene3 } from "./components/C2_Scene3";

// 3 × 320 - 2 × 30 = 960 - 60 = 900fr
export const VideoC2 = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={320}>
        <C2_Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={320}>
        <C2_Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={320}>
        <C2_Scene3 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
