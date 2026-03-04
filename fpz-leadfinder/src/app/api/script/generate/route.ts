import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { generateSalesScript } from "@/lib/ai/script";

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
      include: {
        analysis: true,
        briefing: true,
      },
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

    if (!lead.briefing) {
      return NextResponse.json(
        { error: "Lead has no briefing. Generate briefing first." },
        { status: 400 }
      );
    }

    const result = await generateSalesScript(lead, lead.analysis, lead.briefing);

    const fullScript = [
      `Begruessung: ${result.greeting}`,
      `\nHook: ${result.hook}`,
      `\nSchmerzpunkte:\n${result.painPoints.map((p) => `- ${p}`).join("\n")}`,
      `\nLoesung: ${result.solution}`,
      `\nCall-to-Action: ${result.callToAction}`,
      `\nEinwandbehandlung:\n${result.objections.map((o) => `Einwand: "${o.objection}"\nAntwort: "${o.response}"`).join("\n\n")}`,
    ].join("\n");

    const script = await prisma.salesScript.upsert({
      where: { leadId },
      create: {
        leadId,
        greeting: result.greeting,
        hook: result.hook,
        painPoints: JSON.stringify(result.painPoints),
        solution: result.solution,
        callToAction: result.callToAction,
        objections: JSON.stringify(result.objections),
        fullScript,
      },
      update: {
        greeting: result.greeting,
        hook: result.hook,
        painPoints: JSON.stringify(result.painPoints),
        solution: result.solution,
        callToAction: result.callToAction,
        objections: JSON.stringify(result.objections),
        fullScript,
        generatedAt: new Date(),
      },
    });

    return NextResponse.json({ script });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate script: ${message}` },
      { status: 500 }
    );
  }
}
