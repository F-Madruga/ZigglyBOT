import { VoiceState } from 'discord.js';
import { MockVoiceChannel } from './voice-channel';

interface MockVoiceContructorArgs {
	channel: MockVoiceChannel;
}

export class MockVoice {
	public channel: MockVoiceChannel;

	constructor({ channel = new MockVoiceChannel({}) }: Partial<MockVoiceContructorArgs>) {
		this.channel = channel;
	}

	public getMock(): VoiceState {
		return this as unknown as VoiceState;
	}
}
