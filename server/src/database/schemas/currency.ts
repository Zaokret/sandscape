import { pgTable, uuid, integer, serial, decimal, index, timestamp, varchar } from "drizzle-orm/pg-core"
import { guildGroups, users } from "./guilds"
import { relations } from "drizzle-orm"
import { transactions } from "./transactions"

export const currencies = pgTable("currencies", {
  id: serial().primaryKey(),
  groupId: uuid().references(() => guildGroups.id), // currencies created without an explicit groupId are created with a single guild group that contains their
  name: varchar().notNull().unique(),
  symbol: varchar().notNull().unique(),
  createdAt: timestamp().defaultNow(),
})
export const currenciesRelations = relations(currencies, ({ one, many }) => ({
  group: one(guildGroups, { fields: [currencies.groupId], references: [guildGroups.id] }),
  wallets: many(wallets),
  baseExchangeRates: many(exchangeRates, { relationName: "baseCurrency" }),
  quoteExchangeRates: many(exchangeRates, { relationName: "quoteCurrency" }),
  transactions: many(transactions),
}))

export const wallets = pgTable(
  "wallets",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid()
      .references(() => users.id)
      .notNull(),
    currencyId: integer()
      .references(() => currencies.id)
      .notNull(),
    count: decimal().default("0").notNull(),
    createdAt: timestamp().defaultNow(),
  },
  (table) => ({
    currencyIndex: index("idx_wallets_currency_id").on(table.currencyId),
    userIndex: index("idx_wallets_user_id").on(table.userId),
  })
)
export const walletsRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, { fields: [wallets.userId], references: [users.id] }),
  currency: one(currencies, { fields: [wallets.currencyId], references: [currencies.id] }),
  transactions: many(transactions),
}))

export const exchangeRates = pgTable("exchange_rates", {
  baseCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  quoteCurrencyId: integer()
    .references(() => currencies.id)
    .notNull(),
  rate: decimal().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp(),
})
export const exchangeRatesRelations = relations(exchangeRates, ({ one }) => ({
  baseCurrency: one(currencies, { fields: [exchangeRates.baseCurrencyId], references: [currencies.id] }),
  quoteCurrency: one(currencies, { fields: [exchangeRates.quoteCurrencyId], references: [currencies.id] }),
}))
