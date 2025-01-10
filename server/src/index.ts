// Require the necessary discord.js classes
import { ClientOptions, GatewayIntentBits, Partials } from "discord.js"
import { ExtendedClient } from "./client"
import { getCommands } from "./commands"
import { getEvents } from "./events"

async function main() {
  const token = process.env.DISCORD_TOKEN!

  const options = {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  } satisfies ClientOptions

  const commands = await getCommands()
  const events = await getEvents()
  const client = new ExtendedClient(options, commands, events)
  await client.login(token)
}

main()
