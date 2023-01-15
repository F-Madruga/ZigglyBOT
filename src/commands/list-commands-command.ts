import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../discord-bot';

export const prefix = 'listcommands';
export const options = [];

export const data = new SlashCommandBuilder().setName(prefix).setDescription('List all command');

export function execute(ctx: Context) {
	const { discordBot } = ctx;
	const { commands } = discordBot;

	let response = '';

	Array.from(commands.values()).forEach(
		(command, index) =>
			(response += `${index + 1} - **${command.prefix}**: ${command.data.description}\n`),
	);

	return ctx.interaction.reply({ content: response });
}
