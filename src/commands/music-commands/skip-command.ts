import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as musicManager from '../../managers/music-manager';

export const prefix = 'skip';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Skip the current music');

export function execute(ctx: Context) {
	return musicManager.skip({
		ctx,
	});
}
