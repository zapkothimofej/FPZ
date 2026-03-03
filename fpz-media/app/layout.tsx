import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fpz-media.de"),
  title: {
    default: "FPZ Media – Webentwicklung, Film & Automation im Ruhrgebiet",
    template: "%s | FPZ Media",
  },
  description:
    "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Moderne Websites, Imagefilme und n8n-Automatisierung aus einer Hand.",
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "FPZ Media – Webentwicklung, Film & Automation im Ruhrgebiet",
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Moderne Websites, Imagefilme und n8n-Automatisierung aus einer Hand.",
    url: "https://fpz-media.de",
    siteName: "FPZ Media",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FPZ Media – Webentwicklung, Film & Automation im Ruhrgebiet",
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Moderne Websites, Imagefilme und n8n-Automatisierung aus einer Hand.",
  },
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
