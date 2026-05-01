interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  inverted?: boolean
}

export function Logo({ className = "", size = "md", inverted = false }: LogoProps) {
  const sizes = {
    sm: { mark: 20, gap: 2, text: "text-sm" },
    md: { mark: 26, gap: 3, text: "text-base" },
    lg: { mark: 32, gap: 4, text: "text-xl" },
  }

  const s = sizes[size]
  const color = inverted ? "#FAFAF9" : "currentColor"

  return (
    <div className={`flex items-center gap-${s.gap} ${className}`}>
      <svg
        width={s.mark}
        height={Math.round(s.mark * 0.65)}
        viewBox="0 0 26 17"
        fill="none"
        aria-hidden="true"
      >
        <rect y="0" width="26" height="2.5" fill={color} />
        <rect y="7.25" width="16" height="2.5" fill={color} />
        <rect y="14.5" width="21" height="2.5" fill={color} />
      </svg>
      <span
        className={`${s.text} font-bold tracking-[0.18em] uppercase`}
        style={{ color: inverted ? "#FAFAF9" : "currentColor" }}
      >
        FPZ
      </span>
    </div>
  )
}
