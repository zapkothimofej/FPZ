import "dotenv/config";
import { defineConfig } from "prisma/config";

// Runtime DB connection is handled via @prisma/adapter-libsql in lib/db/client.ts
// This config is only used for local migrations (prisma db push via setup-db.mjs)
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});
