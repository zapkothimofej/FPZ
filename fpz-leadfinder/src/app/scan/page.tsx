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
