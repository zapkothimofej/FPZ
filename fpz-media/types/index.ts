import type {
  Lead as PrismaLead,
  WebsiteAnalysis,
  Briefing,
  SalesScript,
  ScanLog,
  Settings,
} from "@/generated/prisma/client";

export type { PrismaLead as Lead, WebsiteAnalysis, Briefing, SalesScript, ScanLog, Settings };

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
  recentLeads: Array<PrismaLead & { analysis: { overallScore: number } | null }>;
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
