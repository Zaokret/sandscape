export type User = {
  id: string
  discordId: string
}

// all prices are represented in a base currency
// first currency in the currency table is base currency

// #region Currency
export type Wallet = {
  userId: User["id"]
  currencyId: Currency["id"]
  count: number
}

export type Currency = {
  id: string
  name: string
  symbol: string
}

export type ExchangeRate = {
  baseCurrencyId: Currency["id"]
  quoteCurrencyId: Currency["id"]
  rate: number
}
// #endregion

// #region Terrain
export type Planet = {
  id: string
  name: string
  typeId: PlanetType["id"]
}

// one type for now Mars
export type PlanetType = {
  id: string
  name: string
}

// one tile for now
export type TileType = {
  id: string
  name: string
  planetTypeIds: Array<PlanetType["id"]>
}

export type Tile = {
  id: string
  type: TileType["id"]
}
// #endregion

// #region Colony
export type Colony = {
  id: string
  name?: string | undefined
  createdAt: Date
  rating: number
  planetTypeId: PlanetType["id"]
}

export type Colonist = {
  userId: User["id"]
  colonyId: Colony["id"]
  joinedAt: Date
  roleId: ColonistRole["id"]
}

export type ColonistRole = {
  id: string
  name: "botanist" | "technologist" | "diplomat"
}

export type ColonyTile = {
  tileId: Tile["id"]
  colonyId: Colony["id"]
  progress: number // 0 - 100
  claimedAt: Date
}

export type ColonistActionType = {
  id: string
  role: ColonistRole["id"]
  name: "mine" | "research" | "terraform" | "cook"
}

export type ColonistAction = {
  colonistId: Colonist["userId"]
  typeId: ColonistActionType["id"]
  lastUsed?: Date | undefined
}

// #endregion

// #region Inventory
export type Item = {
  id: string
  name: string
  typeId: ItemType["id"] // add item types
}

export type ItemType = {
  id: string
  name: "oxygen" | "food" | "water" | "energy" | "battery" | "robot" | "seed" | "titanium" | "silicon" | "plant"
  stackLimit: number // >= 1
  price?: number | undefined
  recipeId?: ItemTypeRecipe["id"] | undefined
  tier?: number | undefined
  consumable: boolean
  duration: number // miliseconds
  // subTypeId: ItemSubType["id"]
  sourceId: EventSource["id"]
}

export type ItemSubType = {
  id: string
  name: string
  // rest is wild
}

export type ItemTypeRecipe = {
  id: string
  itemIds: Array<Item["id"]> // ingredients
  result: ItemType["id"]
  userId: User["id"] // default is assigned to bot boss user
}

export type Inventory = {
  id: string
  location: InventoryLocation["id"]
}

export type InventoryItem = {
  itemId: Item["id"]
  inventoryId: Inventory["id"]
  count: number
}

export type InventoryLocation = {
  id: string
  type: "Colony" | "Colonist" | "Marketplace"
  locationId: number
}
// #endregion

// #region Research
export type Upgrade = {
  id: string
  name: string
  effectId: Effect["id"]
  cost: number
}

export type ColonistUpgrade = {
  colonistId: Colonist["userId"]
  upgradeId: Upgrade["id"]
}

export type ColonyUpgrade = {
  colonyId: Colony["id"]
  upgradeId: Upgrade["id"]
}
// #endregion

// #region Terraforming
export type Terraforming = {
  tileId: Tile["id"]
  planetId: Planet["id"]
  water: number
  heat: number
  oxygen: number
  colonizedAt: Date
  terraformedAt: Date
}

export type ItemChange = {
  id: string
  typeId: ItemType["id"]
  count: number
  periodId: Period["id"]
  colonyId: Colony["id"] // or default colony used as a template
  sourceId: EventSource["id"]
}

export type EventSource = {
  id: string
  name: "greenpod" | "factory" | "user" | "marketplace" | "planet" | "colony" | "colonist"
}

export type Period = {
  id: string
  name: "hourly" | "daily" | "weekly"
}
// #endregion

// #region Events
export type Event = {
  id: string
  name: string
  periodId: Period["id"]
  sourceId: EventSource["id"]
  effectId: Effect["id"]
}
// #endregion

// #region Effects
export type Effect = {
  id: string
  name: string
  periodId: Period["id"]
  sourceId: EventSource["id"]
  targetId: string
  targetTypeId: EffectTargetType["id"]
  startAt?: Date | undefined
  endAt?: Date | undefined
}

export type EffectTargetType = {
  id: string
  name: string // effect target can be any of the entities potentialy
}

export type MultiplierEffect = {
  effectId: Effect["id"]
  multiplier: number
}

export type StateEffect = {
  effectId: Effect["id"]
  typeId: StateEffectType["id"]
}

export type StateEffectType = {
  id: string
  name: "disable" | "enable" | "upgrade"
}
// #endregion
