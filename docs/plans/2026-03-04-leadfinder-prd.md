# FPZ LeadFinder — Product Requirements Document

**Datum:** 2026-03-04
**Status:** Draft
**Autor:** Thimofej (Tech Lead)
**Nutzer:** Stevan (Sales), Thimofej (Tech)

---

## 1. Produktvision

FPZ LeadFinder ist ein internes Web-Tool für FPC-Media, das automatisch Unternehmen im Ruhrgebiet findet, deren Websites umfassend bewertet, personalisierte Sales-Briefings generiert und Verkaufsskripte erstellt. Ziel: Stevan kann jeden Tag neue, qualifizierte Leads mit fertigem Briefing und Skript abtelefonieren.

---

## 2. Zielgruppe

- **Primär:** Stevan (Vertrieb) — nutzt Dashboard, Briefings, Skripte täglich
- **Sekundär:** Thimofej (Tech) — Konfiguration, Monitoring, Weiterentwicklung
- Rein internes Tool, kein externer Zugang geplant

---

## 3. Kernfunktionen

### 3.1 Automatische Lead-Erkennung

**Beschreibung:** Die App findet täglich automatisch Unternehmen im Ruhrgebiet (Bochum, Dortmund, Essen, Gelsenkirchen, Duisburg, Oberhausen, Herne, Witten, Hattingen etc.).

**Quellen:**
- **OpenStreetMap Overpass API** (primär) — Geschäfte, Restaurants, Dienstleister, Handwerker, Ärzte etc.
- **Google Maps Scraping** (Fallback) — für Unternehmen die nicht auf OSM sind

**Erkennung:**
- Unternehmen OHNE Website → automatisch Lead (braucht eine Website)
- Unternehmen MIT Website → Website wird analysiert, bei schlechter Bewertung → Lead

**Daten pro Lead:**
- Firmenname
- Adresse
- Telefonnummer (wenn verfügbar)
- Website-URL (wenn vorhanden)
- Branche/Kategorie
- Google Maps Link
- Öffnungszeiten (wenn verfügbar)

**Täglicher Scan:** Vercel Cron Job, 1x pro Tag (nachts), scannt neue Unternehmen und aktualisiert bestehende.

### 3.2 Umfassende Website-Bewertung

**Beschreibung:** Jede gefundene Website wird vollständig analysiert und bewertet. Die Bewertung ist die Grundlage für Briefings und Skripte.

**Analyse-Kategorien:**

| Kategorie | Was wird geprüft | Tool/Methode |
|-----------|-----------------|--------------|
| **Performance** | Ladezeit, First Contentful Paint, Largest Contentful Paint, Total Blocking Time, CLS | Lighthouse API (gratis) |
| **SEO** | Meta-Title, Meta-Description, H1-Tags, Alt-Texte, Sitemap, robots.txt, strukturierte Daten | Eigenes Scraping + Lighthouse |
| **Mobile** | Responsive Design, Viewport Meta-Tag, Touch-Targets, Font-Größen | Lighthouse + eigene Checks |
| **Sicherheit** | HTTPS/SSL, Mixed Content, Security Headers | Eigene Checks |
| **Design** | Veraltetes Design (Tabellen-Layout, Flash, alte CSS-Patterns), visuelle Qualität | Eigene Heuristiken + KI-Bewertung |
| **Technik** | CMS/Framework erkennen, HTML-Validierung, kaputte Links, JavaScript-Fehler | Eigenes Scraping (Wappalyzer-Logik) |
| **Alter** | Letzte Änderung, Copyright-Jahr im Footer, Wayback Machine Check, Tech-Stack-Alter | Eigenes Scraping |
| **Accessibility** | Kontraste, ARIA-Labels, Keyboard-Navigation, Screenreader-Kompatibilität | Lighthouse |
| **Content** | Textqualität, Rechtschreibung, Aktualität der Inhalte, Bildqualität | KI-Bewertung |

