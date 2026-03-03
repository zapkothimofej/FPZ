import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/impressum", "/datenschutz"],
        disallow: ["/chrom", "/clean", "/sphere", "/sphere+", "/gsap", "/api/"],
      },
    ],
    sitemap: "https://fpz-media.de/sitemap.xml",
  };
}
