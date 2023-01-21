import { GuildMemberManager } from 'discord.js';

interface MockGuildMembersContructorArgs {
	fetch: jest.Mock;
}

export class MockGuildMembers {
	public fetch: jest.Mock;

	constructor({ fetch = jest.fn() }: Partial<MockGuildMembersContructorArgs>) {
		this.fetch = fetch;
	}

	public getMock(): GuildMemberManager {
		return this as unknown as GuildMemberManager;
	}
}
