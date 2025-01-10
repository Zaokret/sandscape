// #endregion

/* Sandscape game
export const planetTypes = pgTable("planet_types", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
})

export const planets = pgTable("planets", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  typeId: integer().references(() => planetTypes.id),
})

export const tileTypes = pgTable("tile_types", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  planetTypeIds: integer().array().notNull(),
})

export const tiles = pgTable("tiles", {
  id: uuid().defaultRandom().primaryKey(),
  type: integer().references(() => tileTypes.id),
})

export const colonies = pgTable("colonies", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar(),
  createdAt: timestamp().notNull(),
  rating: decimal().default("0"),
  planetTypeId: integer().references(() => planetTypes.id),
})

export const colonistRoles = pgTable("colonist_roles", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
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
  name: varchar().notNull(),
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
  name: varchar().notNull().unique(),
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
  name: varchar().notNull(),
  typeId: integer().references(() => itemTypes.id),
})

export const inventoryLocations = pgTable("inventory_locations", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
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
  name: varchar().notNull().unique(),
})

export const periods = pgTable("periods", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
})

export const eventSources = pgTable("event_sources", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
})

export const effects = pgTable("effects", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
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
  name: varchar().notNull().unique(),
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
  name: varchar().notNull(),
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
  name: varchar().notNull(),
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

// #region Relations

export const usersRelations = relations(users, ({ many }) => ({
  colonists: many(colonists),
  itemTypeRecipes: many(itemTypeRecipes, { relationName: "author" }),
}))

export const currenciesRelations = relations(currencies, ({ many }) => ({
  wallets: many(wallets),
  exchangeRatesBase: many(exchangeRates),
  exchangeRatesQuote: many(exchangeRates),
}))

export const walletsRelations = relations(wallets, ({ one }) => ({
  user: one(users, { fields: [wallets.userId], references: [users.id] }),
  currency: one(currencies, { fields: [wallets.currencyId], references: [currencies.id] }),
}))

export const exchangeRatesRelations = relations(exchangeRates, ({ one }) => ({
  baseCurrency: one(currencies, { fields: [exchangeRates.baseCurrencyId], references: [currencies.id] }),
  quoteCurrency: one(currencies, { fields: [exchangeRates.quoteCurrencyId], references: [currencies.id] }),
}))

export const planetTypesRelations = relations(planetTypes, ({ many }) => ({
  planets: many(planets),
  colonies: many(colonies),
}))

export const planetsRelations = relations(planets, ({ one, many }) => ({
  type: one(planetTypes, { fields: "typeId" }),
  terraformings: many(terraformings),
}))

export const tileTypesRelations = relations(tileTypes, ({ many }) => ({
  tiles: many(tiles),
}))

export const tilesRelations = relations(tiles, ({ one, many }) => ({
  type: one(tileTypes, { fields: "type" }),
  colonyTiles: many(colonyTiles),
  terraformings: many(terraformings),
}))

export const coloniesRelations = relations(colonies, ({ one, many }) => ({
  planetType: one(planetTypes, { field: "planetTypeId" }),
  colonists: many(colonists),
  colonyTiles: many(colonyTiles),
  colonyUpgrades: many(colonyUpgrades),
  terraformings: many(terraformings),
}))

export const colonistRolesRelations = relations(colonistRoles, ({ many }) => ({
  colonists: many(colonists),
  colonistActionTypes: many(colonistActionTypes),
}))

export const colonistsRelations = relations(colonists, ({ one, many }) => ({
  user: one(users, { field: "userId" }),
  colony: one(colonies, { field: "colonyId" }),
  role: one(colonistRoles, { field: "roleId" }),
  colonistActions: many(colonistActions),
  colonistUpgrades: many(colonistUpgrades),
}))

export const colonyTilesRelations = relations(colonyTiles, ({ one }) => ({
  tile: one(tiles, { field: "tileId" }),
  colony: one(colonies, { field: "colonyId" }),
}))

export const colonistActionTypesRelations = relations(colonistActionTypes, ({ one, many }) => ({
  role: one(colonistRoles, { field: "role" }),
  colonistActions: many(colonistActions),
}))

export const colonistActionsRelations = relations(colonistActions, ({ one }) => ({
  colonist: one(colonists, { field: "colonistId" }),
  type: one(colonistActionTypes, { field: "typeId" }),
}))

export const itemTypesRelations = relations(itemTypes, ({ one, many }) => ({
  recipe: one(itemTypeRecipes, { field: "recipeId" }),
  source: one(eventSources, { field: "sourceId" }),
  items: many(items),
  itemChanges: many(itemChanges),
}))

export const itemTypeRecipesRelations = relations(itemTypeRecipes, ({ one, many }) => ({
  author: one(users, { field: "authorId" }),
  items: many(itemTypes, { field: "itemIds" }),
  results: many(itemTypes, { field: "result" }),
}))

export const itemsRelations = relations(items, ({ one, many }) => ({
  type: one(itemTypes, { field: "typeId" }),
  inventoryItems: many(inventoryItems),
}))

export const inventoryLocationsRelations = relations(inventoryLocations, ({ many }) => ({
  inventories: many(inventories),
}))

export const inventoriesRelations = relations(inventories, ({ one, many }) => ({
  location: one(inventoryLocations, { field: "location" }),
  inventoryItems: many(inventoryItems),
}))

export const inventoryItemsRelations = relations(inventoryItems, ({ one }) => ({
  item: one(items, { field: "itemId" }),
  inventory: one(inventories, { field: "inventoryId" }),
}))

export const effectTargetTypesRelations = relations(effectTargetTypes, ({ many }) => ({
  effects: many(effects),
}))

export const periodsRelations = relations(periods, ({ many }) => ({
  effects: many(effects),
  events: many(events),
  itemChanges: many(itemChanges),
}))

export const eventSourcesRelations = relations(eventSources, ({ many }) => ({
  effects: many(effects),
  events: many(events),
  itemTypes: many(itemTypes),
  itemChanges: many(itemChanges),
}))

export const effectsRelations = relations(effects, ({ one, many }) => ({
  period: one(periods, { field: "periodId" }),
  source: one(eventSources, { field: "sourceId" }),
  targetType: one(effectTargetTypes, { field: "targetTypeId" }),
  multiplierEffects: many(multiplierEffects),
  stateEffects: many(stateEffects),
  events: many(events),
  upgrades: many(upgrades),
}))

export const multiplierEffectsRelations = relations(multiplierEffects, ({ one }) => ({
  effect: one(effects, { field: "effectId" }),
}))

export const stateEffectTypesRelations = relations(stateEffectTypes, ({ many }) => ({
  stateEffects: many(stateEffects),
}))

export const stateEffectsRelations = relations(stateEffects, ({ one }) => ({
  effect: one(effects, { field: "effectId" }),
  type: one(stateEffectTypes, { field: "typeId" }),
}))

export const eventsRelations = relations(events, ({ one }) => ({
  period: one(periods, { field: "periodId" }),
  source: one(eventSources, { field: "sourceId" }),
  effect: one(effects, { field: "effectId" }),
}))

export const upgradesRelations = relations(upgrades, ({ one, many }) => ({
  effect: one(effects, { field: "effectId" }),
  colonistUpgrades: many(colonistUpgrades),
  colonyUpgrades: many(colonyUpgrades),
}))

export const colonistUpgradesRelations = relations(colonistUpgrades, ({ one }) => ({
  colonist: one(colonists, { field: "colonistId" }),
  upgrade: one(upgrades, { field: "upgradeId" }),
}))

export const colonyUpgradesRelations = relations(colonyUpgrades, ({ one }) => ({
  colony: one(colonies, { field: "colonyId" }),
  upgrade: one(upgrades, { field: "upgradeId" }),
}))

export const terraformingsRelations = relations(terraformings, ({ one }) => ({
  tile: one(tiles, { field: "tileId" }),
  planet: one(planets, { field: "planetId" }),
  colony: one(colonies, { field: "colonyId" }),
}))

export const itemChangesRelations = relations(itemChanges, ({ one }) => ({
  type: one(itemTypes, { field: "typeId" }),
  period: one(periods, { field: "periodId" }),
  colony: one(colonies, { field: "colonyId" }),
  source: one(eventSources, { field: "sourceId" }),
}))

// #endregion

*/
