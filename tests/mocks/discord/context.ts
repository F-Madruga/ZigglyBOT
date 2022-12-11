import { Context } from '../../../src/discord-bot';
import { MockDiscordBot } from './discord-bot';
import { MockInteraction } from './interaction';

interface MockDiscordContextContructorArgs {
	interaction: MockInteraction;
	discordBot: MockDiscordBot;
}

export class MockDiscordContext {
	public mockedResults: any;

	public interaction: MockInteraction;
	public discordBot: MockDiscordBot;

	constructor({
		interaction = new MockInteraction({}),
		discordBot = new MockDiscordBot({}),
	}: Partial<MockDiscordContextContructorArgs>) {
		this.interaction = interaction;
		this.discordBot = discordBot;
	}

	public getMocked(): Context {
		return {
			interaction: this.interaction.getMocked(),
			discordBot: this.discordBot.getMocked(),
		};
	}
}
