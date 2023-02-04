import { DiscordConfig } from '../../../src/discord-bot';
import { CLIENT_ID, DISCORD_TOKEN, GUILD_ID } from '../../../src/constants';

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
		token = DISCORD_TOKEN || 'token',
		guildId = GUILD_ID || 'guildId',
		clientId = CLIENT_ID || 'clientId',
	}: Partial<MockConfigContructorArgs>) {
		this.token = token;
		this.guildId = guildId;
		this.clientId = clientId;
	}

	public getMock(): DiscordConfig {
		return this as DiscordConfig;
	}
}
