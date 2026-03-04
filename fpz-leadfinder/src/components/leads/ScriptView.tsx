"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { parseJsonSafe, formatDate, cn } from "@/lib/utils";
import {
  FileText,
  Sparkles,
  Loader2,
  RefreshCw,
  Copy,
  Phone,
  Zap,
  AlertTriangle,
  Lightbulb,
  Calendar,
  Shield,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import type { SalesScript } from "@/types";

interface ScriptViewProps {
  script: SalesScript | null;
  leadId: string;
  hasBriefing: boolean;
}

interface ObjectionItem {
  objection: string;
  response: string;
}

export function ScriptView({ script, leadId, hasBriefing }: ScriptViewProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/script/generate", {
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
      toast.success("Skript erfolgreich generiert");
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
        <p className="text-sm text-zinc-400 mt-3">
          KI generiert Verkaufsskript...
        </p>
        <p className="text-xs text-zinc-600 mt-1">
          Das kann bis zu 15 Sekunden dauern.
        </p>
      </div>
    );
  }

  if (!script && !hasBriefing) {
    return (
      <div className="flex flex-col items-center py-12">
        <FileText className="h-12 w-12 text-zinc-600 mb-3" />
        <h3 className="text-lg font-semibold text-zinc-100">
          Skript nicht verfügbar
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Ein Briefing muss zuerst generiert werden bevor ein Skript erstellt
          werden kann.
        </p>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="flex flex-col items-center py-12">
        <FileText className="h-12 w-12 text-zinc-600 mb-3" />
        <h3 className="text-lg font-semibold text-zinc-100">
          Skript generieren
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Erstelle ein personalisiertes Telefonskript basierend auf dem
          Briefing.
        </p>
        <Button onClick={handleGenerate} className="mt-4">
          <Sparkles className="h-4 w-4 mr-2" />
          Skript generieren
        </Button>
      </div>
    );
  }

  const painPoints = parseJsonSafe<string[]>(script.painPoints, []);
  const objections = parseJsonSafe<ObjectionItem[]>(script.objections, []);

  const steps = [
    {
      icon: Phone,
      color: "blue-400",
      label: "1. Begruessung",
      content: (
        <div className="text-sm text-zinc-200 leading-relaxed bg-zinc-800/30 rounded-lg p-3">
          {script.greeting}
        </div>
      ),
    },
    {
      icon: Zap,
      color: "yellow-400",
      label: "2. Hook — Aufmerksamkeit gewinnen",
      content: (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 text-sm text-zinc-200">
          {script.hook}
        </div>
      ),
    },
    {
      icon: AlertTriangle,
      color: "red-400",
      label: "3. Probleme ansprechen",
      content: (
        <ul className="space-y-1.5">
          {painPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-200">
              <ChevronRight className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: Lightbulb,
      color: "green-400",
      label: "4. Unsere Loesung",
      content: (
        <div className="text-sm text-zinc-200 leading-relaxed bg-zinc-800/30 rounded-lg p-3">
          {script.solution}
        </div>
      ),
    },
    {
      icon: Calendar,
      color: "blue-400",
      label: "5. Termin vereinbaren",
      content: (
        <div className="text-sm text-zinc-200 leading-relaxed bg-zinc-800/30 rounded-lg p-3">
          {script.callToAction}
        </div>
      ),
    },
    {
      icon: Shield,
      color: "zinc-400",
      label: "6. Einwandbehandlung",
      content: (
        <Accordion type="single" collapsible className="space-y-1">
          {objections.map((obj, i) => (
            <AccordionItem
              key={i}
              value={i.toString()}
              className="border-zinc-800 bg-zinc-800/20 rounded-lg px-3"
            >
              <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3 w-3 text-zinc-500" />
                  &quot;{obj.objection}&quot;
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-zinc-400 pb-3">
                {obj.response}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-100">
          Telefonat-Leitfaden
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(script.fullScript);
              toast.success("Skript in Zwischenablage kopiert");
            }}
          >
            <Copy className="h-3 w-3 mr-1" />
            Skript kopieren
          </Button>
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
      </div>

      <div className="relative pl-8 space-y-6">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-800" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative">
              <div
                className={`absolute -left-8 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 border-2 border-${step.color}`}
              >
                <Icon className={`h-3 w-3 text-${step.color}`} />
              </div>
              <div className="pb-2">
                <h4 className={`text-sm font-medium text-${step.color} mb-1`}>
                  {step.label}
                </h4>
                {step.content}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-zinc-600 mt-6 text-center">
        Skript basiert auf der Analyse vom {formatDate(script.generatedAt)}.
        Klicke &quot;Neu generieren&quot; fuer aktuelle Daten.
      </p>
    </div>
  );
}
