import { Context } from '../discord-bot';

interface PlayArgs {
	ctx: Context;
	query: string;
}

export async function play({ ctx, query }: PlayArgs) {
	const { interaction, discordBot } = ctx;
	const { user } = interaction;
	const { client, config, player } = discordBot;
	const { guildId } = config;

	const guild = await client.guilds.fetch(guildId);
	const member = await guild.members.fetch(user.id);

	const voiceChannel = member.voice.channel;

	if (!voiceChannel) {
		return interaction.reply({ content: 'You are not in a voice channel!' });
	}

	const queue = player.createQueue(guild, {
		metadata: {
			voiceChannel,
		},
	});

	try {
		if (!queue.connection) {
			await queue.connect(voiceChannel);
		}
	} catch (error) {
		queue.destroy();
		return interaction.reply({ content: 'Could not join your voice channel!' });
	}

	await interaction.deferReply();

	const track = await player
		.search(query, {
			requestedBy: user,
		})
		.then((x) => x.tracks[0]);

	if (!track) {
		return interaction.reply({ content: `Track **${query}** not found!` });
	}

	queue.play(track);

	return interaction.reply({ content: `Loading track **${track.title}**!` });
}

interface PauseArgs {
	ctx: Context;
}

export async function pause({ ctx }: PauseArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.reply({ content: 'No music is being played!' });
	}

	const paused = queue.setPaused(true);

	if (!paused) {
		return interaction.reply({ content: 'Something went wrong!' });
	}

	return interaction.reply({ content: 'Song stopped' });
}
