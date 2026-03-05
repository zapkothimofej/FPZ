import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const statements = [
  `CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "googleMapsUrl" TEXT,
    "openingHours" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "source" TEXT NOT NULL DEFAULT 'OSM',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "overallScore" INTEGER,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Lead_name_address_city_key" ON "Lead"("name", "address", "city")`,
  `CREATE INDEX IF NOT EXISTS "Lead_city_idx" ON "Lead"("city")`,
  `CREATE INDEX IF NOT EXISTS "Lead_status_idx" ON "Lead"("status")`,
  `CREATE INDEX IF NOT EXISTS "Lead_overallScore_idx" ON "Lead"("overallScore")`,
  `CREATE INDEX IF NOT EXISTS "Lead_category_idx" ON "Lead"("category")`,
  `CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt")`,
  `CREATE TABLE IF NOT EXISTS "WebsiteAnalysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL UNIQUE,
    "performanceScore" INTEGER NOT NULL DEFAULT 0,
    "seoScore" INTEGER NOT NULL DEFAULT 0,
    "mobileScore" INTEGER NOT NULL DEFAULT 0,
    "securityScore" INTEGER NOT NULL DEFAULT 0,
    "designScore" INTEGER NOT NULL DEFAULT 0,
    "techScore" INTEGER NOT NULL DEFAULT 0,
    "ageScore" INTEGER NOT NULL DEFAULT 0,
    "accessibilityScore" INTEGER NOT NULL DEFAULT 0,
    "contentScore" INTEGER NOT NULL DEFAULT 0,
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "details" TEXT,
    "screenshotUrl" TEXT,
    "techStack" TEXT,
    "analyzedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "Briefing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL UNIQUE,
    "summary" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "effort" TEXT NOT NULL DEFAULT 'MEDIUM',
    "opener" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL DEFAULT 5,
    "fullText" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "SalesScript" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL UNIQUE,
    "greeting" TEXT NOT NULL,
    "hook" TEXT NOT NULL,
    "painPoints" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "callToAction" TEXT NOT NULL,
    "objections" TEXT NOT NULL,
    "fullScript" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS "ScanLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cities" TEXT NOT NULL,
    "newLeads" INTEGER NOT NULL DEFAULT 0,
    "updatedLeads" INTEGER NOT NULL DEFAULT 0,
    "errors" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'running',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME
  )`,
  `CREATE TABLE IF NOT EXISTS "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "groqApiKey" TEXT,
    "huggingfaceToken" TEXT,
    "defaultCities" TEXT,
    "scoringWeights" TEXT,
    "updatedAt" DATETIME NOT NULL
  )`,
];

console.log("Connecting to Turso...");
for (const sql of statements) {
  await client.execute(sql);
  const name = sql.match(/"(\w+)"/)?.[1] ?? "index";
  console.log(`✓ ${name}`);
}
console.log("Done — all tables created.");
