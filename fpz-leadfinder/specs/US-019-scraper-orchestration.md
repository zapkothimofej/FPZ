# US-019: Scraper Orchestrierung

## Datei: src/lib/scrapers/index.ts

```typescript
import prisma from "@/lib/db/client";
import { scrapeOSM } from "./osm";
import { scrapeGoogleMaps } from "./google-maps";
import { RUHRGEBIET_CITIES, BUSINESS_CATEGORIES } from "@/lib/constants";
import type { ScrapedLead } from "@/types";

export async function runScan(
  cityNames: string[]
): Promise<{ scanLogId: string }> {
  const cities = RUHRGEBIET_CITIES.filter((c) => cityNames.includes(c.name));
  if (cities.length === 0) throw new Error("Keine gueltigen Staedte ausgewaehlt");

  const scanLog = await prisma.scanLog.create({
    data: { cities: JSON.stringify(cityNames), status: "running" },
  });
  const startTime = Date.now();

  try {
    // Phase 1: OSM Scraping
    const osmResult = await scrapeOSM(cities);
    let allLeads: ScrapedLead[] = osmResult.leads;
    const allErrors: string[] = [...osmResult.errors];

    // Phase 2: Google Maps fuer Staedte mit wenig OSM-Ergebnissen
    const osmCityCounts = new Map<string, number>();
    for (const lead of osmResult.leads) {
      osmCityCounts.set(lead.city, (osmCityCounts.get(lead.city) ?? 0) + 1);
    }
    const lowCities = cities.filter(
      (c) => (osmCityCounts.get(c.name) ?? 0) < 10
    );
    if (lowCities.length > 0 && lowCities[0]) {
      const gmResult = await scrapeGoogleMaps(
        lowCities[0].name,
        BUSINESS_CATEGORIES.slice(0, 10)
      );
      allLeads = [...allLeads, ...gmResult.leads];
      allErrors.push(...gmResult.errors);
    }

    // Phase 3: In DB speichern (upsert)
    let newCount = 0;
    let updateCount = 0;
    for (const lead of allLeads) {
      try {
        const result = await prisma.lead.upsert({
          where: {
            name_address_city: {
              name: lead.name,
              address: lead.address,
              city: lead.city,
            },
          },
          create: {
            name: lead.name,
            address: lead.address,
            city: lead.city,
            zip: lead.zip,
            phone: lead.phone,
            email: lead.email,
            website: lead.website,
            category: lead.category,
            subcategory: lead.subcategory,
            googleMapsUrl: lead.googleMapsUrl,
            openingHours: lead.openingHours,
            latitude: lead.latitude,
            longitude: lead.longitude,
            source: lead.source,
          },
          update: {
            phone: lead.phone ?? undefined,
            website: lead.website ?? undefined,
            email: lead.email ?? undefined,
          },
        });
        if (
          Math.abs(
            result.createdAt.getTime() - result.updatedAt.getTime()
          ) < 1000
        ) {
          newCount++;
        } else {
          updateCount++;
        }
      } catch (err) {
        allErrors.push(
          `Upsert failed for ${lead.name}: ${err instanceof Error ? err.message : "Unknown"}`
        );
      }
    }

    await prisma.scanLog.update({
      where: { id: scanLog.id },
      data: {
        status: "completed",
        newLeads: newCount,
        updatedLeads: updateCount,
        errors: allErrors.length,
        duration: Math.round((Date.now() - startTime) / 1000),
        completedAt: new Date(),
      },
    });

    return { scanLogId: scanLog.id };
  } catch (error) {
    await prisma.scanLog.update({
      where: { id: scanLog.id },
      data: {
        status: "failed",
        errors: 1,
        duration: Math.round((Date.now() - startTime) / 1000),
        completedAt: new Date(),
      },
    });
    throw error;
  }
}
```

## Datei: src/app/api/scan/route.ts

```typescript
import { NextResponse } from "next/server";
import { runScan } from "@/lib/scrapers";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cities?: unknown };
    const cities = body.cities;

    if (!Array.isArray(cities) || cities.length === 0) {
      return NextResponse.json(
        { error: "cities muss ein nicht-leeres Array sein" },
        { status: 400 }
      );
    }

    // Fire-and-forget
    runScan(cities as string[]).catch((err) =>
      console.error("Scan failed:", err)
    );

    return NextResponse.json({
      status: "started",
      message: "Scan gestartet",
    });
  } catch {
    return NextResponse.json(
      { error: "Interner Fehler" },
      { status: 500 }
    );
  }
}
```

## Datei: src/app/api/scan/status/route.ts

```typescript
import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";

export async function GET() {
  const scanLog = await prisma.scanLog.findFirst({
    orderBy: { startedAt: "desc" },
  });

  if (!scanLog) {
    return NextResponse.json({
      status: "idle",
      message: "Kein Scan durchgefuehrt",
    });
  }

  return NextResponse.json(scanLog);
}
```
