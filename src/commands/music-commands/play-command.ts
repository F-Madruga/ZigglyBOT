import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions, User } from 'discord.js';
import { Bot, ExecuteArgs, ValidateCommandArgs } from '../../bot';
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

export function validateCommand(args: ValidateCommandArgs): ExecutePlayArgs {
	const { interaction, bot } = args;
	const { user } = interaction;
	const query = interaction.options.get('query')!.value;

	if (!query || typeof query !== 'string') {
		throw new Error('Invalid query');
	}

	return {
		user,
		query,
		bot,
	};
}

export async function execute(args: ExecutePlayArgs): Promise<InteractionReplyOptions> {
	const { user, query, bot } = args;

	const reply = await musicManager.play({
		bot,
		user,
		query,
	});

	return { content: reply };
}
