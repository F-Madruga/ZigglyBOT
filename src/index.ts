import { Queue } from 'discord-player';
import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID, NodeEnv, NODE_ENV } from './constants';
import { createDiscordBot, deployCommands, runCommand } from './discord-bot';
import { logger } from './tools/logger';

async function main() {
	const discordBot = createDiscordBot({
		token: DISCORD_TOKEN,
		clientId: CLIENT_ID,
		guildId: GUILD_ID,
	});

	if (NODE_ENV === NodeEnv.prod) {
		await deployCommands(discordBot.config, discordBot.commands)
			.then(() => {
				logger.info('Discord bot commands deployed successfully');
			})
			.catch((error) => {
				logger.error(error);
			});
	}

	discordBot.client.on('ready', () => {
		logger.info('Discord bot started successfully');
	});

	discordBot.player.on('trackStart', (queue: any, track) =>
		queue.metadata.channel.send(`Now playing **${track.title}**!`),
	);

	discordBot.client.on('interactionCreate', async (interaction) => {
		if (!interaction.isCommand()) {
			return;
		}

		try {
			await runCommand(discordBot, interaction);
		} catch (error) {
			logger.error(error);
		}
	});

	discordBot.client.login(discordBot.config.token);
}

main().catch((error) => {
	logger.error(error);
});
