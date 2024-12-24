import path from "path";
import fs from "fs";
import { pathToFileURL } from "node:url";
import { ClientEvent } from "./types";
import { ClientEvents } from "discord.js";

export async function getEvents() {
  const events: ClientEvent<keyof ClientEvents>[] = [];
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const imported = await import(pathToFileURL(filePath).toString());
    const event = imported.default;
    events.push(event);
  }
  return events;
}
