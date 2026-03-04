"use client";

import { Textarea } from "@/components/ui/textarea";
import { updateLeadNotes } from "@/app/leads/[id]/actions";
import { toast } from "sonner";
import { useState, useRef } from "react";

interface LeadNotesProps {
  leadId: string;
  initialNotes: string | null;
}

export function LeadNotes({ leadId, initialNotes }: LeadNotesProps) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const savedRef = useRef(initialNotes ?? "");

  async function handleSave() {
    if (notes === savedRef.current) return;
    try {
      await updateLeadNotes(leadId, notes);
      savedRef.current = notes;
      toast.success("Notiz gespeichert");
    } catch {
      toast.error("Fehler beim Speichern");
    }
  }

  return (
    <Textarea
      placeholder="Notizen zum Lead..."
      className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 min-h-[100px]"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      onBlur={handleSave}
    />
  );
}
