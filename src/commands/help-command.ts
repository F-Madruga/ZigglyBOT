import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, ChannelType, TextChannel } from 'discord.js';
import { Bot } from '../bot';

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Creates a new help ticket')
	.addStringOption((option) =>
		option.setName('description').setDescription('Describe your problem').setRequired(true),
	);

export async function execute(interaction: CommandInteraction, bot: Bot) {
	const { client } = bot;
	if (!interaction?.channelId) {
		return;
	}

	const channel = await client.channels.fetch(interaction.channelId);
	if (!channel || channel.type !== ChannelType.GuildText) {
		return;
	}

	const thread = await (channel as TextChannel).threads.create({
		name: `support-${Date.now()}`,
		reason: `Support ticket ${Date.now()}`,
	});

	const problemDescription = interaction.options.get('description')!.value;
	const { user } = interaction;
	thread.send(`**User:** <${user}>
	**Problem:** ${problemDescription}`);

	interaction.reply({
		content: 'Help is on the way!',
		ephemeral: true, // only the user o send the command will see the thread
	});
}
