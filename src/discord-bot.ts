import { Player } from 'discord-player';
import 'discord-player/smoothVolume';
import {
	Client,
	CommandInteraction,
	GatewayIntentBits,
	REST,
	Routes,
	SlashCommandBuilder,
} from 'discord.js';
import { getCommands } from './commands';
import { logger } from './tools/logger';

interface DiscordConfig {
	token: string;
	clientId: string;
	guildId: string;
}

export interface Context {
	interaction: CommandInteraction;
	discordBot: DiscordBot;
}

export interface Command {
	prefix: string;
	options: string[];
	data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
	validateCommandArgs?: (args: any) => any;
	execute: (ctx: Context) => any;
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

export async function deployCommands(
	discordConfig: DiscordConfig,
	commands: Map<string, Command>,
): Promise<void> {
	const rest = new REST({ version: '10' }).setToken(discordConfig.token);

	const commandsList = Array.from(commands.values()).map((command: Command) =>
		command.data.toJSON(),
	);

	await rest.put(Routes.applicationCommands(discordConfig.clientId), { body: commandsList });
}

export async function runCommand(discordBot: DiscordBot, interaction: CommandInteraction) {
	const { commandName } = interaction;
	const command = discordBot.commands.get(commandName);
	const ctx = { interaction, discordBot };

	if (!command) {
		logger.info(`Command ${commandName} does not exist`);

		return interaction.reply({ content: `Command ${commandName} does not exist` });
	}

	logger.info(`Receive command: ${command.prefix}`);

	return command.execute(ctx);
}
