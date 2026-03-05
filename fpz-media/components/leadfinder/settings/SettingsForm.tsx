"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RUHRGEBIET_CITIES, SCORE_CATEGORY_LABELS, SCORE_WEIGHTS } from "@/lib/constants";
import { parseJsonSafe, cn } from "@/lib/utils";
import { Eye, EyeOff, Zap, Check, X, Save } from "lucide-react";
import { toast } from "sonner";
import { saveSettings } from "@/app/settings/actions";
import type { Settings, ScanLog, ScoreCategory } from "@/types";

interface SettingsFormProps {
  initialSettings: Settings | null;
  stats: {
    leadCount: number;
    analyzedCount: number;
    briefingCount: number;
    scriptCount: number;
  };
  lastScan: ScanLog | null;
}

export function SettingsForm({
  initialSettings,
  stats,
  lastScan,
}: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [groqKey, setGroqKey] = useState(initialSettings?.groqApiKey ?? "");
  const [showGroq, setShowGroq] = useState(false);
  const [groqOk, setGroqOk] = useState<boolean | null>(null);
  const [hfToken, setHfToken] = useState(
    initialSettings?.huggingfaceToken ?? ""
  );
  const [showHf, setShowHf] = useState(false);
  const [hfOk, setHfOk] = useState<boolean | null>(null);
  const [defaultCities, setDefaultCities] = useState<string[]>(
    parseJsonSafe<string[]>(initialSettings?.defaultCities ?? null, [])
  );
  const [weights, setWeights] = useState<Record<ScoreCategory, number>>(() => {
    const saved = parseJsonSafe<Record<string, number>>(
      initialSettings?.scoringWeights ?? null,
      {}
    );
    return {
      ...(Object.fromEntries(
        Object.entries(SCORE_WEIGHTS).map(([k, v]) => [k, Math.round(v * 100)])
      ) as Record<ScoreCategory, number>),
      ...(Object.fromEntries(
        Object.entries(saved).map(([k, v]) => [k, v])
      ) as Partial<Record<ScoreCategory, number>>),
    };
  });

  const weightSum = Object.values(weights).reduce((a, b) => a + b, 0);
  const sumIs100 = weightSum === 100;

  function updateWeight(key: ScoreCategory, value: number) {
    setWeights((prev) => ({ ...prev, [key]: value }));
  }

  async function testGroq() {
    try {
      const res = await fetch("/api/secret/dashboard");
      setGroqOk(res.ok);
      toast.success("Verbindung erfolgreich");
    } catch {
      setGroqOk(false);
      toast.error("Verbindung fehlgeschlagen");
    }
  }

  function handleSave() {
    startTransition(async () => {
      try {
        const weightsFraction = Object.fromEntries(
          Object.entries(weights).map(([k, v]) => [k, v / 100])
        );
        await saveSettings({
          groqApiKey: groqKey || undefined,
          huggingfaceToken: hfToken || undefined,
          defaultCities: defaultCities.length > 0 ? defaultCities : undefined,
          scoringWeights: weightsFraction,
        });
        toast.success("Einstellungen gespeichert");
      } catch {
        toast.error("Fehler beim Speichern");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* API Keys */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>API Schluessel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Groq API Key</label>
            <div className="relative">
              <Input
                type={showGroq ? "text" : "password"}
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                className="bg-zinc-900 border-zinc-800 pr-20"
                placeholder="gsk_..."
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-10 top-1/2 -translate-y-1/2"
                onClick={() => setShowGroq(!showGroq)}
              >
                {showGroq ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={testGroq}
              >
                {groqOk === true ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : groqOk === false ? (
                  <X className="h-4 w-4 text-red-500" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">HuggingFace Token</label>
            <div className="relative">
              <Input
                type={showHf ? "text" : "password"}
                value={hfToken}
                onChange={(e) => setHfToken(e.target.value)}
                className="bg-zinc-900 border-zinc-800 pr-20"
                placeholder="hf_..."
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-10 top-1/2 -translate-y-1/2"
                onClick={() => setShowHf(!showHf)}
              >
                {showHf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Cities */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Standard-Staedte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {RUHRGEBIET_CITIES.map((city) => (
              <label
                key={city.name}
                className="flex items-center gap-2 p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 cursor-pointer"
              >
                <Checkbox
                  checked={defaultCities.includes(city.name)}
                  onCheckedChange={() =>
                    setDefaultCities((prev) =>
                      prev.includes(city.name)
                        ? prev.filter((c) => c !== city.name)
                        : [...prev, city.name]
                    )
                  }
                />
                <span className="text-sm text-zinc-300">{city.name}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scoring Weights */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Scoring-Gewichtung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(Object.keys(SCORE_CATEGORY_LABELS) as ScoreCategory[]).map(
              (key) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-sm text-zinc-400 w-28">
                    {SCORE_CATEGORY_LABELS[key]}
                  </span>
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    value={[weights[key] ?? 10]}
                    onValueChange={(v) => updateWeight(key, v[0]!)}
                    className="flex-1"
                  />
                  <span className="text-sm text-zinc-300 w-10 text-right">
                    {weights[key]}%
                  </span>
                </div>
              )
            )}
          </div>
          <div
            className={cn(
              "text-sm mt-2",
              sumIs100 ? "text-green-500" : "text-red-500"
            )}
          >
            Summe: {weightSum}% {!sumIs100 && "(muss 100% sein)"}
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Ueber</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>Version</span>
            <span className="text-zinc-300">
              {process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0"}
            </span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Leads</span>
            <span className="text-zinc-300">{stats.leadCount}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Analysiert</span>
            <span className="text-zinc-300">{stats.analyzedCount}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Briefings</span>
            <span className="text-zinc-300">{stats.briefingCount}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Skripte</span>
            <span className="text-zinc-300">{stats.scriptCount}</span>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={isPending} className="w-full">
        <Save className="h-4 w-4 mr-2" />
        {isPending ? "Wird gespeichert..." : "Einstellungen speichern"}
      </Button>
    </div>
  );
}
