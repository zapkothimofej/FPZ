import { ImageResponse } from "next/og"

export const runtime = "edge"

const size = {
  width: 1200,
  height: 630,
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const title = cleanText(url.searchParams.get("title") ?? "FPZ")
  const kicker = cleanText(url.searchParams.get("kicker") ?? "Web · KI · Foto / Video")

  return new ImageResponse(
    (
      <div
        style={{
          background: "#131310",
          color: "#F7F3EE",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "78px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ width: 56, height: 2, background: "#C4A040" }} />
          <div
            style={{
              color: "rgba(247,243,238,0.38)",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "rgba(196,160,64,0.95)",
              fontSize: 24,
              letterSpacing: "0.18em",
              marginBottom: 26,
              textTransform: "uppercase",
            }}
          >
            FPZ / Fapez Medien
          </div>
          <div
            style={{
              color: "#F7F3EE",
              fontSize: title.length > 34 ? 68 : 84,
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.02,
              maxWidth: 920,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ height: 1, width: 320, background: "rgba(196,160,64,0.35)" }} />
          <div
            style={{
              color: "rgba(247,243,238,0.34)",
              fontSize: 18,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Ruhrgebiet · NRW
          </div>
        </div>
      </div>
    ),
    size
  )
}

function cleanText(value: string) {
  return value.replace(/[<>]/g, "").slice(0, 90)
}
