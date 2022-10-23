import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions, User } from 'discord.js';
import { Bot, ExecuteArgs, GetCommandArgs } from '../../bot';
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
	command: string;
	execute: string;
	interaction: CommandInteraction;
}

export function getExecuteArgs(args: GetCommandArgs): ExecuteCreateArgs {
	const { interaction } = args;
	const command = interaction.options.get('command')!.value;
	const execute = interaction.options.get('execute')!.value;

	const commandArgs = validateCommand({
		command,
		execute,
		interaction,
	});

	return commandArgs;
}

export function validateCommand(args: any): ExecuteCreateArgs {
	const { command, execute, interaction } = args;

	if (!command || typeof command !== 'string') {
		throw new Error('Invalid command name');
	}

	if (!execute || typeof execute !== 'string') {
		throw new Error('Invalid commands to execute');
	}

	return {
		command,
		execute,
		interaction,
	};
}

export async function execute(args: ExecuteCreateArgs, bot: Bot): Promise<InteractionReplyOptions> {
	const { command, execute, interaction } = args;

	const reply = customCommandsManager.create({
		interaction,
		bot,
		command,
		commands: execute.split(',').map((command) => command.replace('/', '').trim()),
	});

	return { content: reply };
}
