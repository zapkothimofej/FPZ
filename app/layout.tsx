import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { defaultRobots, routes, site } from "@/lib/seo"
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
  metadataBase: new URL(site.url),
  title: {
    default: routes.home.title,
    template: "%s | FPZ",
  },
  description: routes.home.description,
  alternates: {
    canonical: routes.home.path,
  },
  robots: defaultRobots,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "de_DE",
    url: routes.home.path,
    title: routes.home.ogTitle,
    description: routes.home.ogDescription,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "FPZ - Web, KI, Foto und Video",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: routes.home.ogTitle,
    description: routes.home.ogDescription,
    images: [site.ogImage],
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F7F3EE",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`} style={{ colorScheme: "light" }}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
