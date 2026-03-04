# US-021: SEO Analyzer via HTML Scraping

## Datei: src/lib/analyzers/seo.ts

```typescript
import * as cheerio from "cheerio";
import { truncate } from "@/lib/utils";

interface SEOResult {
  score: number;
  details: Record<string, unknown>;
}

export async function analyzeSEO(url: string): Promise<SEOResult> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FPZBot/1.0)" },
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Check 1 (15%): Meta Title
    const title = $("title").text().trim();
    const titleExists = title.length > 0;
    const titleOk = title.length >= 30 && title.length <= 60;
    const titleScore = titleExists && titleOk ? 1 : titleExists ? 0.5 : 0;

    // Check 2 (15%): Meta Description
    const desc =
      $('meta[name="description"]').attr("content")?.trim() ?? "";
    const descExists = desc.length > 0;
    const descOk = desc.length >= 120 && desc.length <= 160;
    const descScore = descExists && descOk ? 1 : descExists ? 0.5 : 0;

    // Check 3 (10%): H1
    const h1Count = $("h1").length;
    const h1Score = h1Count === 1 ? 1 : h1Count > 1 ? 0.5 : 0;

    // Check 4 (5%): H2
    const h2Count = $("h2").length;
    const h2Score = h2Count >= 2 ? 1 : h2Count === 1 ? 0.5 : 0;

    // Check 5 (10%): Alt-Texte
    const imgs = $("img").length;
    const imgsWithAlt = $("img[alt]").filter(
      (_, el) => ($(el).attr("alt") ?? "").trim().length > 0
    ).length;
    const altScore = imgs === 0 ? 1 : imgsWithAlt / imgs;

    // Check 6 (10%): Sitemap
    let hasSitemap = false;
    try {
      const sitemapRes = await fetch(new URL("/sitemap.xml", url).href, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
      hasSitemap = sitemapRes.ok;
    } catch {
      /* ignore */
    }
    const sitemapScore = hasSitemap ? 1 : 0;

    // Check 7 (5%): robots.txt
    let hasRobotsTxt = false;
    try {
      const robotsRes = await fetch(new URL("/robots.txt", url).href, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
      hasRobotsTxt = robotsRes.ok;
    } catch {
      /* ignore */
    }
    const robotsScore = hasRobotsTxt ? 1 : 0;

    // Check 8 (5%): Canonical
    const hasCanonical = $('link[rel="canonical"]').length > 0;
    const canonicalScore = hasCanonical ? 1 : 0;

    // Check 9 (10%): Open Graph
    const ogTagCount = $('meta[property^="og:"]').length;
    const ogScore = ogTagCount >= 3 ? 1 : ogTagCount > 0 ? 0.5 : 0;

    // Check 10 (10%): JSON-LD
    let hasJsonLd = false;
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        JSON.parse($(el).html() ?? "");
        hasJsonLd = true;
      } catch {
        /* ignore */
      }
    });
    const jsonLdScore = hasJsonLd ? 1 : 0;

    // Check 11 (5%): Lang-Attribut
    const hasLangAttr = !!$("html").attr("lang");
    const langScore = hasLangAttr ? 1 : 0;

    // Gesamt-Score
    const score = Math.round(
      (titleScore * 0.15 +
        descScore * 0.15 +
        h1Score * 0.1 +
        h2Score * 0.05 +
        altScore * 0.1 +
        sitemapScore * 0.1 +
        robotsScore * 0.05 +
        canonicalScore * 0.05 +
        ogScore * 0.1 +
        jsonLdScore * 0.1 +
        langScore * 0.05) *
        100
    );

    return {
      score,
      details: {
        title: {
          text: truncate(title, 60),
          length: title.length,
          optimal: titleOk,
        },
        description: {
          text: truncate(desc, 50),
          length: desc.length,
          optimal: descOk,
        },
        h1Count,
        h2Count,
        imagesTotal: imgs,
        imagesWithAlt,
        hasSitemap,
        hasRobotsTxt,
        hasCanonical,
        ogTagCount,
        hasJsonLd,
        hasLangAttr,
      },
    };
  } catch (err) {
    console.error("SEO analysis failed:", err);
    return { score: 0, details: { error: "Analyse fehlgeschlagen" } };
  }
}
```
