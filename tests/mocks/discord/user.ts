import { User } from 'discord.js';

interface MockUserContructorArgs {
	id: string;
	username: string;
	discriminator: string;
	avatarURL: jest.Mock;
}

export class MockUser {
	public id: string;
	public username: string;
	public discriminator: string;
	public avatarURL: jest.Mock;

	constructor({
		id = 'discordId',
		username = 'username',
		discriminator = 'discriminator',
		avatarURL = jest.fn(),
	}: Partial<MockUserContructorArgs>) {
		this.id = id;
		this.username = username;
		this.discriminator = discriminator;
		this.avatarURL = avatarURL;
	}

	public getMock(): User {
		return this as unknown as User;
	}
}
