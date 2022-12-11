import { Player } from 'discord-player';

interface MockPlayerContructorArgs {}

export class MockPlayer {
	public mockedResults: any;

	constructor({}: Partial<MockPlayerContructorArgs>) {}

	public getMocked(): Player {
		return this as unknown as Player;
	}
}
