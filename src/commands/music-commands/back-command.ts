import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as musicManager from '../../managers/music-manager';

export const prefix = 'back';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Play the previous music');

export function execute(ctx: Context) {
	return musicManager.back({
		ctx,
	});
}
