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
