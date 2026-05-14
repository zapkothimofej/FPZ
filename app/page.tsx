import { Nav } from "@/components/Nav"
import { LandingPage } from "@/components/LandingPage"
import { JsonLd } from "@/components/JsonLd"
import { SeoAnswerSection } from "@/components/SeoAnswerSection"
import { Footer } from "@/components/Footer"
import { homeFaq } from "@/lib/seo-content"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/seo"

export const metadata = pageMetadata("home")

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), breadcrumbJsonLd([{ name: "Startseite", path: "/" }]), faqJsonLd(homeFaq)]} />
      <Nav />
      <main>
        <LandingPage />
        <SeoAnswerSection
          eyebrow="Kurzantworten"
          title="FPZ in einem Satz."
          summary="FPZ/Fapez Medien ist ein Medien- und Webstudio aus dem Ruhrgebiet für Unternehmen, die Web, KI und visuelle Produktion aus einer Hand brauchen."
          facts={[
            "Rechtlicher Sitz: Waltrop, Nordrhein-Westfalen.",
            "Lokaler Fokus: Bochum, Ruhrgebiet und NRW.",
            "Leistungen: Websites, KI-Automatisierungen, Produktfotografie, Imagefilm und Social Content.",
          ]}
          questions={homeFaq}
        />
      </main>
      <Footer />
    </>
  )
}
