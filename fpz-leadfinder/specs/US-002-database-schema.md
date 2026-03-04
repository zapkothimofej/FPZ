# US-002: Datenbank-Schema

## Exakte Datei: prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Lead {
  id            String    @id @default(cuid())
  name          String
  address       String
  city          String
  zip           String?
  phone         String?
  email         String?
  website       String?
  category      String
  subcategory   String?
  googleMapsUrl String?
  openingHours  String?
  latitude      Float?
  longitude     Float?
  source        String    @default("OSM")       // "OSM" | "GOOGLE_MAPS" | "MANUAL"
  status        String    @default("NEW")        // "NEW" | "CONTACTED" | "OFFER_SENT" | "WON" | "REJECTED" | "ARCHIVED"
  overallScore  Int?
  notes         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  analysis    WebsiteAnalysis?
  briefing    Briefing?
  salesScript SalesScript?

  @@unique([name, address, city])
  @@index([city])
  @@index([status])
  @@index([overallScore])
  @@index([category])
  @@index([createdAt])
}

model WebsiteAnalysis {
  id                 String   @id @default(cuid())
  leadId             String   @unique
  lead               Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  performanceScore   Int      @default(0)
  seoScore           Int      @default(0)
  mobileScore        Int      @default(0)
  securityScore      Int      @default(0)
  designScore        Int      @default(0)
  techScore          Int      @default(0)
  ageScore           Int      @default(0)
  accessibilityScore Int      @default(0)
  contentScore       Int      @default(0)
  overallScore       Int      @default(0)
  details            String?  // JSON stringified
  screenshotUrl      String?
  techStack          String?  // JSON stringified
  analyzedAt         DateTime @default(now())
}

model Briefing {
  id          String   @id @default(cuid())
  leadId      String   @unique
  lead        Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  summary     String
  weaknesses  String   // JSON: Array<{ title: string; severity: "critical"|"high"|"medium"|"low"; description: string }>
  suggestions String   // JSON: Array<{ title: string; description: string; service: "web"|"media"|"automation" }>
  effort      String   @default("MEDIUM") // "SMALL" | "MEDIUM" | "LARGE"
  opener      String
  riskScore   Int      @default(5) // 1 = hohes Potential, 10 = niedriges
  fullText    String
  generatedAt DateTime @default(now())
}

model SalesScript {
  id           String   @id @default(cuid())
  leadId       String   @unique
  lead         Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  greeting     String
  hook         String
  painPoints   String   // JSON: string[]
  solution     String
  callToAction String
  objections   String   // JSON: Array<{ objection: string; response: string }>
  fullScript   String
  generatedAt  DateTime @default(now())
}

model ScanLog {
  id           String    @id @default(cuid())
  cities       String    // JSON: string[]
  newLeads     Int       @default(0)
  updatedLeads Int       @default(0)
  errors       Int       @default(0)
  duration     Int       @default(0) // Sekunden
  status       String    @default("running") // "running" | "completed" | "failed"
  startedAt    DateTime  @default(now())
  completedAt  DateTime?
}

model Settings {
  id               String   @id @default("default")
  groqApiKey       String?
  huggingfaceToken String?
  defaultCities    String?  // JSON: string[]
  scoringWeights   String?  // JSON: Record<string, number>
  updatedAt        DateTime @updatedAt
}
```

**WICHTIG:** SQLite hat keinen nativen Enum-Support. Deshalb nutzen wir String statt Enum.
Alle JSON-Felder sind String mit Kommentar welches Format erwartet wird.

## Exakte Datei: src/lib/db/client.ts

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

## Verifikation

```bash
npx prisma db push     # Erstellt prisma/dev.db
npx prisma generate    # Generiert @prisma/client Types
npx tsc --noEmit       # 0 Fehler
```
