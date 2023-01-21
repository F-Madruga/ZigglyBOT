import { Queue } from 'discord-player';
import { MockTrack } from './track';

interface MockQueueContructorArgs {
	connection: boolean;
	playing: boolean;
	current: MockTrack;
	destroy: jest.Mock;
	play: jest.Mock;
	connect: jest.Mock;
	setPaused: jest.Mock;
	clear: jest.Mock;
	back: jest.Mock;
	insert: jest.Mock;
	shuffle: jest.Mock;
	skip: jest.Mock;
}

export class MockQueue {
	public connection: boolean;
	public playing: boolean;
	public current: MockTrack;
	public destroy: jest.Mock;
	public play: jest.Mock;
	public connect: jest.Mock;
	public setPaused: jest.Mock;
	public clear: jest.Mock;
	public back: jest.Mock;
	public insert: jest.Mock;
	public shuffle: jest.Mock;
	public skip: jest.Mock;

	constructor({
		connection = true,
		playing = true,
		current = new MockTrack({}),
		destroy = jest.fn(),
		play = jest.fn(),
		connect = jest.fn(),
		setPaused = jest.fn(),
		clear = jest.fn(),
		back = jest.fn(),
		insert = jest.fn(),
		shuffle = jest.fn(),
		skip = jest.fn(),
	}: Partial<MockQueueContructorArgs>) {
		this.connection = connection;
		this.playing = playing;
		this.current = current;
		this.destroy = destroy;
		this.play = play;
		this.connect = connect;
		this.setPaused = setPaused;
		this.clear = clear;
		this.back = back;
		this.insert = insert;
		this.shuffle = shuffle;
		this.skip = skip;
	}

	public getMock(): Queue {
		return this as unknown as Queue;
	}
}
