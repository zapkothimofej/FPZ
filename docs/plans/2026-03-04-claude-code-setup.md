# Claude Code Full Setup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Configure Claude Code optimal für fpz-Entwicklung: globale CLAUDE.md, projektspezifische CLAUDE.md, MCPs, Hooks, Slash Commands.

**Architecture:** Drei Ebenen — Global (~/.claude/), Monorepo-Root (D:/fpz/), Projektspezifisch (D:/fpz/fpz-media/). MCPs global in settings.json, Hooks im Projekt.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, GSAP, R3F, TypeScript, shadcn/ui

---

### Task 1: Globale CLAUDE.md erstellen

**Files:**
- Create: `C:/Users/Thimofej/.claude/CLAUDE.md`

**Step 1: Datei schreiben**

```markdown
# Claude Code — Global Config (Thimofej)

## Stil & Kommunikation
- Antworte kurz und direkt auf Deutsch
- Kein unnötiger Filler-Text, kein Wiederholen der Aufgabe
- Keine Emojis außer wenn explizit gewünscht
- Führe direkt die Aktion aus, erkläre nur was nötig ist

## Code-Qualität
- Kein `any` in TypeScript — nutze `unknown` mit Type Guards
- Minimaler Code: YAGNI, KISS, DRY
- Keine Docstrings/Comments außer bei nicht-offensichtlicher Logik
- Kein `console.log` in Production-Code
- Sicherheit: keine Command Injection, XSS, SQL Injection

## Git
- Frage vor `git push`, `git reset --hard`, force-push
- Kein `--no-verify`
- Commits auf Englisch, konventionell: `feat:`, `fix:`, `refactor:`

## Workflow
- Lese Dateien bevor du sie änderst
- Keine neuen Dateien ohne klaren Grund
- Bei Unsicherheit: frag kurz statt raten
- Nutze dedizierte Tools (Read, Edit, Glob, Grep) statt Bash wenn möglich
```

**Step 2: Verifizieren**

```bash
cat ~/.claude/CLAUDE.md
```
Expected: Datei existiert mit Inhalt

---

### Task 2: Monorepo-Root CLAUDE.md

**Files:**
- Create: `D:/fpz/CLAUDE.md`

**Step 1: Datei schreiben**

```markdown
# fpz — Monorepo

## Struktur
- `fpz-media/` — Next.js 16 Website (Marketing, Portfolio, Contact)
- `fpz-media-video/` — Remotion Video-Projekt (Apple-Style Promo)
- `docs/` — Pläne, Design-Docs

## Stack-Überblick
- **Website**: Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui, GSAP, Three.js/R3F
- **Video**: Remotion 4, React 19, TypeScript

## Wichtige Regeln
- Nicht in `node_modules` schreiben
- `.env.local` nicht committen
- Vor größeren Änderungen den relevanten Plan in `docs/plans/` lesen
- `fpz-media/` und `fpz-media-video/` sind separate npm-Projekte

## Commands (von jeweiligem Unterordner)
```bash
# fpz-media
npm run dev        # localhost:3000
npm run build      # Production Build
npm run lint       # ESLint
npx tsc --noEmit   # Type Check

# fpz-media-video
npm run dev        # Remotion Studio
npm run build      # Video rendern
```
```

---

### Task 3: fpz-media CLAUDE.md (Hauptprojekt)

**Files:**
- Create: `D:/fpz/fpz-media/CLAUDE.md`

**Step 1: Datei schreiben**

```markdown
# fpz-media

FPZ Media Agentur-Website. Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui, Three.js/R3F, GSAP.

## Tech Stack
- **Framework**: Next.js 16 — App Router (`/app` dir, NICHT `/pages`)
- **React**: 19 — Server Components default; `'use client'` nur bei Hooks/Events/Browser-APIs
- **Styling**: Tailwind CSS v4 — Config in `app/globals.css` via `@theme {}`, NICHT `tailwind.config.ts`
- **Components**: shadcn/ui + `radix-ui` (unified package, nicht `@radix-ui/react-*` einzeln)
- **3D**: `@react-three/fiber` v9 + `@react-three/drei` — Canvas muss `'use client'` sein
- **Animation**: GSAP 3 mit `@gsap/react` — `useGSAP()` hook, NIE `useEffect` für GSAP
- **Utils**: `cn()` aus `lib/utils` (clsx + tailwind-merge)
- **Deployment**: Vercel, auto von `main`

## Commands
```bash
npm run dev          # localhost:3000
npm run build        # Production Build — vor jedem Commit prüfen
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript Check
npx shadcn add [x]   # shadcn Komponente hinzufügen
```

## Projektstruktur
```
app/            # App Router Routes + Layouts
components/     # UI Komponenten
  shared/       # Wiederverwendbare Komponenten (z.B. ContactForm)
