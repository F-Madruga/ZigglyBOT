import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID } from './constants';
import { createDiscordBot } from './discord-bot';

const discordBot = createDiscordBot({
	token: DISCORD_TOKEN,
	clientId: CLIENT_ID,
	guildId: GUILD_ID,
});

discordBot.client.once('ready', () => {
	console.log('Discord bot ready');
});

discordBot.client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return;
	}

	const { commandName } = interaction;
	const command = discordBot.commands.get(commandName);

	if (!command) {
		return;
	}

	let commandArgs;
	try {
		commandArgs = command.getArgs(interaction);
	} catch (error) {
		command.errorHandler(error, interaction, commandArgs);
		return;
	}

	try {
		commandArgs = command.validateCommandArgs(commandArgs);
	} catch (error) {
		command.errorHandler(error, interaction, commandArgs);
		return;
	}

	let result;
	try {
		result = command.execute(interaction, commandArgs);
	} catch (error) {
		command.errorHandler(error, interaction, commandArgs, result);
		return;
	}

	try {
		command.reply(interaction, commandArgs, result);
	} catch (error) {
		command.errorHandler(error, interaction, commandArgs, result);
		return;
	}
});
