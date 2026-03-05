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
