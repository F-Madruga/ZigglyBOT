import { User } from 'discord.js';

interface MockUserContructorArgs {
	id: string;
}

export class MockUser {
	public id: string;

	constructor({ id = 'userId' }: Partial<MockUserContructorArgs>) {
		this.id = id;
	}

	public getMock(): User {
		return this as unknown as User;
	}
}
