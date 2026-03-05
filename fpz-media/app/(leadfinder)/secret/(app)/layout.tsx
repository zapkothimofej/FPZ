import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/leadfinder/shared/SidebarContext";
import { Sidebar } from "@/components/leadfinder/shared/Sidebar";
import { MobileNav } from "@/components/leadfinder/shared/MobileNav";
import { TopBar } from "@/components/leadfinder/shared/TopBar";
import { MainContent } from "@/components/leadfinder/shared/MainContent";
import { Toaster } from "sonner";
import { KeyboardShortcuts } from "@/components/leadfinder/shared/KeyboardShortcuts";

const geist = Geist({ subsets: ["latin"] });

export default function LeadFinderAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(geist.className, "leadfinder-app dark min-h-screen bg-zinc-950 text-zinc-50")}>
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
      <KeyboardShortcuts />
    </div>
  );
}
