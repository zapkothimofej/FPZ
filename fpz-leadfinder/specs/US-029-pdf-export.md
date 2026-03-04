# US-029: PDF Export

## Datei: src/lib/export/pdf.ts

```typescript
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate, parseJsonSafe, slugify } from "@/lib/utils";
import { STATUS_CONFIG, SCORE_CATEGORY_LABELS, SCORE_FIELD_MAP } from "@/lib/constants";
import type { Lead, WebsiteAnalysis, Briefing, SalesScript, ScoreCategory } from "@/types";

type LeadWithRelations = Lead & {
  analysis: WebsiteAnalysis | null;
  briefing: Briefing | null;
  salesScript: SalesScript | null;
};

export async function generateLeadPDF(
  lead: LeadWithRelations
): Promise<Buffer> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  function addFooter(pageNum: number) {
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("FPC-Media | fpc-media.com", 20, 285);
    doc.text(`Seite ${pageNum}`, pageWidth - 30, 285);
  }

  // Seite 1: Deckblatt
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246); // blue-500
  doc.text("FPC-Media", 20, 30);
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Sales-Briefing", 20, 38);
  doc.setFontSize(20);
  doc.setTextColor(50);
  doc.text(lead.name, 20, 60);
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`${lead.city} | ${lead.category}`, 20, 70);
  doc.text(`Erstellt: ${formatDate(new Date())}`, 20, 80);

  if (lead.overallScore != null) {
    doc.setFontSize(48);
    const scoreColor =
      lead.overallScore <= 40
        ? [239, 68, 68]
        : lead.overallScore <= 70
          ? [234, 179, 8]
          : [34, 197, 94];
    doc.setTextColor(scoreColor[0]!, scoreColor[1]!, scoreColor[2]!);
    doc.text(String(lead.overallScore), 20, 110);
    doc.setFontSize(12);
    doc.text("/ 100 Gesamt-Score", 60, 110);
  }
  addFooter(1);

  // Seite 2: Kontakt + Scores
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(50);
  doc.text("Kontaktdaten", 20, 20);

  const contactData = [
    ["Adresse", `${lead.address}, ${lead.zip ?? ""} ${lead.city}`],
    ["Telefon", lead.phone ?? "Nicht verfuegbar"],
    ["Email", lead.email ?? "Nicht verfuegbar"],
    ["Website", lead.website ?? "Keine Website"],
    ["Status", STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG]?.label ?? lead.status],
  ];

  (doc as unknown as { autoTable: (opts: unknown) => void }).autoTable({
    startY: 25,
    head: [["Feld", "Wert"]],
    body: contactData,
    theme: "grid",
    headStyles: { fillColor: [39, 39, 42] },
    styles: { fontSize: 10 },
  });

  if (lead.analysis) {
    const scoreData = (Object.keys(SCORE_CATEGORY_LABELS) as ScoreCategory[]).map(
      (key) => {
        const field = SCORE_FIELD_MAP[key];
        const score = (lead.analysis as unknown as Record<string, number>)[field] ?? 0;
        const rating = score <= 40 ? "Schlecht" : score <= 70 ? "Mittel" : "Gut";
        return [SCORE_CATEGORY_LABELS[key], String(score), rating];
      }
    );

    (doc as unknown as { autoTable: (opts: unknown) => void }).autoTable({
      startY: (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15,
      head: [["Kategorie", "Score", "Bewertung"]],
      body: scoreData,
      theme: "grid",
      headStyles: { fillColor: [39, 39, 42] },
      styles: { fontSize: 10 },
    });
  }
  addFooter(2);

  // Seite 3: Briefing
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(50);
  doc.text("Sales-Briefing", 20, 20);

  if (lead.briefing) {
    let y = 30;
    doc.setFontSize(10);
    doc.setTextColor(80);

    doc.setFontSize(12);
    doc.text("Zusammenfassung", 20, y);
    y += 6;
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(lead.briefing.summary, pageWidth - 40) as string[];
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 8;

    const weaknesses = parseJsonSafe<Array<{ title: string; severity: string; description: string }>>(
      lead.briefing.weaknesses,
      []
    );
    if (weaknesses.length > 0) {
      doc.setFontSize(12);
      doc.text("Schwachstellen", 20, y);
      y += 6;
      doc.setFontSize(10);
      for (const w of weaknesses) {
        const line = `[${w.severity.toUpperCase()}] ${w.title}: ${w.description}`;
        const lines = doc.splitTextToSize(line, pageWidth - 40) as string[];
        doc.text(lines, 20, y);
        y += lines.length * 5 + 3;
        if (y > 270) { doc.addPage(); y = 20; }
      }
    }

    y += 5;
    doc.setFontSize(12);
    doc.text("Gespraechseinstieg", 20, y);
    y += 6;
    doc.setFontSize(10);
    const openerLines = doc.splitTextToSize(lead.briefing.opener, pageWidth - 40) as string[];
    doc.text(openerLines, 20, y);
  } else {
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Kein Briefing vorhanden.", 20, 30);
  }
  addFooter(3);

  // Seite 4: Skript
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(50);
  doc.text("Verkaufsskript", 20, 20);

  if (lead.salesScript) {
    let y = 30;
    doc.setFontSize(10);

    const sections = [
      { title: "Begruessung", text: lead.salesScript.greeting },
      { title: "Hook", text: lead.salesScript.hook },
      { title: "Loesung", text: lead.salesScript.solution },
      { title: "Naechster Schritt", text: lead.salesScript.callToAction },
    ];

    for (const section of sections) {
      doc.setFontSize(11);
      doc.setTextColor(59, 130, 246);
      doc.text(section.title, 20, y);
      y += 5;
      doc.setFontSize(10);
      doc.setTextColor(80);
      const lines = doc.splitTextToSize(section.text, pageWidth - 40) as string[];
      doc.text(lines, 20, y);
      y += lines.length * 5 + 8;
      if (y > 260) { doc.addPage(); y = 20; }
    }

    const objections = parseJsonSafe<Array<{ objection: string; response: string }>>(
      lead.salesScript.objections,
      []
    );
    if (objections.length > 0) {
      (doc as unknown as { autoTable: (opts: unknown) => void }).autoTable({
        startY: y,
        head: [["Einwand", "Antwort"]],
        body: objections.map((o) => [o.objection, o.response]),
        theme: "grid",
        headStyles: { fillColor: [39, 39, 42] },
        styles: { fontSize: 9 },
        columnStyles: { 0: { cellWidth: 60 } },
      });
    }
  } else {
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Kein Skript vorhanden.", 20, 30);
  }
  addFooter(4);

  return Buffer.from(doc.output("arraybuffer"));
}
```

## Datei: src/app/api/export/pdf/[leadId]/route.ts

```typescript
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

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Lead-${slugify(lead.name)}-Briefing.pdf"`,
    },
  });
}
```