**Scoring:**
- Jede Kategorie: 0-100 Punkte
- Gesamt-Score: Gewichteter Durchschnitt
- Ampel-System: Rot (0-40), Gelb (41-70), Grün (71-100)
- Schwachstellen werden priorisiert nach Sales-Relevanz

### 3.3 KI-generierte Briefings

**Beschreibung:** Pro Lead wird automatisch ein Sales-Briefing generiert, das Stevan vor dem Kontakt lesen kann.

**Inhalt eines Briefings:**
- **Zusammenfassung:** 2-3 Sätze wer das Unternehmen ist und was das Hauptproblem ist
- **Schwachstellen-Analyse:** Top 3-5 Probleme der Website, priorisiert
- **Verbesserungsvorschläge:** Konkrete Maßnahmen die FPC-Media anbieten kann
- **Geschätzter Aufwand:** Grobe Einschätzung (klein/mittel/groß)
- **Gesprächseinstieg:** Personalisierter Opener für den Anruf
- **Risiko-Einschätzung:** Wie wahrscheinlich ist der Lead ein Kunde (basierend auf Branche, Website-Zustand etc.)

**KI-Provider (gratis):**
- **Groq API** (primär) — Llama 3 70B, gratis Tier (~30 Requests/Min, 14.400/Tag)
- **HuggingFace Inference API** (Fallback) — Gratis Tier für Textgenerierung

### 3.4 Personalisierte Verkaufsskripte

**Beschreibung:** Pro Lead wird ein Telefon-Skript generiert, das auf den spezifischen Schwachstellen der Website basiert.

**Skript-Struktur:**
1. **Begrüßung:** "Hallo [Name/Firma], hier ist Stevan von FPC-Media..."
2. **Hook:** Bezug auf konkretes Problem ("Mir ist aufgefallen, dass Ihre Website auf dem Handy nicht richtig dargestellt wird...")
3. **Pain Points:** 2-3 weitere Schwachstellen ansprechen
4. **Lösung:** Was FPC-Media konkret machen kann
5. **Call-to-Action:** Terminvereinbarung für kostenloses Beratungsgespräch
6. **Einwandbehandlung:** Häufige Einwände + Antworten (zu teuer, kein Bedarf, haben schon jemanden)

### 3.5 Lead-Dashboard (Mini-CRM)

**Beschreibung:** Übersicht aller Leads mit Status-Tracking.

**Features:**
- **Lead-Liste:** Tabelle mit allen Leads, sortierbar/filterbar nach Stadt, Branche, Score, Status
- **Status-Pipeline:** Neu → Kontaktiert → Angebot gesendet → Kunde gewonnen / Abgelehnt
- **Lead-Detail:** Vollständige Bewertung, Briefing, Skript, Kontaktdaten, Notizen
- **Filter:** Nach Stadt, Branche, Score-Range, Status
- **Suche:** Freitext-Suche über Firmennamen
- **Statistiken:** Anzahl Leads pro Status, Conversion-Rate, Leads pro Stadt

### 3.6 Export

**Formate:**
- **PDF:** Briefing + Skript als druckbares Dokument (für unterwegs)
- **CSV:** Lead-Liste für externe Nutzung

---

## 4. Technische Architektur

### 4.1 Projektstruktur

