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
