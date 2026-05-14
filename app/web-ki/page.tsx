import { Nav } from "@/components/Nav"
import { WebKiHero } from "@/components/web-ki/Hero"
import { WebKiServices } from "@/components/web-ki/Services"
import { WebKiProcess } from "@/components/web-ki/Process"
import { WebKiAbout } from "@/components/web-ki/About"
import { WebKiContact } from "@/components/web-ki/Contact"
import { Footer } from "@/components/Footer"
import { JsonLd } from "@/components/JsonLd"
import { SeoAnswerSection } from "@/components/SeoAnswerSection"
import { webKiFaq } from "@/lib/seo-content"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  pageMetadata,
  serviceJsonLd,
  websiteJsonLd,
} from "@/lib/seo"

export const metadata = pageMetadata("webKi")

export default function WebKiPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          ...serviceJsonLd("webKi"),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: "Web & KI", path: "/web-ki" },
          ]),
          faqJsonLd(webKiFaq),
        ]}
      />
      <Nav />
      <main>
        <WebKiHero />
        <WebKiServices />
        <WebKiProcess />
        <WebKiAbout />
        <SeoAnswerSection
          eyebrow="Web & KI Antworten"
          title="Websites und KI-Systeme für konkrete Anfragen."
          summary="FPZ Web & KI baut digitale Systeme, die sichtbar erklären, was ein Unternehmen anbietet, und wiederkehrende Arbeitsschritte technisch vereinfachen."
          facts={[
            "Schwerpunkte: Webseitenerstellung, Automatisierungen, API-Anbindungen und KI-Integrationen.",
            "Region: Waltrop, Bochum, Ruhrgebiet, NRW und deutschlandweite Projekte.",
            "Technischer Fokus: moderne Frontends, klare Conversion-Wege und wartbare Prozesslogik.",
          ]}
          questions={webKiFaq}
        />
        <WebKiContact />
      </main>
      <Footer variant="web-ki" />
    </>
  )
}
