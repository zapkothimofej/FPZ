import { SCORE_WEIGHTS } from "@/lib/constants";
import type { ScoreCategory } from "@/types";

export function calculateOverallScore(
  scores: Partial<Record<ScoreCategory, number>>,
  weights: Record<ScoreCategory, number> = SCORE_WEIGHTS
): number {
  let totalWeight = 0;
  let weightedSum = 0;
  for (const [key, weight] of Object.entries(weights)) {
    const score = scores[key as ScoreCategory];
    if (score != null) {
      weightedSum += score * weight;
      totalWeight += weight;
    }
  }
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}
