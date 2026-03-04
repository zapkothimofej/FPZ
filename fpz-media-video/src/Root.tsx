import React from "react";
import { Composition } from "remotion";
import { VideoC1 } from "./VideoC1";

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
  </>
);
