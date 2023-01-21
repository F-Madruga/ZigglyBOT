import { CommandInteractionOptionResolver } from 'discord.js';

interface MockInteractionOptionsContructorArgs {
	get: jest.Mock;
}
export class MockInteractionOptions {
	public get: jest.Mock;

	constructor({ get = jest.fn() }: Partial<MockInteractionOptionsContructorArgs>) {
		this.get = get;
	}

	public getMock(): CommandInteractionOptionResolver {
		return this as unknown as CommandInteractionOptionResolver;
	}
}
