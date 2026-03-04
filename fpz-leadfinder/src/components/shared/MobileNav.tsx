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
