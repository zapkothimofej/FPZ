"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Sparkles, Trash2, Loader2 } from "lucide-react";
import { deleteLead } from "@/app/leads/[id]/actions";
import { toast } from "sonner";

interface LeadDetailActionsProps {
  leadId: string;
  leadName: string;
  hasWebsite: boolean;
}

export function LeadDetailActions({
  leadId,
  leadName,
  hasWebsite,
}: LeadDetailActionsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleGenerateAll() {
    if (!hasWebsite) return;
    setIsGenerating(true);
    try {
      toast.info("Analyse wird gestartet...");
      await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      toast.info("Briefing wird generiert...");
      await fetch("/api/briefing/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      toast.info("Skript wird generiert...");
      await fetch("/api/script/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      toast.success("Alles erfolgreich generiert!");
      router.refresh();
    } catch {
      toast.error("Fehler bei der Generierung");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteLead(leadId);
        toast.success("Lead geloescht");
        router.push("/leads");
      } catch {
        toast.error("Fehler beim Loeschen");
      }
    });
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateAll}
          disabled={!hasWebsite || isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="h-3 w-3 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-3 w-3 mr-2" />
          )}
          Alles generieren
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-3 w-3 mr-2" />
          Loeschen
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Lead loeschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Lead &quot;{leadName}&quot; wirklich loeschen? Alle zugehoerigen
              Analysen, Briefings und Skripte werden ebenfalls geloescht.
              Diese Aktion kann nicht rueckgaengig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700">
              Abbrechen
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Wird geloescht..." : "Loeschen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
