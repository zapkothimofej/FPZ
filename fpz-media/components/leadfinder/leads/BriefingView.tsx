"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseJsonSafe, cn } from "@/lib/utils";
import {
  FileText,
  Sparkles,
  Loader2,
  RefreshCw,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import type { Briefing } from "@/types";

interface BriefingViewProps {
  briefing: Briefing | null;
  leadId: string;
  hasAnalysis: boolean;
}

interface WeaknessItem {
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
}

interface SuggestionItem {
  title: string;
  description: string;
  service: string;
}

const SEVERITY_CONFIG = {
  critical: { label: "Kritisch", className: "bg-red-500/20 text-red-400" },
  high: { label: "Hoch", className: "bg-orange-500/20 text-orange-400" },
  medium: { label: "Mittel", className: "bg-yellow-500/20 text-yellow-400" },
  low: { label: "Niedrig", className: "bg-zinc-700 text-zinc-300" },
} as const;

export function BriefingView({
  briefing,
  leadId,
  hasAnalysis,
}: BriefingViewProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/secret/briefing/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ?? "Generierung fehlgeschlagen"
        );
      }
      toast.success("Briefing erfolgreich generiert");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Generierung fehlgeschlagen"
      );
    } finally {
      setIsGenerating(false);
    }
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm text-zinc-400 mt-3">KI generiert Briefing...</p>
        <p className="text-xs text-zinc-600 mt-1">
          Das kann bis zu 15 Sekunden dauern.
        </p>
      </div>
    );
  }

  if (!briefing && !hasAnalysis) {
    return (
      <div className="flex flex-col items-center py-12">
        <FileText className="h-12 w-12 text-zinc-600 mb-3" />
        <h3 className="text-lg font-semibold text-zinc-100">
          Briefing nicht verfügbar
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Die Website muss zuerst analysiert werden bevor ein Briefing generiert
          werden kann.
        </p>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="flex flex-col items-center py-12">
        <FileText className="h-12 w-12 text-zinc-600 mb-3" />
        <h3 className="text-lg font-semibold text-zinc-100">
          Briefing generieren
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Erstelle ein KI-gestütztes Sales-Briefing basierend auf der
          Website-Analyse.
        </p>
        <Button onClick={handleGenerate} className="mt-4">
          <Sparkles className="h-4 w-4 mr-2" />
          Briefing generieren
        </Button>
      </div>
    );
  }

  const weaknesses = parseJsonSafe<WeaknessItem[]>(briefing.weaknesses, []);
  const suggestions = parseJsonSafe<SuggestionItem[]>(briefing.suggestions, []);
  const riskScore =
    typeof briefing.riskScore === "number" ? briefing.riskScore : 5;
  const potential = 10 - riskScore;
  const potentialPercent = potential * 10;
  const potentialColor =
    riskScore <= 3
      ? "bg-green-500"
      : riskScore <= 6
        ? "bg-yellow-500"
        : "bg-red-500";
  const potentialLabel =
    riskScore <= 3 ? "Hoch" : riskScore <= 6 ? "Mittel" : "Niedrig";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-100">Sales-Briefing</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          <RefreshCw
            className={cn("h-3 w-3 mr-1", isGenerating && "animate-spin")}
          />
          Neu generieren
        </Button>
      </div>

      {/* Zusammenfassung */}
      <div className="bg-zinc-800/50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
        <p className="text-zinc-200 text-sm leading-relaxed">
          {briefing.summary}
        </p>
      </div>

      {/* Schwachstellen */}
      {weaknesses.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-zinc-300 mb-2">
            Schwachstellen
          </h4>
          <div className="space-y-2">
            {weaknesses.map((w, i) => {
              const config = SEVERITY_CONFIG[w.severity] ?? SEVERITY_CONFIG.low;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/20"
                >
                  <Badge className={cn("text-xs shrink-0 mt-0.5", config.className)}>
                    {config.label}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {w.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {w.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Vorschläge */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-zinc-300 mb-2">
            Was FPC-Media anbieten kann
          </h4>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-zinc-100">{s.title}</p>
                  <p className="text-xs text-zinc-400">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aufwand */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-zinc-400">Geschätzter Aufwand:</span>
        <Badge
          className={cn(
            "text-xs",
            briefing.effort === "SMALL"
              ? "bg-green-500/20 text-green-400"
              : briefing.effort === "MEDIUM"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          )}
        >
          {briefing.effort === "SMALL"
            ? "Gering (1-2 Tage)"
            : briefing.effort === "MEDIUM"
              ? "Mittel (3-5 Tage)"
              : "Hoch (1-2 Wochen)"}
        </Badge>
      </div>

      {/* Gesprächseinstieg */}
      <div className="bg-zinc-800 rounded-lg p-4 border-l-4 border-green-500 mb-4 relative group">
        <p className="text-zinc-200 text-sm italic leading-relaxed pr-8">
          {briefing.opener}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => {
            navigator.clipboard.writeText(briefing.opener);
            toast.success("Gesprächseinstieg kopiert");
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>

      {/* Risiko-Score */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-400">Abschluss-Potential:</span>
        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", potentialColor)}
            style={{ width: `${potentialPercent}%` }}
          />
        </div>
        <span className="text-sm text-zinc-300">{potentialLabel}</span>
      </div>
    </div>
  );
}
