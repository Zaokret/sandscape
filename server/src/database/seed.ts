import { db } from "./database"
import { seed } from "drizzle-seed"

import * as schema from "./schema"

export async function createDbSeed() {
  await seed(db, schema, { seed: 1234 })
}
