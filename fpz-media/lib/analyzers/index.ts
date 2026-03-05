import prisma from "@/lib/db/client";
import { analyzePerformance } from "./lighthouse";
import { analyzeSEO } from "./seo";
import { analyzeSecurity } from "./security";
import { analyzeTechStack } from "./tech-stack";
import { analyzeDesign } from "./design";
import { analyzeAge } from "./age";
import { analyzeContent } from "./content";
import { calculateOverallScore } from "./scoring";
import type { WebsiteAnalysis } from "@/types";

export async function analyzeWebsite(leadId: string): Promise<WebsiteAnalysis> {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead nicht gefunden");
  if (!lead.website) throw new Error("Lead hat keine Website");

  const url = lead.website.startsWith("http")
    ? lead.website
    : `https://${lead.website}`;

  // HTML einmal laden
  let html = "";
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FPZBot/1.0)" },
    });
    html = await res.text();
  } catch (err) {
    console.error("HTML fetch failed:", err);
  }

  // Alle Analyzer parallel
  const [perfResult, seoResult, secResult, techResult, designResult, ageResult, contentResult] =
    await Promise.allSettled([
      analyzePerformance(url),
      analyzeSEO(url),
      analyzeSecurity(url),
      analyzeTechStack(url, html),
      analyzeDesign(url, html),
      analyzeAge(url, html),
      analyzeContent(url, html),
    ]);

  const perf = perfResult.status === "fulfilled" ? perfResult.value : null;
  const getScore = (
    result: PromiseSettledResult<{ score: number }>
  ): number => (result.status === "fulfilled" ? result.value.score : 0);

  const scores = {
    performanceScore: perf?.performanceScore ?? 0,
    seoScore: Math.round(
      ((getScore(seoResult as PromiseSettledResult<{ score: number }>) +
        (perf?.seoScore ?? 0)) /
        (perf ? 2 : 1))
    ),
    mobileScore: perf?.accessibilityScore ?? getScore(designResult as PromiseSettledResult<{ score: number }>),
    securityScore: getScore(secResult as PromiseSettledResult<{ score: number }>),
    designScore: getScore(designResult as PromiseSettledResult<{ score: number }>),
    techScore: getScore(techResult as PromiseSettledResult<{ score: number }>),
    ageScore: getScore(ageResult as PromiseSettledResult<{ score: number }>),
    accessibilityScore: perf?.accessibilityScore ?? 0,
    contentScore: getScore(contentResult as PromiseSettledResult<{ score: number }>),
  };

  const overallScore = calculateOverallScore({
    performance: scores.performanceScore,
    seo: scores.seoScore,
    mobile: scores.mobileScore,
    security: scores.securityScore,
    design: scores.designScore,
    tech: scores.techScore,
    age: scores.ageScore,
    accessibility: scores.accessibilityScore,
    content: scores.contentScore,
  });

  const getDetails = (result: PromiseSettledResult<{ details?: unknown; score?: unknown }>) =>
    result.status === "fulfilled"
      ? (result.value.details ?? result.value)
      : { error: String((result as PromiseRejectedResult).reason) };

  const allDetails = {
    performance: getDetails(perfResult),
    seo: getDetails(seoResult),
    security: getDetails(secResult),
    techStack: getDetails(techResult),
    design: getDetails(designResult),
    age: getDetails(ageResult),
    content: getDetails(contentResult),
  };

  const techStackJson =
    techResult.status === "fulfilled"
      ? JSON.stringify(techResult.value.details)
      : null;

  const analysis = await prisma.websiteAnalysis.upsert({
    where: { leadId },
    create: {
      leadId,
      ...scores,
      overallScore,
      details: JSON.stringify(allDetails),
      techStack: techStackJson,
    },
    update: {
      ...scores,
      overallScore,
      details: JSON.stringify(allDetails),
      techStack: techStackJson,
      analyzedAt: new Date(),
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: { overallScore },
  });

  return analysis;
}
