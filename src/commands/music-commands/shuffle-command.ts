import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as musicManager from '../../managers/music-manager';

export const prefix = 'shuffle';
export const options = [];

export const data = new SlashCommandBuilder().setName(prefix).setDescription('Shuffle the queue');

export function execute(ctx: Context) {
	return musicManager.shuffle({
		ctx,
	});
}
