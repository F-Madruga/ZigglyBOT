import { CommandInteraction } from 'discord.js';
import { MockInteractionOptions } from './interaction-options';
import { MockTextChannel } from './text-channel';
import { MockUser } from './user';

interface MockInteractionContructorArgs {
	reply: jest.Mock;
	followUp: jest.Mock;
	deferReply: jest.Mock;
	channel: MockTextChannel;
	user: MockUser;
	options: MockInteractionOptions;
}

export class MockInteraction {
	public reply: jest.Mock;
	public followUp: jest.Mock;
	public deferReply: jest.Mock;
	public channel: MockTextChannel;
	public user: MockUser;
	public options: MockInteractionOptions;

	constructor({
		reply = jest.fn(),
		followUp = jest.fn(),
		deferReply = jest.fn(),
		channel = new MockTextChannel({}),
		user = new MockUser({}),
		options = new MockInteractionOptions({}),
	}: Partial<MockInteractionContructorArgs>) {
		this.reply = reply;
		this.followUp = followUp;
		this.deferReply = deferReply;
		this.channel = channel;
		this.user = user;
		this.options = options;
	}

	public getMock(): CommandInteraction {
		return this as unknown as CommandInteraction;
	}
}
