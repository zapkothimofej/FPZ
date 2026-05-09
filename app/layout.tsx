import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://fpz-website.vercel.app"),
  title: {
    default: "FPZ — Websites, Automationen, Foto & Video",
    template: "%s | FPZ",
  },
  description:
    "FPZ aus Bochum baut klare Websites, einfache Automationen und Foto/Video-Content für Unternehmen, Marken und Produkte.",
  keywords: [
    "Webseitenerstellung",
    "KI-Automatisierungen",
    "Produktfotografie",
    "Imagefilm",
    "Bochum",
    "NRW",
    "Next.js Agentur",
  ],
  openGraph: {
    type: "website",
    siteName: "FPZ",
    locale: "de_DE",
    url: "https://fpz-website.vercel.app",
    title: "FPZ — Websites, Automationen, Foto & Video",
    description:
      "Klare Websites, einfache Automationen und Foto/Video-Content aus Bochum.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FPZ — Websites, Automationen, Foto & Video",
    description: "Websites, Automationen und Foto/Video-Content aus Bochum.",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
