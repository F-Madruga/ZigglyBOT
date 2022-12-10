import { Command } from '../discord-bot';
import * as healthcheckCommand from './healthcheck-command';
import * as musicCommands from './music-commands';
import * as memeCommands from './meme-commands';
import * as listCommands from './list-commands-command';

export function getCommands(): Map<string, Command> {
	const commands = new Map<string, Command>();

	commands.set(healthcheckCommand.prefix, healthcheckCommand);
	commands.set(listCommands.prefix, listCommands);
	commands.set(musicCommands.play.prefix, musicCommands.play);
	commands.set(musicCommands.playNext.prefix, musicCommands.playNext);
	commands.set(musicCommands.pause.prefix, musicCommands.pause);
	commands.set(musicCommands.resume.prefix, musicCommands.resume);
	commands.set(musicCommands.clear.prefix, musicCommands.clear);
	commands.set(musicCommands.skip.prefix, musicCommands.skip);
	commands.set(musicCommands.stop.prefix, musicCommands.stop);
	commands.set(musicCommands.back.prefix, musicCommands.back);
	commands.set(musicCommands.shuffle.prefix, musicCommands.shuffle);
	commands.set(memeCommands.meme.prefix, memeCommands.meme);
	commands.set(memeCommands.animeMeme.prefix, memeCommands.animeMeme);

	return commands;
}
