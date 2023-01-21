import { VoiceBasedChannel } from 'discord.js';

interface MockVoiceChannelContructorArgs {}

export class MockVoiceChannel {
	constructor({}: Partial<MockVoiceChannelContructorArgs>) {}

	public getMock(): VoiceBasedChannel {
		return this as unknown as VoiceBasedChannel;
	}
}
