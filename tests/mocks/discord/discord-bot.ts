import { DataSource } from 'typeorm';
import { getCommands } from '../../../src/commands';
import { Command, DiscordBot } from '../../../src/discord-bot';
import { MockClient } from './client';
import { MockConfig } from './config';
import { MockPlayer } from './player';
import datasource from '../../../src/db';

interface MockDiscordBotContructorArgs {
	client: MockClient;
	player: MockPlayer;
	config: MockConfig;
	db: DataSource;
	commands: Map<string, Command>;
}

export class MockDiscordBot {
	public client: MockClient;
	public player: MockPlayer;
	public config: MockConfig;
	public db: DataSource;
	public commands: Map<string, Command>;

	constructor({
		client = new MockClient({}),
		player = new MockPlayer({}),
		config = new MockConfig({}),
		commands = getCommands(),
		db = datasource,
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
