import { services, pricing } from "@/lib/content-de"

const SITE_URL = "https://fpz-media.de"

function buildLocalBusiness(): Record<string, unknown> {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "FPZ Media",
    url: SITE_URL,
    email: "hallo@fpz-media.de",
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Moderne Websites, Imagefilme und n8n-Automatisierung aus einer Hand.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Nordrhein-Westfalen",
      addressLocality: "Ruhrgebiet",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.45, longitude: 7.01 }, geoRadius: "50000" },
      { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
    ],
    sameAs: [
      "https://instagram.com/fpzmedia",
      "https://linkedin.com/company/fpzmedia",
    ],
    priceRange: "€€",
    knowsLanguage: ["de", "en"],
  }
}

function buildWebSite(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "FPZ Media",
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "de-DE",
  }
}

function buildServices(): Record<string, unknown>[] {
  return services.map((s) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${s.id}`,
    name: s.title,
    description: s.description,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
  }))
}

function buildOffers(): Record<string, unknown>[] {
  return pricing.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.description,
    price: p.price.replace(/[^0-9]/g, ""),
    priceCurrency: "EUR",
    offeredBy: { "@id": `${SITE_URL}/#business` },
    itemOffered: {
      "@type": "Service",
      name: `${p.name}-Paket`,
      description: p.features.join(", "),
    },
  }))
}

function buildFAQ(): Record<string, unknown> {
  const faqs = [
    {
      q: "Was kostet eine Website bei FPZ Media?",
      a: "Unsere Pakete starten ab 699 € für eine maßgeschneiderte One-Page-Website. Das Professional-Paket mit Fotoshooting und Video liegt bei 1.500 €, das Complete-Paket mit individuellen Automations bei 2.000 €.",
    },
    {
      q: "Wo ist FPZ Media ansässig?",
      a: "FPZ Media ist im Ruhrgebiet (NRW, Deutschland) ansässig. Wir arbeiten mit lokalen Unternehmen in der Region und sind auch deutschlandweit verfügbar.",
    },
    {
      q: "Welche Technologien nutzt FPZ Media?",
      a: "Wir entwickeln mit Next.js, React und Tailwind CSS. Für Automatisierung setzen wir auf n8n, eine Open-Source-Workflow-Plattform.",
    },
    {
      q: "Wie lange dauert ein Website-Projekt?",
      a: "Eine typische One-Page-Website ist innerhalb von 1–2 Wochen fertig. Mehrseitige Projekte mit Medienproduktion dauern in der Regel 2–4 Wochen.",
    },
    {
      q: "Was ist n8n-Automatisierung?",
      a: "n8n ist eine Open-Source-Plattform für Workflow-Automatisierung. Wir nutzen sie, um Kontaktformulare, CRM-Updates, E-Mail-Sequenzen und andere Geschäftsprozesse automatisch ablaufen zu lassen.",
    },
  ]

  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

export function JsonLd() {
  const graph = [
    buildLocalBusiness(),
    buildWebSite(),
    ...buildServices(),
    ...buildOffers(),
    buildFAQ(),
  ]

  const jsonLd = { "@context": "https://schema.org", "@graph": graph }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
