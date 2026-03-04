# US-035: Error Boundaries und Loading States

## Datei: src/app/error.tsx

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-zinc-100">
        Etwas ist schiefgelaufen
      </h2>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-xs text-red-400 mt-2 max-w-lg overflow-auto">
          {error.message}
        </pre>
      )}
      <div className="flex gap-3 mt-4">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Button variant="outline" asChild>
          <Link href="/">Zum Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
```

## Datei: src/app/not-found.tsx

```tsx
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Search className="h-12 w-12 text-zinc-600 mb-4" />
      <h2 className="text-xl font-semibold text-zinc-100">
        Seite nicht gefunden
      </h2>
      <p className="text-zinc-400 mt-1">
        Die angeforderte Seite existiert nicht.
      </p>
      <Button variant="outline" className="mt-4" asChild>
        <Link href="/">Zum Dashboard</Link>
      </Button>
    </div>
  );
}
```

## Datei: src/app/loading.tsx

```tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
    </div>
  );
}
```

## Datei: src/app/leads/loading.tsx

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LeadsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-10 flex-1 min-w-[200px] bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
      </div>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b border-zinc-800/50"
          >
            <Skeleton className="h-4 w-[200px] bg-zinc-800" />
            <Skeleton className="h-4 w-[100px] bg-zinc-800" />
            <Skeleton className="h-4 w-[80px] bg-zinc-800" />
            <Skeleton className="h-4 w-[40px] bg-zinc-800" />
            <Skeleton className="h-4 w-[60px] bg-zinc-800" />
            <Skeleton className="h-4 w-[80px] bg-zinc-800" />
            <Skeleton className="h-4 w-[70px] bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Datei: src/app/leads/[id]/loading.tsx

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LeadDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32 bg-zinc-800" />
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-zinc-800" />
          <Skeleton className="h-4 w-48 bg-zinc-800" />
        </div>
        <Skeleton className="h-10 w-44 bg-zinc-800" />
      </div>
      <Skeleton className="h-[200px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-10 w-full bg-zinc-800 rounded-lg" />
      <Skeleton className="h-[300px] bg-zinc-900 rounded-xl" />
    </div>
  );
}
```

## Datei: src/app/leads/[id]/error.tsx

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function LeadDetailError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-zinc-100">
        Lead konnte nicht geladen werden
      </h2>
      <div className="flex gap-3 mt-4">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Button variant="outline" asChild>
          <Link href="/leads">Zurueck zur Liste</Link>
        </Button>
      </div>
    </div>
  );
}
```

## Datei: src/app/scan/loading.tsx

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ScanLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48 bg-zinc-800" />
      <Skeleton className="h-[300px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-[200px] bg-zinc-900 rounded-xl" />
    </div>
  );
}
```

## Datei: src/app/settings/loading.tsx

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48 bg-zinc-800" />
      <Skeleton className="h-[180px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-[200px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-[250px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-[120px] bg-zinc-900 rounded-xl" />
    </div>
  );
}
```
