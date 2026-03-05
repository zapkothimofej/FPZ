import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/analyzers";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { leadId?: string };
    if (!body.leadId) {
      return NextResponse.json({ error: "leadId erforderlich" }, { status: 400 });
    }
    const analysis = await analyzeWebsite(body.leadId);
    return NextResponse.json(analysis);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    if (message.includes("nicht gefunden")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    if (message.includes("keine Website")) {
      return NextResponse.json({ error: message }, { status: 422 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
