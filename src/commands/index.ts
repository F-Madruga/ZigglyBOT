import { Command } from '../discord-bot';
import * as healthcheckCommand from './healthcheck-command';
import * as musicCommands from './music-commands';

export function getCommands(): Map<string, Command> {
	const commands = new Map<string, Command>();

	commands.set(healthcheckCommand.prefix, healthcheckCommand);
	commands.set(musicCommands.play.prefix, musicCommands.play);
	commands.set(musicCommands.pause.prefix, musicCommands.pause);

	return commands;
}
