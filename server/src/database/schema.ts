import { pgTable, integer, timestamp, decimal, char, serial, uuid, boolean } from "drizzle-orm/pg-core"

//
//  USERS
//
export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  discordId: char({ length: 256 }).notNull().unique(),
})

//
//  CURRENCIES
//
export const currencies = pgTable("currencies", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
  symbol: char({ length: 256 }).notNull().unique(),
})

//
//  WALLETS
//
export const wallets = pgTable("wallets", {
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  currencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  count: decimal().default("0").notNull(),
})

//
//  EXCHANGE RATES
//
export const exchangeRates = pgTable("exchange_rates", {
  baseCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  quoteCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  rate: decimal().notNull(),
})

//
//  PLANET TYPES
//
export const planetTypes = pgTable("planet_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

//
//  PLANETS
//
export const planets = pgTable("planets", {
  id: uuid().defaultRandom().primaryKey(),
  name: char({ length: 256 }).notNull(),
  typeId: integer().references(() => planetTypes.id),
})

//
//  TILE TYPES
//
export const tileTypes = pgTable("tile_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  planetTypeIds: integer().array().notNull(),
})

//
//  TILES
//
export const tiles = pgTable("tiles", {
  id: uuid().defaultRandom().primaryKey(),
  type: integer().references(() => tileTypes.id),
})

//
//  COLONIES
//
export const colonies = pgTable("colonies", {
  id: uuid().defaultRandom().primaryKey(),
  name: char({ length: 256 }),
  createdAt: timestamp().notNull(),
  rating: decimal().default("0"),
  planetTypeId: integer().references(() => planetTypes.id),
})

//
//  COLONIST ROLES
//
export const colonistRoles = pgTable("colonist_roles", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

//
//  COLONISTS
//
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

//
//  COLONY TILES
//
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

//
//  COLONIST ACTION TYPES
//
export const colonistActionTypes = pgTable("colonist_action_types", {
  id: serial().primaryKey(),
  role: integer().references(() => colonistRoles.id),
  name: char({ length: 256 }).notNull(),
  // add cooldown info if needed
})

//
//  COLONIST ACTIONS
//
export const colonistActions = pgTable("colonist_actions", {
  colonistId: uuid()
    .references(() => colonists.id)
    .notNull(),
  typeId: integer()
    .references(() => colonistActionTypes.id)
    .notNull(),
  lastUsed: timestamp().default(new Date("January 1, 1970")),
})

//
//  ITEM TYPES
//
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

//
//  ITEM TYPE RECIPES
//
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

//
//  ITEMS
//
export const items = pgTable("items", {
  id: uuid().defaultRandom().primaryKey(),
  name: char({ length: 256 }).notNull(),
  typeId: integer().references(() => itemTypes.id),
})

//
//  INVENTORY LOCATIONS
//
export const inventoryLocations = pgTable("inventory_locations", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
})

//
//  INVENTORIES
//
export const inventories = pgTable("inventories", {
  id: uuid().defaultRandom().primaryKey(),
  location: integer()
    .references(() => inventoryLocations.id)
    .notNull(),
})

//
//  INVENTORY ITEMS
//
export const inventoryItems = pgTable("inventory_items", {
  itemId: uuid()
    .references(() => items.id)
    .notNull(),
  inventoryId: uuid()
    .references(() => inventories.id)
    .notNull(),
  // count can be placed only on items that are not unique, etc.
})

//
//  EFFECTS
//
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

//
//  MULTIPLIER EFFECTS
//
export const multiplierEffects = pgTable("multiplier_effects", {
  id: serial().primaryKey(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
  multiplier: decimal().notNull(),
})

//
//  STATE EFFECT TYPES
//
export const stateEffectTypes = pgTable("state_effect_types", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull().unique(),
})

//
//  STATE EFFECTS
//
export const stateEffects = pgTable("state_effects", {
  id: serial().primaryKey(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
  typeId: integer()
    .references(() => stateEffectTypes.id)
    .notNull(),
})

//
//  EVENTS
//
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

//
//  UPGRADES
//
export const upgrades = pgTable("upgrades", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  effectId: integer()
    .references(() => effects.id)
    .notNull(),
  cost: decimal().default("0"),
})

//
//  COLONIST UPGRADES
//
export const colonistUpgrades = pgTable("colonist_upgrades", {
  colonistId: uuid()
    .references(() => colonists.id)
    .notNull(),
  upgradeId: integer()
    .references(() => upgrades.id)
    .notNull(),
})

//
//  COLONY UPGRADES
//
export const colonyUpgrades = pgTable("colony_upgrades", {
  colonyId: uuid()
    .references(() => colonies.id)
    .notNull(),
  upgradeId: integer()
    .references(() => upgrades.id)
    .notNull(),
})

//
//  TERRAFORMINGS
//
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

//
//  ITEM CHANGES
//
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
