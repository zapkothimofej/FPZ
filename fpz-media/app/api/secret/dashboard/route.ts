import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";

export async function GET() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);

  const [
    total,
    totalPrevWeek,
    newToday,
    newYesterday,
    contacted,
    contactedPrevWeek,
    won,
    wonPrevWeek,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({
      where: { createdAt: { lt: weekStart } },
    }),
    prisma.lead.count({
      where: { createdAt: { gte: todayStart } },
    }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(todayStart.getTime() - 86400000),
          lt: todayStart,
        },
      },
    }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({
      where: {
        status: "CONTACTED",
        updatedAt: { lt: weekStart },
      },
    }),
    prisma.lead.count({ where: { status: "WON" } }),
    prisma.lead.count({
      where: {
        status: "WON",
        updatedAt: { lt: weekStart },
      },
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        city: true,
        overallScore: true,
      },
    }),
  ]);

  const stats = {
    total: {
      value: total,
      trend: total - totalPrevWeek,
    },
    newToday: {
      value: newToday,
      trend: newToday - newYesterday,
    },
    contacted: {
      value: contacted,
      trend: contacted - contactedPrevWeek,
    },
    won: {
      value: won,
      trend: won - wonPrevWeek,
    },
  };

  return NextResponse.json(
    { stats, recentLeads },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
