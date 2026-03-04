import React from "react";
import { Composition } from "remotion";
import { VideoC1 } from "./VideoC1";
import { VideoC2 } from "./VideoC2";

export const RemotionRoot = (): React.ReactElement => (
  <>
    <Composition
      id="FPZCinematic"
      component={VideoC1}
      durationInFrames={1800}
      fps={60}
      width={1920}
      height={1080}
    />
    <Composition
      id="FPZClean"
      component={VideoC2}
      durationInFrames={900}
      fps={60}
      width={1920}
      height={1080}
    />
  </>
);
