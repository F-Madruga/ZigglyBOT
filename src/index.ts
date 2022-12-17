import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID, NodeEnv, NODE_ENV, SERVER_PORT } from './constants';
import { createDiscordBot, deployCommands, runCommand } from './discord-bot';
import { logger } from './tools/logger';
import app from './app';

async function main() {
	app.listen({ port: SERVER_PORT }, (error, address) => {
		if (error) {
			logger.error(error);
			process.exit(1);
		}

		logger.info(`Server listening at ${address}`);
	});

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

	discordBot.client.on('guildMemberAdd', (member) => {
		const user = {
			uuid: 'test',
			discordId: member.id,
			username: member.user.username,
			discriminator: member.user.discriminator,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		logger.info(`New user joined the server: ${user}`);
	});

	discordBot.client.on('guildMemberRemove', (member) => {
		const user = {
			uuid: 'test',
			discordId: member.id,
			username: member.user.username,
			discriminator: member.user.discriminator,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		logger.info(`User left server ${user}`);
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
