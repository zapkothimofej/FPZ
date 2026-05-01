"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./Logo"
import { ThemeToggle } from "./ThemeToggle"

export function Nav() {
  const path = usePathname()
  const isWebKi = path.startsWith("/web-ki")
  const isFotoVideo = path.startsWith("/foto-video")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/85 dark:bg-dark/85 backdrop-blur-md border-b border-stone/50 dark:border-stone/10">
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 h-14">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-60">
          <Logo size="sm" />
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavPill href="/web-ki" active={isWebKi}>
            Web &amp; KI
          </NavPill>
          <span className="text-stone dark:text-stone/30 px-1 select-none">·</span>
          <NavPill href="/foto-video" active={isFotoVideo}>
            Foto &amp; Video
          </NavPill>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {(isWebKi || isFotoVideo) && (
            <Link
              href="#kontakt"
              className="hidden sm:inline-flex text-xs tracking-[0.12em] uppercase font-medium px-4 py-2 rounded-full bg-ink text-cream dark:bg-cream dark:text-ink hover:opacity-75 transition-opacity"
            >
              Anfrage
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Sub-page anchor links */}
      {(isWebKi || isFotoVideo) && (
        <div className="hidden md:flex items-center gap-6 px-10 lg:px-14 h-9 border-t border-stone/30 dark:border-stone/10">
          {(isWebKi
            ? [
                { label: "Leistungen", href: "#leistungen" },
                { label: "Über uns", href: "#ueber-uns" },
                { label: "Kontakt", href: "#kontakt" },
              ]
            : [
                { label: "Leistungen", href: "#leistungen" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Kontakt", href: "#kontakt" },
              ]
          ).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.14em] uppercase text-muted dark:text-muted hover:text-ink dark:hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function NavPill({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`relative text-xs tracking-[0.14em] uppercase px-3 py-1 rounded transition-colors ${
        active
          ? "text-ink dark:text-cream font-medium"
          : "text-muted dark:text-muted hover:text-ink dark:hover:text-cream"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-px bg-gold" />
      )}
    </Link>
  )
}
