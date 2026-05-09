import { Nav } from "@/components/Nav"
import { LandingPage } from "@/components/LandingPage"

export const metadata = {
  title: "FPZ — Websites, Automationen, Foto & Video",
  description:
    "FPZ aus Bochum baut klare Websites, einfache Automationen und Foto/Video-Content für Unternehmen, Marken und Produkte.",
  openGraph: {
    url: "https://fpz-website.vercel.app",
    title: "FPZ — Websites, Automationen, Foto & Video",
    description: "Klare Websites, einfache Automationen und Foto/Video-Content aus Bochum.",
  },
  twitter: {
    card: "summary_large_image" as const,
  },
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <LandingPage />
      </main>
    </>
  )
}
