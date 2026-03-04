# US-018: Google Maps Scraper

## Übersicht
HTTP-basierter Google Maps Scraper (kein Puppeteer). Best-effort Parsing von Business-Daten aus HTML/JSON-Patterns. Graceful Degradation bei Rate Limits.

## Exakte Datei: src/lib/scrapers/google-maps.ts

```typescript
import { sleep } from "@/lib/utils";
import type { City, ScrapedLead } from "@/types";

// --- Random User Agents ---

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
];

function getRandomUserAgent(): string {
  const index = Math.floor(Math.random() * USER_AGENTS.length);
  return USER_AGENTS[index] ?? USER_AGENTS[0]!;
}

// --- Types ---

interface GoogleMapsEntry {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  category?: string;
  rating?: number;
  lat?: number;
  lng?: number;
}

// --- Search URL Builder ---

function buildSearchUrl(query: string): string {
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps/search/${encoded}/`;
}

// --- HTML/JSON Pattern Extraction ---

function extractBusinessDataFromHtml(html: string): GoogleMapsEntry[] {
  const results: GoogleMapsEntry[] = [];

  // Try to find JSON-like data patterns in the page source
  // Google Maps embeds business data in script tags as arrays
  try {
    // Pattern 1: Look for business listing arrays in script content
    // Format often looks like: [null,null,"Business Name",null,[null,null,lat,lng],...,"Address",...]
    const scriptPattern = /\["([^"]{2,80})","[^"]*","([^"]*\d{4,5}\s+[^"]*)".*?"(\+49[\d\s/-]+)"?/g;
    let match: RegExpExecArray | null;

    while ((match = scriptPattern.exec(html)) !== null) {
      const name = match[1];
      const address = match[2];
      const phone = match[3];
      if (name && address) {
        results.push({ name, address, phone });
      }
    }

    // Pattern 2: Extract from embedded JSON structures
    // Google Maps sometimes has data in window.APP_INITIALIZATION_STATE
    const jsonPattern = /\[\"0x[0-9a-f]+:0x[0-9a-f]+\",\"([^\"]+)\"\]/g;
    while ((match = jsonPattern.exec(html)) !== null) {
      // These are place IDs with names, useful for dedup
    }

    // Pattern 3: Look for structured business cards
    // Pattern: ["business name", null, null, [null, null, lat, lng], "address", ...]
    const businessPattern = /\[null,"([^"]{2,80})",null,\[null,null,([\d.]+),([\d.]+)\]/g;
    while ((match = businessPattern.exec(html)) !== null) {
      const name = match[1];
      const lat = match[2] ? parseFloat(match[2]) : undefined;
      const lng = match[3] ? parseFloat(match[3]) : undefined;
      if (name && !results.some((r) => r.name === name)) {
        results.push({ name, address: "", lat, lng });
      }
    }

    // Pattern 4: Extract website URLs near business data
    const websitePattern = /\"(https?:\/\/(?!www\.google|maps\.google|play\.google)[a-zA-Z0-9.-]+\.[a-z]{2,}[^"]*)\"/g;
    const websites: string[] = [];
    while ((match = websitePattern.exec(html)) !== null) {
      if (match[1]) websites.push(match[1]);
    }

    // Pattern 5: Phone numbers in German format
    const phonePattern = /\"(\+49[\d\s/-]{6,20})\"/g;
    const phones: string[] = [];
    while ((match = phonePattern.exec(html)) !== null) {
      if (match[1]) phones.push(match[1]);
    }

    // Try to associate websites and phones with businesses
    for (let i = 0; i < results.length; i++) {
      const entry = results[i];
      if (!entry) continue;
      if (!entry.website && websites[i]) {
        entry.website = websites[i];
      }
      if (!entry.phone && phones[i]) {
        entry.phone = phones[i];
      }
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`[GoogleMaps] Pattern extraction failed: ${message}`);
  }

  return results;
}

// --- Convert to ScrapedLead ---

function toScrapedLead(
  entry: GoogleMapsEntry,
  cityName: string,
  searchCategory: string
): ScrapedLead {
  return {
    name: entry.name,
    address: entry.address || "Unbekannt",
    city: cityName,
    phone: entry.phone,
    website: entry.website,
    category: entry.category ?? searchCategory,
    latitude: entry.lat,
    longitude: entry.lng,
    source: "GOOGLE_MAPS",
  };
}

// --- Main Scraper ---

const DELAY_BETWEEN_REQUESTS_MS = 3000;
const MAX_RETRIES = 2;
const RATE_LIMIT_DELAY_MS = 60000;

async function fetchWithRetry(
  url: string,
  retries: number = MAX_RETRIES
): Promise<string | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        headers: {
          "User-Agent": getRandomUserAgent(),
          "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.status === 429) {
        console.warn(
          `[GoogleMaps] Rate limited, waiting ${RATE_LIMIT_DELAY_MS / 1000}s...`
        );
        await sleep(RATE_LIMIT_DELAY_MS);
        continue;
      }

      if (!response.ok) {
        console.warn(
          `[GoogleMaps] HTTP ${response.status} for ${url}`
        );
        return null;
      }

      return await response.text();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      if (attempt < retries) {
        console.warn(
          `[GoogleMaps] Retry ${attempt + 1}/${retries}: ${message}`
        );
        await sleep(DELAY_BETWEEN_REQUESTS_MS);
      } else {
        console.error(`[GoogleMaps] Failed after ${retries} retries: ${message}`);
      }
    }
  }

  return null;
}

export async function scrapeGoogleMaps(
  cities: City[],
  categories: string[],
  onProgress?: (city: string, category: string, leadsFound: number) => void
): Promise<ScrapedLead[]> {
  const allLeads: ScrapedLead[] = [];
  const seenKeys = new Set<string>();

  for (const city of cities) {
    for (const category of categories) {
      const searchQuery = `${category} ${city.name}`;
      const url = buildSearchUrl(searchQuery);

      const html = await fetchWithRetry(url);
      if (!html) {
        onProgress?.(city.name, category, 0);
        await sleep(DELAY_BETWEEN_REQUESTS_MS);
        continue;
      }

      const entries = extractBusinessDataFromHtml(html);
      let categoryLeadCount = 0;

      for (const entry of entries) {
        const lead = toScrapedLead(entry, city.name, category);
        const key =
          `${lead.name}|${lead.address}|${lead.city}`.toLowerCase();

        if (seenKeys.has(key)) continue;

        seenKeys.add(key);
        allLeads.push(lead);
        categoryLeadCount++;
      }

      onProgress?.(city.name, category, categoryLeadCount);

      // Delay between requests to avoid rate limiting
      await sleep(
        DELAY_BETWEEN_REQUESTS_MS + Math.floor(Math.random() * 2000)
      );
    }
  }

  return allLeads;
}
```

## Hinweise

- Kein Puppeteer, kein Playwright -- nur HTTP fetch
- Best-effort: Google Maps HTML ist nicht stabil, Ergebnisse variieren
- Rate Limits werden graceful gehandled (Wartezeit + Retry)
- Dient als Fallback/Ergänzung zum OSM Scraper für Städte mit wenig Ergebnissen

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
```
