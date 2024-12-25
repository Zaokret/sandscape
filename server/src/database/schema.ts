import { pgTable, integer, text, timestamp, decimal, char, serial, uuid, primaryKey } from "drizzle-orm/pg-core"

// Users table
export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  discordId: char({ length: 256 }).notNull(),
})

// Wallet table
export const wallets = pgTable(
  "wallets",
  {
    userId: integer()
      .references(() => users.id)
      .notNull(),
    currencyId: integer()
      .references(() => currencies.id)
      .notNull(),
    count: decimal().default("0").notNull(),
  },
  (wallet) => {
    return [
      {
        pk: primaryKey({ columns: [wallet.userId, wallet.currencyId] }),
      },
    ]
  }
)

// Currency table
export const currencies = pgTable("currencies", {
  id: serial().primaryKey(),
  name: char({ length: 256 }).notNull(),
  symbol: char({ length: 256 }).notNull(),
})

// ExchangeRate table
export const exchangeRates = pgTable("exchange_rates", {
  baseCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  quoteCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  rate: decimal().notNull(),
})

// Planet table
export const planets = pgTable("planets", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  typeId: integer().references(() => planetTypes.id),
})

// PlanetType table
export const planetTypes = pgTable("planet_types", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
})

// TileType table
export const tileTypes = pgTable("tile_types", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  planetTypeIds: text().array().notNull(), // Assuming array of integers
})

// Tile table
export const tiles = pgTable("tiles", {
  id: integer().primaryKey().autoIncrement(),
  type: integer().references(() => tileTypes.id),
})

// Colony table
export const colonies = pgTable("colonies", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }),
  createdAt: timestamp().notNull(),
  rating: float().notNull(),
  planetTypeId: integer().references(() => planetTypes.id),
})

// Colonist table
export const colonists = pgTable("colonists", {
  userId: integer().references(() => users.id),
  colonyId: integer().references(() => colonies.id),
  joinedAt: timestamp().notNull(),
  roleId: integer().references(() => colonistRoles.id),
})

// ColonistRole table
export const colonistRoles = pgTable("colonist_roles", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
})

// ColonyTile table
export const colonyTiles = pgTable("colony_tiles", {
  tileId: integer().references(() => tiles.id),
  colonyId: integer().references(() => colonies.id),
  progress: float().notNull(),
  claimedAt: timestamp().notNull(),
})

// ColonistActionType table
export const colonistActionTypes = pgTable("colonist_action_types", {
  id: integer().primaryKey().autoIncrement(),
  role: integer().references(() => colonistRoles.id),
  name: char({ length: 256 }).notNull(),
})

// ColonistAction table
export const colonistActions = pgTable("colonist_actions", {
  colonistId: integer().references(() => colonists.userId),
  typeId: integer().references(() => colonistActionTypes.id),
  lastUsed: timestamp(),
})

// Item table
export const items = pgTable("items", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  typeId: integer().references(() => itemTypes.id),
})

// ItemType table
export const itemTypes = pgTable("item_types", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  stackLimit: integer().notNull(),
  price: float(),
  recipeId: integer().references(() => itemTypeRecipes.id),
  tier: integer(),
  consumable: boolean().notNull(),
  duration: integer().notNull(),
  sourceId: integer().references(() => eventSources.id),
})

// ItemTypeRecipe table
export const itemTypeRecipes = pgTable("item_type_recipes", {
  id: integer().primaryKey().autoIncrement(),
  itemIds: text().array().notNull(), // Assuming array of integers
  result: integer().references(() => itemTypes.id),
  userId: integer().references(() => users.id),
})

// Inventory table
export const inventories = pgTable("inventories", {
  id: integer().primaryKey().autoIncrement(),
  location: integer().references(() => inventoryLocations.id),
})

// InventoryItem table
export const inventoryItems = pgTable("inventory_items", {
  itemId: integer().references(() => items.id),
  inventoryId: integer().references(() => inventories.id),
  count: integer().notNull(),
})

// InventoryLocation table
export const inventoryLocations = pgTable("inventory_locations", {
  id: integer().primaryKey().autoIncrement(),
  type: char({ length: 256 }).notNull(),
  locationId: integer().notNull(),
})

// Upgrade table
export const upgrades = pgTable("upgrades", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  effectId: integer().references(() => effects.id),
  cost: float().notNull(),
})

// ColonistUpgrade table
export const colonistUpgrades = pgTable("colonist_upgrades", {
  colonistId: integer().references(() => colonists.userId),
  upgradeId: integer().references(() => upgrades.id),
})

// ColonyUpgrade table
export const colonyUpgrades = pgTable("colony_upgrades", {
  colonyId: integer().references(() => colonies.id),
  upgradeId: integer().references(() => upgrades.id),
})

// Terraforming table
export const terraformings = pgTable("terraformings", {
  tileId: integer().references(() => tiles.id),
  planetId: integer().references(() => planets.id),
  water: float().notNull(),
  heat: float().notNull(),
  oxygen: float().notNull(),
  colonizedAt: timestamp().notNull(),
  terraformedAt: timestamp().notNull(),
})

// ItemChange table
export const itemChanges = pgTable("item_changes", {
  id: integer().primaryKey().autoIncrement(),
  typeId: integer().references(() => itemTypes.id),
  count: integer().notNull(),
  periodId: integer().references(() => periods.id),
  colonyId: integer().references(() => colonies.id),
  sourceId: integer().references(() => eventSources.id),
})

// EventSource table
export const eventSources = pgTable("event_sources", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
})

// Period table
export const periods = pgTable("periods", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
})

// Event table
export const events = pgTable("events", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  periodId: integer().references(() => periods.id),
  sourceId: integer().references(() => eventSources.id),
  effectId: integer().references(() => effects.id),
})

// Effect table
export const effects = pgTable("effects", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
  periodId: integer().references(() => periods.id),
  sourceId: integer().references(() => eventSources.id),
  targetId: integer().notNull(),
  targetTypeId: integer().references(() => effectTargetTypes.id),
  startAt: timestamp(),
  endAt: timestamp(),
})

// EffectTargetType table
export const effectTargetTypes = pgTable("effect_target_types", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
})

// MultiplierEffect table
export const multiplierEffects = pgTable("multiplier_effects", {
  effectId: integer().references(() => effects.id),
  multiplier: float().notNull(),
})

// StateEffect table
export const stateEffects = pgTable("state_effects", {
  effectId: integer().references(() => effects.id),
  typeId: integer().references(() => stateEffectTypes.id),
})

// StateEffectType table
export const stateEffectTypes = pgTable("state_effect_types", {
  id: integer().primaryKey().autoIncrement(),
  name: char({ length: 256 }).notNull(),
})
