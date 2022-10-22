import { CommandInteraction } from 'discord.js';
import { Bot } from '../bot';
import * as customCommandsRepository from '../repositories/custom-command-repository';

interface CreateArgs {
	bot: Bot;
	commandName: string;
	commands: string[];
}

export function create(args: CreateArgs): string {
	const { commands, commandName } = args;

	// Command can't be a CRUD of a custom command

	customCommandsRepository.createOne({
		command: {
			name: commandName,
			commands,
		},
	});

	return `Command **${commandName}** created with success`;
}

interface RunArgs {
	commandName: string;
}

export function getByName(args: RunArgs) {
	const { commandName } = args;

	const customCommand = customCommandsRepository.getByName({ name: commandName });

	return customCommand;
}
