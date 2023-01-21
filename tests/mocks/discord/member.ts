import { GuildMember } from 'discord.js';
import { MockVoice } from './voice';

interface MockMemberContructorArgs {
	voice: MockVoice;
}

export class MockMember {
	public voice: MockVoice;

	constructor({ voice = new MockVoice({}) }: Partial<MockMemberContructorArgs>) {
		this.voice = voice;
	}

	public getMock(): GuildMember {
		return this as unknown as GuildMember;
	}
}
