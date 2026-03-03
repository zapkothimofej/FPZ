import { AbsoluteFill, Series } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { Scene1Hook } from "./components/Scene1Hook";
import { Scene2Web } from "./components/Scene2Web";
import { Scene3Media } from "./components/Scene3Media";
import { Scene4Automation } from "./components/Scene4Automation";
import { Scene5Manifesto } from "./components/Scene5Manifesto";
import { Scene6Endcard } from "./components/Scene6Endcard";

export const FPZVideo = () => (
  <AbsoluteFill>
    <Series>
      <Series.Sequence durationInFrames={180}>
        <Scene1Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={420}>
        <Scene2Web />
      </Series.Sequence>
      <Series.Sequence durationInFrames={420}>
        <Scene3Media />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <Scene4Automation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240}>
        <Scene5Manifesto />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <Scene6Endcard />
      </Series.Sequence>
    </Series>
    <GrainOverlay />
  </AbsoluteFill>
);
