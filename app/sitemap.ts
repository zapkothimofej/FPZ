import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fpz-website.vercel.app"
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/web-ki`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/foto-video`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ]
}
