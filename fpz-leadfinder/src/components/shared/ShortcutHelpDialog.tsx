"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortcutHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SHORTCUTS = [
  { keys: "g d", action: "Dashboard" },
  { keys: "g l", action: "Leads" },
  { keys: "g s", action: "Scan" },
  { keys: "g e", action: "Einstellungen" },
  { keys: "/", action: "Suche fokussieren" },
  { keys: "n", action: "Lead hinzufuegen" },
  { keys: "?", action: "Diese Hilfe" },
  { keys: "Esc", action: "Dialog schliessen" },
];

export function ShortcutHelpDialog({
  open,
  onOpenChange,
}: ShortcutHelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-sm">
        <DialogHeader>
          <DialogTitle>Tastenkuerzel</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="text-left py-2">Taste</th>
                <th className="text-left py-2">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {SHORTCUTS.map((shortcut) => (
                <tr
                  key={shortcut.keys}
                  className="border-b border-zinc-800/50"
                >
                  <td className="py-2">
                    <kbd className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-300 font-mono">
                      {shortcut.keys}
                    </kbd>
                  </td>
                  <td className="py-2 text-zinc-300">{shortcut.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
