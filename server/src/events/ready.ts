import { Events } from "discord.js";
import { ClientEvent } from "../types";

const ready: ClientEvent<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  async execute(...args) {
    const [client] = args;
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

export default ready;
