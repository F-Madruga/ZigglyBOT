import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionReplyOptions, User } from 'discord.js';
import { Bot, ExecuteArgs, GetCommandArgs } from '../../bot';
import * as musicManager from '../../managers/music-manager';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('Play a song')
	.addStringOption((option) =>
		option.setName('query').setDescription('Link for you song').setRequired(true),
	);

interface ExecutePlayArgs extends ExecuteArgs {
	user: User;
	query: string;
}

export const requiredInteractionProperties = new Set<string>(['user']);

export function getExecuteArgs(args: GetCommandArgs): ExecutePlayArgs {
	const { interaction } = args;
	const { user } = interaction;
	console.log(user);
	const query = interaction.options.get('query')!.value;

	const commandArgs = validateCommand({
		user,
		query,
	});

	return commandArgs;
}

export function validateCommand(args: any): ExecutePlayArgs {
	const { query, user } = args;

	if (!query || typeof query !== 'string') {
		throw new Error('Invalid query');
	}

	return {
		user,
		query,
	};
}

export async function execute(args: ExecutePlayArgs, bot: Bot): Promise<InteractionReplyOptions> {
	const { user, query } = args;

	const reply = await musicManager.play({
		bot,
		user,
		query,
	});

	return { content: reply };
}
