export async function analyzeSecurity(
  url: string
): Promise<{ score: number; details: Record<string, unknown> }> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    const isHttps =
      url.startsWith("https://") || response.url.startsWith("https://");
    const hasHSTS = response.headers.has("strict-transport-security");
    const hasXFrame = response.headers.has("x-frame-options");
    const hasNoSniff =
      response.headers.get("x-content-type-options") === "nosniff";
    const hasCSP = response.headers.has("content-security-policy");
    const hasXSS = response.headers.has("x-xss-protection");

    const score = Math.round(
      ((isHttps ? 1 : 0) * 0.25 +
        (hasHSTS ? 1 : 0) * 0.2 +
        (hasXFrame ? 1 : 0) * 0.15 +
        (hasNoSniff ? 1 : 0) * 0.15 +
        (hasCSP ? 1 : 0) * 0.15 +
        (hasXSS ? 1 : 0) * 0.1) *
        100
    );

    return {
      score,
      details: {
        https: isHttps,
        hsts: hasHSTS
          ? response.headers.get("strict-transport-security")
          : false,
        xFrameOptions: response.headers.get("x-frame-options") ?? false,
        contentTypeOptions: hasNoSniff,
        csp: hasCSP,
        xssProtection: response.headers.get("x-xss-protection") ?? false,
        server: response.headers.get("server") ?? "unknown",
      },
    };
  } catch (err) {
    console.error("Security analysis failed:", err);
    return { score: 0, details: { error: "Analyse fehlgeschlagen" } };
  }
}
