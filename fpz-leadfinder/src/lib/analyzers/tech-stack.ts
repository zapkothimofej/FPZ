export interface TechStackResult {
  score: number;
  details: {
    cms: string | null;
    cmsVersion: string | null;
    framework: string | null;
    server: string | null;
    jsLibraries: string[];
  };
}

export async function analyzeTechStack(
  url: string,
  html: string
): Promise<TechStackResult> {
  let server: string | null = null;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });
    server = res.headers.get("server");
  } catch {
    /* ignore */
  }

  // CMS-Erkennung
  let cms: string | null = null;
  let cmsVersion: string | null = null;

  if (html.includes("wp-content") || html.includes("wp-includes")) {
    cms = "WordPress";
    const vMatch = html.match(/generator.*?WordPress\s*([\d.]+)/i);
    cmsVersion = vMatch?.[1] ?? null;
  } else if (html.includes("wix.com")) {
    cms = "Wix";
  } else if (html.includes("squarespace.com")) {
    cms = "Squarespace";
  } else if (/jimdo/i.test(html)) {
    cms = "Jimdo";
  } else if (
    html.includes("/media/jui/") ||
    /generator.*Joomla/i.test(html)
  ) {
    cms = "Joomla";
  } else if (html.includes("cdn.shopify.com")) {
    cms = "Shopify";
  } else if (html.includes("sites/default/files")) {
    cms = "Drupal";
  } else if (html.includes("typo3")) {
    cms = "TYPO3";
  } else if (html.includes("webflow.com")) {
    cms = "Webflow";
  }

  // Framework-Erkennung
  let framework: string | null = null;
  if (html.includes("__NEXT_DATA__") || html.includes("_next/")) {
    framework = "Next.js";
  } else if (html.includes("__NUXT__")) {
    framework = "Nuxt";
  } else if (
    html.includes("react-root") ||
    html.includes("data-reactroot")
  ) {
    framework = "React";
  } else if (/ng-version/i.test(html)) {
    framework = "Angular";
  } else if (html.includes("__vue")) {
    framework = "Vue";
  }

  // JS Libraries
  const jsLibraries: string[] = [];
  if (/jquery[.-]?\d/i.test(html)) jsLibraries.push("jQuery");
  if (/bootstrap\.min\.(css|js)/i.test(html)) jsLibraries.push("Bootstrap");
  if (html.includes("tailwind")) jsLibraries.push("Tailwind CSS");

  // Tech Score
  let score = 50;
  if (framework === "Next.js" || framework === "Nuxt") {
    score = 90;
  } else if (framework === "React" || framework === "Vue" || framework === "Angular") {
    score = 80;
  } else if (cms === "WordPress") {
    const version = cmsVersion ? parseFloat(cmsVersion) : 0;
    score = version >= 6 ? 70 : version >= 5 ? 55 : 40;
  } else if (cms === "Shopify") {
    score = 75;
  } else if (cms === "Squarespace") {
    score = 60;
  } else if (cms === "Wix" || cms === "Jimdo" || cms === "Webflow") {
    score = 50;
  } else if (!cms && !framework && jsLibraries.includes("jQuery")) {
    score = 30;
  }

  return {
    score,
    details: { cms, cmsVersion, framework, server, jsLibraries },
  };
}
