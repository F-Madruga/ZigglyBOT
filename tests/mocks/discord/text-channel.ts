import { TextBasedChannel } from 'discord.js';

interface MockTextChannelContructorArgs {}

export class MockTextChannel {
	constructor({}: Partial<MockTextChannelContructorArgs>) {}

	public getMock(): TextBasedChannel {
		return this as unknown as TextBasedChannel;
	}
}
