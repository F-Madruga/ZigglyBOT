import { Player } from 'discord-player';

interface MockPlayerContructorArgs {
	createQueue: jest.Mock;
	search: jest.Mock;
}

export class MockPlayer {
	public createQueue: jest.Mock;
	public search: jest.Mock;

	constructor({
		createQueue = jest.fn(),
		search = jest.fn(),
	}: Partial<MockPlayerContructorArgs>) {
		this.createQueue = createQueue;
		this.search = search;
	}

	public getMock(): Player {
		return this as unknown as Player;
	}
}
