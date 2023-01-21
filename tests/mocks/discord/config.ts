import { DiscordConfig } from '../../../src/discord-bot';

interface MockConfigContructorArgs {
	token: string;
	guildId: string;
	clientId: string;
}

export class MockConfig {
	public token: string;
	public guildId: string;
	public clientId: string;

	constructor({
		token = 'token',
		guildId = 'guildId',
		clientId = 'clientId',
	}: Partial<MockConfigContructorArgs>) {
		this.token = token;
		this.guildId = guildId;
		this.clientId = clientId;
	}

	public getMock(): DiscordConfig {
		return this as DiscordConfig;
	}
}
