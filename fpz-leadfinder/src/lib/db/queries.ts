import prisma from "@/lib/db/client";

export async function getRecentLeads(limit = 10) {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { analysis: { select: { overallScore: true } } },
  });
}

export async function getCityDistribution() {
  const results = await prisma.lead.groupBy({
    by: ["city"],
    _count: { city: true },
    orderBy: { _count: { city: "desc" } },
    take: 10,
  });
  return results.map((r) => ({ city: r.city, count: r._count.city }));
}

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
