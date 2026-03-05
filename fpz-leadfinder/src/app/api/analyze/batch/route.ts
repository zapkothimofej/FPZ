import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/analyzers";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { leadIds?: string[] };
    if (!Array.isArray(body.leadIds) || body.leadIds.length === 0) {
      return NextResponse.json(
        { error: "leadIds muss ein nicht-leeres Array sein" },
        { status: 400 }
      );
    }

    let completed = 0;
    let failed = 0;

    for (const id of body.leadIds) {
      try {
        await analyzeWebsite(id);
        completed++;
      } catch {
        failed++;
      }
    }

    return NextResponse.json({ completed, failed });
  } catch {
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
