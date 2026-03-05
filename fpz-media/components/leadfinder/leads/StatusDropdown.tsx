"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { updateLeadStatus } from "@/app/(leadfinder)/secret/(app)/leads/[id]/actions";
import { toast } from "sonner";
import { useState, useTransition } from "react";

interface StatusDropdownProps {
  leadId: string;
  currentStatus: string;
}

export function StatusDropdown({ leadId, currentStatus }: StatusDropdownProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    setStatus(value);
    startTransition(async () => {
      try {
        await updateLeadStatus(leadId, value);
        toast.success("Status aktualisiert");
      } catch {
        setStatus(currentStatus);
        toast.error("Fehler beim Aktualisieren");
      }
    });
  }

  return (
    <Select value={status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-800">
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  config.bgColor.replace("/20", "")
                )}
              />
              {config.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
