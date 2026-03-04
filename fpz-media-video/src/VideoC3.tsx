import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C3_Scene1 } from "./components/C3_Scene1";
import { C3_Scene2 } from "./components/C3_Scene2";
import { C3_Scene3 } from "./components/C3_Scene3";
import { C3_Scene4 } from "./components/C3_Scene4";
import { C3_Scene5 } from "./components/C3_Scene5";

// 5 × 192 - 4 × 15 = 960 - 60 = 900fr
export const VideoC3 = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene4 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={192}>
        <C3_Scene5 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
