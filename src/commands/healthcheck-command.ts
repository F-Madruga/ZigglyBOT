import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder().setName('healthcheck').setDescription('Replies ok');

export async function execute(interaction: CommandInteraction) {
	interaction.reply('ok');
}
