import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as musicManager from '../../managers/music-manager';

export const prefix = 'resume';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Resume current music');

export function execute(ctx: Context) {
	return musicManager.resume({
		ctx,
	});
}
