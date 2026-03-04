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
