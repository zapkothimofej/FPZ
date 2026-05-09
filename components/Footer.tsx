import Link from "next/link"
import { Logo } from "./Logo"

interface FooterProps {
  variant: "web-ki" | "foto-video"
}

export function Footer({ variant }: FooterProps) {
  const isWebKi = variant === "web-ki"

  return (
    <footer className="border-t border-stone px-8 md:px-16 lg:px-24 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3">
          <Logo size="sm" />
          <p className="text-xs text-muted leading-relaxed">
            {isWebKi
              ? "Klare Websites und einfache Automationen aus Bochum."
              : "Foto- und Video-Content mit sauberer Planung."}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-muted">
              Bochum, NRW
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 text-sm text-mid">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.15em] uppercase text-muted">Navigation</p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <a href="#leistungen" className="hover:text-ink transition-colors">
                  Leistungen
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-ink transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs tracking-[0.15em] uppercase text-muted">Auch interessant</p>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={isWebKi ? "/foto-video" : "/web-ki"}
                  className="hover:text-ink transition-colors"
                >
                  {isWebKi ? "FPZ Foto & Video →" : "FPZ Web & KI →"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-stone flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
        <p>© {new Date().getFullYear()} FPZ. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-ink transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
