# US-003: Types, Constants und Utilities

## Exakte Datei: src/types/index.ts

```typescript
export type {
  Lead,
  WebsiteAnalysis,
  Briefing,
  SalesScript,
  ScanLog,
  Settings,
} from "@prisma/client";

// --- Status & Source als String Unions (SQLite hat keine Enums) ---

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "OFFER_SENT"
  | "WON"
  | "REJECTED"
  | "ARCHIVED";

export type LeadSource = "OSM" | "GOOGLE_MAPS" | "MANUAL";

export type EffortLevel = "SMALL" | "MEDIUM" | "LARGE";

export type ScoreCategory =
  | "performance"
  | "seo"
  | "mobile"
  | "security"
  | "design"
  | "tech"
  | "age"
  | "accessibility"
  | "content";

export type ScoreColor = "red" | "yellow" | "green" | "gray";

export interface City {
  name: string;
  lat: number;
  lng: number;
  radius: number; // km
}

export interface AnalysisResult {
  score: number;
  details: Record<string, unknown>;
}

export interface ScanResult {
  newLeads: number;
  updatedLeads: number;
  errors: number;
  duration: number;
}

export interface ScrapedLead {
  name: string;
  address: string;
  city: string;
  zip?: string;
  phone?: string;
  email?: string;
  website?: string;
  category: string;
  subcategory?: string;
  googleMapsUrl?: string;
  openingHours?: string;
  latitude?: number;
  longitude?: number;
  source: LeadSource;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface WeaknessItem {
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
}

export interface SuggestionItem {
  title: string;
  description: string;
  service: "web" | "media" | "automation";
}

export interface ObjectionItem {
  objection: string;
  response: string;
}

export interface DashboardData {
  stats: {
    total: { value: number; trend: number };
    newToday: { value: number; trend: number };
    contacted: { value: number; trend: number };
    won: { value: number; trend: number };
  };
  cityChart: Array<{ city: string; count: number }>;
  recentLeads: Array<Lead & { analysis: { overallScore: number } | null }>;
  pipeline: {
    new: number;
    contacted: number;
    offerSent: number;
    won: number;
    rejected: number;
  };
}

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}
```

## Exakte Datei: src/lib/constants.ts

```typescript
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
```

## Exakte Datei: src/lib/utils.ts (komplett ersetzen)

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SCORE_THRESHOLDS } from "./constants";
import type { ScoreColor } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(
  score: number | null | undefined
): ScoreColor {
  if (score == null) return "gray";
  if (score <= SCORE_THRESHOLDS.red) return "red";
  if (score <= SCORE_THRESHOLDS.yellow) return "yellow";
  return "green";
}

export function getScoreColorClass(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "text-red-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    gray: "text-zinc-500",
  };
  return map[getScoreColor(score)];
}

export function getScoreBgClass(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    gray: "bg-zinc-600",
  };
  return map[getScoreColor(score)];
}

export function getScoreDotClass(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    gray: "bg-zinc-600",
  };
  return map[getScoreColor(score)];
}

export function getScoreColorHex(
  score: number | null | undefined
): string {
  const map: Record<ScoreColor, string> = {
    red: "#ef4444",
    yellow: "#eab308",
    green: "#22c55e",
    gray: "#52525b",
  };
  return map[getScoreColor(score)];
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseJsonSafe<T>(
  json: string | null | undefined,
  fallback: T
): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function ensureHttps(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```
