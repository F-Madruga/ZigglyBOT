import { CommandInteraction } from 'discord.js';
import { MockInteractionOptions } from './interaction-options';

interface MockInteractionContructorArgs {
	options: MockInteractionOptions;
}

export class MockInteraction {
	public mockedResults: any;
	public options: MockInteractionOptions;

	constructor({
		options = new MockInteractionOptions({}),
	}: Partial<MockInteractionContructorArgs>) {
		this.options = options;
	}

	public reply(reply: any) {
		this.mockedResults = reply;
	}

	public followUp(reply: any) {
		this.mockedResults = reply;
	}

	public getMocked(): CommandInteraction {
		return this as unknown as CommandInteraction;
	}
}
