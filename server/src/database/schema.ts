import { pgTable, integer, timestamp, decimal, char, serial, uuid, boolean } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  discordId: char({ length: 256 }).notNull().unique(),
})

export const currencies = pgTable("currencies", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
  symbol: char({ length: 256 }).notNull().unique(),
})

export const wallets = pgTable("wallets", {
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  currencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  count: decimal().default("0").notNull(),
})

export const exchangeRates = pgTable("exchange_rates", {
  baseCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  quoteCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  rate: decimal().notNull(),
})

export const planetTypes = pgTable("planet_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

export const planets = pgTable("planets", {
  id: uuid().defaultRandom().primaryKey(),
  name: char({ length: 256 }).notNull(),
  typeId: integer().references(() => planetTypes.id),
})

export const tileTypes = pgTable("tile_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  planetTypeIds: integer().array().notNull(),
})

export const tiles = pgTable("tiles", {
  id: uuid().defaultRandom().primaryKey(),
  type: integer().references(() => tileTypes.id),
})

export const colonies = pgTable("colonies", {
  id: uuid().defaultRandom().primaryKey(),
  name: char({ length: 256 }),
  createdAt: timestamp().notNull(),
  rating: decimal().default("0"),
  planetTypeId: integer().references(() => planetTypes.id),
})

export const colonistRoles = pgTable("colonist_roles", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

export const colonists = pgTable("colonists", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  colonyId: uuid()
    .references(() => colonies.id)
    .notNull(),
  joinedAt: timestamp().notNull(),
  roleId: integer()
    .references(() => colonistRoles.id)
    .notNull(),
})

export const colonyTiles = pgTable("colony_tiles", {
  tileId: uuid()
    .references(() => tiles.id)
    .notNull(),
  colonyId: uuid()
    .references(() => colonies.id)
    .notNull(),
  progress: decimal().default("0"),
  claimedAt: timestamp().notNull(),
})

export const colonistActionTypes = pgTable("colonist_action_types", {
  id: serial().primaryKey(),
  role: integer().references(() => colonistRoles.id),
  name: char({ length: 256 }).notNull(),
  // add cooldown info if needed
})

export const colonistActions = pgTable("colonist_actions", {
  colonistId: uuid()
    .references(() => colonists.id)
    .notNull(),
  typeId: integer()
    .references(() => colonistActionTypes.id)
    .notNull(),
  lastUsed: timestamp().default(new Date("January 1, 1970")),
})

export const itemTypes = pgTable("item_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
  stackLimit: integer().notNull(),
  price: decimal(),
  recipeId: integer().references(() => itemTypeRecipes.id),
  tier: integer(),
  consumable: boolean().notNull(),
  duration: integer().notNull(), // milliseconds
  sourceId: integer().references(() => eventSources.id),
})

export const itemTypeRecipes = pgTable("item_type_recipes", {
  id: serial().primaryKey(),
  itemIds: integer()
    .references(() => itemTypes.id)
    .array()
    .notNull(),
  result: integer()
    .references(() => itemTypes.id)
    .array()
    .notNull(),
  authorId: uuid()
    .references(() => users.id)
    .notNull(), // author
})

export const items = pgTable("items", {
  id: uuid().defaultRandom().primaryKey(),
  name: char({ length: 256 }).notNull(),
  typeId: integer().references(() => itemTypes.id),
})

export const inventoryLocations = pgTable("inventory_locations", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
})

export const inventories = pgTable("inventories", {
  id: uuid().defaultRandom().primaryKey(),
  location: integer()
    .references(() => inventoryLocations.id)
    .notNull(),
})

export const inventoryItems = pgTable("inventory_items", {
  itemId: uuid()
    .references(() => items.id)
    .notNull(),
  inventoryId: uuid()
    .references(() => inventories.id)
    .notNull(),
  // count can be placed only on items that are not unique, etc.
})

export const effectTargetTypes = pgTable("effect_target_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

export const periods = pgTable("periods", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

export const eventSources = pgTable("event_sources", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

export const effects = pgTable("effects", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  periodId: integer()
    .references(() => periods.id)
    .notNull(),
  sourceId: integer()
    .references(() => eventSources.id)
    .notNull(),
  targetId: integer().notNull(),
  targetTypeId: integer()
    .references(() => effectTargetTypes.id)
    .notNull(),
  startAt: timestamp(),
  endAt: timestamp(),
})

export const multiplierEffects = pgTable("multiplier_effects", {
  id: serial().primaryKey(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
  multiplier: decimal().notNull(),
})

export const stateEffectTypes = pgTable("state_effect_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

export const stateEffects = pgTable("state_effects", {
  id: serial().primaryKey(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
  typeId: integer()
    .references(() => stateEffectTypes.id)
    .notNull(),
})

export const events = pgTable("events", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  periodId: integer()
    .references(() => periods.id)
    .notNull(),
  sourceId: integer()
    .references(() => eventSources.id)
    .notNull(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
})

export const upgrades = pgTable("upgrades", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
  cost: decimal().default("0"),
})

export const colonistUpgrades = pgTable("colonist_upgrades", {
  colonistId: uuid()
    .references(() => colonists.id)
    .notNull(),
  upgradeId: integer()
    .references(() => upgrades.id)
    .notNull(),
})

export const colonyUpgrades = pgTable("colony_upgrades", {
  colonyId: uuid()
    .references(() => colonies.id)
    .notNull(),
  upgradeId: integer()
    .references(() => upgrades.id)
    .notNull(),
})

export const terraformings = pgTable("terraformings", {
  id: uuid().defaultRandom().primaryKey(),
  tileId: uuid()
    .references(() => tiles.id)
    .notNull(),
  planetId: uuid()
    .references(() => planets.id)
    .notNull(),
  water: decimal().default("0").notNull(),
  heat: decimal().default("0").notNull(),
  oxygen: decimal().default("0").notNull(),
  colonyId: uuid().references(() => colonies.id),
  colonizedAt: timestamp(),
  terraformedAt: timestamp(),
})

export const itemChanges = pgTable("item_changes", {
  id: serial().primaryKey(),
  typeId: integer()
    .references(() => itemTypes.id)
    .notNull(),
  count: integer().notNull(),
  periodId: integer()
    .references(() => periods.id)
    .notNull(),
  colonyId: uuid().references(() => colonies.id),
  sourceId: integer()
    .references(() => eventSources.id)
    .notNull(),
})
