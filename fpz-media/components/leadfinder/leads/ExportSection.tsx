"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

interface ExportSectionProps {
  leadId: string;
  hasData: boolean;
}

export function ExportSection({
  leadId,
  hasData,
}: ExportSectionProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <FileDown className="h-12 w-12 text-zinc-600" />
        <h3 className="text-lg font-semibold text-zinc-100">Export</h3>
        <p className="text-sm text-zinc-400 text-center">
          Lade das vollstaendige Briefing und Skript als PDF herunter.
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              window.open(`/api/export/pdf/${leadId}`, "_blank");
              toast.success("Download gestartet");
            }}
            disabled={!hasData}
          >
            <FileDown className="h-4 w-4 mr-2" />
            PDF herunterladen
          </Button>
        </div>
        {!hasData && (
          <p className="text-xs text-zinc-600">
            Generiere zuerst ein Briefing um den Export zu nutzen.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
