import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { generateLeadPDF } from "@/lib/export/pdf";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { analysis: true, briefing: true, salesScript: true },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead nicht gefunden" }, { status: 404 });
  }

  const pdfBuffer = await generateLeadPDF(lead);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Lead-${slugify(lead.name)}-Briefing.pdf"`,
    },
  });
}
