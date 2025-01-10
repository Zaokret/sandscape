import { defineConfig } from "drizzle-kit"
export default defineConfig({
  dialect: "postgresql",
  schema: "./server/src/database/schemas/*",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
