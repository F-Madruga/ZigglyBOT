import { Player } from 'discord-player';
import {
	Client,
	CommandInteraction,
	GatewayIntentBits,
	REST,
	Routes,
	SlashCommandBuilder,
} from 'discord.js';
import { getCommands } from './commands';

interface DiscordConfig {
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

	const commands = getCommands();

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

export async function deployCommands(discordBot: DiscordBot): Promise<void> {
	const rest = new REST({ version: '10' }).setToken(discordBot.config.token);

	const commands = Array.from(discordBot.commands.values()).map((command: Command) =>
		command.data.toJSON(),
	);

	await rest.put(Routes.applicationCommands(discordBot.config.clientId), { body: commands });
}

export async function runCommand(discordBot: DiscordBot, interaction: CommandInteraction) {
	const { commandName } = interaction;
	const command = discordBot.commands.get(commandName);

	if (!command) {
		return;
	}

	let commandArgs;
	try {
		commandArgs = command.getArgs(interaction, { discordBot });
	} catch (error) {
		return command.errorHandler(error, interaction, commandArgs);
	}

	try {
		commandArgs = command.validateCommandArgs(commandArgs);
	} catch (error) {
		return command.errorHandler(error, interaction, commandArgs);
	}

	let result;
	try {
		result = await command.execute(interaction, commandArgs);
	} catch (error) {
		return command.errorHandler(error, interaction, commandArgs, result);
	}

	try {
		return command.reply(interaction, commandArgs, result);
	} catch (error) {
		return command.errorHandler(error, interaction, commandArgs, result);
	}
}
