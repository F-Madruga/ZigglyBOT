import { Command } from '../discord-bot';
import * as healthcheckCommand from './healthcheck-command';

export function getCommands(): Map<string, Command> {
	const commands = new Map<string, Command>();

	commands.set(healthcheckCommand.prefix, healthcheckCommand);

	return commands;
}
