import {
	Client,
	CommandInteraction,
	GatewayIntentBits,
	Interaction,
	InteractionReplyOptions,
} from 'discord.js';
import { Player } from 'discord-player';
import * as commandModules from './commands';
import 'discord-player/smoothVolume';
import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID } from './constants';

export type DiscordConfig = {
	clientId: string;
	guildId: string;
	token: string;
};

export type Bot = {
	client: Client;
	player: Player;
	commands: any;
	config: DiscordConfig;
};

export type GetCommandArgs = {
	interaction: CommandInteraction;
};

export interface ExecuteArgs {}

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
	commands,
	config: {
		clientId: CLIENT_ID,
		guildId: GUILD_ID,
		token: DISCORD_TOKEN,
	},
};

bot.client.once('ready', () => {
	console.log('ZigglyBOT ready');
});

bot.client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return;
	}
	const { commandName } = interaction;
	let reply: InteractionReplyOptions;
	try {
		const executeArgs = bot.commands[commandName].getExecuteArgs({
			interaction,
			bot,
		});
		reply = await bot.commands[commandName].execute(executeArgs, bot);
	} catch (err) {
		reply = { content: err.message };
	}
	await interaction.reply(reply);
});

bot.client.login(bot.config.token);

export default bot;
