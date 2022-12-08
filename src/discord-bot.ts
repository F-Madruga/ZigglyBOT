import { Player } from 'discord-player';
import { Client, CommandInteraction, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';

export interface DiscordConfig {
	token: string;
	clientId: string;
	guildId: string;
}

export interface CommandArgs {
	discordBot: DiscordBot;
}

export interface Command {
	prefix: string;
	data: SlashCommandBuilder;
	getArgs: (interaction: CommandInteraction, args: CommandArgs) => CommandArgs;
	validateCommandArgs: (args: CommandArgs) => CommandArgs;
	execute: (interaction: CommandInteraction, args: CommandArgs) => any;
	reply: (interaction: CommandInteraction, args: CommandArgs, result?: any) => any;
	errorHandler: (
		error: any,
		interaction: CommandInteraction,
		args?: CommandArgs,
		result?: any,
	) => any;
}

export interface DiscordBot {
	client: Client;
	player: Player;
	commands: Map<string, Command>;
	config: DiscordConfig;
}

export function createDiscordBot({ token, clientId, guildId }: DiscordConfig): DiscordBot {
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

	const commands = new Map();

	const discordBot = {
		client,
		player,
		commands,
		config: {
			token,
			clientId,
			guildId,
		},
	};

	return discordBot;
}
