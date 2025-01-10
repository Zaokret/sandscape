import { eq, and } from "drizzle-orm"
import { db, DBContext } from "./database"
import { currencies, exchangeRates } from "./schemas/currency"
import { GuildGroupType } from "../models/constants"

export class Repository {
  constructor(private context: DBContext) {}

  async createGuild({ discordGuildId }) {}
  async createGroup({ type, name }: { type: GuildGroupType; name: string }) {}
  async createGuildMembership({ guildId, groupId }) {}
  async createUser() {}

  async getCurrency(symbol: string) {
    return await this.context.query.currencies.findFirst({ where: eq(currencies.symbol, symbol) })
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
