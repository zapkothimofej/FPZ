# LeadFinder Integration into fpz-media

## Goal
Migrate fpz-leadfinder fully into fpz-media so it's accessible at `/secret` on the same deployment.

## Route Structure
Route group `app/(leadfinder)/` with own layout (no fpz Navbar/Footer):
- `app/(leadfinder)/secret/page.tsx` — Login
- `app/(leadfinder)/secret/dashboard/page.tsx` — Dashboard (was `/`)
- `app/(leadfinder)/secret/leads/page.tsx` — Lead list
- `app/(leadfinder)/secret/leads/[id]/page.tsx` — Lead detail
- `app/(leadfinder)/secret/scan/page.tsx` — Scan
- `app/(leadfinder)/secret/settings/page.tsx` — Settings
- All API routes under `app/api/secret/` (was `app/api/`)

## Middleware
Adapted to only protect `/secret/*` and `/api/secret/*` paths, not fpz-media routes.
Auth cookie: `fpz-auth`, redirect to `/secret` on unauthenticated access.

## Components
- `components/leadfinder/` — all LeadFinder components
- `components/leadfinder/ui/` — LeadFinder shadcn components

## Database
- Prisma schema → `fpz-media/prisma/schema.prisma`
- Generated client → `fpz-media/src/generated/prisma/`
- SQLite dev.db → `fpz-media/dev.db`

## New Dependencies
- `@prisma/client`, `prisma`, `@prisma/adapter-better-sqlite3`, `better-sqlite3`
- `@tanstack/react-table`, `recharts`, `groq-sdk`, `cheerio`
- `jspdf`, `jspdf-autotable`, `sonner`, `cmdk`
- `@libsql/client`, `@prisma/adapter-libsql`

## Styling
LeadFinder CSS vars merged into `globals.css`. Components keep their zinc dark-theme classes.
