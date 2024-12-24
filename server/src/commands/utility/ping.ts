import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { SlashCommand } from "../../types";

const ping: SlashCommand = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  },
};

export default ping;
