import type { Metadata } from "next"
import { absoluteUrl, defaultRobots, ogImageUrl, site } from "@/lib/seo"

export type LocalSeoPage = {
  slug: string
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  kicker: string
  h1: string
  intro: string
  serviceName: string
  region: string
  parentPath: "/web-ki" | "/foto-video"
  parentLabel: string
  facts: string[]
  sections: Array<{
    title: string
    body: string
  }>
  faq: Array<{
    question: string
    answer: string
  }>
}

export const localSeoPages: LocalSeoPage[] = [
  {
    slug: "webdesign-bochum",
    title: "Webdesign Bochum - Websites für Unternehmen",
    description:
      "FPZ entwickelt Webdesign und moderne Websites für Unternehmen in Bochum, Waltrop, dem Ruhrgebiet und NRW - klar strukturiert, schnell und anfrageorientiert.",
    ogTitle: "Webdesign Bochum von FPZ",
    ogDescription:
      "Professionelle Websites für Unternehmen in Bochum und dem Ruhrgebiet: Strategie, Design, Entwicklung und Kontaktwege aus einer Hand.",
    kicker: "Webdesign · Bochum · Ruhrgebiet",
    h1: "Webdesign Bochum für Unternehmen, die online besser erklären und verkaufen wollen.",
    intro:
      "FPZ baut Websites für Unternehmen in Bochum und dem Ruhrgebiet, die nicht nur gut aussehen, sondern Angebote klar erklären, Vertrauen aufbauen und Anfragen einfacher machen.",
    serviceName: "Webdesign Bochum",
    region: "Bochum",
    parentPath: "/web-ki",
    parentLabel: "Web & KI",
    facts: [
      "Standortnähe: Waltrop, Bochum, Ruhrgebiet und NRW.",
      "Fokus: Struktur, Performance, responsive Umsetzung und Anfragewege.",
      "Geeignet für Dienstleister, lokale Unternehmen, Marken und B2B-Angebote.",
    ],
    sections: [
      {
        title: "Was FPZ bei Webdesign in Bochum liefert",
        body:
          "Die Arbeit beginnt bei Inhalt und Struktur: Welche Leistungen sollen gefunden werden, welche Fragen müssen beantwortet sein und welcher Kontaktweg ist für Besucher am einfachsten. Danach folgen Design, technische Umsetzung und Go-Live.",
      },
      {
        title: "Warum lokale Suchintention zählt",
        body:
          "Wer nach Webdesign in Bochum sucht, will meist keinen abstrakten Baukasten, sondern einen Anbieter, der Region, Sprache, Mittelstand und lokale Entscheidungswege versteht. Diese Signale gehören sichtbar in Seitenstruktur, Copy und Schema.",
      },
    ],
    faq: [
      {
        question: "Bietet FPZ Webdesign direkt für Bochum an?",
        answer:
          "Ja. FPZ arbeitet aus dem Ruhrgebiet mit Fokus auf Bochum, Waltrop, NRW und deutschlandweite Projekte.",
      },
      {
        question: "Was gehört zu einer Website von FPZ?",
        answer:
          "Dazu gehören Struktur, Design, technische Umsetzung, responsive Darstellung, Performance-Basis und klare Kontaktwege.",
      },
    ],
  },
  {
    slug: "ki-automatisierung-ruhrgebiet",
    title: "KI Automatisierung Ruhrgebiet - Workflows und Integrationen",
    description:
      "FPZ entwickelt KI-Automatisierungen, API-Anbindungen und Workflows für Unternehmen im Ruhrgebiet, Bochum, Waltrop, NRW und deutschlandweit.",
    ogTitle: "KI Automatisierung im Ruhrgebiet",
    ogDescription:
      "Automatisierte Workflows, KI-Integrationen, Webhooks und Datenübergaben für wiederkehrende Unternehmensprozesse.",
    kicker: "KI · Automatisierung · Ruhrgebiet",
    h1: "KI-Automatisierung im Ruhrgebiet für wiederkehrende Arbeitsschritte.",
    intro:
      "FPZ automatisiert Abläufe, die im Alltag Zeit kosten: E-Mail-Prozesse, Datenübergaben, API-Anbindungen, Webhooks und KI-gestützte Zwischenschritte für kleine und mittlere Unternehmen.",
    serviceName: "KI-Automatisierung Ruhrgebiet",
    region: "Ruhrgebiet",
    parentPath: "/web-ki",
    parentLabel: "Web & KI",
    facts: [
      "Schwerpunkte: API-Anbindungen, Webhooks, n8n, Zapier und KI-Systeme.",
      "Region: Waltrop, Bochum, Ruhrgebiet, NRW und deutschlandweit.",
      "Ziel: weniger manuelle Arbeit, klarere Datenflüsse und wartbare Prozesse.",
    ],
    sections: [
      {
        title: "Welche Prozesse sich eignen",
        body:
          "Geeignet sind wiederkehrende Schritte mit klaren Regeln: Anfrageverteilung, E-Mail-Antworten, CRM-Übergaben, Reporting, Dateiablage, Lead-Qualifizierung oder interne Benachrichtigungen.",
      },
      {
        title: "Wie FPZ Automatisierungen plant",
        body:
          "Vor der Umsetzung wird der reale Ablauf geklärt. Danach entstehen ein schlanker Workflow, saubere Übergabepunkte und eine Lösung, die später erweitert werden kann, ohne den gesamten Prozess neu zu bauen.",
      },
    ],
    faq: [
      {
        question: "Automatisiert FPZ bestehende Tools?",
        answer:
          "Ja. FPZ verbindet bestehende Systeme über APIs, Webhooks, n8n, Zapier oder individuelle Integrationen.",
      },
      {
        question: "Ist KI-Automatisierung nur für große Unternehmen sinnvoll?",
        answer:
          "Nein. Gerade kleine und mittlere Unternehmen profitieren, wenn wiederkehrende Aufgaben zuverlässig automatisiert werden.",
      },
    ],
  },
  {
    slug: "webdesign-ruhrgebiet",
    title: "Webdesign Ruhrgebiet - Websites, Struktur und Conversion",
    description:
      "FPZ erstellt Websites und Webdesign für Unternehmen im Ruhrgebiet, NRW und deutschlandweit - mit klarer Informationsarchitektur und Anfrage-Fokus.",
    ogTitle: "Webdesign im Ruhrgebiet",
    ogDescription:
      "Websites für Unternehmen im Ruhrgebiet: klare Struktur, modernes Design, schnelle Umsetzung und nachvollziehbare Kontaktwege.",
    kicker: "Webdesign · Ruhrgebiet · NRW",
    h1: "Webdesign im Ruhrgebiet mit klarer Struktur und Anfrage-Fokus.",
    intro:
      "FPZ entwickelt Websites für Unternehmen im Ruhrgebiet, die Leistungen verständlich machen und aus Besuchern qualifizierte Anfragen machen.",
    serviceName: "Webdesign Ruhrgebiet",
    region: "Ruhrgebiet",
    parentPath: "/web-ki",
    parentLabel: "Web & KI",
    facts: [
      "Für lokale Unternehmen, Dienstleister, B2B-Angebote und Marken.",
      "Umsetzung mit moderner Frontend-Technik und sauberer Performance-Basis.",
      "Inhalte, Navigation und Kontaktwege werden auf reale Suchintentionen ausgerichtet.",
    ],
    sections: [
      {
        title: "Webdesign ist mehr als Oberfläche",
        body:
          "Eine gute Website ordnet Angebote, beantwortet Einwände, macht Kontakt leicht und lädt schnell. Design ist dabei wichtig, aber nur wirksam, wenn Struktur und Inhalt mitarbeiten.",
      },
      {
        title: "Regionale Relevanz sichtbar machen",
        body:
          "Für Suchmaschinen und Antwortsysteme müssen Region, Leistung, Anbieter und Kontakt eindeutig zusammenpassen. Deshalb verbindet FPZ sichtbare Inhalte mit sauberem Schema und konsistenten Metadaten.",
      },
    ],
    faq: [
      {
        question: "Erstellt FPZ Websites für das gesamte Ruhrgebiet?",
        answer:
          "Ja. FPZ arbeitet mit Fokus auf Waltrop, Bochum, Ruhrgebiet und NRW. Deutschlandweite Projekte sind ebenfalls möglich.",
      },
      {
        question: "Wird SEO bei der Website-Struktur berücksichtigt?",
        answer:
          "Ja. Seitenstruktur, Überschriften, Metadaten, Schema und interne Verlinkung werden gemeinsam gedacht.",
      },
    ],
  },
  {
    slug: "produktfotografie-bochum",
    title: "Produktfotografie Bochum - Bilder für Shop, Website und Marketing",
    description:
      "FPZ produziert Produktfotografie für Bochum, Ruhrgebiet und NRW - hochwertige Bilder für Websites, Online-Shops, Kataloge und Marketingmaterial.",
    ogTitle: "Produktfotografie Bochum von FPZ",
    ogDescription:
      "Produktbilder für Shop, Website, Katalog und Marketing im Ruhrgebiet, Bochum und NRW.",
    kicker: "Produktfotografie · Bochum · NRW",
    h1: "Produktfotografie Bochum für Produkte, die online klar wirken müssen.",
    intro:
      "FPZ produziert Produktbilder für Unternehmen, Shops und Marken in Bochum und NRW. Ziel sind saubere, vielseitig nutzbare Motive für Website, Katalog, Shop und Kampagne.",
    serviceName: "Produktfotografie Bochum",
    region: "Bochum",
    parentPath: "/foto-video",
    parentLabel: "Foto & Video",
    facts: [
      "Output für Online-Shops, Websites, Kataloge, Social Media und Print.",
      "Region: Bochum, Waltrop, Ruhrgebiet, NRW und deutschlandweite Einsätze.",
      "Fokus: klare Darstellung, markentaugliche Bildsprache und flexible Nutzung.",
    ],
    sections: [
      {
        title: "Produktbilder mit Nutzungsziel",
        body:
          "Vor dem Shooting wird geklärt, wo die Bilder funktionieren müssen: Shop-Kachel, Website-Hero, Social Ad, Print-Katalog oder Präsentation. Daraus entstehen Format, Licht, Hintergrund und Bildserie.",
      },
      {
        title: "Warum echte Motive wichtig sind",
        body:
          "Für Vertrauen, SEO und Markenwirkung sind eigene Bilder stärker als austauschbare Stock-Motive. Sie zeigen Produkt, Qualität und Anbieter eindeutig.",
      },
    ],
    faq: [
      {
        question: "Bietet FPZ Produktfotografie in Bochum an?",
        answer:
          "Ja. FPZ produziert Produktfotografie mit Fokus auf Bochum, Ruhrgebiet, NRW und deutschlandweite Projekte.",
      },
      {
        question: "Für welche Kanäle werden Produktbilder vorbereitet?",
        answer:
          "Typische Einsatzbereiche sind Online-Shop, Website, Katalog, Social Media, Präsentationen und Marketingmaterial.",
      },
    ],
  },
  {
    slug: "imagefilm-nrw",
    title: "Imagefilm NRW - Unternehmensfilm und Markenfilm",
    description:
      "FPZ produziert Imagefilme und Unternehmensfilme für NRW, Bochum, Ruhrgebiet und deutschlandweit - von Idee und Konzept bis Schnitt.",
    ogTitle: "Imagefilm NRW von FPZ",
    ogDescription:
      "Imagefilme, Unternehmensfilme und Markenfilme für Websites, Kampagnen und Recruiting in NRW.",
    kicker: "Imagefilm · NRW · Ruhrgebiet",
    h1: "Imagefilm in NRW für Unternehmen, die ihre Geschichte professionell zeigen wollen.",
    intro:
      "FPZ produziert Imagefilme und Unternehmensfilme für Marken, Dienstleister und Unternehmen in NRW. Der Fokus liegt auf klarer Story, professionellem Bild und einem Ergebnis, das auf Website, Social Media und Präsentationen funktioniert.",
    serviceName: "Imagefilm NRW",
    region: "Nordrhein-Westfalen",
    parentPath: "/foto-video",
    parentLabel: "Foto & Video",
    facts: [
      "Für Unternehmensfilm, Markenfilm, Recruiting, Website und Kampagnen.",
      "Region: NRW, Ruhrgebiet, Bochum, Waltrop und deutschlandweite Drehs.",
      "Leistung: Konzept, Dreh, Schnitt und nutzbare Ausgabeformate.",
    ],
    sections: [
      {
        title: "Ein Imagefilm braucht eine klare Aussage",
        body:
          "Vor Kamera und Schnitt steht die Frage, was der Film leisten soll: Vertrauen aufbauen, Bewerber überzeugen, ein Produkt erklären oder eine Marke sichtbar machen.",
      },
      {
        title: "Produktion ohne unnötigen Overhead",
        body:
          "FPZ plant kompakte Produktionen mit klarer Vorbereitung, mobilem Setup und direkter Abstimmung, damit der Film professionell wirkt und trotzdem handhabbar bleibt.",
      },
    ],
    faq: [
      {
        question: "Produziert FPZ Imagefilme in NRW?",
        answer:
          "Ja. FPZ produziert Imagefilme und Unternehmensfilme in NRW, im Ruhrgebiet und deutschlandweit.",
      },
      {
        question: "Wo kann ein Imagefilm eingesetzt werden?",
        answer:
          "Typische Kanäle sind Website, Karriereseite, Social Media, Präsentationen, Kampagnen und Vertrieb.",
      },
    ],
  },
  {
    slug: "event-dokumentation-ruhrgebiet",
    title: "Event-Dokumentation Ruhrgebiet - Foto und Video für Veranstaltungen",
    description:
      "FPZ dokumentiert Events, Launches, Feiern und Konferenzen im Ruhrgebiet, Bochum und NRW mit professionellem Foto- und Video-Output.",
    ogTitle: "Event-Dokumentation im Ruhrgebiet",
    ogDescription:
      "Foto- und Video-Dokumentation für Events, Konferenzen, Launches und Unternehmensveranstaltungen im Ruhrgebiet.",
    kicker: "Event-Dokumentation · Ruhrgebiet",
    h1: "Event-Dokumentation im Ruhrgebiet für Veranstaltungen, die weiterwirken sollen.",
    intro:
      "FPZ begleitet Events im Ruhrgebiet mit Foto und Video, damit aus einer Veranstaltung verwertbarer Content für Website, Social Media, Presse, Recruiting und interne Kommunikation entsteht.",
    serviceName: "Event-Dokumentation Ruhrgebiet",
    region: "Ruhrgebiet",
    parentPath: "/foto-video",
    parentLabel: "Foto & Video",
    facts: [
      "Für Konferenzen, Launches, Feiern, Unternehmensveranstaltungen und Kampagnen.",
      "Region: Ruhrgebiet, Bochum, Waltrop, NRW und deutschlandweite Einsätze.",
      "Output: Bilder, Kurzclips, Highlight-Material und Content-Pakete.",
    ],
    sections: [
      {
        title: "Event-Content muss schnell nutzbar sein",
        body:
          "Nach einem Event zählt Tempo. FPZ plant Motive, Ablauf und Ausgabeformate so, dass die wichtigsten Inhalte zeitnah für Website, Social Media und Kommunikation bereitstehen.",
      },
      {
        title: "Dokumentation mit Markenblick",
        body:
          "Gute Event-Dokumentation zeigt nicht nur, dass etwas stattgefunden hat. Sie transportiert Stimmung, Menschen, Raum, Marke und die relevanten Momente.",
      },
    ],
    faq: [
      {
        question: "Dokumentiert FPZ Events im Ruhrgebiet?",
        answer:
          "Ja. FPZ dokumentiert Veranstaltungen im Ruhrgebiet, in Bochum, NRW und bei Bedarf deutschlandweit.",
      },
      {
        question: "Welche Ergebnisse liefert eine Event-Dokumentation?",
        answer:
          "Je nach Projekt entstehen Bilder, Highlight-Clips, Social-Media-Content, Website-Material und Material für interne oder externe Kommunikation.",
      },
    ],
  },
]

export function getLocalSeoPage(slug: string) {
  return localSeoPages.find((page) => page.slug === slug)
}

export function localSeoMetadata(page: LocalSeoPage): Metadata {
  const canonical = `/${page.slug}`
  const image = ogImageUrl(page.ogTitle, page.kicker)

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    robots: defaultRobots,
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: canonical,
      title: page.ogTitle,
      description: page.ogDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${page.ogTitle} - FPZ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle,
      description: page.ogDescription,
      images: [image],
    },
  }
}

export function localServiceJsonLd(page: LocalSeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/${page.slug}`)}#service`,
    name: page.serviceName,
    description: page.description,
    serviceType: page.serviceName,
    provider: {
      "@id": `${site.url}/#organization`,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: page.region,
      },
      {
        "@type": "AdministrativeArea",
        name: "Ruhrgebiet",
      },
      {
        "@type": "AdministrativeArea",
        name: "Nordrhein-Westfalen",
      },
    ],
    url: absoluteUrl(`/${page.slug}`),
  }
}
