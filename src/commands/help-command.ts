import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType, TextChannel, InteractionReplyOptions, User } from 'discord.js';
import { Bot, ExecuteArgs, GetCommandArgs } from '../bot';

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Creates a new help ticket')
	.addStringOption((option) =>
		option.setName('description').setDescription('Describe your problem').setRequired(true),
	);

interface ExecuteHelpArgs extends ExecuteArgs {
	user: User;
	channelId: string;
	description: string;
}

export function getExecuteArgs(args: GetCommandArgs): ExecuteHelpArgs {
	const { interaction } = args;
	const { channelId, user } = interaction;
	const description = interaction.options.get('description')!.value;

	const commandArgs = validateCommand({
		user,
		channelId,
		description,
	});

	return commandArgs;
}

export function validateCommand(args: any): ExecuteHelpArgs {
	const { user, channelId, description } = args;

	if (!description || typeof description !== 'string') {
		throw new Error('Invalid problem description');
	}

	return {
		user,
		channelId,
		description,
	};
}

export async function execute(args: ExecuteHelpArgs, bot: Bot): Promise<InteractionReplyOptions> {
	const { user, channelId, description } = args;
	const { client } = bot;
	if (!channelId) {
		return { content: '' };
	}

	const channel = await client.channels.fetch(channelId);
	if (!channel || channel.type !== ChannelType.GuildText) {
		return { content: '' };
	}

	const thread = await (channel as TextChannel).threads.create({
		name: `support-${Date.now()}`,
		reason: `Support ticket ${Date.now()}`,
	});

	thread.send(`**User:** <${user}>
	**Problem:** ${description}`);

	return { content: 'Help is on the way!' };
}
