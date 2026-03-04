# US-043: Dashboard API Route

## Datei: src/app/api/dashboard/route.ts

```typescript
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
```

## Datei: src/app/api/leads/route.ts (CORS Headers ergaenzen)

Existierende GET-Route um CORS Headers erweitern fuer Android App Zugriff:

```typescript
// Am Ende der GET-Funktion, beim NextResponse.json:
return NextResponse.json(result, {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});
```

## Datei: src/app/api/leads/[id]/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      analysis: true,
      briefing: true,
      script: true,
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(lead, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json()) as Record<string, unknown>;

  const updateData: Record<string, unknown> = {};
  if (typeof body.status === "string") updateData.status = body.status;
  if (typeof body.notes === "string") updateData.notes = body.notes;

  const lead = await prisma.lead.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(lead, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```
