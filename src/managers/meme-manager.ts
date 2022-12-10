import { Context } from '../discord-bot';
import * as memeRepository from '../repositories/meme-repository';

interface GetSFWMemeArgs {
	ctx: Context;
}

export async function getSFWMeme({ ctx }: GetSFWMemeArgs) {
	const { interaction } = ctx;

	const meme = await memeRepository.findOneSFWMeme();

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

	const meme = await memeRepository.findOneSFWAnimeMeme();

	if (!meme.success) {
		return interaction.reply({ content: 'Something went wrong' });
	}

	return interaction.reply({ content: meme.url });
}
