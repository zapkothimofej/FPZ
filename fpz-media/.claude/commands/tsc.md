TypeScript Check für fpz-media ausführen und alle Fehler beheben.

```bash
cd /d/fpz/fpz-media && npx tsc --noEmit 2>&1
```

Behebe jeden gefundenen Fehler. Nutze KEIN `any` als Fix — verwende korrekte Types oder `unknown` mit Type Guards.
