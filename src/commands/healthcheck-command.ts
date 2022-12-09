import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../discord-bot';

export const prefix = 'healthcheck';
export const options = [];

export const data = new SlashCommandBuilder().setName(prefix).setDescription('Replies ok');

export function execute(ctx: Context) {
	return ctx.interaction.reply({ content: 'ok' });
}
