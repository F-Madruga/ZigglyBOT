import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, GetCommandArgs } from '../../bot';
import * as musicManager from '../../managers/music-manager';

export const data = new SlashCommandBuilder().setName('pause').setDescription('Pause a song');

interface ExecutePauseArgs extends ExecuteArgs {}

export function getExecuteArgs(args: GetCommandArgs): ExecutePauseArgs {
	const {} = args;

	const commandArgs = validateCommand({});

	return commandArgs;
}

export function validateCommand(args: any): ExecutePauseArgs {
	const {} = args;

	return {};
}

export async function execute(args: ExecutePauseArgs, bot: Bot): Promise<InteractionReplyOptions> {
	const reply = await musicManager.pause({
		bot,
	});

	return { content: reply };
}
