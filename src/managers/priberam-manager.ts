import { Context } from '../discord-bot';
import * as userManager from './user-manager';
import * as userConfigurationsManager from './user-configurations-manager';
import * as priberamRepository from '../repositories/priberam-repository';
import { logger } from '../tools/logger';

export interface GetWordOfTheDayArgs {
	ctx: Context;
}

export async function handleWordOfTheDayCommand({ ctx }: GetWordOfTheDayArgs) {
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

	userManager.upsert({
		uuid: 'test',
		discordId: user.id,
		username: user.username,
		discriminator: user.discriminator,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const dbUser = userManager.findDiscordId(user.id);

	if (!dbUser) {
		return;
	}

	userConfigurationsManager.upsert({
		userUuid: dbUser?.uuid,
		priberamWordOfTheDayNickname: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const userList = userManager.findMany();
	const userConfigs = userConfigurationsManager.findMany();
	console.log(userList);
	console.log(userConfigs);

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

	return interaction.reply({ content: `Nickname updated to ${newNickname}` });
}

export function getWordOfTheDay() {
	return priberamRepository.findWordOfTheDay();
}
