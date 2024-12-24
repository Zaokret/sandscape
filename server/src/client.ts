import { Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { ClientEvent, SlashCommand } from "./types";

export class ExtendedClient extends Client {
  commands: Collection<string, SlashCommand>;
  events: Collection<string, ClientEvent<keyof ClientEvents>>;

  constructor(options: ClientOptions, commands: SlashCommand[], events: ClientEvent<keyof ClientEvents>[]) {
    super(options);

    this.commands = new Collection();
    commands.forEach((command) => {
      this.commands.set(command.data.name, command);
    });

    this.events = new Collection();
    events.forEach((event) => {
      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args));
      } else {
        this.on(event.name, (...args) => event.execute(...args));
      }
      this.events.set(event.name, event);
    });
  }
}
