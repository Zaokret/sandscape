import { relations } from "drizzle-orm"
import { pgTable, varchar, serial, uuid, timestamp, index } from "drizzle-orm/pg-core"
import { wallets, currencies } from "./currency"

export const guildGroupTypes = pgTable("guild_group_types", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(), // all, single, many
})
export const guildGroupTypesRelations = relations(guildGroupTypes, ({ many }) => ({
  guildGroups: many(guildGroups),
}))

export const guildGroups = pgTable("groups", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull().unique(),
  typeId: serial()
    .references(() => guildGroupTypes.id)
    .notNull(),
  createdAt: timestamp().defaultNow(),
})
export const guildGroupsRelations = relations(guildGroups, ({ one, many }) => ({
  type: one(guildGroupTypes, { fields: [guildGroups.typeId], references: [guildGroupTypes.id] }),
  memberships: many(guildGroupMemberships),
  currencies: many(currencies),
}))

export const guilds = pgTable("guilds", {
  id: uuid().defaultRandom().primaryKey(),
  discordGuildId: varchar().notNull().unique(),
  createdAt: timestamp().defaultNow(),
})
export const guildsRelations = relations(guilds, ({ many }) => ({
  users: many(users),
  memberships: many(guildGroupMemberships),
}))

// create a single guild group for each guild
// guild admins can create guild groups or add their guild to the global group
export const guildGroupMemberships = pgTable(
  "guild_group_memberships",
  {
    groupId: uuid()
      .references(() => guildGroups.id)
      .notNull(),
    guildId: uuid()
      .references(() => guilds.id)
      .notNull(),
    createdAt: timestamp().defaultNow(),
  },
  (table) => ({
    groupIndex: index("idx_group_id").on(table.groupId),
    guildIndex: index("idx_guild_id").on(table.guildId),
  })
)
export const guildGroupMembershipsRelations = relations(guildGroupMemberships, ({ one }) => ({
  group: one(guildGroups, { fields: [guildGroupMemberships.groupId], references: [guildGroups.id] }),
  guild: one(guilds, { fields: [guildGroupMemberships.guildId], references: [guilds.id] }),
}))

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey(),
    discordId: varchar().notNull(),
    guildId: uuid()
      .references(() => guilds.id)
      .notNull(),
    createdAt: timestamp().defaultNow(),
  },
  (table) => ({
    guildIndex: index("idx_users_guild_id").on(table.guildId),
    discordIndex: index("idx_users_discord_id").on(table.discordId),
  })
)
export const usersRelations = relations(users, ({ one, many }) => ({
  guild: one(guilds, { fields: [users.guildId], references: [guilds.id] }),
  wallets: many(wallets),
}))
