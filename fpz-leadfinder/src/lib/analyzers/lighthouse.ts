export interface PerformanceResult {
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  details: {
    fcp: number;
    lcp: number;
    tbt: number;
    cls: number;
    speedIndex: number;
    interactive: number;
  };
}

const EMPTY_RESULT: PerformanceResult = {
  performanceScore: 0,
  seoScore: 0,
  accessibilityScore: 0,
  bestPracticesScore: 0,
  details: { fcp: 0, lcp: 0, tbt: 0, cls: 0, speedIndex: 0, interactive: 0 },
};

interface LighthouseCategory {
  score?: number | null;
}

interface LighthouseAudit {
  numericValue?: number;
}

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: Record<string, LighthouseCategory>;
    audits?: Record<string, LighthouseAudit>;
  };
}

export async function analyzePerformance(
  url: string
): Promise<PerformanceResult> {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`;

    const response = await fetch(apiUrl, {
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      console.warn(`PageSpeed API error: ${response.status}`);
      return EMPTY_RESULT;
    }

    const json = (await response.json()) as PageSpeedResponse;
    const lhr = json.lighthouseResult;

    if (!lhr) return EMPTY_RESULT;

    const categories = lhr.categories ?? {};
    const audits = lhr.audits ?? {};

    const performanceScore = Math.round(
      (categories["performance"]?.score ?? 0) * 100
    );
    const seoScore = Math.round((categories["seo"]?.score ?? 0) * 100);
    const accessibilityScore = Math.round(
      (categories["accessibility"]?.score ?? 0) * 100
    );
    const bestPracticesScore = Math.round(
      (categories["best-practices"]?.score ?? 0) * 100
    );

    const details = {
      fcp: audits["first-contentful-paint"]?.numericValue ?? 0,
      lcp: audits["largest-contentful-paint"]?.numericValue ?? 0,
      tbt: audits["total-blocking-time"]?.numericValue ?? 0,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? 0,
      speedIndex: audits["speed-index"]?.numericValue ?? 0,
      interactive: audits["interactive"]?.numericValue ?? 0,
    };

    return {
      performanceScore,
      seoScore,
      accessibilityScore,
      bestPracticesScore,
      details,
    };
  } catch (err) {
    console.error("Performance analysis failed:", err);
    return EMPTY_RESULT;
  }
}
