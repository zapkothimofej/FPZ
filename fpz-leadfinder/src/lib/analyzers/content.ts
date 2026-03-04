import * as cheerio from "cheerio";

interface ContentAIResponse {
  spelling?: number;
  currentness?: number;
  professionalism?: number;
  clarity?: number;
  completeness?: number;
  overall?: number;
  summary?: string;
}

export async function analyzeContent(
  _url: string,
  html: string
): Promise<{ score: number; details: Record<string, unknown> }> {
  try {
    const $ = cheerio.load(html);
    let text =
      $("main").text() ||
      $("article").text() ||
      $('[role="main"]').text() ||
      $("body").text();
    text = text.replace(/\s+/g, " ").trim().slice(0, 2000);

    if (text.length < 50) {
      return {
        score: 20,
        details: {
          error: "Zu wenig Text auf der Seite",
          textLength: text.length,
        },
      };
    }

    // KI-Bewertung via Groq (direkter Aufruf als Fallback falls lib/ai noch nicht existiert)
    try {
      const { generateText } = await import("@/lib/ai");
      const prompt = `Bewerte diesen deutschen Website-Text. Antworte NUR als JSON: {"spelling": 0-100, "currentness": 0-100, "professionalism": 0-100, "clarity": 0-100, "completeness": 0-100, "overall": 0-100, "summary": "kurze Begruendung"}\n\nText:\n${text}`;
      const result = await generateText(prompt, "Du bist ein Content-Analyst.");

      let parsed: ContentAIResponse;
      try {
        parsed = JSON.parse(result) as ContentAIResponse;
      } catch {
        const match = result.match(/\{[\s\S]*\}/);
        parsed = match
          ? (JSON.parse(match[0]) as ContentAIResponse)
          : { overall: 50 };
      }

      return {
        score: parsed.overall ?? 50,
        details: {
          textLength: text.length,
          spelling: parsed.spelling,
          currentness: parsed.currentness,
          professionalism: parsed.professionalism,
          clarity: parsed.clarity,
          completeness: parsed.completeness,
          summary: parsed.summary,
        },
      };
    } catch {
      // Fallback: Einfache Heuristik
      const wordCount = text.split(/\s+/).length;
      const score = Math.min(100, Math.round(wordCount / 5));
      return {
        score,
        details: {
          textLength: text.length,
          wordCount,
          note: "KI-Bewertung nicht verfuegbar, Heuristik verwendet",
        },
      };
    }
  } catch (err) {
    console.error("Content analysis failed:", err);
    return { score: 0, details: { error: "Analyse fehlgeschlagen" } };
  }
}
