import { OSM_CATEGORY_MAP } from "@/lib/constants";
import { sleep } from "@/lib/utils";
import type { City, ScrapedLead } from "@/types";

// --- Interfaces ---

interface OSMTags {
  name?: string;
  "addr:street"?: string;
  "addr:housenumber"?: string;
  "addr:postcode"?: string;
  "addr:city"?: string;
  phone?: string;
  "contact:phone"?: string;
  email?: string;
  "contact:email"?: string;
  website?: string;
  "contact:website"?: string;
  opening_hours?: string;
  shop?: string;
  amenity?: string;
  office?: string;
  craft?: string;
  tourism?: string;
  healthcare?: string;
  [key: string]: string | undefined;
}

interface OSMNode {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: OSMTags;
}

interface OSMResponse {
  version: number;
  generator: string;
  osm3s: { timestamp_osm_base: string };
  elements: OSMNode[];
}

// --- Overpass Query Builder ---

const OSM_TAG_KEYS = Object.keys(OSM_CATEGORY_MAP);

function buildOverpassQuery(city: City): string {
  const { lat, lng, radius } = city;
  const radiusMeters = radius * 1000;

  const filters = OSM_TAG_KEYS.map((key) => {
    // Determine which OSM key this tag belongs to
    if (["bakery", "restaurant", "cafe", "bar", "fast_food", "pharmacy", "fuel", "supermarket", "books", "jewelry", "shoes", "clothes", "furniture", "florist", "optician"].includes(key)) {
      return `node["shop"="${key}"](around:${radiusMeters},${lat},${lng});
way["shop"="${key}"](around:${radiusMeters},${lat},${lng});
node["amenity"="${key}"](around:${radiusMeters},${lat},${lng});
way["amenity"="${key}"](around:${radiusMeters},${lat},${lng});`;
    }
    if (["hairdresser", "beauty", "dentist", "doctors", "physiotherapist", "veterinary"].includes(key)) {
      return `node["healthcare"="${key}"](around:${radiusMeters},${lat},${lng});
way["healthcare"="${key}"](around:${radiusMeters},${lat},${lng});
node["amenity"="${key}"](around:${radiusMeters},${lat},${lng});
way["amenity"="${key}"](around:${radiusMeters},${lat},${lng});`;
    }
    if (["lawyer", "tax_advisor", "insurance", "estate_agent"].includes(key)) {
      return `node["office"="${key}"](around:${radiusMeters},${lat},${lng});
way["office"="${key}"](around:${radiusMeters},${lat},${lng});`;
    }
    if (["electrician", "plumber", "painter", "roofer", "photographer", "locksmith"].includes(key)) {
      return `node["craft"="${key}"](around:${radiusMeters},${lat},${lng});
way["craft"="${key}"](around:${radiusMeters},${lat},${lng});`;
    }
    if (["hotel", "guest_house"].includes(key)) {
      return `node["tourism"="${key}"](around:${radiusMeters},${lat},${lng});
way["tourism"="${key}"](around:${radiusMeters},${lat},${lng});`;
    }
    // Default: try amenity, shop, craft, office
    return `node["amenity"="${key}"](around:${radiusMeters},${lat},${lng});
way["amenity"="${key}"](around:${radiusMeters},${lat},${lng});
node["shop"="${key}"](around:${radiusMeters},${lat},${lng});
way["shop"="${key}"](around:${radiusMeters},${lat},${lng});`;
  }).join("\n");

  return `[out:json][timeout:60];
(
${filters}
);
out center tags;`;
}

// --- Node Parser ---

function resolveCategory(tags: OSMTags): string {
  for (const tagKey of ["amenity", "shop", "craft", "office", "tourism", "healthcare"]) {
    const value = tags[tagKey];
    if (value && OSM_CATEGORY_MAP[value]) {
      return OSM_CATEGORY_MAP[value];
    }
  }
  return "Sonstiges";
}

function parseOSMNode(node: OSMNode, cityName: string): ScrapedLead | null {
  const tags = node.tags;
  if (!tags?.name) return null;

  const lat = node.lat ?? node.center?.lat;
  const lon = node.lon ?? node.center?.lon;

  const street = tags["addr:street"] ?? "";
  const housenumber = tags["addr:housenumber"] ?? "";
  const address = street && housenumber
    ? `${street} ${housenumber}`
    : street || "Unbekannt";

  return {
    name: tags.name,
    address,
    city: tags["addr:city"] ?? cityName,
    zip: tags["addr:postcode"],
    phone: tags.phone ?? tags["contact:phone"],
    email: tags.email ?? tags["contact:email"],
    website: tags.website ?? tags["contact:website"],
    category: resolveCategory(tags),
    openingHours: tags.opening_hours,
    latitude: lat,
    longitude: lon,
    source: "OSM",
  };
}

// --- Main Scraper ---

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";
const DELAY_BETWEEN_CITIES_MS = 5000;

export async function scrapeOSM(
  cities: City[],
  onProgress?: (city: string, leadsFound: number) => void
): Promise<ScrapedLead[]> {
  const allLeads: ScrapedLead[] = [];
  const seenKeys = new Set<string>();

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    if (!city) continue;

    try {
      const query = buildOverpassQuery(city);

      const response = await fetch(OVERPASS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (response.status === 429) {
        console.warn(`[OSM] Rate limited for ${city.name}, waiting 30s...`);
        await sleep(30000);
        continue;
      }

      if (!response.ok) {
        console.error(`[OSM] Error for ${city.name}: HTTP ${response.status}`);
        continue;
      }

      const data = (await response.json()) as OSMResponse;
      let cityLeadCount = 0;

      for (const element of data.elements) {
        const lead = parseOSMNode(element, city.name);
        if (!lead) continue;

        const key = `${lead.name}|${lead.address}|${lead.city}`.toLowerCase();
        if (seenKeys.has(key)) continue;

        seenKeys.add(key);
        allLeads.push(lead);
        cityLeadCount++;
      }

      onProgress?.(city.name, cityLeadCount);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(`[OSM] Failed to scrape ${city.name}: ${message}`);
    }

    // Delay between cities (skip after last)
    if (i < cities.length - 1) {
      await sleep(DELAY_BETWEEN_CITIES_MS);
    }
  }

  return allLeads;
}
