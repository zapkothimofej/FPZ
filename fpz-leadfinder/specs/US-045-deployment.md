# US-045: Deployment & Production Config

## Datei: vercel.json

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 3 * * *"
    }
  ]
}
```

## Datei: next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  images: {
    remotePatterns: [],
  },
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, PATCH, DELETE, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
      ],
    },
  ],
};

export default nextConfig;
```

## Datei: .env.example (aktualisiert)

```env
# Database
DATABASE_URL="file:./dev.db"

# For production (Turso):
# DATABASE_URL="libsql://your-db.turso.io"
# DATABASE_AUTH_TOKEN="your-token"

# AI APIs (kostenlos)
GROQ_API_KEY="gsk_your_key_here"
HUGGINGFACE_API_KEY="hf_your_key_here"

# Cron Job Auth
CRON_SECRET="your-random-secret-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Mobile App
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

## Datei: prisma/schema.prisma (Generator ergaenzen)

Sicherstellen dass der Prisma Client Generator korrekt konfiguriert ist:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

## Datei: package.json (Scripts ergaenzen)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "prisma generate && prisma db push && next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "postinstall": "prisma generate"
  }
}
```

## Datei: .gitignore (Ergaenzungen)

Folgende Eintraege sicherstellen:

```
# deps
node_modules/

# next
.next/
out/

# env
.env
.env.local
.env.production

# prisma
prisma/dev.db
prisma/dev.db-journal

# misc
.DS_Store
*.tsbuildinfo

# turbo
.turbo/

# vercel
.vercel/
```

## Deployment Schritte (DEPLOYMENT.md)

```markdown
# FPZ LeadFinder — Deployment

## Voraussetzungen

- Vercel Account (kostenlos)
- Turso Account (kostenlos, fuer Production DB)
- Groq API Key (kostenlos)

## 1. Turso Datenbank einrichten

turso db create fpz-leadfinder
turso db show fpz-leadfinder --url
turso db tokens create fpz-leadfinder

## 2. Prisma fuer Turso anpassen

In prisma/schema.prisma den datasource aendern:

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

## 3. Vercel Deployment

1. Repository auf GitHub pushen
2. Auf vercel.com neues Projekt importieren
3. Environment Variables setzen:
   - DATABASE_URL = libsql://your-db.turso.io
   - DATABASE_AUTH_TOKEN = your-turso-token
   - GROQ_API_KEY = gsk_...
   - HUGGINGFACE_API_KEY = hf_...
   - CRON_SECRET = (zufaelliger String)
   - NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
4. Deploy

## 4. Datenbank initialisieren

Nach dem ersten Deploy:

npx prisma db push
npm run db:seed

## 5. Cron Job

Der Cron Job in vercel.json laeuft taeglich um 3:00 UTC.
Er scannt automatisch neue Leads und analysiert Websites.
```