```
FPZ/
├── fpz-media/              # Bestehende Agentur-Website
├── fpz-media-video/        # Remotion Video
├── fpz-leadfinder/         # Lead-Finder App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── layout.tsx          # App Layout
│   │   │   ├── leads/
│   │   │   │   ├── page.tsx        # Lead-Liste
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx    # Lead-Detail (Bewertung, Briefing, Skript)
│   │   │   └── api/
│   │   │       ├── scan/
│   │   │       │   └── route.ts    # Manuellen Scan starten
│   │   │       ├── cron/
│   │   │       │   └── route.ts    # Täglicher Cron-Endpoint
│   │   │       ├── leads/
│   │   │       │   └── route.ts    # CRUD Leads
│   │   │       ├── analyze/
│   │   │       │   └── route.ts    # Website-Analyse triggern
│   │   │       └── export/
│   │   │           └── route.ts    # PDF/CSV Export
│   │   ├── lib/
│   │   │   ├── scrapers/
│   │   │   │   ├── osm.ts         # OpenStreetMap Overpass API
│   │   │   │   ├── google-maps.ts  # Google Maps Scraping (Fallback)
│   │   │   │   └── index.ts       # Scraper-Orchestrierung
│   │   │   ├── analyzers/
│   │   │   │   ├── lighthouse.ts   # Performance, SEO, Accessibility, Mobile
│   │   │   │   ├── design.ts       # Design-Alter, visuelle Bewertung
│   │   │   │   ├── security.ts     # SSL, Headers
│   │   │   │   ├── tech-stack.ts   # CMS/Framework-Erkennung
│   │   │   │   ├── content.ts      # Content-Qualität (via KI)
│   │   │   │   ├── scoring.ts      # Score-Berechnung
│   │   │   │   └── index.ts        # Analyse-Orchestrierung
│   │   │   ├── ai/
│   │   │   │   ├── groq.ts         # Groq API Client
│   │   │   │   ├── huggingface.ts  # HuggingFace Fallback
│   │   │   │   ├── briefing.ts     # Briefing-Generierung
│   │   │   │   ├── script.ts       # Verkaufsskript-Generierung
│   │   │   │   └── index.ts        # KI-Provider-Abstraktion
│   │   │   ├── db/
│   │   │   │   ├── schema.prisma   # Datenbank-Schema
│   │   │   │   └── client.ts       # Prisma Client
│   │   │   └── export/
│   │   │       ├── pdf.ts          # PDF-Generierung
│   │   │       └── csv.ts          # CSV-Export
│   │   ├── components/
│   │   │   ├── dashboard/          # Dashboard-Widgets
│   │   │   ├── leads/              # Lead-Tabelle, Filter, Detail
│   │   │   ├── briefing/           # Briefing-Anzeige
│   │   │   ├── script/             # Skript-Anzeige
│   │   │   └── ui/                 # shadcn/ui Komponenten
│   │   └── types/
│   │       └── index.ts            # TypeScript Types
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.ts
└── docs/
```

### 4.2 Tech-Stack

| Komponente | Technologie | Kosten |
|-----------|-------------|--------|
| Frontend | Next.js 16, React 19, Tailwind v4, shadcn/ui | Gratis |
| Backend | Next.js API Routes (serverless) | Gratis (Vercel) |
| Datenbank | SQLite + Prisma ORM | Gratis |
| Lead-Quellen | OpenStreetMap Overpass API + Google Maps Scraping | Gratis |
| Website-Analyse | Lighthouse CI, eigenes Scraping (Cheerio/Puppeteer) | Gratis |
| KI | Groq API (Llama 3 70B) + HuggingFace Inference API | Gratis |
| PDF-Export | @react-pdf/renderer oder jsPDF | Gratis |
| Cron Jobs | Vercel Cron | Gratis (1/Tag auf Hobby) |
| Hosting | Vercel | Gratis (Hobby Tier) |

### 4.3 Datenbank-Schema

