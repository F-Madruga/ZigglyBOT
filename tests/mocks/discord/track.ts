import { Track } from 'discord-player';

interface MockTrackContructorArgs {
	title: string;
}

export class MockTrack {
	public title: string;

	constructor({ title = 'test' }: Partial<MockTrackContructorArgs>) {
		this.title = title;
	}

	public getMock(): Track {
		return this as unknown as Track;
	}
}
