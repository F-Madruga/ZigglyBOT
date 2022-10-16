import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import discordConfig from './config';
import * as commandModules from './commands';

type Command = {
	data: unknown;
};

const commands = [];

for (const module of Object.values<Command>(commandModules)) {
	commands.push(module.data);
}

const rest = new REST({ version: '9' }).setToken(discordConfig.discordToken);

rest.put(Routes.applicationGuildCommands(discordConfig.clientId, discordConfig.guildId), {
	body: commands,
})
	.then(() => {
		console.log('Successfully registered application commands');
	})
	.catch(console.error);
