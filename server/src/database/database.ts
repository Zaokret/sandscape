import { drizzle } from "drizzle-orm/node-postgres"
import * as guilds from "./schemas/guilds.ts"
import * as currency from "./schemas/currency.ts"
import * as transactions from "./schemas/transactions.ts"

export const db = drizzle(process.env.DATABASE_URL!, { schema: { ...guilds, ...currency, ...transactions } })
export type DBContext = typeof db
