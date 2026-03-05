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
