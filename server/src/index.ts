// Require the necessary discord.js classes
import { Client, ClientOptions, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import ping from "./commands/utility/ping";
import { deployCommands } from "./deployment";
import { SlashCommand } from "../types";
import { getCommands } from "./commands";

async function main() {
  const token = process.env.DISCORD_TOKEN!;

  class ExtendedClient extends Client {
    commands: Collection<string, SlashCommand>;

    constructor(options: ClientOptions, commands: SlashCommand[]) {
      super(options);
      this.commands = new Collection();
      commands.forEach((command) => {
        this.commands.set(command.data.name, command);
      });
    }
  }

  const commands = await getCommands();
  const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds] }, commands);

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  });

  client.on(Events.GuildCreate, async (guild) => {
    await deployCommands({ guildId: guild.id }, commands);
  });

  client.login(token);
}

main();
