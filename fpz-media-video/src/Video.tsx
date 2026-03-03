import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clock } from "@remotion/transitions/clock";
import { GrainOverlay } from "./components/GrainOverlay";
import { Scene1Hook } from "./components/Scene1Hook";
import { Scene2Web } from "./components/Scene2Web";
import { Scene3Media } from "./components/Scene3Media";
import { Scene4Automation } from "./components/Scene4Automation";
import { Scene5Manifesto } from "./components/Scene5Manifesto";
import { Scene6Endcard } from "./components/Scene6Endcard";

// Durations: each scene gets its content duration + transition out duration
// Total: (225+450+450+405+270+180) - (45+30+30+45+30) = 1980 - 180 = 1800fr
export const FPZVideo = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={225}>
        <Scene1Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={flip({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 45 })}
      />
      <TransitionSeries.Sequence durationInFrames={450}>
        <Scene2Web />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={450}>
        <Scene3Media />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-top-left" })}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={405}>
        <Scene4Automation />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={clock({ direction: "counterclockwise" })}
        timing={linearTiming({ durationInFrames: 45 })}
      />
      <TransitionSeries.Sequence durationInFrames={270}>
        <Scene5Manifesto />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={180}>
        <Scene6Endcard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <GrainOverlay />
  </AbsoluteFill>
);
