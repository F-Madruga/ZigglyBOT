import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, ValidateCommandArgs } from '../../bot';
import * as musicManager from '../../managers/music-manager';

export const data = new SlashCommandBuilder().setName('pause').setDescription('Pause a song');

interface ExecutePauseArgs extends ExecuteArgs {}

export function validateCommand(args: ValidateCommandArgs): ExecutePauseArgs {
	const { bot } = args;
	return {
		bot,
	};
}

export async function execute(args: ExecutePauseArgs): Promise<InteractionReplyOptions> {
	const { bot } = args;
	const reply = await musicManager.pause({
		bot,
	});

	return { content: reply };
}
