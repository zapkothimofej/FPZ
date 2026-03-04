# US-006: Dashboard Stadt-Chart

## Datei: src/lib/db/queries.ts (hinzufügen)

```typescript
export async function getCityDistribution() {
  const results = await prisma.lead.groupBy({
    by: ["city"],
    _count: { city: true },
    orderBy: { _count: { city: "desc" } },
    take: 10,
  });
  return results.map((r) => ({ city: r.city, count: r._count.city }));
}
```

## Datei: src/components/dashboard/CityChart.tsx

```tsx
"use client";

import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CityChartProps {
  data: Array<{ city: string; count: number }>;
}

export function CityChart({ data }: CityChartProps) {
  const router = useRouter();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <XAxis type="number" stroke="#71717a" fontSize={12} />
        <YAxis
          type="category"
          dataKey="city"
          stroke="#71717a"
          fontSize={12}
          width={75}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#27272a",
            border: "1px solid #3f3f46",
            borderRadius: "8px",
            color: "#fafafa",
          }}
          formatter={(value: number) => [`${value} Leads`, "Anzahl"]}
        />
        <Bar
          dataKey="count"
          radius={[0, 4, 4, 0]}
          fill="#3b82f6"
          cursor="pointer"
          onClick={(data) => {
            if (data && typeof data.city === "string") {
              router.push(`/leads?city=${data.city}`);
            }
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

## Datei: src/components/dashboard/CityChartWrapper.tsx

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCityDistribution } from "@/lib/db/queries";
import { CityChart } from "./CityChart";
import { Search } from "lucide-react";
import Link from "next/link";

export async function CityChartWrapper() {
  const data = await getCityDistribution();

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Leads nach Stadt
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <CityChart data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
            <Search className="h-8 w-8 mb-2" />
            <p>Noch keine Leads vorhanden.</p>
            <Link
              href="/scan"
              className="text-blue-400 hover:text-blue-300 mt-1 text-sm"
            >
              Starte einen Scan →
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```
