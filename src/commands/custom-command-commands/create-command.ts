import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Bot } from '../../bot';
import * as customCommandsManager from '../../managers/custom-command-manager';

export const data = new SlashCommandBuilder()
	.setName('cccreate')
	.setDescription('Creates a custom command')
	.addStringOption((option) =>
		option.setName('command').setDescription('The name of your command').setRequired(true),
	)
	.addStringOption((option) =>
		option
			.setName('execute')
			.setDescription(
				'A list of commands seperated by commas (,) to execute when you run this command',
			)
			.setRequired(true),
	);

export async function execute(interaction: CommandInteraction, bot: Bot) {
	const commandName = interaction.options.get('command')!.value;
	const commands = interaction.options.get('execute')!.value;

	let reply: string;

	if (!commandName || typeof commandName !== 'string') {
		reply = 'Invalid command name';
		await interaction.reply({ content: reply });
		return;
	}

	if (!commands || typeof commands !== 'string') {
		reply = 'Invalid commands to execute';
		await interaction.reply({ content: reply });
		return;
	}

	const commandsData = commands.split(',').map((command) => command.replace('/', '').trim());

	reply = customCommandsManager.create({
		bot,
		commandName,
		commands: commandsData,
	});

	await interaction.reply({ content: reply });
}
