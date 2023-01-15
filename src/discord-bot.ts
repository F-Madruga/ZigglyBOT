import { Player } from 'discord-player';
import 'discord-player/smoothVolume';
import {
	Client,
	CommandInteraction,
	GatewayIntentBits,
	GuildMember,
	PartialGuildMember,
	REST,
	Routes,
	SlashCommandBuilder,
} from 'discord.js';
import { Knex } from 'knex';
import { getConnection } from './adapters/pg-adapter';
import { getCommands } from './commands';
import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID, NodeEnv, NODE_ENV } from './constants';
import { logger } from './tools/logger';
import * as userManager from './managers/user-manager';

export interface DiscordConfig {
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
	knex: Knex<any, unknown[]>;
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

async function runCommand(discordBot: DiscordBot, interaction: CommandInteraction) {
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

function createDiscordBot({ token, clientId, guildId }: DiscordConfig): DiscordBot {
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

	const db = getConnection();

	const discordBot = {
		client,
		player,
		commands,
		config: {
			token,
			clientId,
			guildId,
		},
		knex: db,
	};

	return discordBot;
}

function onNewMemberJoinServer(member: GuildMember) {
	const user = {
		uuid: 'test',
		discordId: member.id,
		username: member.user.username,
		discriminator: member.user.discriminator,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	logger.info(`New user joined the server: ${user}`);
}

function onMemberLeaveServer(member: GuildMember | PartialGuildMember) {
	const user = {
		uuid: 'test',
		discordId: member.id,
		username: member.user.username,
		discriminator: member.user.discriminator,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	logger.info(`User left server ${user}`);
}

function discordBot() {
	const discordBot = createDiscordBot({
		token: DISCORD_TOKEN,
		clientId: CLIENT_ID,
		guildId: GUILD_ID,
	});

	discordBot.client.on('ready', async () => {
		const guild = await discordBot.client.guilds.fetch(discordBot.config.guildId);
		const members = await guild.members.fetch({ force: NODE_ENV === NodeEnv.prod });

		const upsertPromises = members.map((member) => {
			return userManager.upsert({
				uuid: 'test',
				discordId: member.user.id,
				username: member.user.username,
				discriminator: member.user.discriminator,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});
		await Promise.all(upsertPromises);
		logger.info('Discord bot started successfully');
	});

	discordBot.client.on('guildMemberAdd', (member) => {
		onNewMemberJoinServer(member);
	});

	discordBot.client.on('guildMemberRemove', (member) => {
		onMemberLeaveServer(member);
	});

	discordBot.player.on('trackStart', (queue: any, track) =>
		queue.metadata.channel.send(`Now playing **${track.title}**!`),
	);

	discordBot.client.on('interactionCreate', async (interaction) => {
		if (!interaction.isCommand()) {
			return;
		}

		try {
			await runCommand(discordBot, interaction);
		} catch (error) {
			logger.error(error);
			await interaction.reply({ content: 'Something went wrong' });
		}
	});

	return discordBot;
}

export default discordBot();
