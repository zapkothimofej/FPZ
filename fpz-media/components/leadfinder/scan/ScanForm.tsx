"use client";

import { useState, useCallback } from "react";
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
        const res = await fetch("/api/secret/scan/status");
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
      await fetch("/api/secret/scan", {
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
                router.push("/secret/leads?sort=createdAt&order=desc")
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
