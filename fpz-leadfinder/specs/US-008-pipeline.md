# US-008: Dashboard Pipeline Funnel

## Datei: src/lib/db/queries.ts (hinzufügen)

```typescript
export async function getPipelineStats() {
  const results = await prisma.lead.groupBy({
    by: ["status"],
    _count: { status: true },
  });
  const map = Object.fromEntries(
    results.map((r) => [r.status, r._count.status])
  ) as Record<string, number>;
  return {
    new: map["NEW"] ?? 0,
    contacted: map["CONTACTED"] ?? 0,
    offerSent: map["OFFER_SENT"] ?? 0,
    won: map["WON"] ?? 0,
    rejected: map["REJECTED"] ?? 0,
  };
}
```

## Datei: src/components/dashboard/Pipeline.tsx

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPipelineStats } from "@/lib/db/queries";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export async function Pipeline() {
  const pipeline = await getPipelineStats();

  const steps = [
    {
      label: "Neu",
      count: pipeline.new,
      colorClass: "text-zinc-300",
      statusKey: "NEW",
      conversion: null as number | null,
    },
    {
      label: "Kontaktiert",
      count: pipeline.contacted,
      colorClass: "text-blue-400",
      statusKey: "CONTACTED",
      conversion:
        pipeline.new > 0
          ? Math.round((pipeline.contacted / pipeline.new) * 100)
          : 0,
    },
    {
      label: "Angebot",
      count: pipeline.offerSent,
      colorClass: "text-yellow-400",
      statusKey: "OFFER_SENT",
      conversion:
        pipeline.contacted > 0
          ? Math.round((pipeline.offerSent / pipeline.contacted) * 100)
          : 0,
    },
    {
      label: "Gewonnen",
      count: pipeline.won,
      colorClass: "text-green-400",
      statusKey: "WON",
      conversion:
        pipeline.offerSent > 0
          ? Math.round((pipeline.won / pipeline.offerSent) * 100)
          : 0,
    },
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Sales Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2">
          {steps.map((step, i) => (
            <div key={step.statusKey} className="contents">
              <Link
                href={`/leads?status=${step.statusKey}`}
                className="flex-1 flex flex-col items-center gap-1 p-4 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-pointer"
              >
                <div className={cn("text-2xl font-bold", step.colorClass)}>
                  {step.count}
                </div>
                <div className="text-xs text-zinc-400">{step.label}</div>
                {step.conversion != null && (
                  <div className="text-[10px] text-zinc-600">
                    {step.conversion}%
                  </div>
                )}
              </Link>
              {i < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-zinc-700 shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```
