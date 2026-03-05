import type { City, LeadStatus, ScoreCategory, StatusConfig } from "@/types";

// --- 20 Städte im Ruhrgebiet mit Koordinaten ---

export const RUHRGEBIET_CITIES: City[] = [
  { name: "Bochum", lat: 51.4818, lng: 7.2162, radius: 8 },
  { name: "Dortmund", lat: 51.5136, lng: 7.4653, radius: 12 },
  { name: "Essen", lat: 51.4556, lng: 7.0116, radius: 11 },
  { name: "Duisburg", lat: 51.4344, lng: 6.7623, radius: 10 },
  { name: "Gelsenkirchen", lat: 51.5177, lng: 7.0857, radius: 7 },
  { name: "Oberhausen", lat: 51.4963, lng: 6.8528, radius: 6 },
  { name: "Mülheim an der Ruhr", lat: 51.4272, lng: 6.8825, radius: 5 },
  { name: "Herne", lat: 51.5369, lng: 7.2211, radius: 5 },
  { name: "Hagen", lat: 51.3671, lng: 7.4633, radius: 8 },
  { name: "Hamm", lat: 51.6739, lng: 7.816, radius: 8 },
  { name: "Witten", lat: 51.437, lng: 7.335, radius: 5 },
  { name: "Hattingen", lat: 51.3989, lng: 7.1853, radius: 4 },
  { name: "Recklinghausen", lat: 51.6141, lng: 7.1979, radius: 6 },
  { name: "Bottrop", lat: 51.5247, lng: 6.9286, radius: 5 },
  { name: "Marl", lat: 51.6561, lng: 7.0903, radius: 5 },
  { name: "Castrop-Rauxel", lat: 51.5547, lng: 7.3117, radius: 4 },
  { name: "Gladbeck", lat: 51.5706, lng: 6.9856, radius: 4 },
  { name: "Lünen", lat: 51.6166, lng: 7.5286, radius: 5 },
  { name: "Unna", lat: 51.5347, lng: 7.6889, radius: 5 },
  { name: "Schwerte", lat: 51.4464, lng: 7.5681, radius: 4 },
];

// --- 35 Branchen-Kategorien ---

export const BUSINESS_CATEGORIES: string[] = [
  "Restaurant",
  "Café",
  "Bäckerei",
  "Metzgerei",
  "Friseur",
  "Kosmetikstudio",
  "Zahnarzt",
  "Arzt",
  "Apotheke",
  "Physiotherapie",
  "Rechtsanwalt",
  "Steuerberater",
  "Versicherung",
  "Immobilienmakler",
  "Handwerker",
  "Elektriker",
  "Klempner",
  "Maler",
  "Dachdecker",
  "Autowerkstatt",
  "Fahrschule",
  "Fitnessstudio",
  "Optiker",
  "Blumenladen",
  "Reinigung",
  "Schlüsseldienst",
  "Fotograf",
  "Reisebüro",
  "Tierarzt",
  "Buchhandlung",
  "Juwelier",
  "Schuhgeschäft",
  "Bekleidungsgeschäft",
  "Möbelhaus",
  "Hotel",
];

// --- Score Gewichtung (Summe = 1.0) ---

export const SCORE_WEIGHTS: Record<ScoreCategory, number> = {
  performance: 0.15,
  seo: 0.15,
  mobile: 0.15,
  security: 0.1,
  design: 0.15,
  tech: 0.1,
  age: 0.05,
  accessibility: 0.1,
  content: 0.05,
};

// --- Score Ampel Schwellwerte ---

export const SCORE_THRESHOLDS = {
  red: 40, // 0–40 = rot
  yellow: 70, // 41–70 = gelb, 71–100 = grün
} as const;

// --- Status Konfiguration ---

export const STATUS_CONFIG: Record<LeadStatus, StatusConfig> = {
  NEW: {
    label: "Neu",
    color: "#6b7280",
    bgColor: "bg-zinc-700",
    textColor: "text-zinc-300",
  },
  CONTACTED: {
    label: "Kontaktiert",
    color: "#3b82f6",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
  },
  OFFER_SENT: {
    label: "Angebot",
    color: "#f59e0b",
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-400",
  },
  WON: {
    label: "Gewonnen",
    color: "#22c55e",
    bgColor: "bg-green-500/20",
    textColor: "text-green-400",
  },
  REJECTED: {
    label: "Abgelehnt",
    color: "#ef4444",
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
  },
  ARCHIVED: {
    label: "Archiviert",
    color: "#9ca3af",
    bgColor: "bg-zinc-600/20",
    textColor: "text-zinc-400",
  },
};

// --- OSM Kategorie-Mapping (englisch → deutsch) ---

export const OSM_CATEGORY_MAP: Record<string, string> = {
  bakery: "Bäckerei",
  restaurant: "Restaurant",
  cafe: "Café",
  bar: "Bar",
  fast_food: "Schnellimbiss",
  hairdresser: "Friseur",
  beauty: "Kosmetikstudio",
  dentist: "Zahnarzt",
  doctors: "Arzt",
  pharmacy: "Apotheke",
  physiotherapist: "Physiotherapie",
  lawyer: "Rechtsanwalt",
  tax_advisor: "Steuerberater",
  insurance: "Versicherung",
  estate_agent: "Immobilienmakler",
  electrician: "Elektriker",
  plumber: "Klempner",
  painter: "Maler",
  roofer: "Dachdecker",
  car_repair: "Autowerkstatt",
  driving_school: "Fahrschule",
  fitness_centre: "Fitnessstudio",
  optician: "Optiker",
  florist: "Blumenladen",
  dry_cleaning: "Reinigung",
  locksmith: "Schlüsseldienst",
  photographer: "Fotograf",
  travel_agency: "Reisebüro",
  veterinary: "Tierarzt",
  books: "Buchhandlung",
  jewelry: "Juwelier",
  shoes: "Schuhgeschäft",
  clothes: "Bekleidungsgeschäft",
  furniture: "Möbelhaus",
  hotel: "Hotel",
  guest_house: "Pension",
  supermarket: "Supermarkt",
  butcher: "Metzgerei",
  bank: "Bank",
  fuel: "Tankstelle",
};

// --- Score Kategorie Labels ---

export const SCORE_CATEGORY_LABELS: Record<ScoreCategory, string> = {
  performance: "Performance",
  seo: "SEO",
  mobile: "Mobile",
  security: "Sicherheit",
  design: "Design",
  tech: "Technik",
  age: "Alter",
  accessibility: "Barrierefreiheit",
  content: "Content",
};

// --- Score Kategorie → Analysis Field Mapping ---

export const SCORE_FIELD_MAP: Record<ScoreCategory, string> = {
  performance: "performanceScore",
  seo: "seoScore",
  mobile: "mobileScore",
  security: "securityScore",
  design: "designScore",
  tech: "techScore",
  age: "ageScore",
  accessibility: "accessibilityScore",
  content: "contentScore",
};
