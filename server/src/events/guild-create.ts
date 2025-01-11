import { Events } from "discord.js"
import { ClientEvent } from "../types"
import { guildController } from "../controllers/guild.controller"
import { deployCommands } from "../deployment"
import { getCommands } from "../commands"

const ready: ClientEvent<Events.GuildCreate> = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild) {
    const commands = await getCommands()
    await deployCommands({ guildId: guild.id }, commands)
    await guildController.createGuild(guild.id)
  },
}

export default ready
