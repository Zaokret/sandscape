import path from "path";
import fs from "fs";
import { pathToFileURL } from "node:url";
import { SlashCommand } from "./types";

export async function getCommands() {
  const commands: SlashCommand[] = [];

  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const imported = await import(pathToFileURL(filePath).toString());
      const command = imported.default;
      if ("data" in command && "execute" in command) {
        commands.push(command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
  return commands;
}
