# US-027: KI Verkaufsskript-Generierung

## Exakte Datei: src/lib/ai/script.ts

```typescript
import type { Lead, WebsiteAnalysis, Briefing } from "@/types";
import type { WeaknessItem, SuggestionItem } from "@/types";
import { generateText } from "@/lib/ai";
import { parseJsonSafe } from "@/lib/utils";

interface ScriptResult {
  greeting: string;
  hook: string;
  painPoints: string[];
  solution: string;
  callToAction: string;
  objections: Array<{
    objection: string;
    response: string;
  }>;
}

const SYSTEM_PROMPT = `Du bist Stevan, ein erfahrener Vertriebsmitarbeiter bei FPC-Media im Ruhrgebiet.
Du erstellst Telefonskripte fuer Kaltakquise-Anrufe bei lokalen Unternehmen.
Du sprichst natuerlich, freundlich und auf Augenhoehe - nicht wie ein Callcenter.

FPC-Media bietet:
1. Webdesign & Webentwicklung - Moderne Websites, Landing Pages, E-Commerce
2. Social Media & Content - Social Media Management, Foto/Video, Branding
3. Automatisierung & Tools - CRM, Buchungssysteme, Chatbots, Workflows

Antworte AUSSCHLIESSLICH mit validem JSON im folgenden Format:
{
  "greeting": "Begruessung mit Name des Unternehmens",
  "hook": "Aufhaenger der Interesse weckt (1-2 Saetze)",
  "painPoints": ["Schmerzpunkt 1", "Schmerzpunkt 2", "Schmerzpunkt 3"],
  "solution": "Wie FPC-Media konkret helfen kann (2-3 Saetze)",
  "callToAction": "Konkreter naechster Schritt (1 Satz)",
  "objections": [
    { "objection": "Wir haben kein Budget", "response": "Antwort darauf" },
    { "objection": "Wir haben schon jemanden", "response": "Antwort darauf" },
    { "objection": "Kein Interesse", "response": "Antwort darauf" },
    { "objection": "Schicken Sie mir Unterlagen", "response": "Antwort darauf" }
  ]
}

Regeln:
- greeting: Persoenlich, mit Firmennamen, natuerlich
- hook: Bezug auf konkrete Schwachstellen der Website
- painPoints: Genau 3 Punkte, konkret und branchenspezifisch
- solution: Auf die Schwachstellen zugeschnitten, FPC-Media erwaehnen
- callToAction: Termin fuer kostenloses Erstgespraech vorschlagen
- objections: GENAU 4 Standard-Einwaende mit ueberzeugenden Antworten
  - Muss enthalten: "Budget", "haben schon jemanden", "Kein Interesse", "Unterlagen schicken"
- Alle Texte auf Deutsch, Duzen vermeiden, hoefliches Sie`;

function buildUserPrompt(
  lead: Lead,
  analysis: WebsiteAnalysis,
  briefing: Briefing
): string {
  const weaknesses = parseJsonSafe<WeaknessItem[]>(briefing.weaknesses, []);
  const suggestions = parseJsonSafe<SuggestionItem[]>(briefing.suggestions, []);

  return `Erstelle ein Telefonskript fuer folgenden Lead:

Unternehmen: ${lead.name}
Branche: ${lead.category}${lead.subcategory ? ` / ${lead.subcategory}` : ""}
Stadt: ${lead.city}
Ansprechpartner: Inhaber/Geschaeftsfuehrer
Website: ${lead.website ?? "Keine Website"}

Website-Scores (0-100):
- Gesamt: ${analysis.overallScore}
- Performance: ${analysis.performanceScore}
- SEO: ${analysis.seoScore}
- Mobile: ${analysis.mobileScore}
- Design: ${analysis.designScore}

Briefing-Zusammenfassung: ${briefing.summary}
Eroeffner: ${briefing.opener}
Aufwandsschaetzung: ${briefing.effort}

Schwachstellen:
${weaknesses.map((w) => `- ${w.title} (${w.severity}): ${w.description}`).join("\n")}

Vorschlaege:
${suggestions.map((s) => `- ${s.title} (${s.service}): ${s.description}`).join("\n")}`;
}

function parseJsonFromResponse(text: string): ScriptResult {
  try {
    return JSON.parse(text) as ScriptResult;
  } catch {
    // Regex-Fallback
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in AI response");
  }

  try {
    return JSON.parse(jsonMatch[0]) as ScriptResult;
  } catch {
    throw new Error("Failed to parse JSON from AI response");
  }
}

const STANDARD_OBJECTIONS = [
  {
    objection: "Wir haben kein Budget dafuer",
    response:
      "Das verstehe ich. Deshalb bieten wir flexible Pakete an, die sich auch fuer kleinere Unternehmen lohnen. Darf ich Ihnen einmal unverbindlich zeigen, was schon mit kleinem Budget moeglich ist?",
  },
  {
    objection: "Wir haben schon jemanden dafuer",
    response:
      "Das ist gut. Eine zweite Meinung schadet nie - vielleicht sehen wir Potentiale, die bisher ungenutzt sind. Ein kurzer Vergleich kostet Sie nichts.",
  },
  {
    objection: "Kein Interesse",
    response:
      "Das respektiere ich. Nur kurz: Wir haben bei aehnlichen Unternehmen in Ihrer Branche deutliche Verbesserungen erzielt. Darf ich Ihnen eine kurze Fallstudie schicken?",
  },
  {
    objection: "Schicken Sie mir Unterlagen",
    response:
      "Sehr gerne. Damit ich Ihnen gezielt das Richtige schicken kann - was ist Ihnen bei Ihrer Online-Praesenz aktuell am wichtigsten?",
  },
];

function validateScriptResult(result: ScriptResult): ScriptResult {
  if (!result.greeting || typeof result.greeting !== "string") {
    throw new Error("Invalid script: missing greeting");
  }
  if (!result.hook || typeof result.hook !== "string") {
    throw new Error("Invalid script: missing hook");
  }
  if (!Array.isArray(result.painPoints) || result.painPoints.length < 1) {
    throw new Error("Invalid script: missing painPoints");
  }
  if (!result.solution || typeof result.solution !== "string") {
    throw new Error("Invalid script: missing solution");
  }
  if (!result.callToAction || typeof result.callToAction !== "string") {
    result.callToAction =
      "Haetten Sie diese Woche noch einen kurzen Termin fuer ein 15-minuetiges Erstgespraech frei?";
  }

  // Sicherstellen dass genau 4 Einwaende vorhanden sind
  if (!Array.isArray(result.objections) || result.objections.length < 4) {
    result.objections = STANDARD_OBJECTIONS;
  }

  return result;
}

export async function generateSalesScript(
  lead: Lead,
  analysis: WebsiteAnalysis,
  briefing: Briefing
): Promise<ScriptResult> {
  const userPrompt = buildUserPrompt(lead, analysis, briefing);
  const response = await generateText(SYSTEM_PROMPT, userPrompt);
  const parsed = parseJsonFromResponse(response);
  return validateScriptResult(parsed);
}
```

## Exakte Datei: src/app/api/script/generate/route.ts

```typescript
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
```

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
```
