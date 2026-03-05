import { Suspense } from "react";
import type { Metadata } from "next";
import { StatCards } from "@/components/leadfinder/dashboard/StatCards";
import { StatCardsSkeleton } from "@/components/leadfinder/dashboard/StatCardsSkeleton";
import { CityChartWrapper } from "@/components/leadfinder/dashboard/CityChartWrapper";
import { RecentLeads } from "@/components/leadfinder/dashboard/RecentLeads";
import { Pipeline } from "@/components/leadfinder/dashboard/Pipeline";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Dashboard — LeadFinder",
  description: "FPC-Media Lead-Finder Dashboard",
};

export default function Home() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<StatCardsSkeleton />}>
        <StatCards />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense
          fallback={
            <Skeleton className="h-[420px] bg-zinc-900 rounded-xl" />
          }
        >
          <CityChartWrapper />
        </Suspense>
        <Suspense
          fallback={
            <Skeleton className="h-[420px] bg-zinc-900 rounded-xl" />
          }
        >
          <Pipeline />
        </Suspense>
      </div>
      <Suspense
        fallback={<Skeleton className="h-[400px] bg-zinc-900 rounded-xl" />}
      >
        <RecentLeads />
      </Suspense>
    </div>
  );
}
