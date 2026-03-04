# US-023: Design, Alter und Content Analyzer

## Datei: src/lib/analyzers/design.ts

```typescript
import * as cheerio from "cheerio";

export async function analyzeDesign(
  _url: string,
  html: string
): Promise<{ score: number; details: Record<string, unknown> }> {
  try {
    const $ = cheerio.load(html);

    // Check 1 (25%): Viewport Meta
    const hasViewport = $('meta[name="viewport"]').length > 0;
    const viewportScore = hasViewport ? 1 : 0;

    // Check 2 (20%): Kein Tabellen-Layout
    const tables = $("table").length;
    const tablesInMain = $(
      "main table, article table, .content table, #content table"
    ).length;
    const tableScore =
      tables === 0 ? 1 : tables === tablesInMain ? 0.8 : tables > 5 ? 0 : 0.5;

    // Check 3 (10%): Kein Flash
    const hasFlash =
      html.includes("application/x-shockwave-flash") || html.includes(".swf");
    const flashScore = hasFlash ? 0 : 1;

    // Check 4 (15%): Wenig Inline Styles
    const elements = $("*").length;
    const withStyle = $("[style]").length;
    const ratio = elements > 0 ? withStyle / elements : 0;
    const inlineScore = ratio < 0.05 ? 1 : ratio < 0.15 ? 0.6 : 0.3;

    // Check 5 (15%): Modern CSS
    const hasModernCSS =
      html.includes("display:flex") ||
      html.includes("display: flex") ||
      html.includes("display:grid") ||
      html.includes("display: grid") ||
      html.includes("flexbox") ||
      html.includes("tailwind");
    const cssScore = hasModernCSS ? 1 : 0.3;

    // Check 6 (15%): Web Fonts
    const hasWebFonts =
      html.includes("fonts.googleapis.com") ||
      html.includes("fonts.gstatic.com") ||
      html.includes("@font-face") ||
      html.includes("typekit.net");
    const fontScore = hasWebFonts ? 1 : 0.3;

    const score = Math.round(
      (viewportScore * 0.25 +
        tableScore * 0.2 +
        flashScore * 0.1 +
        inlineScore * 0.15 +
        cssScore * 0.15 +
        fontScore * 0.15) *
        100
    );

    return {
      score,
      details: {
        hasViewport,
        tablesTotal: tables,
        tablesInContent: tablesInMain,
        hasFlash,
        inlineStyleRatio: Math.round(ratio * 100) + "%",
        hasModernCSS,
        hasWebFonts,
      },
    };
  } catch (err) {
    console.error("Design analysis failed:", err);
    return { score: 0, details: { error: "Analyse fehlgeschlagen" } };
  }
}
```

## Datei: src/lib/analyzers/age.ts

```typescript
import * as cheerio from "cheerio";

interface WaybackResponse {
  archived_snapshots?: {
    closest?: { timestamp?: string };
  };
}

export async function analyzeAge(
  url: string,
  html: string
): Promise<{ score: number; details: Record<string, unknown> }> {
  try {
    const $ = cheerio.load(html);
    const currentYear = new Date().getFullYear();

    // Check 1 (30%): Copyright-Jahr
    const footerText = $("footer").text();
    const yearMatch =
      footerText.match(/©\s*(20\d{2})/i) ??
      footerText.match(/copyright\s*(20\d{2})/i);
    const copyrightYear = yearMatch ? Number(yearMatch[1]) : null;
    const copyrightScore = copyrightYear
      ? Math.max(0, 1 - (currentYear - copyrightYear) * 0.15)
      : 0.5;

    // Check 2 (20%): Last-Modified Header
    let lastModified: string | null = null;
    let lastModifiedScore = 0.5;
    try {
      const res = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
      lastModified = res.headers.get("last-modified");
      if (lastModified) {
        const modDate = new Date(lastModified);
        const yearsAgo =
          (Date.now() - modDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        lastModifiedScore =
          yearsAgo < 0.5 ? 1 : yearsAgo < 1 ? 0.8 : yearsAgo < 3 ? 0.5 : 0.2;
      }
    } catch {
      /* ignore */
    }

    // Check 3 (20%): Generator Version
    const generator = $('meta[name="generator"]').attr("content") ?? null;
    let generatorScore = 0.5;
    if (generator) {
      const vMatch = generator.match(/([\d.]+)/);
      if (vMatch) {
        const majorVersion = parseInt(vMatch[1] ?? "0", 10);
        generatorScore = majorVersion >= 6 ? 1 : majorVersion >= 5 ? 0.7 : 0.3;
      }
    }

    // Check 4 (30%): Wayback Machine
    let waybackScore = 0.5;
    let firstArchived: string | null = null;
    try {
      const wbRes = await fetch(
        `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`,
        { signal: AbortSignal.timeout(5000) }
      );
      const wbData = (await wbRes.json()) as WaybackResponse;
      const timestamp = wbData.archived_snapshots?.closest?.timestamp;
      if (timestamp) {
        firstArchived = timestamp;
        const archiveYear = parseInt(timestamp.slice(0, 4), 10);
        const yearsOld = currentYear - archiveYear;
        if (yearsOld < 1) waybackScore = 0.3;
        else if (yearsOld <= 3) waybackScore = 0.8;
        else if (yearsOld <= 10) waybackScore = 1;
        else waybackScore = 0.7;
      }
    } catch {
      /* ignore */
    }

    const score = Math.round(
      (copyrightScore * 0.3 +
        lastModifiedScore * 0.2 +
        generatorScore * 0.2 +
        waybackScore * 0.3) *
        100
    );

    return {
      score,
      details: {
        copyrightYear,
        lastModified,
        generator,
        firstArchived,
      },
    };
  } catch (err) {
    console.error("Age analysis failed:", err);
    return { score: 0, details: { error: "Analyse fehlgeschlagen" } };
  }
}
```

## Datei: src/lib/analyzers/content.ts

```typescript
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
```
