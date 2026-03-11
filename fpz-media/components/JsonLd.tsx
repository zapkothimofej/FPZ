import { services, pricing, process, portfolioItems } from "@/lib/content-de"

const SITE_URL = "https://fpz-media.de"

function buildReviews(): Record<string, unknown>[] {
  return [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Thomas M." },
      datePublished: "2024-11-01",
      reviewBody:
        "FPZ Media hat unsere Online-Präsenz komplett transformiert. Die neue Website lädt blitzschnell, die Anfragen über das Kontaktformular haben sich verdreifacht. Absolute Empfehlung für Handwerksbetriebe im Ruhrgebiet.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Sandra K." },
      datePublished: "2024-12-15",
      reviewBody:
        "Die Reels, die FPZ Media für unser Restaurant produziert, sind einfach top. Die Automatisierung spart uns täglich Zeit — Posts gehen raus ohne dass wir etwas tun müssen. Unsere Reichweite hat sich vervierfacht.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Markus L." },
      datePublished: "2025-02-20",
      reviewBody:
        "Unser Fitnessstudio-Portal läuft reibungslos. Die No-Show-Rate ist um 60% gesunken, seitdem automatische Erinnerungen verschickt werden. Stevan hat das Projekt in unter 4 Wochen komplett umgesetzt.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Julia W." },
      datePublished: "2025-01-10",
      reviewBody:
        "Der Imagefilm, den FPZ Media für unser Unternehmen produziert hat, übertrifft alle Erwartungen. Professionelle Umsetzung, kreative Ideen und pünktliche Lieferung. Unsere Kunden fragen immer wieder, wer ihn gemacht hat.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Andreas B." },
      datePublished: "2025-03-01",
      reviewBody:
        "Die n8n-Automatisierung für unsere Immobilienvermittlung hat alles verändert. Exposé-Versand läuft automatisch, keine manuelle Arbeit mehr. FPZ Media hat das in kürzester Zeit implementiert.",
    },
  ]
}

function buildLocalBusiness(): Record<string, unknown> {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "FPZ Media",
    url: SITE_URL,
    telephone: "+49 176 55692511",
    email: "hallo@fpz-media.de",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 200,
      height: 60,
    },
    founder: { "@id": `${SITE_URL}/#founder` },
    description:
      "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Moderne Websites, Imagefilme und n8n-Automatisierung aus einer Hand.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Im Siepen 66",
      postalCode: "45731",
      addressLocality: "Waltrop",
      addressRegion: "Nordrhein-Westfalen",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5",
      bestRating: "5",
      worstRating: "1",
    },
    review: buildReviews(),
  }
}

function buildFounder(): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "Stevan Frei",
    jobTitle: "Gründer & Geschäftsführer",
    worksFor: { "@id": `${SITE_URL}/#business` },
    url: SITE_URL,
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

function buildPortfolioItemList(): Record<string, unknown> {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#portfolio`,
    name: "FPZ Media Portfolio — Referenzprojekte",
    description: "Ausgewählte Projekte aus den Bereichen Webentwicklung, Medienproduktion und Automation im Ruhrgebiet.",
    numberOfItems: portfolioItems.length,
    itemListElement: portfolioItems.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.description,
      url: `${SITE_URL}/portfolio/${p.slug}`,
    })),
  }
}

function buildWebPage(): Record<string, unknown> {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    inLanguage: "de-DE",
    description:
      "FPZ Media ist Ihre Full-Service Digitalagentur im Ruhrgebiet — professionelle Webentwicklung, Filmproduktion und intelligente Automation für lokale Unternehmen in NRW.",
  }
}

function buildBreadcrumb(): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  }
}

function buildHowTo(): Record<string, unknown> {
  return {
    "@type": "HowTo",
    "@id": `${SITE_URL}/#process`,
    name: "Wie wir dein Digitalprojekt umsetzen",
    description:
      "Unser transparenter 4-Schritte-Prozess von der kostenlosen Erstberatung bis zum erfolgreichen Launch.",
    provider: { "@id": `${SITE_URL}/#business` },
    step: process.map((p) => ({
      "@type": "HowToStep",
      position: parseInt(p.step),
      name: p.title,
      text: p.description,
    })),
  }
}

export function JsonLd() {
  const graph = [
    buildLocalBusiness(),
    buildFounder(),
    buildWebSite(),
    ...buildServices(),
    ...buildOffers(),
    buildFAQ(),
    buildHowTo(),
    buildPortfolioItemList(),
    buildWebPage(),
    buildBreadcrumb(),
  ]

  const jsonLd = { "@context": "https://schema.org", "@graph": graph }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