lib/            # Utilities, Helpers, navigation.ts
public/         # Statische Assets
```

## Kritische Regeln

### Tailwind v4
- Config AUSSCHLIESSLICH in `app/globals.css` via `@theme {}` Blöcke
- Keine `tailwind.config.ts` erstellen — existiert nicht und soll nicht existieren
- Custom Tokens (Farben, Spacing) leben in `globals.css`

### GSAP
- IMMER `useGSAP()` aus `@gsap/react` nutzen — NIEMALS `useEffect` für GSAP
- Cleanup wird von `useGSAP` automatisch gemacht
- ScrollTrigger einmalig in Layout-Komponente registrieren

### React 19 / Next.js 16
- Server Components sind Standard — kein `'use client'` ohne Grund
- `next/image` für ALLE Bilder — nie `<img>`
- `next/font` für Fonts
- Forms: Server Actions mit `useActionState`

### TypeScript
- Strict Mode — kein `any`, `unknown` mit Type Guards
- `type` statt `interface` für Component Props
- Props-Types zusammen mit Komponente exportieren

### Three.js / R3F
- Vor eigener Implementation immer `@react-three/drei` prüfen (via Context7)
- Canvas-Komponenten immer in `Suspense` wrappen
- R3F Canvas = `'use client'` Pflicht

## Was NICHT tun
- Kein `useEffect` für GSAP — `useGSAP` nutzen
- Keine `tailwind.config.ts` erstellen
- Kein `pages/` Directory — nur App Router
- Kein `.env.local` committen
- Kein `@radix-ui/react-*` einzeln — nutze `radix-ui`

## GSAP Pattern (korrekt)
```tsx
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, { opacity: 0, y: 20, duration: 0.6 })
  }, { scope: ref })

  return <div ref={ref}>...</div>
}
```

## Component Pattern
```tsx
// Server Component (Standard)
type Props = { title: string }

export default function Section({ title }: Props) {
  return <section className="...">{title}</section>
}
```
```

---

### Task 4: fpz-media-video CLAUDE.md

**Files:**
- Create: `D:/fpz/fpz-media-video/CLAUDE.md`

**Step 1: Datei schreiben**

```markdown
# fpz-media-video

Remotion 4 Video-Projekt für FPZ Media Promo-Video.

## Stack
- **Remotion**: 4.x — `@remotion/player`, `@remotion/cli`
- **React**: 19, TypeScript
- **Styling**: Inline Styles oder CSS Modules (kein Tailwind in Remotion)

## Commands
```bash
npm run dev      # Remotion Studio (localhost:3001)
npm run build    # Video nach /out rendern
```

## Struktur
```
src/
  Root.tsx              # Remotion Compositions registrieren
  VideoApple.tsx        # Haupt-Video Composition
  components/           # Scene-Komponenten (SceneA1*, etc.)
```

## Remotion Regeln
- Animationen mit `interpolate()` und `useCurrentFrame()` — kein GSAP
- `spring()` für physikalische Animationen
- Jede Scene als eigene Komponente in `components/`
- `durationInFrames` bei 30fps planen (30 = 1 Sekunde)
- Absolute Imports über `tsconfig.json` `paths`
```

---

### Task 5: MCPs global konfigurieren

**Files:**
- Modify: `C:/Users/Thimofej/.claude/settings.json`

**Step 1: MCPs via CLI hinzufügen (ohne API Keys)**

```bash
# Playwright — Browser Testing
claude mcp add playwright -- npx -y "@playwright/mcp@latest"

# Sequential Thinking — Strukturiertes Problemlösen
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking

# Filesystem — Datei-Navigation
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem "D:/fpz"

# Fetch — Web Content abrufen
claude mcp add fetch -- npx -y @modelcontextprotocol/server-fetch
```

**Step 2: Context7 HTTP-Transport (bereits aktiv, aber sicherstellen)**

