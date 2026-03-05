# LeadFinder Migration into fpz-media

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate all fpz-leadfinder code into fpz-media so the app is accessible at `/secret` on the same Vercel deployment.

**Architecture:** Route group `app/(leadfinder)/` with own layout (no fpz Navbar/Footer). All LeadFinder API routes moved under `/api/secret/*`. Middleware scoped to `/secret/*` only. Internal hrefs prefixed with `/secret`.

**Tech Stack:** Next.js 16 App Router, Prisma + better-sqlite3, @tanstack/react-table, recharts, groq-sdk, cheerio, jspdf, sonner, cmdk

---

## Task 1: Install new dependencies in fpz-media

**Files:**
- Modify: `fpz-media/package.json`

**Step 1: Install all LeadFinder dependencies**

```bash
cd /d/fpz/fpz-media
npm install @prisma/client @prisma/adapter-better-sqlite3 @prisma/adapter-libsql @libsql/client better-sqlite3 @tanstack/react-table recharts groq-sdk cheerio jspdf jspdf-autotable sonner cmdk
npm install -D prisma @types/better-sqlite3
```

Expected: `node_modules` updated, no errors.

**Step 2: Add `serverExternalPackages` to next.config.ts**

Current `fpz-media/next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() { ... }
};
```

Add after headers:
```ts
const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "better-sqlite3"],
  async headers() { ... }
};
```

**Step 3: Commit**
```bash
cd /d/fpz/fpz-media
git add package.json package-lock.json next.config.ts
git commit -m "chore(leadfinder): install dependencies"
```

---

## Task 2: Copy Prisma schema and generated client

**Files:**
- Create: `fpz-media/prisma/schema.prisma`
- Create: `fpz-media/prisma/dev.db` (copy from fpz-leadfinder)
- Create: `fpz-media/src/generated/prisma/` (copy entire directory)

**Step 1: Copy Prisma schema**
```bash
cp /d/fpz/fpz-leadfinder/prisma/schema.prisma /d/fpz/fpz-media/prisma/schema.prisma
```

