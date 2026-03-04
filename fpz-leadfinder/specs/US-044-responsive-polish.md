# US-044: Responsive Polish & Animations

## Datei: src/app/globals.css (Ergaenzungen)

Nach den bestehenden Tailwind-Imports und CSS-Variablen folgende Klassen ergaenzen:

```css
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out;
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Focus-visible styles for keyboard navigation */
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Smooth transitions for interactive elements */
button, a, [role="button"] {
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}
```

## Responsive Fixes fuer bestehende Komponenten

### src/components/dashboard/StatCards.tsx

Stat-Cards Grid responsive anpassen:

```tsx
// Ersetze das grid className:
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
```

### src/components/dashboard/CityChart.tsx

Chart-Hoehe responsive:

```tsx
// Ersetze feste Hoehe:
<div className="h-[250px] sm:h-[300px] lg:h-[350px]">
```

### src/components/leads/LeadTable.tsx

Tabelle horizontal scrollbar auf Mobile:

```tsx
// Wrapper um die Table:
<div className="overflow-x-auto -mx-4 sm:mx-0">
  <div className="min-w-[600px] sm:min-w-0">
    {/* bestehende Table */}
  </div>
</div>
```

### src/app/leads/[id]/page.tsx

Lead-Detail Layout responsive:

```tsx
// Grid fuer Kontaktinfo + Scores:
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Tabs Content */}
  </div>
  <div>
    {/* Sidebar mit Kontaktdaten */}
  </div>
</div>
```

### src/components/shared/Sidebar.tsx

Sidebar auf Mobile als Overlay:

```tsx
// Mobile: hidden by default, shown via MobileNav toggle
// Desktop: always visible
<aside className="hidden lg:flex lg:flex-col lg:w-64 ...">
```

### src/components/leads/BulkActions.tsx

Bulk-Actions bar responsive:

```tsx
// Auf Mobile vertikal stacken:
<div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
```

## Animations in Komponenten anwenden

### Stat Cards

```tsx
// Jede StatCard:
<div className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
```

### Lead Detail Page

```tsx
// Content Container:
<div className="animate-slide-up">
```

### Dialog/Modal Inhalte

```tsx
// Dialog Content Kinder:
<div className="animate-scale-in">
```

## Hover States

Alle interaktiven Elemente sollten hover states haben:

```tsx
// Lead-Zeilen in der Tabelle:
className="hover:bg-zinc-800/50 transition-colors cursor-pointer"

// Stat Cards:
className="hover:border-zinc-700 transition-colors"

// Sidebar Nav Items:
className="hover:bg-zinc-800 transition-colors rounded-lg"
```
