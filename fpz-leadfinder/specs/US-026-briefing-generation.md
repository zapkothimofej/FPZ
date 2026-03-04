# US-026: KI Briefing-Generierung

## Exakte Datei: src/lib/ai/briefing.ts

```typescript
import type { Lead, WebsiteAnalysis } from "@/types";
import { generateText } from "@/lib/ai";

interface BriefingResult {
  summary: string;
  weaknesses: Array<{
    title: string;
    severity: "critical" | "high" | "medium" | "low";
    description: string;
  }>;
  suggestions: Array<{
    title: string;
    description: string;
    service: "web" | "media" | "automation";
  }>;
  effort: "SMALL" | "MEDIUM" | "LARGE";
  opener: string;
  riskScore: number;
}

const SYSTEM_PROMPT = `Du bist ein erfahrener Vertriebsberater bei FPC-Media, einer Digitalagentur im Ruhrgebiet.
Du analysierst lokale Unternehmen und erstellst Briefings fuer das Sales-Team.

FPC-Media bietet drei Hauptdienstleistungen:
1. Webdesign & Webentwicklung (web) - Moderne Websites, Landing Pages, E-Commerce
2. Social Media & Content (media) - Social Media Management, Foto/Video, Branding
3. Automatisierung & Tools (automation) - CRM, Buchungssysteme, Chatbots, Workflows

Antworte AUSSCHLIESSLICH mit validem JSON im folgenden Format:
{
  "summary": "2-3 Saetze Zusammenfassung des Unternehmens und seiner Online-Praesenz",
  "weaknesses": [
    { "title": "Schwachstelle", "severity": "critical|high|medium|low", "description": "Beschreibung" }
  ],
  "suggestions": [
    { "title": "Vorschlag", "description": "Was FPC-Media konkret anbieten kann", "service": "web|media|automation" }
  ],
  "effort": "SMALL|MEDIUM|LARGE",
  "opener": "Ein konkreter Gespraechseroeffner fuer den Anruf (1-2 Saetze)",
  "riskScore": 5
}

Regeln:
- weaknesses: mindestens 2, maximal 5 Eintraege
- suggestions: mindestens 2, maximal 4 Eintraege, passend zu den Schwachstellen
- effort: SMALL (< 2000 EUR), MEDIUM (2000-5000 EUR), LARGE (> 5000 EUR)
- riskScore: 1 = sehr hohes Verkaufspotential, 10 = sehr geringes Potential
- opener: Persoenlich, auf das Unternehmen bezogen, nicht generisch
- Alle Texte auf Deutsch`;

function buildUserPrompt(lead: Lead, analysis: WebsiteAnalysis): string {
  return `Analysiere folgendes Unternehmen und erstelle ein Vertriebsbriefing:

Unternehmen: ${lead.name}
Branche: ${lead.category}${lead.subcategory ? ` / ${lead.subcategory}` : ""}
Stadt: ${lead.city}
Adresse: ${lead.address}
Website: ${lead.website ?? "Keine Website vorhanden"}
Telefon: ${lead.phone ?? "Nicht bekannt"}
E-Mail: ${lead.email ?? "Nicht bekannt"}

Website-Analyse Scores (0-100):
- Performance: ${analysis.performanceScore}
- SEO: ${analysis.seoScore}
- Mobile: ${analysis.mobileScore}
- Sicherheit: ${analysis.securityScore}
- Design: ${analysis.designScore}
- Technik: ${analysis.techScore}
- Barrierefreiheit: ${analysis.accessibilityScore}
- Content: ${analysis.contentScore}
- Gesamt: ${analysis.overallScore}

${analysis.techStack ? `Tech-Stack: ${analysis.techStack}` : ""}
${analysis.details ? `Details: ${analysis.details}` : ""}`;
}

function parseJsonFromResponse(text: string): BriefingResult {
  // Direktes JSON-Parsing
  try {
    return JSON.parse(text) as BriefingResult;
  } catch {
    // Regex-Fallback: JSON-Block aus der Antwort extrahieren
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in AI response");
  }

  try {
    return JSON.parse(jsonMatch[0]) as BriefingResult;
  } catch {
    throw new Error("Failed to parse JSON from AI response");
  }
}

function validateBriefingResult(result: BriefingResult): BriefingResult {
  if (!result.summary || typeof result.summary !== "string") {
    throw new Error("Invalid briefing: missing summary");
  }
  if (!Array.isArray(result.weaknesses) || result.weaknesses.length < 1) {
    throw new Error("Invalid briefing: missing weaknesses");
  }
  if (!Array.isArray(result.suggestions) || result.suggestions.length < 1) {
    throw new Error("Invalid briefing: missing suggestions");
  }
  if (!["SMALL", "MEDIUM", "LARGE"].includes(result.effort)) {
    result.effort = "MEDIUM";
  }
  if (typeof result.riskScore !== "number" || result.riskScore < 1 || result.riskScore > 10) {
    result.riskScore = 5;
  }
  if (!result.opener || typeof result.opener !== "string") {
    result.opener = `Guten Tag, ich habe mir Ihre Website angesehen und haette einige Vorschlaege.`;
  }

  return result;
}

export async function generateBriefing(
  lead: Lead,
  analysis: WebsiteAnalysis
): Promise<BriefingResult> {
  const userPrompt = buildUserPrompt(lead, analysis);
  const response = await generateText(SYSTEM_PROMPT, userPrompt);
  const parsed = parseJsonFromResponse(response);
  return validateBriefingResult(parsed);
}
```

## Exakte Datei: src/app/api/briefing/generate/route.ts

```typescript
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
```

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
```
