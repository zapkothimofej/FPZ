import { Nav } from "@/components/Nav"
import { WebKiHero } from "@/components/web-ki/Hero"
import { WebKiServices } from "@/components/web-ki/Services"
import { WebKiProcess } from "@/components/web-ki/Process"
import { WebKiAbout } from "@/components/web-ki/About"
import { WebKiContact } from "@/components/web-ki/Contact"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "FPZ — Web & KI | Webseitenerstellung, Automatisierungen, OpenAI-Anbindungen",
  description:
    "Professionelle Websites, Prozessautomatisierungen und KI-Integrationen für Ihr Unternehmen. FPZ aus Bochum — deutschlandweit tätig.",
}

export default function WebKiPage() {
  return (
    <>
      <Nav />
      <main>
        <WebKiHero />
        <WebKiServices />
        <WebKiProcess />
        <WebKiAbout />
        <WebKiContact />
      </main>
      <Footer variant="web-ki" />
    </>
  )
}
