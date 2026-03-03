import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/chrom/", "/clean/", "/gsap/", "/sphere/", "/sphere+/"],
      },
    ],
    sitemap: "https://fpz-media.de/sitemap.xml",
  }
}
