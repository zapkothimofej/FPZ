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

const NODE_Y = 500;
const NODES = [
  { x: 380, label: "Lead", sublabel: "Anfrage eingeht" },
  { x: 960, label: "FPZ", sublabel: "Automatisierung" },
  { x: 1540, label: "CRM", sublabel: "Kunde gespeichert" },
];
const LINE_LENGTH = 580;

export const Scene4Automation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOp = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodeS = [
    spring({ frame, fps, config: { damping: 20, stiffness: 130 } }),
    spring({ frame: frame - 24, fps, config: { damping: 20, stiffness: 130 } }),
    spring({ frame: frame - 48, fps, config: { damping: 20, stiffness: 130 } }),
  ];

  const line1Progress = interpolate(frame, [70, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Progress = interpolate(frame, [130, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse1X = NODES[0].x + 40 + (NODES[1].x - NODES[0].x - 80) * ((frame % 80) / 80);
  const pulse1Op = frame >= 180 && frame < 320
    ? interpolate((frame % 80), [0, 10, 70, 80], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const pulse2X = NODES[1].x + 40 + (NODES[2].x - NODES[1].x - 80) * (((frame + 40) % 80) / 80);
  const pulse2Op = frame >= 220 && frame < 320
    ? interpolate(((frame + 40) % 80), [0, 10, 70, 80], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const statS = spring({ frame: frame - 260, fps, config: { damping: 18, stiffness: 120 } });
  const statScale = 1 + (1 - statS) * 1.8;
  const statOp = interpolate(frame, [260, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineS = spring({ frame: frame - 280, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  const fadeOut = interpolate(frame, [320, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodeR = 50;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeIn * fadeOut }}>
      <Particles frame={frame} opacity={0.4} />
      <Orb frame={frame} opacity={0.15} radius={220} x={960} y={540} />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: labelOp,
          fontFamily: FONTS.body,
          fontSize: 22,
          color: C.textMuted,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        03 — Automation
      </div>

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1920 1080"
      >
        <line
          x1={NODES[0].x + nodeR}
          y1={NODE_Y}
          x2={NODES[1].x - nodeR}
          y2={NODE_Y}
          stroke={C.accent}
          strokeWidth={1.5}
          strokeDasharray={LINE_LENGTH - nodeR * 2}
          strokeDashoffset={(LINE_LENGTH - nodeR * 2) * (1 - line1Progress)}
          opacity={0.5}
        />
        <polygon
          points={`${NODES[1].x - nodeR - 2},${NODE_Y} ${NODES[1].x - nodeR - 14},${NODE_Y - 8} ${NODES[1].x - nodeR - 14},${NODE_Y + 8}`}
          fill={C.accent}
          opacity={line1Progress}
        />
        <line
          x1={NODES[1].x + nodeR}
          y1={NODE_Y}
          x2={NODES[2].x - nodeR}
          y2={NODE_Y}
          stroke={C.accent}
          strokeWidth={1.5}
          strokeDasharray={LINE_LENGTH - nodeR * 2}
          strokeDashoffset={(LINE_LENGTH - nodeR * 2) * (1 - line2Progress)}
          opacity={0.5}
        />
        <polygon
          points={`${NODES[2].x - nodeR - 2},${NODE_Y} ${NODES[2].x - nodeR - 14},${NODE_Y - 8} ${NODES[2].x - nodeR - 14},${NODE_Y + 8}`}
          fill={C.accent}
          opacity={line2Progress}
        />
        <circle cx={pulse1X} cy={NODE_Y} r={5} fill={C.text} opacity={pulse1Op} />
        <circle cx={pulse2X} cy={NODE_Y} r={5} fill={C.text} opacity={pulse2Op} />
        {NODES.map((node, i) => (
          <g key={node.label} style={{ opacity: nodeS[i] }}>
            <circle cx={node.x} cy={NODE_Y} r={nodeR} fill="none" stroke={C.accent} strokeWidth={1.5} opacity={0.7} />
            <circle cx={node.x} cy={NODE_Y} r={nodeR - 6} fill={C.bgElevated} />
            <text x={node.x} y={NODE_Y + 6} fill={C.text} fontSize={22} fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
              {node.label}
            </text>
          </g>
        ))}
        {NODES.map((node, i) => (
          <text key={`sub${node.label}`} x={node.x} y={NODE_Y + nodeR + 32} fill={C.textMuted} fontSize={16} textAnchor="middle" fontFamily="sans-serif" opacity={nodeS[i]}>
            {node.sublabel}
          </text>
        ))}
        <g opacity={statOp} transform={`translate(960, 350) scale(${statScale})`}>
          <rect x={-100} y={-30} width={200} height={60} rx={8} fill={C.bgElevated} />
          <rect x={-100} y={-30} width={200} height={60} rx={8} fill="none" stroke={C.accent} strokeWidth={1} opacity={0.4} />
          <text x={0} y={8} fill={C.accent} fontSize={28} fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            +87% Leads
          </text>
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontSize: 64,
          color: C.text,
          transform: `scale(${headlineScale})`,
          filter: "drop-shadow(0 0 30px rgba(200,200,200,0.4))",
        }}
      >
        Prozesse, die arbeiten.
      </div>
    </AbsoluteFill>
  );
};
