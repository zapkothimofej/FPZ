import { Nav } from "@/components/Nav"
import { LandingPage } from "@/components/LandingPage"

export const metadata = {
  title: "FPZ — Web, KI & Foto/Video",
  description:
    "FPZ aus Bochum: Professionelle Websites, KI-Automatisierungen und Foto/Video-Produktionen für moderne Unternehmen.",
  openGraph: {
    url: "https://www.fapez-medien.de",
    title: "FPZ — Web, KI & Foto/Video",
    description: "Websites, KI-Automatisierungen und Foto/Video-Produktionen aus Bochum.",
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
