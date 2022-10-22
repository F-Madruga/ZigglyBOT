import { User } from 'discord.js';
import { Bot } from '../bot';

interface PlayArgs {
	bot: Bot;
	user: User;
	query: string;
}

export async function play(args: PlayArgs): Promise<string> {
	const { bot, query, user } = args;
	const { client, config } = bot;
	const { guildId } = config;

	const guild = await client.guilds.fetch(guildId);
	const member = await guild.members.fetch(user.id);

	const voiceChannel = member.voice.channel;

	if (!voiceChannel) {
		return 'You are not in a voice channel!';
	}

	const queue = bot.player.createQueue(guild, {
		metadata: {
			voiceChannel,
		},
	});

	try {
		if (!queue.connection) {
			await queue.connect(voiceChannel);
		}
	} catch {
		queue.destroy();
		return 'Could not join your voice channel!';
	}

	// await interaction.deferReply();

	const track = await bot.player
		.search(query, {
			requestedBy: user,
		})
		.then((x) => x.tracks[0]);
	if (!track) {
		return `Track **${query}** not found!`;
	}

	queue.play(track);

	return `Loading track **${track.title}**!`;
}

interface PauseArgs {
	bot: Bot;
}

export async function pause(args: PauseArgs): Promise<string> {
	const { bot } = args;
	const { config, player } = bot;
	const { guildId } = config;

	const queue = player.getQueue(guildId);
	if (!queue || !queue.playing) {
		return 'No music is being played!';
	}

	const paused = queue.setPaused(true);
	if (!paused) {
		return 'Something went wrong!';
	}
	return 'Music paused';
}
