// FPZ-Media shared content in German

export const manifesto = {
  line1: "Wir bauen keine Webseiten.",
  line2: "Wir bauen deinen unfairen Vorteil.",
  sub: "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
}

export const services = [
  {
    id: "web",
    number: "01",
    title: "Webentwicklung",
    headline: "Dein digitales Schaufenster — entwickelt, um zu konvertieren.",
    description:
      "Wir bauen schnelle, moderne Webseiten, die nicht nur gut aussehen — sie funktionieren. Von einer einfachen Landingpage bis zu komplexen Multi-Page-Seiten wird alles auf Geschwindigkeit, SEO und echte Ergebnisse optimiert.",
    deliverables: [
      "Maßgeschneiderte Next.js Webseiten",
      "Mobile-First Responsive Design",
      "Performance-Optimierung (Core Web Vitals)",
      "SEO-Grundlagen & Meta-Setup",
      "CMS-Integration auf Anfrage",
    ],
    icon: "Monitor",
  },
  {
    id: "media",
    number: "02",
    title: "Medienproduktion",
    headline: "Inhalte, die das Scrollen stoppen.",
    description:
      "Professionelle Fotografie und Videografie, passend zu deiner Marke. Ob ein 60-Sekunden-Markenfilm oder ein komplettes Produkt-Shooting, wir liefern Inhalte, die deine Zielgruppe wirklich sieht.",
    deliverables: [
      "Marken- & Produktfotografie",
      "Kurzvideos für Social Media (Reels/TikTok)",
      "Imagefilme / Markenfilme",
      "Drohnenaufnahmen (auf Anfrage)",
      "Postproduktion & Color Grading",
    ],
    icon: "Camera",
  },
  {
    id: "automation",
    number: "03",
    title: "Automation",
    headline: "Dein Unternehmen auf Autopilot.",
    description:
      "Mit n8n-Workflows automatisieren wir das, was deine Zeit verschwendet — Lead-Erfassung, Follow-up-E-Mails, CRM-Updates und mehr. Einmal einrichten, für immer laufen lassen.",
    deliverables: [
      "Kontaktformular → CRM Automation",
      "Lead-Generierungs-Workflows",
      "E-Mail Follow-up Sequenzen",
      "WhatsApp / Benachrichtigungs-Integrationen",
      "Individuelle n8n-Workflow-Erstellung",
    ],
    icon: "Zap",
  },
]

export const process = [
  {
    step: "01",
    title: "Verstehen",
    description:
      "Wir beginnen mit einer kostenlosen Beratung. Wir lernen dein Unternehmen, deine Ziele und deine Zielgruppe kennen, bevor wir überhaupt an Design denken.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wir designen transparent. Du siehst jede Iteration. Feedback-Schleifen sind schnell und nichts geht online ohne deine Freigabe.",
  },
  {
    step: "03",
    title: "Bauen",
    description:
      "Sauberer Code, echte Performance. Wir bauen mit den besten Tools — Next.js, Tailwind, n8n — nicht mit überladenen Page Buildern.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Wir übernehmen Deployment, Domain-Setup und den Go-Live. Auch nach dem Launch sind wir für Fragen und schnelle Anpassungen da.",
  },
]

export const stats = [
  { value: "3", label: "Kernleistungen" },
  { value: "100%", label: "Lokal im Ruhrgebiet" },
  { value: "1", label: "Partner für Alles" },
  { value: "∞", label: "Ambition" },
]

export const pricing = [
  {
    name: "Starter",
    price: "699€",
    description: "Die unverzichtbare digitale Präsenz für Unternehmen, die gerade erst starten.",
    features: [
      "1-Seiten Website (maßgeschneidert)",
      "Mobile Optimierung",
      "Kontaktformular (n8n)",
      "Basis SEO",
      "Deployment inklusive",
    ],
    cta: "Loslegen",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "1.500€",
    description: "Komplettes Digital-Paket: Website, Medien und Automation.",
    features: [
      "Mehrseitige Website (maßgeschneidert)",
      "Professionelles Fotoshooting",
      "Markenvideo / Reel",
      "Erweitertes SEO",
      "n8n Lead Automation",
      "2 Revisionsrunden",
    ],
    cta: "Beliebteste Wahl",
    highlighted: true,
  },
  {
    name: "Complete",
    price: "2.000€",
    description: "Die komplette digitale Transformation. Alles, richtig gemacht.",
    features: [
      "Alles aus Professional",
      "Individuelle Automation-Workflows",
      "Drohnenaufnahmen (falls nötig)",
      "Prioritäts-Support (30 Tage)",
      "Monatlicher Abstimmungs-Call",
      "Unbegrenzte Revisionen während des Baus",
    ],
    cta: "Lass uns reden",
    highlighted: false,
  },
]