**Step 2: Copy dev.db**
```bash
cp /d/fpz/fpz-leadfinder/dev.db /d/fpz/fpz-media/prisma/dev.db
```
(If dev.db doesn't exist yet, it will be created on first run.)

**Step 3: Copy generated Prisma client**
```bash
mkdir -p /d/fpz/fpz-media/src/generated
cp -r /d/fpz/fpz-leadfinder/src/generated/prisma /d/fpz/fpz-media/src/generated/
```

**Step 4: Fix the generated client import path in db/client.ts (done in Task 5)**

**Step 5: Commit**
```bash
cd /d/fpz/fpz-media
git add prisma/ src/generated/
git commit -m "chore(leadfinder): add prisma schema and generated client"
```

---

## Task 3: Merge CSS into globals.css

**Files:**
- Modify: `fpz-media/app/globals.css`

**Step 1: Read current fpz-media globals.css**

**Step 2: Append LeadFinder CSS vars and scrollbar styles**

Add to `fpz-media/app/globals.css` (after existing content):
```css
/* ─── LeadFinder: shadcn CSS variables ─── */
.dark {
  --background: oklch(0.09 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.17 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.17 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.17 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.2 0 0);
  --input: oklch(0.2 0 0);
  --ring: oklch(0.4 0 0);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.2 0 0);
}

/* ─── LeadFinder: custom scrollbar ─── */
.leadfinder-app ::-webkit-scrollbar { width: 6px; height: 6px; }
.leadfinder-app ::-webkit-scrollbar-track { background: #09090b; }
.leadfinder-app ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 3px; }
```

**Step 3: Commit**
```bash
cd /d/fpz/fpz-media
git add app/globals.css
git commit -m "chore(leadfinder): merge CSS vars and scrollbar"
```

---

## Task 4: Copy lib utilities and types

**Files:**
- Modify: `fpz-media/lib/utils.ts`
- Create: `fpz-media/types/index.ts`
- Create: `fpz-media/lib/constants.ts`
- Create: `fpz-media/lib/db/client.ts`
- Create: `fpz-media/lib/db/queries.ts`
- Create: `fpz-media/lib/ai/` (all files)
- Create: `fpz-media/lib/analyzers/` (all files)
- Create: `fpz-media/lib/scrapers/` (all files)
- Create: `fpz-media/lib/export/` (all files)

**Step 1: Append LeadFinder utils to `fpz-media/lib/utils.ts`**

Add after existing `cn()` function (copy everything except `cn` from `fpz-leadfinder/src/lib/utils.ts`):
- `getScoreColor`, `getScoreColorClass`, `getScoreBgClass`, `getScoreDotClass`, `getScoreColorHex`
- `formatDate`, `formatDateTime`, `formatDuration`
- `truncate`, `slugify`, `parseJsonSafe`, `ensureHttps`, `sleep`

Also add import at top:
```ts
import { SCORE_THRESHOLDS } from "./constants";
import type { ScoreColor } from "@/types";
```

**Step 2: Create `fpz-media/types/index.ts`**

Copy from `fpz-leadfinder/src/types/index.ts` verbatim.

**Step 3: Copy `fpz-media/lib/constants.ts`**

Copy from `fpz-leadfinder/src/lib/constants.ts` verbatim.

**Step 4: Copy lib subdirectories**

```bash
mkdir -p /d/fpz/fpz-media/lib/db /d/fpz/fpz-media/lib/ai /d/fpz/fpz-media/lib/analyzers /d/fpz/fpz-media/lib/scrapers /d/fpz/fpz-media/lib/export

cp /d/fpz/fpz-leadfinder/src/lib/db/queries.ts /d/fpz/fpz-media/lib/db/queries.ts
cp /d/fpz/fpz-leadfinder/src/lib/constants.ts /d/fpz/fpz-media/lib/constants.ts
cp /d/fpz/fpz-leadfinder/src/lib/ai/*.ts /d/fpz/fpz-media/lib/ai/
cp /d/fpz/fpz-leadfinder/src/lib/analyzers/*.ts /d/fpz/fpz-media/lib/analyzers/
cp /d/fpz/fpz-leadfinder/src/lib/scrapers/*.ts /d/fpz/fpz-media/lib/scrapers/
cp /d/fpz/fpz-leadfinder/src/lib/export/*.ts /d/fpz/fpz-media/lib/export/
```

**Step 5: Create `fpz-media/lib/db/client.ts`**

Copy from `fpz-leadfinder/src/lib/db/client.ts` but fix the import path:
```ts
import { PrismaClient } from "../../src/generated/prisma/client";
```
→ Change to:
```ts
import { PrismaClient } from "@/generated/prisma/client";
```

Full file:
```ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

**Step 6: Commit**
```bash
cd /d/fpz/fpz-media
git add lib/ types/
git commit -m "chore(leadfinder): add lib utilities and types"
```

---

## Task 5: Copy UI components

**Files:**
- Create: `fpz-media/components/ui/accordion.tsx`
- Create: `fpz-media/components/ui/alert-dialog.tsx`
- Create: `fpz-media/components/ui/badge.tsx`
- Create: `fpz-media/components/ui/button.tsx`
- Create: `fpz-media/components/ui/card.tsx`
- Create: `fpz-media/components/ui/checkbox.tsx`
- Create: `fpz-media/components/ui/command.tsx`
- Create: `fpz-media/components/ui/dialog.tsx`
- Create: `fpz-media/components/ui/dropdown-menu.tsx`
- Create: `fpz-media/components/ui/popover.tsx`
- Create: `fpz-media/components/ui/progress.tsx`
- Create: `fpz-media/components/ui/separator.tsx`
- Create: `fpz-media/components/ui/sheet.tsx`
- Create: `fpz-media/components/ui/skeleton.tsx`
- Create: `fpz-media/components/ui/slider.tsx`
- Create: `fpz-media/components/ui/table.tsx`
- Create: `fpz-media/components/ui/tabs.tsx`
- Create: `fpz-media/components/ui/tooltip.tsx`
- Skip: input.tsx, label.tsx, select.tsx, textarea.tsx (already exist in fpz-media)

**Step 1: Copy new UI components (skip existing)**
```bash
for f in accordion alert-dialog badge button card checkbox command dialog dropdown-menu popover progress separator sheet skeleton slider table tabs tooltip; do
  cp /d/fpz/fpz-leadfinder/src/components/ui/${f}.tsx /d/fpz/fpz-media/components/ui/${f}.tsx
done
```

**Step 2: Commit**
```bash
cd /d/fpz/fpz-media
git add components/ui/
git commit -m "chore(leadfinder): add shadcn UI components"
```

---

## Task 6: Copy LeadFinder feature components

**Files:**
- Create: `fpz-media/components/leadfinder/` (entire directory structure)

**Step 1: Copy all feature components**
```bash
mkdir -p /d/fpz/fpz-media/components/leadfinder
cp -r /d/fpz/fpz-leadfinder/src/components/dashboard /d/fpz/fpz-media/components/leadfinder/
cp -r /d/fpz/fpz-leadfinder/src/components/leads /d/fpz/fpz-media/components/leadfinder/
cp -r /d/fpz/fpz-leadfinder/src/components/scan /d/fpz/fpz-media/components/leadfinder/
cp -r /d/fpz/fpz-leadfinder/src/components/settings /d/fpz/fpz-media/components/leadfinder/
cp -r /d/fpz/fpz-leadfinder/src/components/briefing /d/fpz/fpz-media/components/leadfinder/
cp -r /d/fpz/fpz-leadfinder/src/components/script /d/fpz/fpz-media/components/leadfinder/
cp -r /d/fpz/fpz-leadfinder/src/components/shared /d/fpz/fpz-media/components/leadfinder/
```

**Step 2: Update import paths in all copied components**

In all files under `components/leadfinder/`, fix these imports:

| Old | New |
|-----|-----|
| `from "@/components/dashboard/` | `from "@/components/leadfinder/dashboard/` |
| `from "@/components/leads/` | `from "@/components/leadfinder/leads/` |
| `from "@/components/scan/` | `from "@/components/leadfinder/scan/` |
| `from "@/components/settings/` | `from "@/components/leadfinder/settings/` |
| `from "@/components/shared/` | `from "@/components/leadfinder/shared/` |

All `@/components/ui/`, `@/lib/`, `@/types` imports stay unchanged (they work from fpz-media root).

Use sed to batch-replace:
```bash
cd /d/fpz/fpz-media/components/leadfinder
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i \
  -e 's|from "@/components/dashboard/|from "@/components/leadfinder/dashboard/|g' \
  -e 's|from "@/components/leads/|from "@/components/leadfinder/leads/|g' \
  -e 's|from "@/components/scan/|from "@/components/leadfinder/scan/|g' \
  -e 's|from "@/components/settings/|from "@/components/leadfinder/settings/|g' \
  -e 's|from "@/components/shared/|from "@/components/leadfinder/shared/|g'
```

**Step 3: Update internal hrefs and router.push paths**

In `components/leadfinder/shared/Sidebar.tsx`, update NAV_ITEMS:
```ts
const NAV_ITEMS: NavItem[] = [
  { href: "/secret/dashboard", label: "Dashboard", icon: Home },
  { href: "/secret/leads", label: "Leads", icon: Users },
  { href: "/secret/scan", label: "Scan", icon: Search },
  { href: "/secret/settings", label: "Einstellungen", icon: Settings },
];
```

Also update `isNavActive` function (the root "/" check):
```ts
function isNavActive(pathname: string, href: string): boolean {
  if (href === "/secret/dashboard") return pathname === "/secret/dashboard" || pathname === "/secret";
  return pathname.startsWith(href);
}
```

In `components/leadfinder/shared/KeyboardShortcuts.tsx`, update router.push calls:
```ts
router.push("/secret/dashboard");  // was "/"
router.push("/secret/leads");       // was "/leads"
router.push("/secret/scan");        // was "/scan"
router.push("/secret/settings");    // was "/settings"
```

In `components/leadfinder/leads/AddLeadDialog.tsx`:
```ts
router.push(`/secret/leads/${lead.id}`);  // was `/leads/${lead.id}`
```

In `components/leadfinder/leads/LeadDetailActions.tsx`:
```ts
router.push("/secret/leads");  // was "/leads"
```

In `components/leadfinder/leads/LeadTable.tsx`:
```ts
onClick={() => router.push(`/secret/leads/${row.original.id}`)  // was `/leads/${...}`
```

In `components/leadfinder/scan/ScanForm.tsx`:
```ts
router.push("/secret/leads?sort=createdAt&order=desc")  // was "/leads?..."
```

In `components/leadfinder/dashboard/CityChart.tsx`:
The `router.push(...)` navigates to leads filtered by city — update:
```ts
router.push(`/secret/leads?city=${encodeURIComponent(city)}`)
```
(Read the actual code first to adapt correctly.)

**Step 4: Update all API fetch paths**

In all components/leadfinder files, replace:
```
/api/auth      → /api/secret/auth
/api/leads     → /api/secret/leads
/api/scan      → /api/secret/scan
/api/analyze   → /api/secret/analyze
/api/briefing  → /api/secret/briefing
/api/script    → /api/secret/script
/api/dashboard → /api/secret/dashboard
/api/export    → /api/secret/export
/api/cron      → /api/secret/cron
```

```bash
cd /d/fpz/fpz-media/components/leadfinder
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i \
  -e 's|"/api/auth|"/api/secret/auth|g' \
  -e 's|"/api/leads|"/api/secret/leads|g' \
  -e 's|"/api/scan|"/api/secret/scan|g' \
  -e 's|"/api/analyze|"/api/secret/analyze|g' \
  -e 's|"/api/briefing|"/api/secret/briefing|g' \
  -e 's|"/api/script|"/api/secret/script|g' \
  -e 's|"/api/dashboard|"/api/secret/dashboard|g' \
  -e 's|"/api/export|"/api/secret/export|g' \
  -e 's|"/api/cron|"/api/secret/cron|g'
```

**Step 5: Commit**
```bash
cd /d/fpz/fpz-media
git add components/leadfinder/
git commit -m "feat(leadfinder): add feature components with updated paths"
```

---

## Task 7: Create the route group and layout

**Files:**
- Create: `fpz-media/app/(leadfinder)/secret/layout.tsx`

**Step 1: Create directory**
```bash
mkdir -p /d/fpz/fpz-media/app/\(leadfinder\)/secret
```

**Step 2: Create `fpz-media/app/(leadfinder)/secret/layout.tsx`**

```tsx
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/leadfinder/shared/SidebarContext";
import { Sidebar } from "@/components/leadfinder/shared/Sidebar";
import { MobileNav } from "@/components/leadfinder/shared/MobileNav";
import { TopBar } from "@/components/leadfinder/shared/TopBar";
import { MainContent } from "@/components/leadfinder/shared/MainContent";
import { Toaster } from "sonner";
import { KeyboardShortcuts } from "@/components/leadfinder/shared/KeyboardShortcuts";

const geist = Geist({ subsets: ["latin"] });

export default function LeadFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(geist.className, "leadfinder-app dark min-h-screen bg-zinc-950 text-zinc-50")}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <MainContent>
            <TopBar />
            <main className="p-4 md:p-6 pb-20 md:pb-6">{children}</main>
          </MainContent>
        </div>
        <MobileNav />
      </SidebarProvider>
      <Toaster position="bottom-right" theme="dark" richColors />
      <KeyboardShortcuts />
    </div>
  );
}
```

**Step 3: Commit**
```bash
cd /d/fpz/fpz-media
git add "app/(leadfinder)/"
git commit -m "feat(leadfinder): add route group layout"
```

---

## Task 8: Create LeadFinder pages

**Files:**
- Create: `fpz-media/app/(leadfinder)/secret/page.tsx` (login)
- Create: `fpz-media/app/(leadfinder)/secret/dashboard/page.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/leads/page.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/leads/[id]/page.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/leads/[id]/error.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/leads/[id]/loading.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/leads/loading.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/scan/page.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/scan/loading.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/settings/page.tsx`
- Create: `fpz-media/app/(leadfinder)/secret/settings/loading.tsx`

**Step 1: Copy page files**
```bash
LF_SRC=/d/fpz/fpz-leadfinder/src/app
LF_DST=/d/fpz/fpz-media/app/\(leadfinder\)/secret

