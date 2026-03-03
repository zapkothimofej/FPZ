import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import { GrainOverlay } from "@/components/GrainOverlay"
import { V6ThemeProvider } from "@/components/ThemeProvider"
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
  title: "FPZ Media",
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
}

export default function HomePage() {
  return (
    <div className={`${display.variable} ${body.variable} antialiased`}>
      <V6ThemeProvider>
        <GrainOverlay />
        <main>
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
