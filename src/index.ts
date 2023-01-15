import { NodeEnv, NODE_ENV, SERVER_PORT } from './constants';
import { logger } from './tools/logger';
import app from './app';
import discordBot, { deployCommands } from './discord-bot';

async function main() {
	app.listen({ port: SERVER_PORT }, (error, address) => {
		if (error) {
			logger.error(error);
			process.exit(1);
		}

		logger.info(`Server listening at ${address}`);
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

	discordBot.client.login(discordBot.config.token);
}

main().catch((error) => {
	logger.error(error);
});
