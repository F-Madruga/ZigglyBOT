import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, ValidateCommandArgs } from '../../bot';
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

interface ExecuteCreateArgs extends ExecuteArgs {
	commandName: string;
	commands: string;
}

export function validateCommand(args: ValidateCommandArgs): ExecuteCreateArgs {
	const { interaction, bot } = args;
	const commandName = interaction.options.get('command')!.value;
	const commands = interaction.options.get('execute')!.value;

	if (!commandName || typeof commandName !== 'string') {
		throw new Error('Invalid command name');
	}

	if (!commands || typeof commands !== 'string') {
		throw new Error('Invalid commands to execute');
	}

	return {
		commandName,
		commands,
		bot,
	};
}

export async function execute(args: ExecuteCreateArgs): Promise<InteractionReplyOptions> {
	const { commandName, commands, bot } = args;

	let reply: string;

	const commandsData = commands.split(',').map((command) => command.replace('/', '').trim());

	reply = customCommandsManager.create({
		bot,
		commandName,
		commands: commandsData,
	});

	return { content: reply };
}
