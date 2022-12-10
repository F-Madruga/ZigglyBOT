import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import { MemeService } from '../../services';

export const prefix = 'animememe';
export const options = [];
const memeService = new MemeService();

export const data = new SlashCommandBuilder().setName(prefix).setDescription('Gets a random anime meme');

export async function execute(ctx: Context) {
	return ctx.interaction.reply({ content: await memeService.getSFWAnimeMeme()});
}
