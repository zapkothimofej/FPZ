import { NextResponse } from "next/server";

// Stub — vollständige Implementierung in US-021
export async function POST() {
  return NextResponse.json(
    { error: "Briefing-Generierung noch nicht implementiert (US-021)" },
    { status: 501 }
  );
}
