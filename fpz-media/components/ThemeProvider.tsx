"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
} | null>(null)

const STORAGE_KEY = "fpz-v6-theme"

export function useV6Theme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useV6Theme must be used within V6ThemeProvider")
  return ctx
}

export function V6ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer: runs only on client (typeof window guard for SSR safety)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark"
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === "light" || stored === "dark") return stored
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  })

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Follow OS preference live — only when the user has no explicit stored preference
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const mq = window.matchMedia("(prefers-color-scheme: light)")
    const handleMq = (e: MediaQueryListEvent) => setThemeState(e.matches ? "light" : "dark")
    mq.addEventListener("change", handleMq)
    return () => mq.removeEventListener("change", handleMq)
  }, [])

  // Cross-tab sync: pick up theme changes made in other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div
        data-theme={theme}
        suppressHydrationWarning
        className="min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: "var(--v6-bg)",
          color: "var(--v6-text)",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
