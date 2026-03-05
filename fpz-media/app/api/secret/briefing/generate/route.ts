import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { generateBriefing } from "@/lib/ai/briefing";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("leadId" in body) ||
      typeof (body as Record<string, unknown>).leadId !== "string"
    ) {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 }
      );
    }

    const { leadId } = body as { leadId: string };

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { analysis: true },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    if (!lead.analysis) {
      return NextResponse.json(
        { error: "Lead has no website analysis. Run analysis first." },
        { status: 400 }
      );
    }

    const result = await generateBriefing(lead, lead.analysis);

    const briefing = await prisma.briefing.upsert({
      where: { leadId },
      create: {
        leadId,
        summary: result.summary,
        weaknesses: JSON.stringify(result.weaknesses),
        suggestions: JSON.stringify(result.suggestions),
        effort: result.effort,
        opener: result.opener,
        riskScore: result.riskScore,
        fullText: JSON.stringify(result),
      },
      update: {
        summary: result.summary,
        weaknesses: JSON.stringify(result.weaknesses),
        suggestions: JSON.stringify(result.suggestions),
        effort: result.effort,
        opener: result.opener,
        riskScore: result.riskScore,
        fullText: JSON.stringify(result),
        generatedAt: new Date(),
      },
    });

    return NextResponse.json({ briefing });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate briefing: ${message}` },
      { status: 500 }
    );
  }
}
