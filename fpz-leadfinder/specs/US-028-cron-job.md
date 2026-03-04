# US-028: Taeglicher Cron Job

## Datei: src/app/api/cron/route.ts

```typescript
import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { runScan } from "@/lib/scrapers";
import { analyzeWebsite } from "@/lib/analyzers";
import { generateBriefing } from "@/lib/ai/briefing";
import { RUHRGEBIET_CITIES } from "@/lib/constants";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    scan: { success: false, newLeads: 0 },
    analysis: { completed: 0, failed: 0 },
    briefings: { completed: 0, failed: 0 },
  };

  try {
    // 1) Default-Staedte laden
    const settings = await prisma.settings.findUnique({
      where: { id: "default" },
    });
    let cityNames: string[];
    if (settings?.defaultCities) {
      try {
        cityNames = JSON.parse(settings.defaultCities) as string[];
      } catch {
        cityNames = RUHRGEBIET_CITIES.slice(0, 5).map((c) => c.name);
      }
    } else {
      cityNames = RUHRGEBIET_CITIES.slice(0, 5).map((c) => c.name);
    }

    // 2) Scan
    try {
      await runScan(cityNames);
      results.scan.success = true;
    } catch (err) {
      console.error("Cron scan failed:", err);
    }

    // 3) Neue Leads mit Website aber ohne Analysis analysieren
    const unanalyzed = await prisma.lead.findMany({
      where: { website: { not: null }, analysis: null },
      take: 20,
    });

    for (const lead of unanalyzed) {
      try {
        await analyzeWebsite(lead.id);
        results.analysis.completed++;
      } catch {
        results.analysis.failed++;
      }
    }

    // 4) Briefings fuer niedrige Scores generieren
    const lowScoreLeads = await prisma.lead.findMany({
      where: {
        overallScore: { lt: 70 },
        briefing: null,
        analysis: { isNot: null },
      },
      take: 10,
      include: { analysis: true },
    });

    for (const lead of lowScoreLeads) {
      if (!lead.analysis) continue;
      try {
        const briefingData = await generateBriefing(lead, lead.analysis);
        await prisma.briefing.upsert({
          where: { leadId: lead.id },
          create: {
            leadId: lead.id,
            summary: briefingData.summary,
            weaknesses: JSON.stringify(briefingData.weaknesses),
            suggestions: JSON.stringify(briefingData.suggestions),
            effort: briefingData.effort,
            opener: briefingData.opener,
            riskScore: briefingData.riskScore,
            fullText: briefingData.fullText,
          },
          update: {
            summary: briefingData.summary,
            weaknesses: JSON.stringify(briefingData.weaknesses),
            suggestions: JSON.stringify(briefingData.suggestions),
            effort: briefingData.effort,
            opener: briefingData.opener,
            riskScore: briefingData.riskScore,
            fullText: briefingData.fullText,
          },
        });
        results.briefings.completed++;
      } catch {
        results.briefings.failed++;
      }
    }
  } catch (err) {
    console.error("Cron job error:", err);
  }

  return NextResponse.json(results);
}
```

## Datei: vercel.json

```json
{
  "framework": "nextjs",
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 3 * * *"
    }
  ]
}
```
