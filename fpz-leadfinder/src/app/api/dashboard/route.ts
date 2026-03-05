import { NextResponse } from "next/server";
import { getDashboardStats, getRecentLeads } from "@/lib/db/queries";

export async function GET() {
  const [stats, recentLeadsRaw] = await Promise.all([
    getDashboardStats(),
    getRecentLeads(10),
  ]);

  const recentLeads = recentLeadsRaw.map((lead) => ({
    id: lead.id,
    name: lead.name,
    city: lead.city,
    overallScore: lead.analysis?.overallScore ?? null,
  }));

  return NextResponse.json({ stats, recentLeads });
}
