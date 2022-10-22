import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Bot } from '../../bot';
import * as customCommandsManager from '../../managers/custom-command-manager';

export const data = new SlashCommandBuilder()
	.setName('ccrun')
	.setDescription('Runs a custom command')
	.addStringOption((option) =>
		option
			.setName('command')
			.setDescription('The name of the custom command to run')
			.setRequired(true),
	);

export async function execute(interaction: CommandInteraction, bot: Bot) {
	const commandName = interaction.options.get('command')!.value;
	let reply: string;

	if (!commandName || typeof commandName !== 'string') {
		reply = 'Invalid command name';
		await interaction.reply({ content: reply });
		return;
	}

	const customCommand = customCommandsManager.getByName({
		commandName,
	});

	if (!customCommand) {
		reply = `Command ${commandName} does not exists`;
		await interaction.reply({ content: reply });
		return;
	}

	reply = `/${customCommand?.commands[0]}`;

	await interaction.reply({ content: reply });
}
