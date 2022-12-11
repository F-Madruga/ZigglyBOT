import { Client } from 'discord.js';

export class MockClient {
	public mockedResults: any;

	public getMocked(): Client {
		return this as unknown as Client;
	}
}
