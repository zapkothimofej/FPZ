import { Nav } from "@/components/Nav"
import { FotoVideoHero } from "@/components/foto-video/Hero"
import { FotoVideoServices } from "@/components/foto-video/Services"
import { FotoVideoAbout } from "@/components/foto-video/About"
import { FotoVideoProcess } from "@/components/foto-video/Process"
import { FotoVideoGallery } from "@/components/foto-video/Gallery"
import { FotoVideoContact } from "@/components/foto-video/Contact"
import { Footer } from "@/components/Footer"
import { JsonLd } from "@/components/JsonLd"
import { SeoAnswerSection } from "@/components/SeoAnswerSection"
import { fotoVideoFaq } from "@/lib/seo-content"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  pageMetadata,
  serviceJsonLd,
  websiteJsonLd,
} from "@/lib/seo"

export const metadata = pageMetadata("fotoVideo")

export default function FotoVideoPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          ...serviceJsonLd("fotoVideo"),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Foto & Video", path: "/foto-video" },
          ]),
          faqJsonLd(fotoVideoFaq),
        ]}
      />
      <Nav />
      <main>
        <FotoVideoHero />
        <FotoVideoServices />
        <FotoVideoAbout />
        <FotoVideoProcess />
        <FotoVideoGallery />
        <SeoAnswerSection
          eyebrow="Foto & Video Antworten"
          title="Foto- und Videoproduktion für Markenwirkung."
          summary="FPZ Foto & Video liefert visuelle Inhalte, die auf Websites, in Shops, auf Karriereseiten und in Social Media klar nutzbar sind."
          facts={[
            "Schwerpunkte: Produktfotografie, Imagefilm, Event-Dokumentation und Social Media Content.",
            "Region: Ruhrgebiet mit Fokus auf Bochum und NRW, deutschlandweite Einsätze möglich.",
            "Output: Bilder, Filme und Content-Pakete für digitale und gedruckte Markenkommunikation.",
          ]}
          questions={fotoVideoFaq}
        />
        <FotoVideoContact />
      </main>
      <Footer variant="foto-video" />
    </>
  )
}
