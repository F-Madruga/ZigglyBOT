import { Guild } from 'discord.js';
import { MockGuildMembers } from './guild-members';

interface MockGuildContructorArgs {
	members: MockGuildMembers;
}

export class MockGuild {
	public members: MockGuildMembers;

	constructor({ members = new MockGuildMembers({}) }: Partial<MockGuildContructorArgs>) {
		this.members = members;
	}

	public getMock(): Guild {
		return this as unknown as Guild;
	}
}
