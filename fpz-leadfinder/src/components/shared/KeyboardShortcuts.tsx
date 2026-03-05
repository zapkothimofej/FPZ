"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShortcutHelpDialog } from "./ShortcutHelpDialog";

export function KeyboardShortcuts() {
  const router = useRouter();
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Escape") {
        setShowHelp(false);
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        const searchInput =
          document.querySelector<HTMLInputElement>("[data-search-input]");
        searchInput?.focus();
        return;
      }

      if (e.key === "n") {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent("open-add-lead"));
        return;
      }

      if (pendingKey === "g") {
        setPendingKey(null);
        clearTimeout(timeout);
        switch (e.key) {
          case "d":
            e.preventDefault();
            router.push("/");
            break;
          case "l":
            e.preventDefault();
            router.push("/leads");
            break;
          case "s":
            e.preventDefault();
            router.push("/scan");
            break;
          case "e":
            e.preventDefault();
            router.push("/settings");
            break;
        }
        return;
      }

      if (e.key === "g") {
        setPendingKey("g");
        timeout = setTimeout(() => setPendingKey(null), 500);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [pendingKey, router]);

  return <ShortcutHelpDialog open={showHelp} onOpenChange={setShowHelp} />;
}
