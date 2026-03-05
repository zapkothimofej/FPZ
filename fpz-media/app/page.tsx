import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/GrainOverlay"
import { V6ThemeProvider } from "@/components/ThemeProvider"
import { JsonLd } from "@/components/JsonLd"
import "@/app/v6-theme.css"

import { Navbar }           from "@/components/Navbar"
import { HeroChrom }        from "@/components/HeroChrom"
import { ManifestoSection } from "@/components/ManifestoSection"
import { ServicesSection }  from "@/components/ServicesSection"
import { ProcessSection }   from "@/components/ProcessSection"
import { StatsSection }     from "@/components/StatsSection"
import { PricingSection }   from "@/components/PricingSection"
import { PortfolioSection } from "@/components/PortfolioSection"
import { ContactSection }   from "@/components/ContactSection"
import { Footer }           from "@/components/Footer"

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

export const metadata: Metadata = {
  title: "FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet",
  description:
    "FPZ Media ist Ihre Full-Service Digitalagentur im Ruhrgebiet — professionelle Webentwicklung, Filmproduktion und intelligente Automation für lokale Unternehmen in NRW.",
  alternates: {
    canonical: "https://fpz-media.de",
  },
  openGraph: {
    title: "FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet",
    description:
      "Full-Service Digitalagentur im Ruhrgebiet. Professionelle Webentwicklung, Filmproduktion und Automation für lokale Unternehmen in NRW.",
    url: "https://fpz-media.de",
    siteName: "FPZ Media",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet",
    description:
      "Full-Service Digitalagentur im Ruhrgebiet. Web. Film. Automation.",
  },
}

export default function HomePage() {
  return (
    <div className={`${display.variable} ${body.variable} antialiased`}>
      <JsonLd />
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
