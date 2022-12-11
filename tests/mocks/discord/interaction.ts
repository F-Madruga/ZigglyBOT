import { CommandInteraction } from 'discord.js';

export class MockInteraction {
	public mockedResults: any;

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
