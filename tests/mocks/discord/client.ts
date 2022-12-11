import { Client } from 'discord.js';

interface MockClientContructorArgs {}
export class MockClient {
	public mockedResults: any;

	constructor({}: Partial<MockClientContructorArgs>) {}

	public getMocked(): Client {
		return this as unknown as Client;
	}
}
