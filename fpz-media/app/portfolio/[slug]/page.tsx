import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPortfolioItem, getPortfolioSlugs, portfolioItems } from "@/lib/content-de"

const SITE_URL = "https://fpz-media.de"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getPortfolioSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getPortfolioItem(slug)
  if (!item) return {}

  const pageUrl = `${SITE_URL}/portfolio/${slug}`

  return {
    title: `${item.title} — Portfolio`,
    description: item.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${item.title} | FPZ Media Portfolio`,
      description: item.description,
      url: pageUrl,
      siteName: "FPZ Media",
      locale: "de_DE",
      type: "article",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${item.title} — FPZ Media Projekt`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | FPZ Media`,
      description: item.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  }
}

const TAG_LABELS: Record<string, string> = {
  Web: "Webentwicklung",
  Media: "Medienproduktion",
  Auto: "Automation",
}

function buildPortfolioJsonLd(slug: string) {
  const item = getPortfolioItem(slug)
  if (!item) return null

  const pageUrl = `${SITE_URL}/portfolio/${slug}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "FPZ Media", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/#portfolio` },
          { "@type": "ListItem", position: 3, name: item.title, item: pageUrl },
        ],
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}/#article`,
        headline: item.title,
        description: item.description,
        url: pageUrl,
        datePublished: `${item.year}-06-01`,
        author: { "@type": "Organization", "@id": `${SITE_URL}/#business` },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#business` },
        about: {
          "@type": "Thing",
          name: item.industry,
        },
        keywords: item.tags.map((t) => TAG_LABELS[t] ?? t).join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      },
    ],
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params
  const item = getPortfolioItem(slug)
  if (!item) notFound()

  const jsonLd = buildPortfolioJsonLd(slug)

  const currentIndex = portfolioItems.findIndex((p) => p.slug === slug)
  const prev = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null
  const next = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null

  return (
    <div style={{ backgroundColor: "#111111", minHeight: "100vh" }} className="flex flex-col">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <article className="max-w-3xl mx-auto px-6 py-20 w-full">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/30 text-sm mb-12">
          <Link href="/" className="hover:text-white/60 transition-colors">FPZ Media</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#portfolio" className="hover:text-white/60 transition-colors">Portfolio</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white/50">{item.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-white/30 text-sm">{item.year}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50 text-sm">{item.industry}</span>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/50"
            >
              {TAG_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {item.title}
        </h1>
        <p className="text-white/60 text-lg mb-16 leading-relaxed">
          {item.tagline}
        </p>

        {/* Result highlight */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Ergebnis</p>
          <p className="text-white text-4xl font-bold">{item.result}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {item.metrics.map((m) => (
            <div key={m.label} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <p className="text-white text-2xl font-bold mb-1">{m.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <section className="mb-12">
          <p className="text-white/70 text-base leading-relaxed">{item.description}</p>
        </section>

        {/* Challenge */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Die Herausforderung</h2>
          <p className="text-white/70 leading-relaxed">{item.challenge}</p>
        </section>

        {/* Solution */}
        <section className="mb-16">
          <h2 className="text-white text-xl font-semibold mb-4">Unsere Lösung</h2>
          <p className="text-white/70 leading-relaxed">{item.solution}</p>
        </section>

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <nav
            aria-label="Weitere Projekte"
            className="border-t border-white/10 pt-12 mb-12 grid grid-cols-2 gap-4"
          >
            {prev ? (
              <Link
                href={`/portfolio/${prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                <span className="text-white/30 text-xs uppercase tracking-wider">Vorheriges Projekt</span>
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">{prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/portfolio/${next.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors text-right ml-auto w-full"
              >
                <span className="text-white/30 text-xs uppercase tracking-wider">Nächstes Projekt</span>
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">{next.title}</span>
              </Link>
            ) : <div />}
          </nav>
        )}

        {/* CTA */}
        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-white/50 mb-6">Ähnliches Projekt geplant?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Projekt starten
          </Link>
        </div>

      </article>
    </div>
  )
}
