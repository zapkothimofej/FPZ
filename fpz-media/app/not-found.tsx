import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 – Seite nicht gefunden",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      style={{ backgroundColor: "#111111", minHeight: "100vh" }}
      className="flex flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="text-[11px] tracking-[0.2em] uppercase mb-6"
        style={{ color: "#888" }}
      >
        404
      </p>
      <h1
        className="text-white text-4xl md:text-5xl font-bold mb-4"
        style={{ lineHeight: 1.1 }}
      >
        Seite nicht gefunden
      </h1>
      <p className="text-white/50 text-base mb-10 max-w-md">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="inline-flex items-center h-11 px-8 text-[13px] tracking-[0.1em] uppercase font-semibold text-black transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#C0C0C0" }}
      >
        Zur Startseite
      </Link>
    </div>
  )
}
