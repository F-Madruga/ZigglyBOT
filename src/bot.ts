import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import discordConfig, { DiscordConfig } from './config';
import * as commandModules from './commands';
import 'discord-player/smoothVolume';

export type Context = {
	discordConfig: DiscordConfig;
};

export type Bot = {
	client: Client;
	player: Player;
	ctx: Context;
};

const commands = Object(commandModules);

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildVoiceStates,
	],
});

const player = new Player(client, {
	ytdlOptions: {
		quality: 'highestaudio',
		highWaterMark: 1 << 25,
	},
});

const bot: Bot = {
	client,
	player,
	ctx: {
		discordConfig,
	},
};

client.once('ready', () => {
	console.log('ZigglyBOT ready');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return;
	}
	const { commandName } = interaction;
	commands[commandName].execute(interaction, bot);
});

client.login(bot.ctx.discordConfig.discordToken);

export default bot;
