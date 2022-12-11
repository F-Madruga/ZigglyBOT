import { Context } from '../discord-bot';
import * as popcordRepository from '../repositories/popcord-repository';

export interface GetSFWMemeArgs {
	ctx: Context;
}

export async function getSFWMeme({ ctx }: GetSFWMemeArgs) {
	const { interaction } = ctx;

	const meme = await popcordRepository.findOneSFWMeme();

	if (!meme.success) {
		return interaction.reply({ content: 'Something went wrong' });
	}

	return interaction.reply({ content: meme.url });
}

interface GetSFWAnimeMemeArgs {
	ctx: Context;
}

export async function getSFWAnimeMeme({ ctx }: GetSFWAnimeMemeArgs) {
	const { interaction } = ctx;

	const meme = await popcordRepository.findOneSFWAnimeMeme();

	if (!meme.success) {
		return interaction.reply({ content: 'Something went wrong' });
	}

	return interaction.reply({ content: meme.url });
}
