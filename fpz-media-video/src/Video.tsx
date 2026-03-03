import { AbsoluteFill, Series } from "remotion";
import { GrainOverlay } from "./components/GrainOverlay";
import { Scene1Hero } from "./components/Scene1Hero";
import { Scene2Manifesto } from "./components/Scene2Manifesto";
import { Scene3Services } from "./components/Scene3Services";
import { Scene4Stats } from "./components/Scene4Stats";
import { Scene5CTA } from "./components/Scene5CTA";
import { Scene6Endcard } from "./components/Scene6Endcard";

export const FPZVideo = () => (
  <AbsoluteFill>
    <Series>
      <Series.Sequence durationInFrames={180}>
        <Scene1Hero />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <Scene2Manifesto />
      </Series.Sequence>
      <Series.Sequence durationInFrames={270}>
        <Scene3Services />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <Scene4Stats />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120}>
        <Scene5CTA />
      </Series.Sequence>
      <Series.Sequence durationInFrames={60}>
        <Scene6Endcard />
      </Series.Sequence>
    </Series>
    <GrainOverlay />
  </AbsoluteFill>
);
