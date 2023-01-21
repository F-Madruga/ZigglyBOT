import { getCommands } from '../../../src/commands';
import { Command, DiscordBot } from '../../../src/discord-bot';
import { MockClient } from './client';
import { MockConfig } from './config';
import { MockPlayer } from './player';

interface MockDiscordBotContructorArgs {
	client: MockClient;
	player: MockPlayer;
	config: MockConfig;
	commands: Map<string, Command>;
}

export class MockDiscordBot {
	public client: MockClient;
	public player: MockPlayer;
	public config: MockConfig;
	public commands: Map<string, Command>;

	constructor({
		client = new MockClient({}),
		player = new MockPlayer({}),
		config = new MockConfig({}),
		commands = getCommands(),
	}: Partial<MockDiscordBotContructorArgs>) {
		this.client = client;
		this.player = player;
		this.config = config;
		this.commands = commands;
	}

	public getMock(): DiscordBot {
		return this as unknown as DiscordBot;
	}
}
