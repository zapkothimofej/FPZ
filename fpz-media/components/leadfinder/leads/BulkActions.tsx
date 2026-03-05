"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { STATUS_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { bulkUpdateStatus, bulkDelete } from "@/app/(leadfinder)/secret/(app)/leads/actions";
import { ChevronDown, BarChart3, FileDown, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BulkActionsProps {
  selectedIds: string[];
  onClear: () => void;
}

export function BulkActions({ selectedIds, onClear }: BulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (selectedIds.length === 0) return null;

  function handleStatusChange(status: string) {
    startTransition(async () => {
      try {
        await bulkUpdateStatus(selectedIds, status);
        toast.success(`${selectedIds.length} Leads aktualisiert`);
        onClear();
      } catch {
        toast.error("Fehler beim Aktualisieren");
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await bulkDelete(selectedIds);
        toast.success(`${selectedIds.length} Leads geloescht`);
        onClear();
      } catch {
        toast.error("Fehler beim Loeschen");
      }
    });
  }

  function handleAnalyze() {
    fetch("/api/secret/analyze/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadIds: selectedIds }),
    })
      .then(() => {
        toast.success("Analyse gestartet");
        onClear();
      })
      .catch(() => toast.error("Fehler beim Starten"));
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span className="text-sm text-zinc-300">
          {selectedIds.length} ausgewaehlt
        </span>
        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isPending}>
              Status aendern
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => handleStatusChange(key)}
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full mr-2",
                    config.bgColor.replace("/20", "")
                  )}
                />
                {config.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" onClick={handleAnalyze}>
          <BarChart3 className="h-3 w-3 mr-1" />
          Analysieren
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open(
              `/api/export/csv?ids=${selectedIds.join(",")}`,
              "_blank"
            )
          }
        >
          <FileDown className="h-3 w-3 mr-1" />
          CSV
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-red-400 hover:text-red-300"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Loeschen
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedIds.length} Leads loeschen?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rueckgaengig gemacht werden. Alle
              zugehoerigen Daten werden ebenfalls geloescht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700">
              Abbrechen
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Loeschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
