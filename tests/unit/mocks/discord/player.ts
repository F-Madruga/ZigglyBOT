import { Player } from 'discord-player';

export class MockPlayer {
	public mockedResults: any;

	public getMocked(): Player {
		return this as unknown as Player;
	}
}
