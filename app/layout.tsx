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
  title: "FPZ — Web, KI & Foto/Video",
  description:
    "FPZ: Digitale Exzellenz für moderne Unternehmen. Professionelle Websites, KI-Automatisierungen und Foto/Video-Produktionen.",
  openGraph: {
    title: "FPZ — Web, KI & Foto/Video",
    description:
      "Websites, KI-Automatisierungen und professionelle Foto/Video-Produktionen.",
    locale: "de_DE",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
