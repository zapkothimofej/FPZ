# US-004: App Layout mit Sidebar und Dark Mode

## Exakte Datei: src/components/shared/SidebarContext.tsx (NEU)

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const STORAGE_KEY = "sidebar-collapsed";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setCollapsed(true);
    }
    setMounted(true);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  if (!mounted) {
    return (
      <SidebarContext.Provider value={{ collapsed: false, toggleCollapsed }}>
        {children}
      </SidebarContext.Provider>
    );
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
```

## Exakte Datei: src/components/shared/Sidebar.tsx (NEU)

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/scan", label: "Scan", icon: Search },
  { href: "/settings", label: "Einstellungen", icon: Settings },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen z-40 hidden md:flex flex-col",
          "bg-zinc-900 border-r border-zinc-800 transition-all duration-300"
        )}
        style={{ width: collapsed ? 64 : 256 }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-zinc-800">
          <span className="text-lg font-bold text-zinc-50 truncate">
            {collapsed ? "LF" : "LeadFinder"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            const Icon = item.icon;

            const link = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 mx-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-zinc-800 text-zinc-50 font-medium"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon
                  className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.href}>{link}</div>;
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={toggleCollapsed}
            className={cn(
              "flex items-center justify-center w-full py-2 rounded-lg",
              "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
```

## Exakte Datei: src/components/shared/MobileNav.tsx (NEU)

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/scan", label: "Scan", icon: Search },
  { href: "/settings", label: "Settings", icon: Settings },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around">
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              active ? "text-blue-400" : "text-zinc-500"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

## Exakte Datei: src/components/shared/TopBar.tsx (NEU)

```tsx
"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/leads": "Leads",
  "/scan": "Scan",
  "/settings": "Einstellungen",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/leads/")) return "Lead Details";
  const prefix = Object.keys(PAGE_TITLES).find(
    (key) => key !== "/" && pathname.startsWith(key)
  );
  return (prefix ? PAGE_TITLES[prefix] : undefined) ?? "LeadFinder";
}

export function TopBar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-zinc-50">{title}</h1>
      <span className="text-sm text-zinc-500">FPC-Media</span>
    </header>
  );
}
```

## Exakte Datei: src/components/shared/MainContent.tsx (NEU)

Client-Component das den dynamischen Sidebar-Margin steuert.

```tsx
"use client";

import { useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MainContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      )}
    >
      {children}
    </div>
  );
}
```

## Exakte Datei: src/app/globals.css (ERGAENZEN am Ende)

Folgende Zeilen am Ende der bestehenden globals.css anfuegen:

```css
/* Sidebar layout offsets */
.sidebar-expanded {
  margin-left: 256px;
}

.sidebar-collapsed {
  margin-left: 64px;
}

@media (max-width: 767px) {
  .sidebar-expanded,
  .sidebar-collapsed {
    margin-left: 0;
  }
}
```

## Exakte Datei: src/app/layout.tsx (ERSETZEN)

```tsx
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
```

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
npm run dev       # Sidebar sichtbar, collapsible, Navigation funktioniert, Mobile Bottom-Nav
```
