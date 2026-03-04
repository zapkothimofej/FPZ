# PRD: FPZ LeadFinder — Vollständige Spezifikation (V2)

**Datum:** 2026-03-04
**Status:** Final
**Stories:** 45
**Autor:** Thimofej (Tech Lead)
**Nutzer:** Stevan (Sales), Thimofej (Tech)

---

## 1. Produktvision

FPZ LeadFinder ist ein internes Sales-Tool für FPC-Media. Es findet automatisch Unternehmen im Ruhrgebiet (20+ Städte), bewertet deren Websites umfassend (9 Kategorien, 0-100 Score mit Ampel-System), generiert personalisierte Sales-Briefings und Verkaufsskripte per KI (Groq/HuggingFace, gratis), bietet ein Mini-CRM Dashboard mit Pipeline-Funnel, und ermöglicht PDF/CSV Export. Web-App (Next.js 16) + Android-App (Expo/React Native).

---

## 2. User Stories (45 total)

### Phase 1: Fundament (US-001 bis US-003)
- US-001: Next.js 16 Projekt mit allen Dependencies und Ordnerstruktur
- US-002: Prisma Schema mit 6 Models (Lead, WebsiteAnalysis, Briefing, SalesScript, ScanLog, Settings)
- US-003: TypeScript Types, Constants (20 Städte, 30+ Kategorien, Score Weights), Utilities

### Phase 2: Layout & Dashboard (US-004 bis US-009)
- US-004: Dark Mode Layout mit collapsible Sidebar + responsive Bottom-Tab
- US-005: 4 Statistik-Cards mit Trend-Indikatoren
- US-006: Bar-Chart Top 10 Städte (Recharts)
- US-007: Letzte 10 Leads mit Score-Ampel
- US-008: Sales Pipeline Funnel
- US-009: Dashboard Layout zusammensetzen mit Suspense

### Phase 3: Lead-Management (US-010 bis US-016)
- US-010: Lead-Liste DataTable mit @tanstack/react-table, Sortierung, Pagination
- US-011: Filter-Bar: Multi-Select Stadt/Branche/Status, Score-Slider, Freitext-Suche, URL-Params
- US-012: Lead-Detail Kontaktdaten, Status-Dropdown (Server Action), Notizen
- US-013: Score Dashboard mit 9 Ring-Progress Komponenten
- US-014: Briefing-Anzeige mit Schwachstellen, Vorschlägen, Gesprächseinstieg
- US-015: Verkaufsskript als Step-by-Step Leitfaden mit Einwandbehandlung-Accordion
- US-016: Lead-Detail Gesamtlayout mit Tabs

### Phase 4: Backend — Scraping (US-017 bis US-019)
- US-017: OpenStreetMap Overpass API Scraper (20 Städte, 6 Kategorien)
- US-018: Google Maps HTTP Scraper (Fallback, kein Puppeteer)
- US-019: Scraper Orchestrierung mit Status-Tracking und API Routes

### Phase 5: Backend — Analyse (US-020 bis US-024)
- US-020: Performance Analyzer (PageSpeed Insights API)
- US-021: SEO Analyzer (11 Checks, gewichtet)
- US-022: Security + Tech-Stack Analyzer (CMS/Framework-Erkennung)
- US-023: Design-Alter + Content Analyzer (KI-bewertung)
- US-024: Analyse-Orchestrierung (parallel) + Scoring-Berechnung

### Phase 6: Backend — KI (US-025 bis US-027)
- US-025: Groq Client + HuggingFace Fallback mit Rate Limiting
- US-026: Briefing-Generierung (strukturiertes JSON)
- US-027: Verkaufsskript-Generierung (6 Schritte, 4+ Einwände)

### Phase 7: Automatisierung & Export (US-028 bis US-030)
- US-028: Täglicher Cron Job (Vercel Cron, Batching)
- US-029: PDF Export mit FPC-Media Branding (4 Seiten)
- US-030: CSV Export mit Filtern und UTF-8 BOM

### Phase 8: Weitere UI-Seiten (US-031 bis US-032)
- US-031: Scan-Seite mit Stadt-Auswahl und Live-Fortschritt
- US-032: Einstellungen mit API Keys, Scoring-Slider, DB-Cleanup

### Phase 9: UX Polish (US-033 bis US-038)
- US-033: Toast Notifications (Sonner)
- US-034: Seed Data (50 Leads, Analysen, Briefings)
- US-035: Error Boundaries + Loading States für alle Seiten
- US-036: Lead löschen + Bulk-Aktionen
- US-037: Lead manuell hinzufügen
- US-038: Keyboard Shortcuts

### Phase 10: Android App (US-039 bis US-043)
- US-039: Expo Projekt + Tab Navigation
- US-040: Dashboard Screen
- US-041: Lead-Liste + Detail Screen
- US-042: Scan + Settings Screen
- US-043: Web API Route für Mobile (/api/dashboard)

### Phase 11: Deployment (US-044 bis US-045)
- US-044: Responsive Feinschliff + Design Polish
- US-045: Vercel Deployment Config + Turso Migration

---

## 3. Tech Stack

| Komponente | Technologie | Kosten |
|-----------|-------------|--------|
| Web Frontend | Next.js 16, React 19, Tailwind v4, shadcn/ui | Gratis |
| Web Backend | Next.js API Routes (serverless) | Gratis |
| Datenbank | SQLite (Dev) / Turso (Prod) + Prisma ORM | Gratis |
| Lead-Quellen | OpenStreetMap Overpass API + Google Maps HTTP Scraping | Gratis |
| Website-Analyse | PageSpeed Insights API + Cheerio HTML Scraping | Gratis |
| KI | Groq API (Llama 3.3 70B) + HuggingFace Inference API | Gratis |
| Charts | Recharts | Gratis |
| PDF Export | jsPDF | Gratis |
| Tables | @tanstack/react-table | Gratis |
| Toasts | Sonner | Gratis |
| Mobile App | Expo / React Native | Gratis |
| Hosting | Vercel (Hobby Tier) | Gratis |
| Cron | Vercel Cron (1x/Tag) | Gratis |

---

## 4. Design System

- **Theme:** Dark Mode Default (zinc-950 body, zinc-900 cards, zinc-800 borders)
- **Accent:** Blue-500 (#3b82f6) für Primary Actions
- **Score-Ampel:** Red (#ef4444) 0-40, Yellow (#eab308) 41-70, Green (#22c55e) 71-100
- **Status:** New=grau, Contacted=blau, Offer=gelb, Won=grün, Rejected=rot, Archived=grau
- **Typography:** Geist Font, text-zinc-50 (primary), text-zinc-400 (secondary)
- **Components:** shadcn/ui durchgehend
- **Animations:** Subtle — fade transitions, skeleton shimmer, score ring fill
