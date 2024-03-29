import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as popcordManager from '../../managers/popcord-manager';

export const prefix = 'meme';
export const options = [];

export const data = new SlashCommandBuilder().setName(prefix).setDescription('Gets a random meme');

export async function execute(ctx: Context) {
	return popcordManager.getSFWMeme({ ctx });
}
