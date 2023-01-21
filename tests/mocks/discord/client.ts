import { Client } from 'discord.js';
import { MockGuildMembers } from './guild-members';

interface MockClientContructorArgs {
	guilds: MockGuildMembers;
}

export class MockClient {
	public guilds: MockGuildMembers;
	constructor({ guilds = new MockGuildMembers({}) }: Partial<MockClientContructorArgs>) {
		this.guilds = guilds;
	}

	public getMock(): Client {
		return this as unknown as Client;
	}
}
