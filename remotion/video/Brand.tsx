import { colors } from "./theme"

type BrandProps = {
  scale?: number
  inverted?: boolean
}

export function Brand({ scale = 1, inverted = true }: BrandProps) {
  const color = inverted ? colors.white : colors.ink

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * scale }}>
      <svg width={52 * scale} height={34 * scale} viewBox="0 0 26 17" fill="none">
        <rect y="0" width="26" height="2.5" fill={color} />
        <rect y="7.25" width="16" height="2.5" fill={color} />
        <rect y="14.5" width="21" height="2.5" fill={color} />
      </svg>
      <span
        style={{
          color,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 34 * scale,
          fontWeight: 800,
          letterSpacing: 7 * scale,
          lineHeight: 1,
        }}
      >
        FPZ
      </span>
    </div>
  )
}
