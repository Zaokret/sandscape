import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./server/src/database/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});