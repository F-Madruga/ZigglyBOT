import { Queue } from 'discord-player';

interface MockQueueContructorArgs {
	connection: boolean;
	destroy: jest.Mock;
	play: jest.Mock;
	connect: jest.Mock;
}

export class MockQueue {
	public connection: boolean;
	public destroy: jest.Mock;
	public play: jest.Mock;
	public connect: jest.Mock;

	constructor({
		connection = true,
		destroy = jest.fn(),
		play = jest.fn(),
		connect = jest.fn(),
	}: Partial<MockQueueContructorArgs>) {
		this.connection = connection;
		this.destroy = destroy;
		this.play = play;
		this.connect = connect;
	}

	public getMock(): Queue {
		return this as unknown as Queue;
	}
}
