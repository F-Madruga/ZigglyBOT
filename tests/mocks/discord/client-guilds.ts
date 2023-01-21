import { GuildManager } from 'discord.js';

interface MockClientGuildsContructorArgs {
	fetch: jest.Mock;
}

export class MockClientGuilds {
	public fetch: jest.Mock;

	constructor({ fetch = jest.fn() }: Partial<MockClientGuildsContructorArgs>) {
		this.fetch = fetch;
	}

	public getMock(): GuildManager {
		return this as unknown as GuildManager;
	}
}
