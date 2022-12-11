import { MockClient } from './client';
import { MockPlayer } from './player';
import { DiscordConfig, DiscordBot, Command } from '../../../src/discord-bot';

export class MockDiscordBot {
	public mockedResults: any;

	public client: MockClient;
	public player: MockPlayer;
	public commands: Map<string, Command>;
	public config: DiscordConfig;

	constructor() {
		this.client = new MockClient();
		this.player = new MockPlayer();
		this.commands = new Map();
		this.config = {
			token: 'token',
			guildId: 'guildId',
			clientId: 'clientId',
		};
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
