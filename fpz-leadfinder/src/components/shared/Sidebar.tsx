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
