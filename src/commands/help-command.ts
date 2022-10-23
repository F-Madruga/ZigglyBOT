import { SlashCommandBuilder } from '@discordjs/builders';
import {
	CommandInteraction,
	ChannelType,
	TextChannel,
	InteractionReplyOptions,
	User,
} from 'discord.js';
import { Bot, ExecuteArgs, ValidateCommandArgs } from '../bot';

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Creates a new help ticket')
	.addStringOption((option) =>
		option.setName('description').setDescription('Describe your problem').setRequired(true),
	);

interface ExecuteHelpArgs extends ExecuteArgs {
	user: User;
	channelId: string;
	problemDescription: string;
}

export function validateCommand(args: ValidateCommandArgs): ExecuteHelpArgs {
	const { interaction, bot } = args;
	const { channelId, user } = interaction;
	const problemDescription = interaction.options.get('description')!.value;

	if (!problemDescription || typeof problemDescription !== 'string') {
		throw new Error('Invalid problem description');
	}

	return {
		user,
		bot,
		channelId,
		problemDescription,
	};
}

export async function execute(args: ExecuteHelpArgs): Promise<InteractionReplyOptions> {
	const { user, bot, channelId, problemDescription } = args;
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
	**Problem:** ${problemDescription}`);

	return { content: 'Help is on the way!' };
}
