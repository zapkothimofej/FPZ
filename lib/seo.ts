import type { Metadata } from "next"

export const site = {
  url: "https://www.fapez-medien.de",
  name: "FPZ",
  legalName: "Fapez Medien / FPZ Web-Media Solutions",
  owner: "Stevan Frei",
  email: "kontakt@fapez-medien.de",
  address: {
    streetAddress: "Im Siepen 66",
    postalCode: "45731",
    addressLocality: "Waltrop",
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  serviceArea: ["Waltrop", "Bochum", "Ruhrgebiet", "Nordrhein-Westfalen", "Deutschland"],
  ogImage: "/opengraph-image",
} as const

export type RouteKey = "home" | "webKi" | "fotoVideo"

export const routes: Record<
  RouteKey,
  {
    path: string
    title: string
    description: string
    ogTitle: string
    ogDescription: string
  }
> = {
  home: {
    path: "/",
    title: "FPZ - Web, KI, Foto und Video aus dem Ruhrgebiet",
    description:
      "FPZ/Fapez Medien entwickelt Websites, KI-Automatisierungen und Foto-/Video-Content für Unternehmen in Bochum, dem Ruhrgebiet, NRW und deutschlandweit.",
    ogTitle: "FPZ - Web, KI, Foto und Video",
    ogDescription:
      "Fapez Medien verbindet Webentwicklung, KI-Automatisierung und professionelle Foto-/Video-Produktion im Ruhrgebiet.",
  },
  webKi: {
    path: "/web-ki",
    title: "FPZ Web & KI - Websites, Automatisierungen und KI-Integrationen",
    description:
      "FPZ Web & KI baut moderne Websites, Prozessautomatisierungen und KI-Integrationen für Unternehmen in Bochum, Ruhrgebiet, NRW und deutschlandweit.",
    ogTitle: "FPZ Web & KI",
    ogDescription:
      "Websites, Automatisierungen und KI-Systeme von Fapez Medien für Unternehmen im Ruhrgebiet und darüber hinaus.",
  },
  fotoVideo: {
    path: "/foto-video",
    title: "FPZ Foto & Video - Produktfotografie, Imagefilm und Social Content",
    description:
      "FPZ Foto & Video produziert Produktfotografie, Imagefilme, Event-Dokumentationen und Social Content für Bochum, Ruhrgebiet, NRW und deutschlandweit.",
    ogTitle: "FPZ Foto & Video",
    ogDescription:
      "Produktfotografie, Imagefilm, Event-Dokumentation und Social Content von Fapez Medien im Ruhrgebiet.",
  },
}

const routeOgKickers: Record<RouteKey, string> = {
  home: "Web · KI · Foto / Video",
  webKi: "Web & KI · Bochum · NRW",
  fotoVideo: "Foto & Video · Ruhrgebiet · NRW",
}

export const services = [
  {
    name: "Webseitenerstellung",
    description:
      "Konzeption, Design und Umsetzung moderner Websites mit klarer Struktur, schneller Performance und Anfrage-Fokus.",
    url: `${site.url}/web-ki`,
  },
  {
    name: "KI-Automatisierungen",
    description:
      "Automatisierte Workflows, API-Anbindungen und KI-gestützte Systeme für wiederkehrende Unternehmensprozesse.",
    url: `${site.url}/web-ki`,
  },
  {
    name: "Produktfotografie",
    description:
      "Hochwertige Produktbilder für Online-Shops, Kataloge, Websites und Marketingmaterial.",
    url: `${site.url}/foto-video`,
  },
  {
    name: "Imagefilm",
    description:
      "Professionelle Unternehmensfilme und Markenfilme von der Idee bis zum fertigen Schnitt.",
    url: `${site.url}/foto-video`,
  },
  {
    name: "Event-Dokumentation",
    description:
      "Professionelle Foto- und Video-Dokumentation von Konferenzen, Launches, Feiern und Unternehmensveranstaltungen.",
    url: `${site.url}/foto-video`,
  },
  {
    name: "Social Media Content",
    description:
      "Foto- und Video-Content für Reels, Stories, Posts und Kampagnen auf digitalen Plattformen.",
    url: `${site.url}/foto-video`,
  },
] as const

export const defaultRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} satisfies Metadata["robots"]

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString()
}

export function ogImageUrl(title: string, kicker: string) {
  const params = new URLSearchParams({ title, kicker })
  return `/og?${params.toString()}`
}

export function pageMetadata(routeKey: RouteKey): Metadata {
  const route = routes[routeKey]
  const canonical = route.path
  const image = ogImageUrl(route.ogTitle, routeOgKickers[routeKey])

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical,
    },
    robots: defaultRobots,
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: canonical,
      title: route.ogTitle,
      description: route.ogDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "FPZ - Web, KI, Foto und Video",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.ogTitle,
      description: route.ogDescription,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    founder: {
      "@type": "Person",
      name: site.owner,
    },
    address: {
      "@type": "PostalAddress",
      ...site.address,
    },
    areaServed: site.serviceArea.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    knowsAbout: services.map((service) => service.name),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
      },
    })),
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: `${site.name} - Fapez Medien`,
    inLanguage: "de-DE",
    publisher: {
      "@id": `${site.url}/#organization`,
    },
  }
}

export function serviceJsonLd(routeKey: Extract<RouteKey, "webKi" | "fotoVideo">) {
  const selectedServices =
    routeKey === "webKi"
      ? services.filter((service) => service.url.endsWith("/web-ki"))
      : services.filter((service) => service.url.endsWith("/foto-video"))

  return selectedServices.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.url}#${service.name.toLowerCase().replaceAll(" ", "-")}`,
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${site.url}/#organization`,
    },
    areaServed: site.serviceArea.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    url: service.url,
  }))
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
