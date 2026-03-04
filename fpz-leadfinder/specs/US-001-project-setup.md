# US-001: Next.js 16 Projekt initialisieren

## Exakte Befehle (in Reihenfolge ausführen)

```bash
cd D:/FPZ/fpz-leadfinder

# 1. Next.js Projekt erstellen
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

# 2. Core Dependencies
npm install @prisma/client groq-sdk cheerio recharts jspdf jspdf-autotable lucide-react class-variance-authority clsx tailwind-merge @tanstack/react-table sonner

# 3. Dev Dependencies
npm install -D prisma tsx @types/node @types/react @types/react-dom

# 4. Prisma init
npx prisma init --datasource-provider sqlite

# 5. shadcn init
npx shadcn@latest init -y

# 6. shadcn Komponenten (einzeln, da batch manchmal Probleme macht)
npx shadcn@latest add button card badge input select dropdown-menu dialog tooltip skeleton separator sheet tabs accordion slider checkbox textarea progress alert-dialog popover command
```

## Exakte Datei: tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Exakte Datei: package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "db:seed": "npx tsx prisma/seed.ts",
    "postinstall": "prisma generate"
  }
}
```

## Exakte Datei: .env.example

```
# Datenbank
DATABASE_URL="file:./dev.db"

# KI APIs (gratis)
GROQ_API_KEY="gsk_your_key_here"
HUGGINGFACE_TOKEN="hf_your_token_here"

# Vercel Cron
CRON_SECRET="your-cron-secret-here"

# App
NEXT_PUBLIC_APP_VERSION="0.1.0"
```

## Exakte Datei: .gitignore (anhängen an bestehende)

```
node_modules/
.next/
.env
.env.local
prisma/dev.db
prisma/dev.db-journal
*.tsbuildinfo
.vercel/
```

## Exakte Datei: src/app/globals.css

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
}

body {
  @apply bg-zinc-950 text-zinc-50 antialiased;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #09090b;
}

::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #52525b;
}
```

## Exakte Datei: src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeadFinder — FPC-Media",
  description: "Internes Sales-Tool für FPC-Media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body
        className={cn(
          geist.className,
          "min-h-screen bg-zinc-950 text-zinc-50"
        )}
      >
        {children}
      </body>
    </html>
  );
}
```

## Exakte Datei: src/app/page.tsx

```tsx
export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">LeadFinder</h1>
      <p className="text-zinc-400 mt-2">Dashboard kommt hier.</p>
    </div>
  );
}
```

## Exakte Datei: src/lib/utils.ts

```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Ordnerstruktur erstellen

```bash
mkdir -p src/lib/scrapers src/lib/analyzers src/lib/ai src/lib/db src/lib/export
mkdir -p src/components/dashboard src/components/leads src/components/briefing src/components/script src/components/shared
mkdir -p src/types
```

## Verifikation

```bash
npm run dev  # Muss auf localhost:3000 starten
npx tsc --noEmit  # 0 Fehler
```
