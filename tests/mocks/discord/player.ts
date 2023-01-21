import { Player } from 'discord-player';

interface MockPlayerContructorArgs {
	createQueue: jest.Mock;
	search: jest.Mock;
	getQueue: jest.Mock;
}

export class MockPlayer {
	public createQueue: jest.Mock;
	public search: jest.Mock;
	public getQueue: jest.Mock;

	constructor({
		createQueue = jest.fn(),
		search = jest.fn(),
		getQueue = jest.fn(),
	}: Partial<MockPlayerContructorArgs>) {
		this.createQueue = createQueue;
		this.search = search;
		this.getQueue = getQueue;
	}

	public getMock(): Player {
		return this as unknown as Player;
	}
}
