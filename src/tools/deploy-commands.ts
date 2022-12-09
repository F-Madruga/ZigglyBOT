import { getCommands } from '../commands';
import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID } from '../constants';
import { deployCommands } from '../discord-bot';
import { logger } from './logger';

const discordConfig = {
	token: DISCORD_TOKEN,
	clientId: CLIENT_ID,
	guildId: GUILD_ID,
};

const commands = getCommands();

deployCommands(discordConfig, commands)
	.then(() => {
		logger.info('Discord bot commands deployed successfully');
	})
	.catch((error) => {
		logger.error(error);
	});