# Login page — copy from leadfinder's /secret/page.tsx
cp $LF_SRC/secret/page.tsx $LF_DST/page.tsx

# Dashboard — copy from leadfinder's root page.tsx
mkdir -p $LF_DST/dashboard
cp $LF_SRC/page.tsx $LF_DST/dashboard/page.tsx

# Leads
mkdir -p $LF_DST/leads
cp $LF_SRC/leads/page.tsx $LF_DST/leads/page.tsx
cp $LF_SRC/leads/loading.tsx $LF_DST/leads/loading.tsx
cp $LF_SRC/leads/actions.ts $LF_DST/leads/actions.ts

# Leads [id]
mkdir -p $LF_DST/leads/\[id\]
cp $LF_SRC/leads/\[id\]/page.tsx $LF_DST/leads/\[id\]/page.tsx
cp $LF_SRC/leads/\[id\]/error.tsx $LF_DST/leads/\[id\]/error.tsx
cp $LF_SRC/leads/\[id\]/loading.tsx $LF_DST/leads/\[id\]/loading.tsx
cp $LF_SRC/leads/\[id\]/actions.ts $LF_DST/leads/\[id\]/actions.ts

# Scan
mkdir -p $LF_DST/scan
cp $LF_SRC/scan/page.tsx $LF_DST/scan/page.tsx
cp $LF_SRC/scan/loading.tsx $LF_DST/scan/loading.tsx

