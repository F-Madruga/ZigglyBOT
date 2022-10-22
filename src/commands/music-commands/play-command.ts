import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Bot } from '../../bot';
import * as musicManager from '../../managers/music-manager';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('Play a song')
	.addStringOption((option) =>
		option.setName('query').setDescription('Link for you song').setRequired(true),
	);

export async function execute(interaction: CommandInteraction, bot: Bot) {
	const { user } = interaction;
	const query = interaction.options.get('query')!.value;
	let reply: string;

	if (!query || typeof query !== 'string') {
		reply = 'Invalid query';
		await interaction.reply({ content: reply });
		return;
	}

	reply = await musicManager.play({
		bot,
		user,
		query,
	});

	await interaction.reply({ content: reply });
}
