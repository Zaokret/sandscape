import { eq, and } from "drizzle-orm"
import { db, DBContext } from "./database"
import { currencies, exchangeRates } from "./schemas/currency"
import { GuildGroupType } from "../models/constants"
import { guildGroupMemberships, guildGroups, guilds } from "./schemas/guilds"

export class Repository {
  constructor(private context: DBContext) {}

  async createGuild({ discordGuildId }) {}
  async createGroup({ type, name }: { type: GuildGroupType; name: string }) {}
  async createGuildMembership({ guildId, groupId }) {}
  async createUser() {}

  async getCurrency(symbol: string, discordGuidId: string) {
    const results = await db
      .select({ currencies })
      .from(currencies)
      .innerJoin(guildGroups, eq(guildGroups.id, currencies.groupId))
      .innerJoin(guildGroupMemberships, eq(guildGroupMemberships.groupId, guildGroups.id))
      .innerJoin(guilds, eq(guilds.id, guildGroupMemberships.guildId))
      .where(and(eq(currencies.symbol, symbol), eq(guilds.discordGuildId, discordGuidId)))
    if (results.length > 0) {
      return results[0].currencies
    }
    return null
  }

  async getCurrencies() {
    return await this.context.query.currencies.findMany()
  }

  async getExchangeRate({ from, to }) {
    this.context.query.exchangeRates.findFirst({
      where: and(eq(exchangeRates.baseCurrencyId, from), eq(exchangeRates.quoteCurrencyId, to)),
      with: {
        baseCurrency: true,
        quoteCurrency: true,
      },
    })
  }
}

export const repository = new Repository(db)
