import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Footer } from "@/components/Footer"
import { JsonLd } from "@/components/JsonLd"
import { LocalServicePage } from "@/components/LocalServicePage"
import { Nav } from "@/components/Nav"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo"
import {
  getLocalSeoPage,
  localSeoMetadata,
  localSeoPages,
  localServiceJsonLd,
} from "@/lib/local-seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return localSeoPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getLocalSeoPage(slug)

  if (!page) {
    return {}
  }

  return localSeoMetadata(page)
}

export default async function LocalSeoRoute({ params }: PageProps) {
  const { slug } = await params
  const page = getLocalSeoPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          localServiceJsonLd(page),
          breadcrumbJsonLd([
            { name: "Startseite", path: "/" },
            { name: page.parentLabel, path: page.parentPath },
            { name: page.serviceName, path: `/${page.slug}` },
          ]),
          faqJsonLd(page.faq),
        ]}
      />
      <Nav />
      <main>
        <LocalServicePage page={page} />
      </main>
      <Footer variant={page.parentPath === "/web-ki" ? "web-ki" : "foto-video"} />
    </>
  )
}
