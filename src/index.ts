import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID } from './constants';
import { createDiscordBot, deployCommands, runCommand } from './discord-bot';

async function main() {
	const discordBot = createDiscordBot({
		token: DISCORD_TOKEN,
		clientId: CLIENT_ID,
		guildId: GUILD_ID,
	});

	await deployCommands(discordBot)
		.then(() => {
			console.log('Discord bot commands deployed successfully');
		})
		.catch(console.error);

	discordBot.client.on('ready', () => {
		console.log('Discord bot started successfully');
	});

	discordBot.client.on('interactionCreate', async (interaction) => {
		if (!interaction.isCommand()) {
			return;
		}

		await runCommand(discordBot, interaction);
	});

	discordBot.client.login(discordBot.config.token);
}

main().catch((error) => {
	console.error(error);
});
