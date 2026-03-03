import { Composition } from "remotion";
import { FPZVideo } from "./Video";
import "./tokens";

export const RemotionRoot = () => (
  <>
    <Composition
      id="FPZMediaAd"
      component={FPZVideo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
