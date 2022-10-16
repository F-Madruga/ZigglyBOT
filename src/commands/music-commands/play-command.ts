import { SlashCommandBuilder } from '@discordjs/builders';
import { QueryType } from 'discord-player';
import { CommandInteraction } from 'discord.js';
import { Bot } from '../../bot';

export const data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('Play a song')
	.addStringOption((option) =>
		option.setName('query').setDescription('Link for you song').setRequired(true),
	);

export async function execute(interaction: CommandInteraction, bot: Bot) {
	const { client, ctx } = bot;
	const { discordConfig } = ctx;
	const { guildId } = discordConfig;
	const userId = interaction.user.id;

	const guild = await client.guilds.fetch(guildId);
	const member = await guild.members.fetch(userId);
	const voiceChannel = member.voice.channel;

	if (!voiceChannel) {
		interaction.reply({
			content: 'You are not in a voice channel!',
			ephemeral: true,
		});
		return;
	}

	const query = interaction.options.get('query')!.value;
	if (!query || typeof query !== 'string') {
		interaction.reply({
			content: 'Invalid query',
			ephemeral: true,
		});
		return;
	}

	const queue = bot.player.createQueue(guild, {
		metadata: {
			voiceChannel,
		},
	});

	try {
		if (!queue.connection) await queue.connect(voiceChannel);
	} catch {
		queue.destroy();
		await interaction.reply({
			content: 'Could not join your voice channel!',
			ephemeral: true,
		});
		return;
	}

	await interaction.deferReply();
	const track = await bot.player
		.search(query, {
			requestedBy: interaction.user,
		})
		.then((x) => x.tracks[0]);
	if (!track) {
		await interaction.followUp({ content: `Track **${query}** not found!` });
		return;
	}

	queue.play(track);

	await interaction.followUp({ content: `Loading track **${track.title}**!` });
}