export type PortfolioItem = {
  id: number
  slug: string
  title: string
  industry: string
  tags: string[]
  size: "large" | "medium" | "small"
  year: number
  tagline: string
  description: string
  challenge: string
  solution: string
  metrics: { label: string; value: string }[]
  result: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1, slug: "handwerk-digital",
    title: "Handwerk Digital", industry: "Handwerk",
    tags: ["Web", "Media"], size: "large", year: 2024,
    tagline: "Komplette Online-Präsenz für ein Handwerksunternehmen.",
    description: "Ein regionales Handwerksunternehmen aus dem Ruhrgebiet hatte keine digitale Präsenz. Wir haben Website, Imagefilm und automatisierte Anfragen-Pipeline in einem Paket geliefert.",
    challenge: "Kein Web-Auftritt, Anfragen nur per Telefon, kein System für Follow-ups.",
    solution: "Neue Website mit SEO-Optimierung, professioneller Imagefilm, automatisierte Anfragen-Pipeline via n8n.",
    metrics: [{ label: "Mehr Anfragen", value: "+70%" }, { label: "Lieferzeit", value: "3 Wo." }, { label: "Google Platz", value: "Top 3" }],
    result: "+70% Anfragen",
  },
  {
    id: 2, slug: "restaurant-kampagne",
    title: "Restaurant Kampagne", industry: "Gastronomie",
    tags: ["Media", "Auto"], size: "small", year: 2024,
    tagline: "Social-Media-Content mit automatisierter Posting-Pipeline.",
    description: "Monatliche Reel-Pakete für ein lokales Restaurant — von Konzept bis zum fertigen Video. Mit n8n-Automation wird automatisch zum besten Zeitpunkt gepostet.",
    challenge: "Kein professioneller Social-Media-Auftritt, unregelmäßige Posts, geringe Reichweite.",
    solution: "Monatliche Videoproduktion (6 Reels/Monat), automatischer Post-Schedule via n8n.",
    metrics: [{ label: "Mehr Reichweite", value: "4×" }, { label: "Reels/Monat", value: "6" }, { label: "Follower +", value: "+340" }],
    result: "4× Reichweite",
  },
  {
    id: 3, slug: "einzelhandel-launch",
    title: "Einzelhandel Launch", industry: "Einzelhandel",
    tags: ["Web", "Auto"], size: "small", year: 2025,
    tagline: "Online-Shop Launch mit automatisierter Bestell- und Lagerlogik.",
    description: "Ein lokales Modegeschäft wollte online verkaufen. Wir haben den Shop gebaut und alle Prozesse — Bestellbestätigung, Lagersync, Rechnungen — vollständig automatisiert.",
    challenge: "Nur stationärer Handel, keine Online-Einnahmen, manuelle Prozesse.",
    solution: "Shopify-Shop Setup, n8n-Automation für Bestellungen, Lager und Rechnungen.",
    metrics: [{ label: "Launch in", value: "3 Wo." }, { label: "Auto. Prozesse", value: "100%" }, { label: "Erste Bestellung", value: "Tag 1" }],
    result: "Launch in 3 Wochen",
  },
  {
    id: 4, slug: "lokale-brand-identity",
    title: "Lokale Brand Identity", industry: "Dienstleistung",
    tags: ["Web", "Media"], size: "medium", year: 2024,
    tagline: "Komplette Markenentwicklung: Logo, Website, Imagefilm.",
    description: "Ein Dienstleistungsunternehmen brauchte eine komplette Neupositionierung. Wir haben Marke, Website und Imagefilm von Grund auf entwickelt — konsistent und professionell.",
    challenge: "Veraltetes Erscheinungsbild, keine klare Markenidentität, unprofessioneller Auftritt.",
    solution: "Logo-Design, Farb-/Schriftsystem, neue Website, 90-Sekunden-Imagefilm.",
    metrics: [{ label: "Termin-Anfragen", value: "+40%" }, { label: "Absprungrate", value: "-35%" }, { label: "Video Views", value: "2.400" }],
    result: "+40% Anfragen",
  },
  {
    id: 5, slug: "fitness-studio",
    title: "Fitness Studio", industry: "Sport & Wellness",
    tags: ["Web", "Media", "Auto"], size: "medium", year: 2025,
    tagline: "Mitglieder-Webportal, Kursbuchung und automatisierte Kommunikation.",
    description: "Ein Fitnessstudio mit 450 Mitgliedern brauchte ein digitales System für Kursbuchungen und automatisierte Mitglieder-Kommunikation. Wir haben alles in einem Webportal gebündelt.",
    challenge: "Kursbuchungen per Telefon/WhatsApp, keine automatischen Erinnerungen, hohe No-Show-Rate.",
    solution: "Custom-Webportal mit Buchungssystem, automatische SMS/Mail-Erinnerungen via n8n.",
    metrics: [{ label: "Mehr Buchungen", value: "+35%" }, { label: "No-Show Rate", value: "-60%" }, { label: "Aktive Mitglieder", value: "450" }],
    result: "+35% Buchungen",
  },
  {
    id: 6, slug: "immobilien-portal",
    title: "Immobilien Portal", industry: "Immobilien",
    tags: ["Web", "Auto"], size: "small", year: 2025,
    tagline: "Property-Listing-Website mit automatisiertem Exposé-Versand.",
    description: "Ein Immobilienmakler brauchte eine professionelle Listing-Website und einen automatischen Exposé-Versand-Prozess — ohne manuelle PDF-Anhänge per E-Mail.",
    challenge: "Veraltete Website, manueller Exposé-Versand per E-Mail, langsame Reaktionszeit.",
    solution: "Neue Listing-Website, automatischer Exposé-PDF-Versand per n8n sobald Anfrage eingeht.",
    metrics: [{ label: "Ø Verkaufszeit", value: "12 Tage" }, { label: "Anfragezeit", value: "< 5 Min." }, { label: "Exposé-Auto.", value: "100%" }],
    result: "Ø 12 Tage Verkauf",
  },
]

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug)
}

export function getPortfolioSlugs(): string[] {
  return portfolioItems.map((p) => p.slug)
}
