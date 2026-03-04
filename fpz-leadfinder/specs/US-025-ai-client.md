# US-025: Groq KI Client mit HuggingFace Fallback

## Exakte Datei: src/lib/ai/groq.ts

```typescript
import Groq from "groq-sdk";

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set");
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

export async function generateWithGroq(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const client = getGroqClient();

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Groq returned empty response");
    }

    return content;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.message.includes("rate_limit") ||
        error.message.includes("429") ||
        error.message.includes("Rate limit"))
    ) {
      throw new RateLimitError(error.message);
    }
    throw error;
  }
}
```

## Exakte Datei: src/lib/ai/huggingface.ts

```typescript
const HF_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

export async function generateWithHuggingFace(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const token = process.env.HUGGINGFACE_TOKEN;
  if (!token) {
    throw new Error("HUGGINGFACE_TOKEN is not set");
  }

  const prompt = `<s>[INST] ${systemPrompt}\n\n${userPrompt} [/INST]`;

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 2000,
        temperature: 0.3,
        return_full_text: false,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HuggingFace API error (${response.status}): ${errorText}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("HuggingFace returned unexpected response format");
  }

  const firstResult = data[0] as Record<string, unknown>;
  const generatedText = firstResult.generated_text;

  if (typeof generatedText !== "string" || !generatedText) {
    throw new Error("HuggingFace returned empty response");
  }

  return generatedText;
}
```

## Exakte Datei: src/lib/ai/index.ts

```typescript
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
```

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
```