# Settings
mkdir -p $LF_DST/settings
cp $LF_SRC/settings/page.tsx $LF_DST/settings/page.tsx
cp $LF_SRC/settings/loading.tsx $LF_DST/settings/loading.tsx
cp $LF_SRC/settings/actions.ts $LF_DST/settings/actions.ts
```

**Step 2: Update component imports in all copied pages**

In all page/action files under `app/(leadfinder)/secret/`, replace component import paths:
```bash
find /d/fpz/fpz-media/app/\(leadfinder\) -name "*.tsx" -o -name "*.ts" | xargs sed -i \
  -e 's|from "@/components/dashboard/|from "@/components/leadfinder/dashboard/|g' \
  -e 's|from "@/components/leads/|from "@/components/leadfinder/leads/|g' \
  -e 's|from "@/components/scan/|from "@/components/leadfinder/scan/|g' \
  -e 's|from "@/components/settings/|from "@/components/leadfinder/settings/|g' \
  -e 's|from "@/components/shared/|from "@/components/leadfinder/shared/|g'
```

**Step 3: Fix login page — update auth API call and redirect**

In `app/(leadfinder)/secret/page.tsx`, update:
```ts
const res = await fetch("/api/secret/auth", {  // was /api/auth
```
And:
```ts
router.push("/secret/dashboard");  // was "/"
```

**Step 4: Commit**
```bash
cd /d/fpz/fpz-media
git add "app/(leadfinder)/"
git commit -m "feat(leadfinder): add all pages"
```

---

## Task 9: Copy API routes

**Files:**
- Create: `fpz-media/app/api/secret/auth/route.ts`
- Create: `fpz-media/app/api/secret/leads/route.ts`
- Create: `fpz-media/app/api/secret/leads/[id]/route.ts`
- Create: `fpz-media/app/api/secret/analyze/route.ts`
- Create: `fpz-media/app/api/secret/analyze/batch/route.ts`
- Create: `fpz-media/app/api/secret/briefing/generate/route.ts`
- Create: `fpz-media/app/api/secret/cron/route.ts`
- Create: `fpz-media/app/api/secret/dashboard/route.ts`
- Create: `fpz-media/app/api/secret/export/csv/route.ts`
- Create: `fpz-media/app/api/secret/export/pdf/[leadId]/route.ts`
- Create: `fpz-media/app/api/secret/scan/route.ts`
- Create: `fpz-media/app/api/secret/scan/status/route.ts`
- Create: `fpz-media/app/api/secret/script/generate/route.ts`

**Step 1: Copy API routes**
```bash
LF_API=/d/fpz/fpz-leadfinder/src/app/api
DST_API=/d/fpz/fpz-media/app/api/secret

mkdir -p $DST_API/auth
mkdir -p $DST_API/leads/\[id\]
mkdir -p $DST_API/analyze/batch
mkdir -p $DST_API/briefing/generate
mkdir -p $DST_API/cron
mkdir -p $DST_API/dashboard
mkdir -p $DST_API/export/csv
mkdir -p $DST_API/export/pdf/\[leadId\]
mkdir -p $DST_API/scan/status
mkdir -p $DST_API/script/generate

cp $LF_API/auth/route.ts $DST_API/auth/route.ts
cp $LF_API/leads/route.ts $DST_API/leads/route.ts
cp $LF_API/leads/\[id\]/route.ts $DST_API/leads/\[id\]/route.ts
cp $LF_API/analyze/route.ts $DST_API/analyze/route.ts
cp $LF_API/analyze/batch/route.ts $DST_API/analyze/batch/route.ts
cp $LF_API/briefing/generate/route.ts $DST_API/briefing/generate/route.ts
cp $LF_API/cron/route.ts $DST_API/cron/route.ts
cp $LF_API/dashboard/route.ts $DST_API/dashboard/route.ts
cp $LF_API/export/csv/route.ts $DST_API/export/csv/route.ts
cp $LF_API/export/pdf/\[leadId\]/route.ts $DST_API/export/pdf/\[leadId\]/route.ts
cp $LF_API/scan/route.ts $DST_API/scan/route.ts
cp $LF_API/scan/status/route.ts $DST_API/scan/status/route.ts
cp $LF_API/script/generate/route.ts $DST_API/script/generate/route.ts
```

**Step 2: Update lib imports in all API routes**

All API routes import from `@/lib/db/...`, `@/lib/ai/...` etc. — these paths already work since we placed libs at `fpz-media/lib/`. No changes needed for lib imports.

**Step 3: Update any internal API references in API routes**

Some API routes might call other internal APIs. Check and update if needed.

**Step 4: Commit**
```bash
cd /d/fpz/fpz-media
git add app/api/secret/
git commit -m "feat(leadfinder): add API routes under /api/secret/"
```

---

## Task 10: Update middleware

**Files:**
- Create: `fpz-media/middleware.ts`

**Step 1: Create scoped middleware**

fpz-media currently has no middleware. Create `fpz-media/middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect LeadFinder routes
  if (!pathname.startsWith("/secret") && !pathname.startsWith("/api/secret")) {
    return NextResponse.next();
  }

  // Allow login page and auth API through
  if (pathname === "/secret" || pathname === "/api/secret/auth") {
    return NextResponse.next();
  }

  const auth = req.cookies.get("fpz-auth");
  if (auth?.value === "authenticated") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/secret";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/secret/:path*",
    "/api/secret/:path*",
  ],
};
```

**Step 2: Commit**
```bash
cd /d/fpz/fpz-media
git add middleware.ts
git commit -m "feat(leadfinder): add scoped middleware for /secret"
```

---

## Task 11: TypeScript check and fix

**Files:** Various — fix any type errors

**Step 1: Run TypeScript check**
```bash
cd /d/fpz/fpz-media
npx tsc --noEmit 2>&1
```

**Step 2: Fix errors**

Common issues to expect:
- Missing type imports — add from `@/types`
- Prisma client type mismatches — ensure generated client types are imported correctly
- `@libsql/client` types — may need `@types/...` or cast

**Step 3: Commit fixes**
```bash
git add -A
git commit -m "fix(leadfinder): resolve TypeScript errors"
```

---

## Task 12: Build and verify

**Step 1: Run production build**
```bash
cd /d/fpz/fpz-media
npm run build 2>&1
```

Expected: Build succeeds with `/secret/*` routes appearing in output.

**Step 2: Run dev server and test manually**
```bash
npm run dev
```
Navigate to:
- `http://localhost:3000/secret` → Login page
- Enter password (default: `fpz123`) → redirect to `/secret/dashboard`
- `/secret/leads`, `/secret/scan`, `/secret/settings` → all work

**Step 3: Final commit**
```bash
git add -A
git commit -m "feat(leadfinder): complete migration into fpz-media at /secret"
```

---

## Environment Variables

Add to `fpz-media/.env.local`:
```
APP_PASSWORD=yourpassword
DATABASE_URL=file:./prisma/dev.db
GROQ_API_KEY=...
```

For Vercel production: add these in Vercel Dashboard > Environment Variables.
SQLite (`better-sqlite3`) works on Vercel but only on Lambda functions (stateless). For persistent data across requests, switch `DATABASE_URL` to a Turso/libsql hosted URL (the Prisma adapter already supports this).
