import type { MetadataRoute } from "next"
import { absoluteUrl, routes } from "@/lib/seo"
import { localSeoPages } from "@/lib/local-seo"

const contentLastModified = new Date("2026-05-15T00:00:00.000Z")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(routes.home.path), lastModified: contentLastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl(routes.webKi.path), lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl(routes.fotoVideo.path), lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.9 },
    ...localSeoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]
}
