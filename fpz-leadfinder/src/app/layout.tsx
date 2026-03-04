import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeadFinder — FPC-Media",
  description: "Internes Sales-Tool für FPC-Media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body
        className={cn(
          geist.className,
          "min-h-screen bg-zinc-950 text-zinc-50"
        )}
      >
        {children}
      </body>
    </html>
  );
}
