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
