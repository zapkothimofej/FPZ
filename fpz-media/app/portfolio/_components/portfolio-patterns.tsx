type PatternProps = {
  className?: string
  label?: string
}

export function GradientBlock({ className = '', label }: PatternProps) {
  return (
    <div className={`relative overflow-hidden rounded bg-site-surface border border-site-border flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_40%,var(--site-accent)_0%,transparent_70%)] opacity-[0.08]" />
      {label && (
        <span className="relative text-site-muted text-xs tracking-[0.2em] uppercase font-sans">
          {label}
        </span>
      )}
    </div>
  )
}

export function ImagePlaceholder({ className = '', label }: PatternProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-site-surface to-site-bg border border-site-border flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,var(--site-accent)_0%,transparent_70%)] opacity-[0.06]" />
      <svg className="relative text-site-muted opacity-30" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      {label && (
        <span className="relative text-site-muted text-[0.65rem] tracking-[0.2em] uppercase">
          {label}
        </span>
      )}
    </div>
  )
}

export function DiagonalPattern({ className = '' }: PatternProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1" className="text-site-accent" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>
    </div>
  )
}
