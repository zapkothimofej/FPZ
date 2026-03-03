# SEO & ASEO Vollständiger Audit

Analysiere dieses Next.js-Projekt vollständig auf SEO- und Accessibility-Qualität (ASEO).
Lies alle relevanten Dateien und erstelle einen strukturierten Bericht mit konkreten Scores,
Problemen und Fix-Vorschlägen.

---

## PHASE 1 — Dateien lesen (parallel)

Lies diese Dateien gleichzeitig:
- `app/layout.tsx` — Root Metadata, lang-Attribut, Skip-Link
- `app/page.tsx` — Seiten-Metadata, JSON-LD, canonical, main-id
- `app/robots.ts` oder `public/robots.txt` — Crawl-Direktiven
- `app/sitemap.ts` oder `public/sitemap.xml` — Sitemap
- `components/chrom/Navbar.tsx` — Skip-Link-Ziel, aria-* auf Burger/Drawer
- `components/chrom/HeroChrom.tsx` oder `components/sphere/HeroChrom.tsx` — H1-Tag
- `components/chrom/Footer.tsx` — Footer-nav aria-label
- `components/shared/ContactForm.tsx` — aria-live, aria-describedby, Fehler-Handling
- `components/chrom/PortfolioSection.tsx` — Karten-Rollen, SVG aria-hidden
- `app/impressum/page.tsx` — Vollständigkeit §5 TMG
- `app/datenschutz/page.tsx` — DSGVO-Vollständigkeit

---

## PHASE 2 — SEO Bewertung (1–10)

Prüfe jeden Punkt und vergib Punkte:

### Technisches SEO
| Kriterium | Prüfung | Punkte (0–1) |
|-----------|---------|--------------|
| `lang`-Attribut korrekt (de/en je nach Inhalt) | `<html lang="de">` in root layout? | |
| Metadata-Titel sinnvoll (kein "Create Next App") | title enthält Brand + Keyword + Standort? | |
| Meta-Description vorhanden und ≥120 Zeichen | description auf allen Seiten? | |
| Open Graph Tags vollständig | og:title, og:description, og:image, og:locale, og:url | |
| Twitter Card | twitter:card, twitter:title, twitter:image | |
| robots.txt vorhanden | Datei existiert + Varianten disallowed? | |
| sitemap.xml vorhanden | Datei existiert + alle indexierbaren Seiten enthalten? | |
| Canonical Tags | alternates.canonical auf Hauptseiten gesetzt? | |
| Duplicate Content verhindert | Varianten-Routen noindex gesetzt? | |
| JSON-LD Structured Data | Schema.org LocalBusiness oder Organization? | |
| H1-Tag vorhanden | Genau eine H1 pro Seite? | |
| Heading-Hierarchie korrekt | H1 → H2 → H3, keine Sprünge? | |
| Interne Links sinnvoll | Anchor-Links mit beschreibendem Text? | |
| Impressum vollständig | §5 TMG: Name, Adresse, Kontakt vorhanden (kein Platzhalter)? | |
| Datenschutz vollständig | DSGVO: Verantwortlicher, Zweck, Rechte, Hosting benannt? | |
| Social-Links gesetzt | Instagram/LinkedIn nicht auf `#`? | |
| Portfolio mit echtem Content | Kein "Demnächst"-Platzhalter? | |

**SEO Score: X/17 Punkte → Y/10**

---

### Performance-SEO (Core Web Vitals Risiken)
Prüfe in `package.json` und den Page-Dateien:

| Risiko | Prüfung |
|--------|---------|
| Unnötige Fonts geladen | Geist/andere nicht genutzte Fonts im Root-Layout? |
| Mehrfaches Font-Loading | DM Serif + DM Sans in mehreren Layouts gleichzeitig initialisiert? |
| Schwere Libraries | Three.js + GSAP + Framer Motion + Lenis gleichzeitig? |
| `ignoreBuildErrors: true` | In next.config.ts? (verbirgt TypeScript-Fehler) |
| Bilder ohne next/image | `<img>` statt `<Image>` aus next/image? |
| OG-Image existiert | `/public/og-image.jpg` tatsächlich vorhanden? |

