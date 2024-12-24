import { User, Wallet, Currency, ExchangeRate } from "./entities"

const mockUsers: User[] = [
  { id: "1", discordId: "123456789" },
  { id: "2", discordId: "987654321" },
]

const mockWallets: Wallet[] = [
  { userId: "1", currencyId: "1", count: 100 },
  { userId: "1", currencyId: "2", count: 200 },
  { userId: "2", currencyId: "1", count: 300 },
]

const mockCurrencies: Currency[] = [
  { id: "1", name: "Bitcoin", symbol: "BTC" },
  { id: "2", name: "Ethereum", symbol: "ETH" },
]

const mockExchangeRates: ExchangeRate[] = [
  { baseCurrencyId: "1", quoteCurrencyId: "2", rate: 20 },
  { baseCurrencyId: "2", quoteCurrencyId: "1", rate: 0.05 },
]

function convertToBaseCurrency(
  wallets: Wallet[],
  exchangeRates: ExchangeRate[],
  currencies: Currency[],
  userId: string,
  baseCurrencySymbol: string
): number {
  const userWallets = wallets.filter((wallet) => wallet.userId === userId)

  const baseCurrency = currencies.find((c) => c.symbol === baseCurrencySymbol)
  if (!baseCurrency) {
    throw new Error(`Base currency with symbol ${baseCurrencySymbol} not found`)
  }

  let totalBaseCurrency = userWallets.reduce((total, wallet) => {
    const currency = currencies.find((c) => c.id === wallet.currencyId)
    if (currency) {
      if (currency.symbol === baseCurrencySymbol) {
        return total + wallet.count
      } else {
        const rate = exchangeRates.find(
          (rate) => rate.baseCurrencyId === wallet.currencyId && rate.quoteCurrencyId === baseCurrency.id
        )
        if (rate) {
          return total + wallet.count * rate.rate
        }
      }
    }
    return total
  }, 0)

  return totalBaseCurrency
}

const userOneBitcoin = convertToBaseCurrency(mockWallets, mockExchangeRates, mockCurrencies, "1", "BTC")
const userTwoBitcoin = convertToBaseCurrency(mockWallets, mockExchangeRates, mockCurrencies, "2", "BTC")

if (userOneBitcoin > userTwoBitcoin) {
  console.log("User one will have the most Bitcoin.")
} else if (userOneBitcoin < userTwoBitcoin) {
  console.log("User two will have the most Bitcoin.")
} else {
  console.log("Both users will have the same amount of Bitcoin.")
}
