import { Context } from '../../../../src/discord-bot';
import { MockDiscordBot } from './discord-bot';
import { MockInteraction } from './interaction';

export class MockDiscordContext {
	public mockedResults: any;

	public interaction: MockInteraction;
	public discordBot: MockDiscordBot;

	constructor() {
		this.interaction = new MockInteraction();
		this.discordBot = new MockDiscordBot();
	}

	public getMocked(): Context {
		return {
			interaction: this.interaction.getMocked(),
			discordBot: this.discordBot.getMocked(),
		};
	}
}
