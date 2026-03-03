import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONTS } from "../tokens";
import { Orb } from "./Orb";
import { Particles } from "./Particles";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const particleOp = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOp = interpolate(frame, [0, 60], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s1 = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const scale1 = 1 + (1 - s1) * 3.5;
  const x1 = (1 - s1) * -500;

  const s2 = spring({
    frame: frame - 36,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const scale2 = 1 + (1 - s2) * 3.5;
  const x2 = (1 - s2) * 500;

  const totalFrames = 225;
  const cameraZoom = interpolate(frame, [0, totalFrames], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanX = Math.sin((frame / fps) * 0.2 * Math.PI) * 8;
  const cameraPanY = Math.cos((frame / fps) * 0.15 * Math.PI) * 5;
  const cameraTransform = `scale(${cameraZoom}) translate(${cameraPanX}px, ${cameraPanY}px)`;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Orb frame={frame} opacity={orbOp} radius={350} x={960} y={540} />
      <Particles frame={frame} opacity={particleOp} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: cameraTransform,
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 110,
              color: C.text,
              lineHeight: 1.1,
              transform: `translateX(${x1}px) scale(${scale1})`,
              transformOrigin: "center center",
              filter: "drop-shadow(0 0 40px rgba(200,200,200,0.45))",
              whiteSpace: "nowrap",
            }}
          >
            Dein Unternehmen.
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 110,
              color: C.accent,
              lineHeight: 1.1,
              transform: `translateX(${x2}px) scale(${scale2})`,
              transformOrigin: "center center",
              filter: "drop-shadow(0 0 50px rgba(200,200,200,0.7))",
              whiteSpace: "nowrap",
            }}
          >
            Komplett digital.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
