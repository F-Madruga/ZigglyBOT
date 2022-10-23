import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, GetCommandArgs } from '../../bot';
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
	command: string;
	interaction: CommandInteraction;
}

export function getExecuteArgs(args: GetCommandArgs): ExecuteRunArgs {
	const { interaction } = args;
	const command = interaction.options.get('command')!.value;

	const commandArgs = validateCommand({
		command,
		interaction,
	});

	return commandArgs;
}

export function validateCommand(args: any): ExecuteRunArgs {
	const { command, interaction } = args;

	if (!command || typeof command !== 'string') {
		throw new Error('Invalid command name');
	}

	return {
		interaction,
		command,
	};
}

export async function execute(args: ExecuteRunArgs, bot: Bot): Promise<InteractionReplyOptions> {
	const { command, interaction } = args;

	const reply = customCommandsManager.run({ command, interaction, bot });
	console.log(reply);

	return { content: reply };
}
