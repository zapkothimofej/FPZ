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

  // Scene label
  const labelOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Nodes spring in
  const nodeS = [
    spring({ frame, fps, config: { damping: 20, stiffness: 130 } }),
    spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 130 } }),
    spring({ frame: frame - 24, fps, config: { damping: 20, stiffness: 130 } }),
  ];

  // Lines draw in
  const line1Progress = interpolate(frame, [35, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Progress = interpolate(frame, [65, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse dot along line 1
  const pulse1X = NODES[0].x + 40 + (NODES[1].x - NODES[0].x - 80) * ((frame % 40) / 40);
  const pulse1Op = frame >= 90 && frame < 160
    ? interpolate((frame % 40), [0, 5, 35, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Pulse dot along line 2
  const pulse2X = NODES[1].x + 40 + (NODES[2].x - NODES[1].x - 80) * (((frame + 20) % 40) / 40);
  const pulse2Op = frame >= 110 && frame < 160
    ? interpolate(((frame + 20) % 40), [0, 5, 35, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Stat reveal
  const statS = spring({ frame: frame - 130, fps, config: { damping: 18, stiffness: 120 } });
  const statScale = 1 + (1 - statS) * 1.8;
  const statOp = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineS = spring({ frame: frame - 140, fps, config: { damping: 18, stiffness: 120 } });
  const headlineScale = 1 + (1 - headlineS) * 1.5;

  // Fade out
  const fadeOut = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodeR = 50;

  return (
    <AbsoluteFill style={{ background: C.bg, opacity: fadeOut }}>
      <Particles frame={frame} opacity={0.4} />
      <Orb frame={frame} opacity={0.15} radius={220} x={960} y={540} />

      {/* Scene label */}
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
        {/* Line 1: Node 0 → Node 1 */}
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

        {/* Arrow head line 1 */}
        <polygon
          points={`${NODES[1].x - nodeR - 2},${NODE_Y} ${NODES[1].x - nodeR - 14},${NODE_Y - 8} ${NODES[1].x - nodeR - 14},${NODE_Y + 8}`}
          fill={C.accent}
          opacity={line1Progress}
        />

        {/* Line 2: Node 1 → Node 2 */}
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

        {/* Arrow head line 2 */}
        <polygon
          points={`${NODES[2].x - nodeR - 2},${NODE_Y} ${NODES[2].x - nodeR - 14},${NODE_Y - 8} ${NODES[2].x - nodeR - 14},${NODE_Y + 8}`}
          fill={C.accent}
          opacity={line2Progress}
        />

        {/* Pulse dots */}
        <circle cx={pulse1X} cy={NODE_Y} r={5} fill={C.text} opacity={pulse1Op} />
        <circle cx={pulse2X} cy={NODE_Y} r={5} fill={C.text} opacity={pulse2Op} />

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={node.label} style={{ opacity: nodeS[i] }}>
            {/* Outer ring */}
            <circle
              cx={node.x}
              cy={NODE_Y}
              r={nodeR}
              fill="none"
              stroke={C.accent}
              strokeWidth={1.5}
              opacity={0.7}
            />
            {/* Inner fill */}
            <circle cx={node.x} cy={NODE_Y} r={nodeR - 6} fill={C.bgElevated} />
            {/* Node label */}
            <text
              x={node.x}
              y={NODE_Y + 6}
              fill={C.text}
              fontSize={22}
              fontWeight="600"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Node sublabels below */}
        {NODES.map((node, i) => (
          <text
            key={`sub${node.label}`}
            x={node.x}
            y={NODE_Y + nodeR + 32}
            fill={C.textMuted}
            fontSize={16}
            textAnchor="middle"
            fontFamily="sans-serif"
            opacity={nodeS[i]}
          >
            {node.sublabel}
          </text>
        ))}

        {/* Stat badge */}
        <g opacity={statOp} transform={`translate(960, 350) scale(${statScale})`}>
          <rect x={-100} y={-30} width={200} height={60} rx={8} fill={C.bgElevated} />
          <rect x={-100} y={-30} width={200} height={60} rx={8} fill="none" stroke={C.accent} strokeWidth={1} opacity={0.4} />
          <text x={0} y={8} fill={C.accent} fontSize={28} fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            +87% Leads
          </text>
        </g>
      </svg>

      {/* Headline */}
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
