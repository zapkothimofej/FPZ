import { interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { clamp, drift, ease } from "./motion"
import { colors } from "./theme"

type VisualProps = {
  compact: boolean
}

export function WebAutomationVisual({ compact }: VisualProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = interpolate(frame, [0.2 * fps, 4.6 * fps], [0, 1], { ...clamp, easing: ease })

  const width = compact ? 760 : 860
  const height = compact ? 520 : 560

  return (
    <div style={{ position: "relative", width, height }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px solid ${colors.white}22`,
          background: `${colors.white}08`,
          transform: `translateY(${drift(frame, fps)}px)`,
        }}
      >
        <div style={{ height: 58, borderBottom: `1px solid ${colors.white}16`, display: "flex", alignItems: "center", gap: 10, padding: "0 24px" }}>
          {[0, 1, 2].map((item) => (
            <span key={item} style={{ width: 10, height: 10, borderRadius: 10, background: item === 0 ? colors.gold : `${colors.white}32` }} />
          ))}
        </div>
        <div style={{ padding: 34, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 30 }}>
          <div>
            <div style={{ width: 260, height: 12, background: colors.gold, marginBottom: 28 }} />
            {[0, 1, 2].map((item) => (
              <div key={item} style={{ width: `${72 - item * 10}%`, height: 20, background: `${colors.white}${item === 0 ? "cc" : "66"}`, marginBottom: 16 }} />
            ))}
            <div style={{ marginTop: 42, width: 210, height: 54, borderRadius: 27, background: colors.cream }} />
          </div>
          <div style={{ border: `1px solid ${colors.gold}55`, padding: 22 }}>
            {["Lead", "Mail", "CRM", "Follow-up"].map((label, index) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 22 }}>
                <span style={{ width: 22, height: 22, borderRadius: 22, border: `2px solid ${colors.gold}`, background: progress > index * 0.22 ? colors.gold : "transparent" }} />
                <span style={{ color: colors.white, fontSize: 22, opacity: 0.72 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", right: compact ? 18 : -40, bottom: compact ? -28 : -48, width: compact ? 300 : 360, height: compact ? 180 : 220, background: colors.gold, padding: 24, color: colors.ink }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 28 }}>Automation läuft</div>
        <div style={{ height: 12, background: `${colors.ink}22`, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.round(progress * 100)}%`, background: colors.ink }} />
        </div>
      </div>
    </div>
  )
}

export function CameraVisual({ compact }: VisualProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.55, 1])
  const width = compact ? 760 : 860
  const height = compact ? 520 : 560

  return (
    <div style={{ position: "relative", width, height, transform: `translateY(${drift(frame, fps, 20)}px)` }}>
      <div style={{ position: "absolute", inset: 0, border: `2px solid ${colors.white}22`, background: `${colors.white}07` }}>
        <div style={{ position: "absolute", left: 42, top: 42, width: 160, height: 88, borderLeft: `4px solid ${colors.gold}`, borderTop: `4px solid ${colors.gold}` }} />
        <div style={{ position: "absolute", right: 42, top: 42, width: 160, height: 88, borderRight: `4px solid ${colors.gold}`, borderTop: `4px solid ${colors.gold}` }} />
        <div style={{ position: "absolute", left: 42, bottom: 42, width: 160, height: 88, borderLeft: `4px solid ${colors.gold}`, borderBottom: `4px solid ${colors.gold}` }} />
        <div style={{ position: "absolute", right: 42, bottom: 42, width: 160, height: 88, borderRight: `4px solid ${colors.gold}`, borderBottom: `4px solid ${colors.gold}` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: compact ? 300 : 360, height: compact ? 300 : 360, borderRadius: 999, border: `30px solid ${colors.ink}`, background: `radial-gradient(circle, ${colors.gold} 0%, ${colors.gold} ${pulse * 12}%, ${colors.white} 13%, ${colors.ink} 55%, ${colors.white}22 100%)`, transform: "translate(-50%, -50%)" }} />
        <div style={{ position: "absolute", left: "50%", bottom: 70, transform: "translateX(-50%)", color: `${colors.white}88`, fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>
          Produkt · Marke · Event
        </div>
      </div>
    </div>
  )
}
