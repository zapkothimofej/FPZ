import { Nav } from "@/components/Nav"
import { FotoVideoHero } from "@/components/foto-video/Hero"
import { FotoVideoServices } from "@/components/foto-video/Services"
import { FotoVideoAbout } from "@/components/foto-video/About"
import { FotoVideoProcess } from "@/components/foto-video/Process"
import { FotoVideoGallery } from "@/components/foto-video/Gallery"
import { FotoVideoContact } from "@/components/foto-video/Contact"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "FPZ — Foto & Video | Produktfotografie, Imagefilm, Social Content",
  description:
    "FPZ Foto & Video aus Bochum. Professionelle Produktfotografie, Imagefilme, Event-Dokumentationen und Social Media Content. Bundesweit tätig.",
  openGraph: {
    url: "https://fpz-website.vercel.app/foto-video",
    title: "FPZ — Foto & Video",
    description: "Produktfotografie, Imagefilme und Social Content aus Bochum. Bundesweit tätig.",
  },
  twitter: {
    card: "summary_large_image" as const,
  },
}

export default function FotoVideoPage() {
  return (
    <>
      <Nav />
      <main>
        <FotoVideoHero />
        <FotoVideoServices />
        <FotoVideoAbout />
        <FotoVideoProcess />
        <FotoVideoGallery />
        <FotoVideoContact />
      </main>
      <Footer variant="foto-video" />
    </>
  )
}
