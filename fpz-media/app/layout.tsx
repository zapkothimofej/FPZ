import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fpz-media.de"),
  title: {
    default: "FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet",
    template: "%s | FPZ Media",
  },
  description:
    "FPZ Media ist Ihre Full-Service Digitalagentur im Ruhrgebiet — professionelle Webentwicklung, Filmproduktion und intelligente Automation für lokale Unternehmen in NRW.",
  keywords: [
    "Webentwicklung Ruhrgebiet",
    "Digitalagentur Ruhrgebiet",
    "Webdesign Ruhrgebiet",
    "Imagefilm Ruhrgebiet",
    "n8n Automation",
    "Next.js Agentur",
    "Website erstellen lassen",
    "Filmproduktion NRW",
    "SEO Ruhrgebiet",
    "Webseite für Unternehmen",
  ],
  authors: [{ name: "FPZ Media", url: "https://fpz-media.de" }],
  creator: "FPZ Media",
  publisher: "FPZ Media",
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          Zum Hauptinhalt springen
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
