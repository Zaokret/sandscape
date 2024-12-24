import { ClientEvents, CommandInteraction, SlashCommandBuilder } from "discord.js";

export type DeployCommandsProps = {
  guildId: string;
};

export type SlashCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export type ClientEvent<T extends keyof ClientEvents> = {
  name: T;
  once: boolean;
  execute: (...args: ClientEvents[T]) => Promise<void>;
};
