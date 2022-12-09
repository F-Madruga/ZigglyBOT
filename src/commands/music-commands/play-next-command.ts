import { CommandInteraction, SlashCommandBuilder, User } from 'discord.js';
import { Context } from '../../discord-bot';
import { parseInteractionOptions } from '../../tools/parse-interaction-options';
import * as musicManager from '../../managers/music-manager';

export const prefix = 'playnext';
export const options = ['query'];

interface PlayArgs {
	query: string;
}

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Play music in your voice chat')
	.addStringOption((option) =>
		option.setName(options[0]).setDescription('Link or name of your music').setRequired(true),
	);

export function validateCommandArgs(args: PlayArgs): PlayArgs {
	const { query } = args;

	if (!query || typeof query !== 'string') {
		throw new Error('Invalid query');
	}

	return {
		query,
	};
}

export function execute(ctx: Context) {
	const { interaction } = ctx;

	const interactionArgs = parseInteractionOptions(interaction, options);
	const { query } = interactionArgs;

	validateCommandArgs({
		query,
	});

	return musicManager.playNext({
		ctx,
		query,
	});
}
