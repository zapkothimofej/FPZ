import type { MetadataRoute } from "next"
import { getPortfolioSlugs } from "@/lib/content-de"

const BASE = "https://fpz-media.de"

const PORTFOLIO_LAST_MODIFIED: Record<string, string> = {
  "handwerk-digital": "2024-09-01",
  "restaurant-kampagne": "2024-10-01",
  "lokale-brand-identity": "2024-11-01",
  "einzelhandel-launch": "2025-02-01",
  "fitness-studio": "2025-02-01",
  "immobilien-portal": "2025-03-01",
}

const PORTFOLIO_SUB_PAGES: Record<string, string[]> = {
  "handwerk-digital": ["leistungen", "kontakt"],
  "einzelhandel-launch": ["kollektion", "kontakt"],
  "immobilien-portal": ["immobilien", "kontakt"],
  "restaurant-kampagne": ["speisekarte", "reservierung"],
  "fitness-studio": ["kurse", "mitgliedschaft"],
  "lokale-brand-identity": ["leistungen", "kontakt"],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioEntries: MetadataRoute.Sitemap = getPortfolioSlugs().map((slug) => ({
    url: `${BASE}/portfolio/${slug}`,
    lastModified: new Date(PORTFOLIO_LAST_MODIFIED[slug] ?? "2025-01-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const portfolioSubEntries: MetadataRoute.Sitemap = getPortfolioSlugs().flatMap((slug) =>
    (PORTFOLIO_SUB_PAGES[slug] ?? []).map((sub) => ({
      url: `${BASE}/portfolio/${slug}/${sub}`,
      lastModified: new Date(PORTFOLIO_LAST_MODIFIED[slug] ?? "2025-01-01"),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  )

  return [
    { url: BASE, lastModified: new Date("2025-03-01"), changeFrequency: "monthly", priority: 1.0 },
    ...portfolioEntries,
    ...portfolioSubEntries,
    { url: `${BASE}/impressum`, lastModified: new Date("2024-08-01"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/datenschutz`, lastModified: new Date("2024-08-01"), changeFrequency: "yearly", priority: 0.2 },
  ]
}
