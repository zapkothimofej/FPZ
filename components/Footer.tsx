import Link from "next/link"
import { localSeoPages } from "@/lib/local-seo"
import { Logo } from "./Logo"

interface FooterProps {
  variant?: "web-ki" | "foto-video" | "default"
}

export function Footer({ variant = "default" }: FooterProps) {
  const isWebKi = variant === "web-ki"
  const isFotoVideo = variant === "foto-video"

  return (
    <footer className="border-t border-stone dark:border-stone/10 px-8 md:px-16 lg:px-24 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-3">
          <Logo size="sm" />
          <p className="text-xs text-muted leading-relaxed">
            {isWebKi
              ? "Websites und KI-Lösungen für moderne Unternehmen."
              : isFotoVideo
              ? "Professionelle Foto- und Videoproduktionen."
              : "Websites, KI-Automatisierung, Foto und Video für Unternehmen."}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-muted">
              Ruhrgebiet, NRW
            </span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-muted">
            Fapez Medien / FPZ Web-Media Solutions · Im Siepen 66, 45731 Waltrop ·
            stevanfrei@gmail.com
          </p>
        </div>

        <div className="flex flex-col gap-8 text-sm text-mid dark:text-muted sm:flex-row">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.15em] uppercase text-muted">Navigation</p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-ink dark:hover:text-cream transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/web-ki" className="hover:text-ink dark:hover:text-cream transition-colors">
                  Web & KI
                </Link>
              </li>
              <li>
                <Link href="/foto-video" className="hover:text-ink dark:hover:text-cream transition-colors">
                  Foto & Video
                </Link>
              </li>
	              {variant !== "default" && (
	                <li>
	                  <a href="#leistungen" className="hover:text-ink dark:hover:text-cream transition-colors">
	                    Leistungen
	                  </a>
	                </li>
	              )}
	              <li>
	                <a
	                  href={variant === "default" ? "/web-ki#kontakt" : "#kontakt"}
	                  className="hover:text-ink dark:hover:text-cream transition-colors"
	                >
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
                  href={isFotoVideo ? "/web-ki" : "/foto-video"}
                  className="hover:text-ink dark:hover:text-cream transition-colors"
                >
                  {isFotoVideo ? "FPZ Web & KI →" : "FPZ Foto & Video →"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs tracking-[0.15em] uppercase text-muted">Lokale Seiten</p>
            <ul className="space-y-1.5">
              {localSeoPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="hover:text-ink dark:hover:text-cream transition-colors"
                  >
                    {page.serviceName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-stone dark:border-stone/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
        <p>© {new Date().getFullYear()} FPZ. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4">
          <Link href="/impressum" className="hover:text-ink dark:hover:text-cream transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink dark:hover:text-cream transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
