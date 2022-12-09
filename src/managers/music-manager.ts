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
		return interaction.reply({ content: 'You are not in a voice channel' });
	}

	await interaction.deferReply();

	const queue = player.createQueue(guild, {
		metadata: {
			channel: interaction.channel,
		},
	});

	try {
		if (!queue.connection) {
			await queue.connect(voiceChannel);
		}
	} catch (error) {
		queue.destroy();
		return interaction.followUp({ content: 'Could not join your voice channel' });
	}

	const track = await player
		.search(query, {
			requestedBy: user,
		})
		.then((x) => x.tracks[0]);

	if (!track) {
		return interaction.followUp({ content: `Track **${query}** not found` });
	}

	queue.play(track);

	return interaction.followUp({ content: `Loading track **${track.title}**` });
}

interface PauseArgs {
	ctx: Context;
}

export async function pause({ ctx }: PauseArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	const paused = queue.setPaused(true);

	if (!paused) {
		return interaction.followUp({ content: 'Something went wrong' });
	}

	return interaction.followUp({ content: 'Music stopped' });
}

interface ClearArgs {
	ctx: Context;
}

export async function clear({ ctx }: ClearArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music in the queue' });
	}

	queue.clear();

	return interaction.followUp({ content: 'Queue cleared' });
}

interface BackArgs {
	ctx: Context;
}

export async function back({ ctx }: BackArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	await queue.back();

	return interaction.followUp({ content: 'Playing the previous music' });
}

interface PlayNextArgs {
	ctx: Context;
	query: string;
}

export async function playNext({ ctx, query }: PlayNextArgs) {
	const { interaction, discordBot } = ctx;
	const { user } = interaction;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	const track = await player
		.search(query, {
			requestedBy: user,
		})
		.then((x) => x.tracks[0]);

	if (!track) {
		return interaction.followUp({ content: `Track **${query}** not found` });
	}

	queue.insert(track);

	return interaction.followUp({ content: `Loading track **${track.title}**` });
}

interface ResumeArgs {
	ctx: Context;
}

export async function resume({ ctx }: ResumeArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	const paused = queue.setPaused(false);

	if (!paused) {
		return interaction.followUp({ content: 'Something went wrong' });
	}

	return interaction.followUp({ content: 'Resumed' });
}

interface ShuffleArgs {
	ctx: Context;
}

export async function shuffle({ ctx }: ShuffleArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	queue.shuffle();

	return interaction.followUp({ content: 'Queue has been shuffled' });
}

interface SkipArgs {
	ctx: Context;
}

export async function skip({ ctx }: SkipArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	const currentTrack = queue.current;

	const success = queue.skip();

	if (!success) {
		return interaction.followUp({ content: 'Something went wrong' });
	}

	return interaction.followUp({ content: `Skipped **${currentTrack}**` });
}

interface StopArgs {
	ctx: Context;
}

export async function stop({ ctx }: StopArgs) {
	const { interaction, discordBot } = ctx;
	const { config, player } = discordBot;
	const { guildId } = config;

	await interaction.deferReply();

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return interaction.followUp({ content: 'No music is being played' });
	}

	queue.destroy();

	return interaction.followUp({ content: `Stopped` });
}
