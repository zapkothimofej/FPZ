import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C1_Scene1 } from "./components/C1_Scene1";
import { C1_Scene2 } from "./components/C1_Scene2";
import { C1_Scene3 } from "./components/C1_Scene3";
import { C1_Scene4 } from "./components/C1_Scene4";
import { C1_Scene5 } from "./components/C1_Scene5";
import { C1_Scene6 } from "./components/C1_Scene6";

// Timing: 6 × 325fr - 5 × 30fr = 1950 - 150 = 1800fr ✓
export const VideoC1 = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene4 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene5 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={325}>
        <C1_Scene6 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
