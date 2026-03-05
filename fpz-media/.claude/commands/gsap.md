Füge eine GSAP Animation zur Komponente hinzu: $ARGUMENTS

Regeln aus CLAUDE.md:
- IMMER `useGSAP()` aus `@gsap/react` — NIEMALS `useEffect` für GSAP
- `'use client'` Direktive hinzufügen wenn nicht vorhanden
- Import: `import { useGSAP } from '@gsap/react'` und `import gsap from 'gsap'`
- `{ scope: ref }` für scoped Animations
- ScrollTrigger nur einmal in Layout registrieren

Zeige zuerst die aktuelle Komponente, dann die Animation anwenden.