```
Lead {
  id            String    @id
  name          String              // Firmenname
  address       String              // Adresse
  city          String              // Stadt
  phone         String?             // Telefon
  website       String?             // Website-URL
  category      String              // Branche
  googleMapsUrl String?             // Google Maps Link
  openingHours  String?             // Öffnungszeiten
  status        LeadStatus          // Neu, Kontaktiert, Angebot, Gewonnen, Abgelehnt
  overallScore  Int?                // 0-100
  notes         String?             // Manuelle Notizen
  createdAt     DateTime
  updatedAt     DateTime
}

WebsiteAnalysis {
  id              String   @id
  leadId          String   @relation
  performanceScore Int     // 0-100
  seoScore         Int
  mobileScore      Int
  securityScore    Int
  designScore      Int
  techScore        Int
  ageScore         Int
  accessibilityScore Int
  contentScore     Int
  overallScore     Int
  details          Json    // Detaillierte Ergebnisse pro Kategorie
  analyzedAt       DateTime
}

Briefing {
  id          String   @id
  leadId      String   @relation
  summary     String              // 2-3 Sätze Zusammenfassung
  weaknesses  Json                // Top Schwachstellen
  suggestions Json                // Verbesserungsvorschläge
  effort      String              // klein/mittel/groß
  opener      String              // Gesprächseinstieg
  riskScore   Int                 // Wie wahrscheinlich Kunde
  generatedAt DateTime
}

SalesScript {
  id              String   @id
  leadId          String   @relation
  greeting        String
  hook            String
  painPoints      Json
  solution        String
  callToAction    String
  objections      Json              // Einwandbehandlung
  generatedAt     DateTime
}
```

---

## 5. Abgedeckte Städte (Ruhrgebiet)

Bochum, Dortmund, Essen, Duisburg, Gelsenkirchen, Oberhausen, Mülheim, Herne, Hagen, Hamm, Witten, Hattingen, Recklinghausen, Bottrop, Marl, Castrop-Rauxel, Gladbeck, Lünen, Unna, Schwerte

---

## 6. User Flow

```
1. App öffnen → Dashboard
   ├── Statistiken (Leads gesamt, pro Status, Conversion-Rate)
   ├── Neue Leads heute (Liste)
   └── Quick Actions (Scan starten, Leads anzeigen)

2. Leads-Seite → Tabelle aller Leads
   ├── Filter: Stadt, Branche, Score, Status
   ├── Sortierung: Score, Datum, Name
   └── Klick auf Lead → Detail-Seite

3. Lead-Detail → Alles auf einen Blick
   ├── Kontaktdaten + Google Maps Link
   ├── Website-Bewertung (Ampel pro Kategorie)
   ├── Briefing (generiert)
   ├── Verkaufsskript (generiert)
   ├── Status ändern (Dropdown)
   ├── Notizen hinzufügen
   └── Export (PDF/CSV)
```

---

## 7. Einschränkungen & Risiken

| Risiko | Mitigation |
|--------|-----------|
| Groq gratis Tier hat Rate Limits (30 req/min) | Queue-System, Briefings nachts generieren |
| Google Maps Scraping kann brechen | OSM als Primärquelle, Scraper modular austauschbar |
| Lighthouse auf Vercel Serverless ist limitiert | Externe Lighthouse API nutzen (PageSpeed Insights API, gratis) |
| SQLite auf Vercel Serverless problematisch | Turso (SQLite-Edge, gratis Tier) oder Vercel KV als Alternative |
| Puppeteer läuft nicht auf Vercel | Cheerio für HTML-Scraping, externe APIs für Screenshots |

---

## 8. Spätere Erweiterungen (Out of Scope für V1)

- Android App (dokumentiert, aber nicht implementiert)
- Bezahlte APIs (Google Places, Claude/OpenAI) wenn Budget da ist
- Multi-User Login mit Rollen
- E-Mail-Integration (automatische Follow-ups)
- WhatsApp-Integration
- Automatische Angebotserstellung
- Konkurrenzanalyse (andere Agenturen im Gebiet)

---

## 9. Erfolgskriterien

- App findet mindestens 50 Leads/Tag im Ruhrgebiet
- Website-Bewertung deckt alle 9 Kategorien ab
- Briefings sind personalisiert und sales-tauglich
- Stevan kann in unter 2 Minuten pro Lead vorbereitet sein
- Alles läuft kostenlos auf Vercel
