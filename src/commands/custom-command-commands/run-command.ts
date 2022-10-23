import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, ValidateCommandArgs } from '../../bot';
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

interface ExecuteRunArgs extends ExecuteArgs {
	commandName: string;
}

export function validateCommand(args: ValidateCommandArgs): ExecuteRunArgs {
	const { interaction, bot } = args;
	const commandName = interaction.options.get('command')!.value;

	if (!commandName || typeof commandName !== 'string') {
		throw new Error('Invalid command name');
	}

	return {
		commandName,
		bot,
	};
}

export async function execute(args: ExecuteRunArgs): Promise<InteractionReplyOptions> {
	const { commandName } = args;

	let reply: string;

	const customCommand = customCommandsManager.getByName({
		commandName,
	});

	if (!customCommand) {
		throw new Error(`Command ${commandName} does not exists`);
	}

	reply = `/${customCommand?.commands[0]}`;

	return { content: reply };
}
