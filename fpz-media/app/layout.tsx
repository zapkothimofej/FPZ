import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet",
  description:
    "FPZ Media ist Ihre Full-Service Digitalagentur im Ruhrgebiet — professionelle Webentwicklung, Filmproduktion und intelligente Automation für lokale Unternehmen in NRW.",
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
