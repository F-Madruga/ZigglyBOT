import { CommandInteractionOptionResolver } from 'discord.js';

interface MockInteractionOptionsContructorArgs {
	data: Map<string, { name: string; type: number; value: any }>;
}

export class MockInteractionOptions {
	public mockedResults: any;
	public data: Map<string, { name: string; type: number; value: any }>;

	constructor({
		data = new Map<string, { name: string; type: number; value: any }>(),
	}: Partial<MockInteractionOptionsContructorArgs>) {
		this.data = data;
	}

	public get(name: string) {
		const result = this.data.get(name);
		return result ? result : null;
	}

	public getMocked(): CommandInteractionOptionResolver {
		return this as unknown as CommandInteractionOptionResolver;
	}
}
