// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { ping } from "./commands/utility/ping";
import { deployCommands } from "./deployment";

const token = process.env.DISCORD_TOKEN!;

// Create a new client instance
class ExtendedClient extends Client {
  commands: Collection<string, any>;

  constructor(options) {
    super(options);
    this.commands = new Collection();
  }
}

const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds] });
const commands = [ping];
client.commands = new Collection();

commands.forEach((command) => {
  client.commands.set(command.data.name, command);
});

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
