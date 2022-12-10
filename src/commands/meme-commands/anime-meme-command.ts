import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as memeManager from '../../managers/meme-manager';

export const prefix = 'animememe';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Gets a random anime meme');

export async function execute(ctx: Context) {
	return memeManager.getSFWAnimeMeme({ ctx });
}
