import { Context } from '../../../src/discord-bot';
import { MockInteraction } from './interaction';
import { MockDiscordBot } from './discord-bot';

interface MockContextContructorArgs {
	interaction: MockInteraction;
	discordBot: MockDiscordBot;
}

export class MockContext {
	public interaction: MockInteraction;
	public discordBot: MockDiscordBot;

	constructor({
		interaction = new MockInteraction({}),
		discordBot = new MockDiscordBot({}),
	}: Partial<MockContextContructorArgs>) {
		this.interaction = interaction;
		this.discordBot = discordBot;
	}

	public getMock(): Context {
		return this as unknown as Context;
	}
}
