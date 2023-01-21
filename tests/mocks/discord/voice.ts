import { VoiceState } from 'discord.js';
import { MockVoiceChannel } from './voice-channel';

interface MockVoiceContructorArgs {
	channel: MockVoiceChannel | null;
}

export class MockVoice {
	public channel: MockVoiceChannel | null;

	constructor({ channel = new MockVoiceChannel({}) }: Partial<MockVoiceContructorArgs>) {
		this.channel = channel;
	}

	public getMock(): VoiceState {
		return this as unknown as VoiceState;
	}
}
