// Require the necessary discord.js classes
import { ClientOptions, GatewayIntentBits } from "discord.js"
import { getCommands } from "./commands"
import { getEvents } from "./events"
import { ExtendedClient } from "./client"
import { createDbSeed } from "./database/seed"

async function main() {
  await createDbSeed()
  const token = process.env.DISCORD_TOKEN!
  const options = { intents: [GatewayIntentBits.Guilds] } satisfies ClientOptions
  const commands = await getCommands()
  const events = await getEvents()
  const client = new ExtendedClient(options, commands, events)
  client.login(token)
}

main()
