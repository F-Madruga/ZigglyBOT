import { Bot } from '../../bot';

interface PauseArgs {
	bot: Bot;
}

export async function pause(args: PauseArgs): Promise<string> {
	const { bot } = args;
	const { ctx, player } = bot;
	const { discordConfig } = ctx;
	const { guildId } = discordConfig;

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
