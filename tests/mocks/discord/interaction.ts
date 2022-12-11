import { CommandInteraction } from 'discord.js';

interface MockInteractionContructorArgs {}

export class MockInteraction {
	public mockedResults: any;

	constructor({}: Partial<MockInteractionContructorArgs>) {}

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
