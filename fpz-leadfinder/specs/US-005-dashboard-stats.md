# US-005: Dashboard Statistik-Cards

## Exakte Datei: src/lib/db/queries.ts (NEU)

```typescript
import prisma from "@/lib/db/client";

export async function getDashboardStats() {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);

  const [
    total,
    newToday,
    contacted,
    won,
    totalWeekAgo,
    newYesterday,
    contactedWeekAgo,
    wonWeekAgo,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({ where: { status: "WON" } }),
    prisma.lead.count({ where: { createdAt: { lt: weekAgo } } }),
    prisma.lead.count({
      where: { createdAt: { gte: yesterdayStart, lt: todayStart } },
    }),
    prisma.lead.count({
      where: { status: "CONTACTED", updatedAt: { lt: weekAgo } },
    }),
    prisma.lead.count({
      where: { status: "WON", updatedAt: { lt: weekAgo } },
    }),
  ]);

  return {
    total: { value: total, trend: total - totalWeekAgo },
    newToday: { value: newToday, trend: newToday - newYesterday },
    contacted: { value: contacted, trend: contacted - contactedWeekAgo },
    won: { value: won, trend: won - wonWeekAgo },
  };
}
```

## Exakte Datei: src/components/dashboard/StatCards.tsx (NEU)

```tsx
import { Users, UserPlus, PhoneCall, Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/db/queries";
import type { LucideIcon } from "lucide-react";

interface StatCardConfig {
  title: string;
  icon: LucideIcon;
  colorClass: string;
  key: "total" | "newToday" | "contacted" | "won";
}

const CARDS: StatCardConfig[] = [
  { title: "Gesamt Leads", icon: Users, colorClass: "text-zinc-50", key: "total" },
  { title: "Neue heute", icon: UserPlus, colorClass: "text-blue-400", key: "newToday" },
  { title: "Kontaktiert", icon: PhoneCall, colorClass: "text-yellow-400", key: "contacted" },
  { title: "Gewonnen", icon: Trophy, colorClass: "text-green-400", key: "won" },
];

function TrendIndicator({ trend }: { trend: number }) {
  if (trend > 0) {
    return (
      <div className="flex items-center gap-1 mt-1 text-sm">
        <ArrowUp className="h-3 w-3 text-green-500" />
        <span className="text-green-500">+{trend} diese Woche</span>
      </div>
    );
  }
  if (trend < 0) {
    return (
      <div className="flex items-center gap-1 mt-1 text-sm">
        <ArrowDown className="h-3 w-3 text-red-500" />
        <span className="text-red-500">{trend} diese Woche</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 mt-1 text-sm">
      <Minus className="h-3 w-3 text-zinc-500" />
      <span className="text-zinc-500">0 diese Woche</span>
    </div>
  );
}

export async function StatCards() {
  const stats = await getDashboardStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card) => {
        const stat = stats[card.key];
        const Icon = card.icon;

        return (
          <Card key={card.key} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Icon className="h-4 w-4" />
                <span>{card.title}</span>
              </div>
              <p className={`text-3xl font-bold mt-2 ${card.colorClass}`}>
                {stat.value}
              </p>
              <TrendIndicator trend={stat.trend} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
```

## Exakte Datei: src/components/dashboard/StatCardsSkeleton.tsx (NEU)

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[120px] bg-zinc-800 rounded-xl"
        />
      ))}
    </div>
  );
}
```

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
```
