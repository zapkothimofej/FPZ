import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/chrom/GrainOverlay"
import { V6ThemeProvider } from "@/app/chrom/ThemeProvider"
import "@/app/chrom/v6-theme.css"

import { Navbar }           from "@/components/chrom/Navbar"
import { HeroChrom }        from "@/components/sphere/HeroChrom"
import { ManifestoSection } from "@/components/clean/ManifestoSection"
import { ServicesSection }  from "@/components/clean/ServicesSection"
import { ProcessSection }   from "@/components/clean/ProcessSection"
import { StatsSection }     from "@/components/chrom/StatsSection"
import { PricingSection }   from "@/components/chrom/PricingSection"
import { PortfolioSection } from "@/components/chrom/PortfolioSection"
import { ContactSection }   from "@/components/chrom/ContactSection"
import { Footer }           from "@/components/chrom/Footer"

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
})

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FPZ Media",
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Webentwicklung, Medienproduktion und Automation.",
  url: "https://fpz-media.de",
  email: "hallo@fpz-media.de",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "Place",
    name: "Ruhrgebiet, NRW, Deutschland",
  },
  knowsLanguage: ["de", "en"],
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digitale Leistungen",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webentwicklung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medienproduktion" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automation" } },
    ],
  },
}

export const metadata: Metadata = {
  title: "FPZ Media | Digitalagentur Ruhrgebiet — Web, Film & Automation",
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Wir entwickeln Websites, produzieren Medien und automatisieren Prozesse.",
  alternates: {
    canonical: "https://fpz-media.de",
  },
  openGraph: {
    title: "FPZ Media | Digitalagentur Ruhrgebiet",
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
    url: "https://fpz-media.de",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className={`${display.variable} ${body.variable} antialiased`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <V6ThemeProvider>
        <GrainOverlay />
        <main id="main-content">
          <Navbar />
          <HeroChrom />
          <ManifestoSection />
          <ServicesSection />
          <ProcessSection />
          <StatsSection />
          <PortfolioSection />
          <PricingSection />
          <ContactSection />
          <Footer />
        </main>
      </V6ThemeProvider>
    </div>
  )
}
