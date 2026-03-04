# US-033: Toast Notifications

## Voraussetzung

Sonner ist bereits in `src/app/layout.tsx` eingebunden:
```tsx
<Toaster position="bottom-right" theme="dark" richColors />
```

## Checklist: Toast-Aufrufe pro Komponente

Jede Komponente importiert `toast` aus `sonner` und ruft es an den richtigen Stellen auf.

### 1. src/components/leads/LeadListClient.tsx

Bereits vorhanden, keine Toast-Aufrufe noetig (reine Anzeige).

### 2. src/components/leads/BulkActions.tsx (NEU, siehe US-036)

```tsx
import { toast } from "sonner";

// Nach bulkUpdateStatus:
toast.success(`${count} Lead(s) auf "${statusLabel}" gesetzt`);

// Nach bulkDelete:
toast.success(`${count} Lead(s) geloescht`);

// Bei Fehler:
toast.error("Bulk-Aktion fehlgeschlagen");

// CSV Export:
toast.success("CSV-Export gestartet");
```

### 3. src/components/leads/AddLeadDialog.tsx (NEU, siehe US-037)

```tsx
import { toast } from "sonner";

// Nach createLead Erfolg:
toast.success(`Lead "${name}" erstellt`);

// Bei Fehler:
toast.error("Lead konnte nicht erstellt werden");

// Bei Validierungsfehler:
toast.error("Bitte alle Pflichtfelder ausfuellen");
```

### 4. src/app/leads/[id]/page.tsx (Lead Detail)

```tsx
import { toast } from "sonner";

// Nach Statusaenderung:
toast.success(`Status auf "${statusLabel}" geaendert`);

// Nach Analyse starten:
toast.info("Website-Analyse gestartet...");
toast.success("Website-Analyse abgeschlossen");
toast.error("Website-Analyse fehlgeschlagen");

// Nach Briefing generieren:
toast.info("Briefing wird generiert...");
toast.success("Briefing erstellt");
toast.error("Briefing-Generierung fehlgeschlagen");

// Nach Sales Script generieren:
toast.info("Sales Script wird generiert...");
toast.success("Sales Script erstellt");
toast.error("Sales Script Generierung fehlgeschlagen");

// Nach Lead loeschen:
toast.success("Lead geloescht");
```

### 5. src/app/scan/page.tsx (Scan Seite)

```tsx
import { toast } from "sonner";

// Scan Start:
toast.info("Scan gestartet...");

// Scan fertig:
toast.success(`Scan abgeschlossen: ${newLeads} neue Leads gefunden`);

// Scan Fehler:
toast.error("Scan fehlgeschlagen");

// Scan laeuft bereits:
toast.warning("Ein Scan laeuft bereits");
```

### 6. src/app/settings/page.tsx (Einstellungen)

```tsx
import { toast } from "sonner";

// Nach Speichern:
toast.success("Einstellungen gespeichert");

// Bei Fehler:
toast.error("Einstellungen konnten nicht gespeichert werden");

// API Key validiert:
toast.success("API-Key validiert");
toast.error("API-Key ungueltig");
```

### 7. src/components/shared/KeyboardShortcuts.tsx (NEU, siehe US-038)

Keine Toasts noetig.

## Zusammenfassung

| Komponente | success | error | info | warning |
|---|---|---|---|---|
| BulkActions | 3 | 1 | 0 | 0 |
| AddLeadDialog | 1 | 2 | 0 | 0 |
| Lead Detail | 4 | 3 | 3 | 0 |
| Scan Page | 1 | 1 | 1 | 1 |
| Settings Page | 2 | 2 | 0 | 0 |

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
# Jede Aktion muss sichtbare Toast-Nachricht zeigen
```
