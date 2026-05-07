"use client"

import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = stored === "dark" || (stored === null && prefersDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Helles Design aktivieren" : "Dunkles Design aktivieren"}
      className="w-8 h-8 rounded-full flex items-center justify-center border border-stone/70 dark:border-stone/25 text-muted dark:text-muted hover:text-ink dark:hover:text-cream hover:border-ink dark:hover:border-cream transition-colors cursor-pointer"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="2.75" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.1 3.1l.7.7M10.2 10.2l.7.7M3.1 10.9l.7-.7M10.2 3.8l.7-.7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M11.5 8.8A5.2 5.2 0 0 1 5.2 2.5a5.25 5.25 0 1 0 6.3 6.3z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
