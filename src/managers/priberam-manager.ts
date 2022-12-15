import { Context } from '../discord-bot';
import * as cron from 'node-cron';
import * as priberamRepository from '../repositories/priberam-repository';
import { logger } from '../tools/logger';
import { DiscordAPIError } from 'discord.js';

export interface GetWordOfTheDayArgs {
	ctx: Context;
}

export async function getWordOfTheDay({ ctx }: GetWordOfTheDayArgs) {
	const { interaction } = ctx;

	const wordOfTheDay = await priberamRepository.findWordOfTheDay();

	if (!wordOfTheDay) {
		return interaction.reply({ content: 'Something went wrong' });
	}

	return interaction.reply({ content: `**${wordOfTheDay.word}**\n${wordOfTheDay.url}` });
}

export interface SetWordOfTheDayAsNicknameArgs {
	ctx: Context;
}

export async function setWordOfTheDayAsNicknameArgs({ ctx }: SetWordOfTheDayAsNicknameArgs) {
	const { interaction, discordBot } = ctx;
	const { user } = interaction;
	const { client, config } = discordBot;
	const { guildId } = config;

	const guild = await client.guilds.fetch(guildId);
	const member = await guild.members.fetch(user.id);

	const wordOfTheDay = await priberamRepository.findWordOfTheDay();

	if (!wordOfTheDay) {
		return interaction.reply({ content: 'Something went wrong' });
	}

	const newNickname =
		wordOfTheDay.word.charAt(0).toUpperCase() + wordOfTheDay.word.slice(1).toLowerCase();

	try {
		await member.setNickname(newNickname);
	} catch (error) {
		if (error.code === 50013) {
			logger.info('Missing permissions to change nickname');
			return interaction.reply({ content: 'Missing permissions to change nickname' });
		}
	}

	cron.schedule('1 0 * * *', async () => {
		const wordOfTheDay = await priberamRepository.findWordOfTheDay();

		if (!wordOfTheDay) {
			throw new Error();
		}

		const newNickname =
			wordOfTheDay.word.charAt(0).toUpperCase() + wordOfTheDay.word.slice(1).toLowerCase();

		await member.setNickname(newNickname);
		logger.info(`Change nickname of ${member.user.username} to ${newNickname}`);
	});

	return interaction.reply({ content: `Nickname updated to ${newNickname}` });
}
