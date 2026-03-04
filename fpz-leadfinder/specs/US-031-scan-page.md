# US-031: Scan-Seite mit Stadt-Auswahl und Fortschritt

## Datei: src/app/scan/page.tsx

```tsx
import type { Metadata } from "next";
import prisma from "@/lib/db/client";
import { ScanForm } from "@/components/scan/ScanForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatDuration } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Scan — LeadFinder",
};

export default async function ScanPage() {
  const scanLogs = await prisma.scanLog.findMany({
    orderBy: { startedAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-50">Lead-Scanner</h1>
      <ScanForm />

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-zinc-100">
            Scan-History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scanLogs.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-6">
              Noch keine Scans durchgefuehrt.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="text-left py-2 px-3">Datum</th>
                    <th className="text-left py-2 px-3">Staedte</th>
                    <th className="text-right py-2 px-3">Neue Leads</th>
                    <th className="text-right py-2 px-3">Dauer</th>
                    <th className="text-right py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scanLogs.map((log) => {
                    let cities: string[] = [];
                    try {
                      cities = JSON.parse(log.cities) as string[];
                    } catch { /* ignore */ }
                    return (
                      <tr
                        key={log.id}
                        className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
                      >
                        <td className="py-2 px-3 text-zinc-300">
                          {formatDateTime(log.startedAt)}
                        </td>
                        <td className="py-2 px-3 text-zinc-400">
                          {cities.slice(0, 3).join(", ")}
                          {cities.length > 3 && ` +${cities.length - 3}`}
                        </td>
                        <td className="py-2 px-3 text-right text-zinc-300">
                          {log.newLeads}
                        </td>
                        <td className="py-2 px-3 text-right text-zinc-400">
                          {formatDuration(log.duration)}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <Badge
                            className={
                              log.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : log.status === "running"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-red-500/20 text-red-400"
                            }
                          >
                            {log.status === "completed"
                              ? "Fertig"
                              : log.status === "running"
                                ? "Laeuft"
                                : "Fehler"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

## Datei: src/components/scan/ScanForm.tsx

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RUHRGEBIET_CITIES } from "@/lib/constants";
import { Search, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ScanStatus {
  status: string;
  newLeads?: number;
  updatedLeads?: number;
  errors?: number;
  duration?: number;
}

export function ScanForm() {
  const router = useRouter();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanStatus | null>(null);
  const [progress, setProgress] = useState(0);

  function toggleCity(name: string) {
    setSelectedCities((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  }

  const pollStatus = useCallback(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/scan/status");
        const data = (await res.json()) as ScanStatus;

        if (data.status === "completed") {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(data);
          setProgress(100);
          toast.success("Scan abgeschlossen");
          router.refresh();
        } else if (data.status === "failed") {
          clearInterval(interval);
          setIsScanning(false);
          toast.error("Scan fehlgeschlagen");
        } else {
          setProgress((prev) => Math.min(prev + 5, 90));
        }
      } catch {
        /* ignore polling errors */
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [router]);

  async function startScan() {
    setIsScanning(true);
    setScanResult(null);
    setProgress(0);
    toast.info("Scan gestartet");

    try {
      await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cities: selectedCities }),
      });
      pollStatus();
    } catch {
      setIsScanning(false);
      toast.error("Scan konnte nicht gestartet werden");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-zinc-300">
              Staedte auswaehlen
            </h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedCities(RUHRGEBIET_CITIES.map((c) => c.name))
                }
              >
                Alle
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCities([])}
              >
                Keine
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {RUHRGEBIET_CITIES.map((city) => (
              <label
                key={city.name}
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selectedCities.includes(city.name)}
                  onCheckedChange={() => toggleCity(city.name)}
                />
                <span className="text-sm text-zinc-300">{city.name}</span>
              </label>
            ))}
          </div>

          <Button
            onClick={startScan}
            disabled={selectedCities.length === 0 || isScanning}
            className="w-full mt-4"
          >
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Scan laeuft...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Scan starten ({selectedCities.length} Staedte)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {isScanning && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  Scan laeuft...
                </p>
                <p className="text-xs text-zinc-400">
                  Bitte warten, Leads werden gesucht.
                </p>
              </div>
            </div>
            <Progress value={progress} className="mt-3" />
          </CardContent>
        </Card>
      )}

      {scanResult && scanResult.status === "completed" && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-zinc-100">
                  Scan abgeschlossen
                </p>
                <p className="text-sm text-zinc-400">
                  {scanResult.newLeads} neue Leads, {scanResult.updatedLeads}{" "}
                  aktualisiert, {scanResult.errors} Fehler, Dauer:{" "}
                  {scanResult.duration}s
                </p>
              </div>
            </div>
            <Button
              onClick={() =>
                router.push("/leads?sort=createdAt&order=desc")
              }
              className="mt-3"
            >
              Neue Leads anzeigen →
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```
