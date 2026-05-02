import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "FPZ — Web, KI & Foto/Video"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#131310",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Gold rule at top */}
        <div style={{ position: "absolute", top: 80, left: 80, width: 48, height: 1, background: "#C4A040" }} />

        {/* Main heading */}
        <div style={{ color: "#F7F3EE", fontSize: 96, fontWeight: 300, fontStyle: "italic", lineHeight: 1.0, marginBottom: 24 }}>
          FPZ.
        </div>

        {/* Tagline */}
        <div style={{ color: "rgba(247,243,238,0.45)", fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40 }}>
          Web · KI · Foto / Video
        </div>

        {/* Bottom rule */}
        <div style={{ position: "absolute", bottom: 80, left: 80, right: 80, height: 1, background: "rgba(196,160,64,0.25)" }} />

        {/* Location */}
        <div style={{ position: "absolute", bottom: 96, right: 80, color: "rgba(247,243,238,0.25)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Bochum, NRW
        </div>
      </div>
    ),
    { ...size }
  )
}
