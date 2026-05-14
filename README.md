# FPZ Website

Next.js 16 App-Router-Website für FPZ / Fapez Medien.

## Development

```bash
npm run dev
```

Lokaler Standard: http://localhost:3000

## Verification

```bash
npm run lint
npm run build
```

## SEO / ASEO Runbook

- Canonical-Domain: `https://www.fapez-medien.de`
- Indexierbare Hauptseiten: `/`, `/web-ki`, `/foto-video`
- Indexierbare lokale Service-Seiten: `/webdesign-bochum`, `/ki-automatisierung-ruhrgebiet`, `/webdesign-ruhrgebiet`, `/produktfotografie-bochum`, `/imagefilm-nrw`, `/event-dokumentation-ruhrgebiet`
- Nicht indexieren: `/impressum`, `/datenschutz`
- Crawler-Dateien: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`
- Zentrale SEO-Daten: `lib/seo.ts`
- Lokale SEO-Seiten: `lib/local-seo.ts` und `app/[slug]/page.tsx`
- Sichtbare FAQ-/Answer-Inhalte: `lib/seo-content.ts`

Nach jedem Deployment:

1. Google Search Console: Domain prüfen, Sitemap submitten, URL Inspection für `/`, `/web-ki`, `/foto-video` und die lokalen Service-Seiten.
2. Google Rich Results Test: JSON-LD auf Hauptseiten und lokalen Service-Seiten prüfen.
3. Bing Webmaster Tools: Site verifizieren, Sitemap submitten, Crawl-Fehler prüfen.
4. Bing AI Performance: nach Datenverfügbarkeit citierte URLs und Grounding Queries prüfen.
5. PageSpeed Insights: Core Web Vitals und mobile Darstellung der drei Hauptseiten prüfen.
6. Optional IndexNow: bei häufigen Content-Updates einrichten, damit Bing/teilnehmende Suchmaschinen Änderungen schneller entdecken.

ASEO-Hinweis: `llms.txt` und `llms-full.txt` sind experimentelle Hilfsdateien. Sie ersetzen keine normale SEO, keine indexierbaren HTML-Inhalte und keine strukturierten Daten.