Context7 ist schon als Plugin aktiv. Falls als eigenständiger MCP gewünscht:
```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

**Step 3: Vercel MCP (OAuth, kein Key nötig)**

```bash
claude mcp add --transport http vercel https://mcp.vercel.com
```
Nach Neustart `/mcp` eingeben zum Authentifizieren.

**Step 4: settings.json manuell um MCPs mit Env-Vars erweitern**

Folgende MCPs brauchen API Keys — Keys nach Erhalt eintragen:

```json
{
  "mcpServers": {
    "21st-magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest"],
      "env": {
        "API_KEY": "HIER_21ST_DEV_KEY_EINTRAGEN"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "HIER_BRAVE_KEY_EINTRAGEN"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "HIER_GITHUB_PAT_EINTRAGEN"
      }
    }
  }
}
```

API Keys holen:
- **21st.dev**: https://21st.dev/magic/console (kostenlos)
- **Brave Search**: https://api.search.brave.com/ (kostenlos, 2000 req/mo)
- **GitHub PAT**: https://github.com/settings/tokens (repo scope)

---

### Task 6: Hooks konfigurieren

**Files:**
- Create: `D:/fpz/fpz-media/.claude/settings.json`

**Step 1: Datei erstellen**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cd /d/fpz/fpz-media && npx tsc --noEmit 2>&1 | head -30"
          }
        ]
      }
    ]
  },
  "permissions": {
    "allow": [
      "Bash(npm run dev:*)",
      "Bash(npm run build:*)",
      "Bash(npm run lint:*)",
      "Bash(npx tsc:*)",
      "Bash(npx shadcn:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)"
    ]
  }
}
```

---

### Task 7: Slash Commands erstellen

**Files:**
- Create: `C:/Users/Thimofej/.claude/commands/new-component.md`
- Create: `C:/Users/Thimofej/.claude/commands/check.md`
- Create: `C:/Users/Thimofej/.claude/commands/commit.md`

**Step 1: new-component Command**

```markdown
Erstelle eine neue React Komponente für fpz-media.

Komponente: $ARGUMENTS

Regeln:
- Speichere in `components/$ARGUMENTS.tsx`
- `'use client'` nur wenn Hooks/Events/Browser-APIs nötig
- Tailwind v4 Klassen verwenden
- `cn()` aus `lib/utils` für konditionelle Klassen
- Props Type zusammen mit Komponente exportieren
- Folge dem Stil der bestehenden Komponenten (lese vorher ein ähnliches Beispiel)
```

**Step 2: check Command**

```markdown
Führe alle Quality Checks für fpz-media aus:

1. `npm run lint` — ESLint
2. `npx tsc --noEmit` — TypeScript
3. `npm run build` — Production Build Test

Zeige alle Fehler. Frage bevor du sie automatisch fixst.
```

**Step 3: commit Command**

```markdown
Erstelle einen git Commit für die aktuellen Änderungen.

1. Zeige `git status` und `git diff --stat`
2. Schlage eine konventionelle Commit Message vor (feat/fix/refactor/style/docs)
3. Frage zur Bestätigung
4. Führe `git add` und `git commit` aus — KEIN `git push`
```

---

### Task 8: Memory-Datei für dieses Projekt erstellen

**Files:**
- Create: `C:/Users/Thimofej/.claude/projects/D--fpz/memory/MEMORY.md`

**Step 1: Datei schreiben**

```markdown
# fpz Project Memory

## Stack
- fpz-media: Next.js 16, React 19, Tailwind v4, GSAP, R3F, shadcn/ui, TypeScript
- fpz-media-video: Remotion 4, React 19

## Kritische Muster
- Tailwind Config: `app/globals.css` via `@theme {}` — KEINE tailwind.config.ts
- GSAP: `useGSAP()` aus `@gsap/react` — NIE `useEffect` für GSAP
- Radix: `radix-ui` unified package — nicht `@radix-ui/react-*`
- R3F Canvas: immer `'use client'`

## Dateipfade
- Globals CSS: `fpz-media/app/globals.css`
- Utils: `fpz-media/lib/utils.ts`
- Navigation: `fpz-media/lib/navigation.ts`
- Components: `fpz-media/components/`
- API Routes: `fpz-media/app/api/`

## MCPs
- Context7: aktiv (Plugin)
- Vercel: aktiv (Plugin)
- Playwright: konfiguriert
- sequential-thinking: konfiguriert
- 21st.dev Magic: API Key nötig → https://21st.dev/magic/console
- Brave Search: API Key nötig → https://api.search.brave.com/

## Workflow
- `npm run dev` in fpz-media für Dev-Server
- TypeScript Check: `npx tsc --noEmit`
- Vor Commit: `npm run build` testen
```

---

## Ausführung

Plan gespeichert. Bereit zum Implementieren.

**Ansatz: Subagent-Driven (diese Session)** — ich führe alle Tasks direkt aus.
