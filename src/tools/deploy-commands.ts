import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as commandModules from '../commands';
import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID } from '../constants';

type Command = {
	data: unknown;
};

function getCommands() {
	const commands = [];

	for (const module of Object.values<Command>(commandModules)) {
		commands.push(module.data);
	}

	return commands;
}

async function deployCommands(commands: unknown[]) {
	const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

	return await rest
		.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commands,
		})
		.then(() => {
			console.log('Successfully registered application commands');
		})
		.catch(console.error);
}

const commands = getCommands();
deployCommands(commands);
