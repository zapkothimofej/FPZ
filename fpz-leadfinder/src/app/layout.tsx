import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/shared/SidebarContext";
import { Sidebar } from "@/components/shared/Sidebar";
import { MobileNav } from "@/components/shared/MobileNav";
import { TopBar } from "@/components/shared/TopBar";
import { MainContent } from "@/components/shared/MainContent";
import { Toaster } from "sonner";

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
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <TopBar />
              <main className="p-4 md:p-6 pb-20 md:pb-6">{children}</main>
            </MainContent>
          </div>
          <MobileNav />
        </SidebarProvider>
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
