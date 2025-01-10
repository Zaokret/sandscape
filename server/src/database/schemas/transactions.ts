import { decimal, index, integer, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { wallets, currencies } from "./currency"
import { guildGroupTypes } from "./guilds"
import { relations } from "drizzle-orm"

export const transactionTypes = pgTable("transaction_types", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(), // transfer, mint, burn, exchange
})

export const transactions = pgTable(
  "transactions",
  {
    id: serial().primaryKey(),
    fromWalletId: uuid().references(() => wallets.id), // nullable for minting
    toWalletId: uuid().references(() => wallets.id), // nullable for burning
    baseCurrencyId: integer()
      .references(() => currencies.id)
      .notNull(),
    quoteCurrencyId: integer().references(() => currencies.id), // used only for exchanges
    baseAmount: decimal().notNull(),
    quoteAmount: decimal(), // used only for exchanges
    rate: decimal(), // used only for exchanges
    typeId: integer()
      .references(() => transactionTypes.id)
      .notNull(),
    guildGroupTypeId: serial()
      .references(() => guildGroupTypes.id)
      .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => ({
    fromWalletIndex: index("idx_transactions_from_wallet_id").on(table.fromWalletId),
    toWalletIndex: index("idx_transactions_to_wallet_id").on(table.toWalletId),
  })
)

export const transactionsRelations = relations(transactions, ({ one }) => ({
  fromWallet: one(wallets, { fields: [transactions.fromWalletId], references: [wallets.id] }),
  toWallet: one(wallets, { fields: [transactions.toWalletId], references: [wallets.id] }),
  baseCurrency: one(currencies, { fields: [transactions.baseCurrencyId], references: [currencies.id] }),
  quoteCurrency: one(currencies, { fields: [transactions.quoteCurrencyId], references: [currencies.id] }),
  type: one(transactionTypes, { fields: [transactions.typeId], references: [transactionTypes.id] }),
  guildGroupType: one(guildGroupTypes, { fields: [transactions.guildGroupTypeId], references: [guildGroupTypes.id] }),
}))
