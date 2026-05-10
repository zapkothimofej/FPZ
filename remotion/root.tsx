import { Composition, Folder } from "remotion"
import { FpzAd } from "./video/FpzAd"

export const RemotionRoot = () => {
  return (
    <Folder name="FPZ">
      <Composition
        id="FPZAdLandscape"
        component={FpzAd}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ format: "landscape" as const }}
      />
      <Composition
        id="FPZAdStory"
        component={FpzAd}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ format: "story" as const }}
      />
    </Folder>
  )
}
