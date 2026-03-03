import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fpz-media.de"),
  title: {
    default: "FPZ Media | Digitalagentur Ruhrgebiet — Web, Film & Automation",
    template: "%s | FPZ Media",
  },
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Wir entwickeln Websites, produzieren Medien und automatisieren Prozesse.",
  keywords: [
    "Digitalagentur Ruhrgebiet",
    "Webentwicklung NRW",
    "Medienproduktion Ruhrgebiet",
    "Automation Agentur",
    "Next.js Agentur Deutschland",
    "FPZ Media",
  ],
  authors: [{ name: "FPZ Media", url: "https://fpz-media.de" }],
  creator: "FPZ Media",
  publisher: "FPZ Media",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://fpz-media.de",
    siteName: "FPZ Media",
    title: "FPZ Media | Digitalagentur Ruhrgebiet",
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FPZ Media — Digitalagentur Ruhrgebiet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FPZ Media | Digitalagentur Ruhrgebiet",
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-semibold focus:text-sm focus:rounded"
        >
          Zum Hauptinhalt springen
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
