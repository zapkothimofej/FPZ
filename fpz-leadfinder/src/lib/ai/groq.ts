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
