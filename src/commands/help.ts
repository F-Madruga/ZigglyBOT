import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client, ChannelType, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Creates a new help ticket')
	.addStringOption((option) =>
		option.setName('description').setDescription('Describe your problem').setRequired(true),
	);

export async function execute(interaction: CommandInteraction, client: Client) {
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

	const problemDescription = interaction.options.get('description')!;
	const { user } = interaction;
	thread.send(`**User:** <${user}>
	**Problem:** ${problemDescription.value}`);

	interaction.reply({
		content: 'Help is on the way!',
		ephemeral: true, // only the user o send the command will see the thread
	});
}
