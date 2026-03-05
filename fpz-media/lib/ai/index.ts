import { generateWithGroq, RateLimitError } from "./groq";
import { generateWithHuggingFace } from "./huggingface";
import { sleep } from "@/lib/utils";

export { RateLimitError } from "./groq";

export async function generateText(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  // 1. Versuch: Groq
  try {
    return await generateWithGroq(systemPrompt, userPrompt);
  } catch (error: unknown) {
    if (!(error instanceof RateLimitError)) {
      throw error;
    }
  }

  // 2. Fallback: HuggingFace
  try {
    return await generateWithHuggingFace(systemPrompt, userPrompt);
  } catch {
    // HuggingFace fehlgeschlagen, Groq Retry nach kurzer Pause
  }

  // 3. Retry: Groq nach 2s Pause
  await sleep(2000);
  return await generateWithGroq(systemPrompt, userPrompt);
}
