"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Logo } from "./Logo"

export function Nav() {
  const path = usePathname()
  const isWebKi = path.startsWith("/web-ki")
  const isFotoVideo = path.startsWith("/foto-video")
  const isSubPage = isWebKi || isFotoVideo

  const [menuOpen, setMenuOpen] = useState(false)

  const anchorLinks = isWebKi
    ? [
        { label: "Leistungen", href: "#leistungen" },
        { label: "Über uns", href: "#ueber-uns" },
        { label: "Kontakt", href: "#kontakt" },
      ]
    : isFotoVideo
    ? [
        { label: "Leistungen", href: "#leistungen" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Kontakt", href: "#kontakt" },
      ]
    : []

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/85 backdrop-blur-md border-b border-stone/50">
      {/* Main nav row */}
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 h-14">
        {/* Logo */}
        <Link href="/" aria-label="FPZ Startseite" className="transition-opacity hover:opacity-60">
          <Logo size="sm" />
        </Link>

        {/* Center nav pills — desktop only */}
        <div className="hidden md:flex items-center gap-1">
          <NavPill href="/web-ki" active={isWebKi}>
            Web &amp; KI
          </NavPill>
          <span className="text-stone px-1 select-none">·</span>
          <NavPill href="/foto-video" active={isFotoVideo}>
            Foto &amp; Video
          </NavPill>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          {isSubPage && (
            <Link
              href="#kontakt"
              className="hidden sm:inline-flex text-xs tracking-[0.12em] uppercase font-medium px-4 py-2 rounded-full bg-ink text-cream hover:opacity-75 transition-opacity"
            >
              Anfrage
            </Link>
          )}

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-3 -mr-1 text-ink hover:opacity-60 transition-opacity"
          >
            {menuOpen ? (
              // X icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <line x1="2" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <line x1="2" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Desktop sub-page anchor links */}
      {isSubPage && (
        <div className="hidden md:flex items-center gap-6 px-10 lg:px-14 h-9 border-t border-stone/30">
          {anchorLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-b border-stone/50 px-6 py-6"
        >
          <div className="space-y-1">
            {/* Main navigation links */}
            <Link
              href="/web-ki"
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-ink border-b border-stone/30"
            >
              Web &amp; KI
            </Link>
            <Link
              href="/foto-video"
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-ink border-b border-stone/30"
            >
              Foto &amp; Video
            </Link>

            {/* Sub-page anchor links */}
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-xs tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* CTA — always visible in mobile menu */}
            <Link
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-4 w-full py-3 text-xs tracking-[0.12em] uppercase font-medium bg-ink text-cream rounded-full text-center block"
            >
              Anfrage starten
            </Link>
          </div>
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
          ? "text-ink font-medium"
          : "text-muted hover:text-ink"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-px bg-gold" />
      )}
    </Link>
  )
}
