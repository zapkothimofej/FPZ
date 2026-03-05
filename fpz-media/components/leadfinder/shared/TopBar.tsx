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
