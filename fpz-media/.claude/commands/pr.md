Pull Request für den aktuellen Branch erstellen.

1. `git status` — was hat sich geändert?
2. `npm run build` — kein Build-Fehler
3. `npx tsc --noEmit` — kein Type-Fehler
4. `npm run lint` — kein Lint-Fehler
5. Wenn alles passt: `git push origin HEAD` und PR mit gh CLI erstellen
6. PR-Titel Format: `type(scope): description` (konventionelle Commits)