---

## PHASE 3 — ASEO Bewertung (Accessibility SEO)

### WCAG 2.1 AA Checkliste
| Kriterium | WCAG | Prüfung | Status |
|-----------|------|---------|--------|
| Skip-Link vorhanden | 2.4.1 | `<a href="#main-content">` vor Navigation? | |
| `id="main-content"` auf `<main>` | 2.4.1 | main-Element hat Ziel-ID? | |
| H1 vorhanden | 1.3.1 | Genau eine H1 je Seite? | |
| Heading-Hierarchie semantisch | 1.3.1 | Keine H3 ohne H2 etc.? | |
| Bilder mit alt-Text | 1.1.1 | Alle `<img>` und SVGs beschriftet oder aria-hidden? | |
| Dekorative SVGs aria-hidden | 1.1.1 | Pfeil-Icons, Spinner etc. mit aria-hidden="true"? | |
| Interaktive Elemente per Tastatur | 2.1.1 | Alle Links/Buttons per Tab erreichbar? | |
| Fokus sichtbar | 2.4.7 | focus-visible:ring oder vergleichbar? | |
| Drawer: role="dialog" + aria-modal | 1.3.1 | Mobile Nav-Drawer korrekt markiert? | |
| Drawer: Fokus-Management | 2.1.2 | Fokus wandert in Drawer beim Öffnen? | |
| Drawer: Escape schließt | 2.1.2 | keydown Escape → closeDrawer? | |
| Drawer: Fokus-Trap | 2.1.2 | Tab bleibt im Drawer solange offen? |  |
| Hamburger: aria-label + aria-expanded | 4.1.2 | Korrekte Labels gesetzt? | |
| Hamburger-Spans: aria-hidden | 1.1.1 | Dekorative `<span>`-Linien ausgeblendet? | |
| Form: Labels mit htmlFor | 1.3.1 | Alle Inputs haben verknüpfte Labels? | |
| Form: required/aria-required | 4.1.2 | Pflichtfelder korrekt markiert? | |
| Form: Fehlermeldung aria-live | 4.1.3 | role="alert" oder aria-live="assertive"? | |
| Form: Spinner aria-hidden | 1.1.1 | Lade-SVG ausgeblendet? | |
| Form: Button aria-busy beim Laden | 4.1.3 | aria-busy="true" während Submit? | |
| Footer-Nav aria-label | 1.3.1 | Footer-`<nav>` von Haupt-Nav unterscheidbar? | |
| Portfolio-Karten Tastaturzugänglich | 2.1.1 | role + tabIndex auf klickbaren Karten? | |
| Farbkontrast AA erfüllt | 1.4.3 | Text ≥4.5:1, großer Text ≥3:1 (muted-Farben prüfen)? | |
| Sprache korrekt | 3.1.1 | lang-Attribut entspricht Seiteninhalt? | |

**ASEO Score: X/23 Punkte → Y/10**

---

## PHASE 4 — Ausgabe

Erstelle einen Bericht in diesem Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SEO & ASEO AUDIT — FPZ Media
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO-Score:  X/10  [████████░░]
ASEO-Score: X/10  [██████████]
Gesamt:     X/10  [█████████░]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🔴 KRITISCH (sofort beheben)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. [Problem] — [Datei:Zeile] — [Fix]
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🟡 WICHTIG (diese Woche)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🟢 BEREITS KORREKT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 NÄCHSTE SCHRITTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Priorität 1 (heute):  ...
Priorität 2 (diese Woche): ...
Priorität 3 (vor Go-Live): ...
```

Wenn du Probleme findest, die noch nicht behoben wurden: Frage den User ob du sie direkt fixen und committen sollst.
