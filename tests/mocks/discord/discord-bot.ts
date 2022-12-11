import { MockClient } from './client';
import { MockPlayer } from './player';
import { DiscordConfig, DiscordBot, Command } from '../../../src/discord-bot';

interface MockDiscordBotContructorArgs {
	client: MockClient;
	player: MockPlayer;
	commands: Map<string, Command>;
	config: DiscordConfig;
}

export class MockDiscordBot {
	public mockedResults: any;

	public client: MockClient;
	public player: MockPlayer;
	public commands: Map<string, Command>;
	public config: DiscordConfig;

	constructor({
		client = new MockClient({}),
		player = new MockPlayer({}),
		commands = new Map(),
		config = {
			token: 'token',
			guildId: 'guildId',
			clientId: 'clientId',
		},
	}: Partial<MockDiscordBotContructorArgs>) {
		this.client = client;
		this.player = player;
		this.commands = commands;
		this.config = config;
	}

	public getMocked(): DiscordBot {
		return {
			client: this.client.getMocked(),
			player: this.player.getMocked(),
			commands: this.commands,
			config: this.config,
		};
	}
}
