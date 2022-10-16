import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Bot } from '../../bot';
import * as musicManager from '../../managers/music-manager';

export const data = new SlashCommandBuilder().setName('pause').setDescription('Pause a song');

export async function execute(interaction: CommandInteraction, bot: Bot) {
	const { user } = interaction;

	const reply = await musicManager.pause({
		bot,
	});

	await interaction.reply({ content: reply });
}
