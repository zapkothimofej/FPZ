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
