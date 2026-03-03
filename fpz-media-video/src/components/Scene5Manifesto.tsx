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

export const Scene5Manifesto = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const orbIntensity = interpolate(frame, [0, 120], [0.5, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbOp = interpolate(frame, [0, 40], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const scale1 = 1 + (1 - s1) * 3.5;

  const s2 = spring({ frame: frame - 24, fps, config: { damping: 14, stiffness: 100 } });
  const scale2 = 1 + (1 - s2) * 3.5;

  const subOp = interpolate(frame, [110, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [110, 160], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particleOp = interpolate(frame, [0, 30], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalFrames = 270;
  const cameraZoom = interpolate(frame, [0, totalFrames], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanX = Math.sin((frame / fps) * 0.2 * Math.PI) * 8;
  const cameraPanY = Math.cos((frame / fps) * 0.15 * Math.PI) * 5;
  const cameraTransform = `scale(${cameraZoom}) translate(${cameraPanX}px, ${cameraPanY}px)`;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Orb frame={frame} opacity={orbOp} radius={380} x={960} y={540} intensity={orbIntensity} />
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
            gap: 0,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 160,
              color: C.text,
              lineHeight: 1,
              transform: `scale(${scale1})`,
              transformOrigin: "center bottom",
              filter: "drop-shadow(0 0 60px rgba(200,200,200,0.6))",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            UNFAIREN
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 160,
              color: C.accent,
              lineHeight: 1,
              transform: `scale(${scale2})`,
              transformOrigin: "center top",
              filter: "drop-shadow(0 0 80px rgba(200,200,200,0.8))",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            VORTEIL.
          </div>
          <div
            style={{
              marginTop: 32,
              fontFamily: FONTS.body,
              fontSize: 32,
              color: C.textMuted,
              opacity: subOp,
              transform: `translateY(${subY}px)`,
              letterSpacing: "0.1em",
            }}
          >
            Wir machen's möglich.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
