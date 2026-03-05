"use server";

import prisma from "@/lib/db/client";
import { revalidatePath } from "next/cache";

export async function saveSettings(data: {
  groqApiKey?: string;
  huggingfaceToken?: string;
  defaultCities?: string[];
  scoringWeights?: Record<string, number>;
}) {
  await prisma.settings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      groqApiKey: data.groqApiKey ?? null,
      huggingfaceToken: data.huggingfaceToken ?? null,
      defaultCities: data.defaultCities
        ? JSON.stringify(data.defaultCities)
        : null,
      scoringWeights: data.scoringWeights
        ? JSON.stringify(data.scoringWeights)
        : null,
    },
    update: {
      groqApiKey: data.groqApiKey ?? null,
      huggingfaceToken: data.huggingfaceToken ?? null,
      defaultCities: data.defaultCities
        ? JSON.stringify(data.defaultCities)
        : null,
      scoringWeights: data.scoringWeights
        ? JSON.stringify(data.scoringWeights)
        : null,
    },
  });
  revalidatePath("/settings");
}
