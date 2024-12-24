import { REST, Routes } from "discord.js";
import { DeployCommandsProps, SlashCommand } from "./types";

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.DISCORD_CLIENT_ID!;

const rest = new REST().setToken(token);

export async function deployCommands({ guildId }: DeployCommandsProps, commands: SlashCommand[]) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: Object.values(commands).map((command) => command.data),
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
