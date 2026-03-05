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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card, index) => {
        const stat = stats[card.key];
        const Icon = card.icon;

        return (
          <div key={card.key} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
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
          </div>
        );
      })}
    </div>
  );
}
