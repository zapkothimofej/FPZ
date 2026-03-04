# US-007: Dashboard Letzte Leads Liste

## Datei: src/lib/db/queries.ts (hinzufügen)

```typescript
export async function getRecentLeads(limit = 10) {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { analysis: { select: { overallScore: true } } },
  });
}
```

## Datei: src/components/dashboard/RecentLeads.tsx

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRecentLeads } from "@/lib/db/queries";
import { getScoreBgClass, getScoreColorClass, cn } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/constants";
import { Users } from "lucide-react";
import Link from "next/link";
import type { LeadStatus } from "@/types";

export async function RecentLeads() {
  const leads = await getRecentLeads();

  if (leads.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-100">
            Neueste Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
            <Users className="h-8 w-8 mb-2" />
            <p className="text-sm">Keine Leads vorhanden.</p>
            <p className="text-xs mt-1">
              Starte einen Scan um Leads zu finden.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Neueste Leads
        </CardTitle>
        <Link
          href="/leads"
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Alle anzeigen →
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {leads.map((lead) => {
            const score = lead.analysis?.overallScore ?? lead.overallScore;
            const statusConfig =
              STATUS_CONFIG[lead.status as LeadStatus] ?? STATUS_CONFIG.NEW;

            return (
              <Link
                key={lead.id}
                href={`/leads/${lead.id}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/50 transition-colors group"
              >
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full shrink-0",
                    getScoreBgClass(score)
                  )}
                />
                <span className="font-medium text-zinc-100 text-sm truncate flex-1">
                  {lead.name}
                </span>
                <span className="text-xs text-zinc-500 hidden sm:inline">
                  {lead.city}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-zinc-800 text-zinc-300 text-xs hidden md:inline-flex"
                >
                  {lead.category}
                </Badge>
                {!lead.website ? (
                  <Badge className="bg-red-500/20 text-red-400 text-xs">
                    Keine Website
                  </Badge>
                ) : (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      getScoreColorClass(score)
                    )}
                  >
                    {score ?? "—"}
                  </span>
                )}
                <Badge
                  className={cn(
                    "text-xs",
                    statusConfig.bgColor,
                    statusConfig.textColor
                  )}
                >
                  {statusConfig.label}
                </Badge>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
```
