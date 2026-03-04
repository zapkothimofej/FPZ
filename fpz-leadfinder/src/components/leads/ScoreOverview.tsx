"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { parseJsonSafe, cn } from "@/lib/utils";
import { SCORE_CATEGORY_LABELS, SCORE_FIELD_MAP } from "@/lib/constants";
import { Briefcase, BarChart3, Loader2 } from "lucide-react";
import type { WebsiteAnalysis, ScoreCategory } from "@/types";
import { toast } from "sonner";

interface ScoreOverviewProps {
  analysis: WebsiteAnalysis | null;
  website: string | null;
  leadId: string;
}

const CATEGORIES: Array<{ key: ScoreCategory; label: string; field: string }> =
  (Object.keys(SCORE_CATEGORY_LABELS) as ScoreCategory[]).map((key) => ({
    key,
    label: SCORE_CATEGORY_LABELS[key],
    field: SCORE_FIELD_MAP[key],
  }));

export function ScoreOverview({
  analysis,
  website,
  leadId,
}: ScoreOverviewProps) {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  async function handleAnalyze() {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      if (!res.ok) throw new Error("Analyse fehlgeschlagen");
      toast.success("Analyse abgeschlossen");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Analyse fehlgeschlagen"
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm text-zinc-400 mt-3">
          Website wird analysiert...
        </p>
      </div>
    );
  }

  if (!website) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-12 w-12 text-yellow-500 mb-3" />
          <h3 className="text-lg font-semibold text-zinc-100">
            Keine Website vorhanden
          </h3>
          <p className="text-sm text-zinc-400 mt-1 text-center max-w-md">
            Dieses Unternehmen hat keine Website. Das ist eine hervorragende
            Sales-Chance — biete eine komplette Neuerstellung an!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-12 w-12 text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-zinc-100">
            Website noch nicht analysiert
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Starte die Analyse um detaillierte Scores zu erhalten.
          </p>
          <Button onClick={handleAnalyze} className="mt-4">
            Website analysieren
          </Button>
        </CardContent>
      </Card>
    );
  }

  const details = parseJsonSafe<Record<string, unknown>>(
    analysis.details,
    {}
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <ScoreRing
          score={analysis.overallScore}
          size="lg"
          label="Gesamt"
          showLabel
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CATEGORIES.map(({ key, label, field }) => {
          const score = (analysis as unknown as Record<string, number>)[field] ?? 0;
          const isExpanded = expandedCategory === key;
          const categoryDetails = details[key];

          return (
            <div key={key}>
              <div
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-pointer"
                )}
                onClick={() =>
                  setExpandedCategory(isExpanded ? null : key)
                }
              >
                <ScoreRing score={score} size="sm" />
                <span className="text-xs text-zinc-400">{label}</span>
              </div>
              {isExpanded && categoryDetails != null && (
                <div className="bg-zinc-800/30 rounded-lg p-3 mt-2 text-xs text-zinc-300 space-y-1">
                  {typeof categoryDetails === "object" &&
                    categoryDetails !== null &&
                    Object.entries(
                      categoryDetails as Record<string, unknown>
                    ).map(([k, v]) => {
                      const display = v != null ? String(v) : "";
                      return (
                        <div key={k} className="flex justify-between">
                          <span>{k}</span>
                          <span className="text-zinc-400">{display}</span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
