import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der FPZ Media Digitalagentur im Ruhrgebiet.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
}

export default function ImpressumPage() {
  return (
    <div
      style={{ backgroundColor: "#111111", minHeight: "100vh" }}
      className="flex flex-col"
    >
      <article className="max-w-2xl mx-auto px-6 py-20 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors mb-12"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="text-white text-4xl font-bold mb-8">Impressum</h1>

        <p className="text-white/60 text-lg leading-relaxed">
          Inhalt folgt in Kürze.
        </p>
      </article>
    </div>
  )
}
