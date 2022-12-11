import * as memeCommands from '../../../../src/commands/meme-commands';
import { Context } from '../../../../src/discord-bot';
import * as popcordManager from '../../../../src/managers/popcord-manager';
import sinon from 'ts-sinon';

describe('meme command', () => {
	const memeCommand = memeCommands.meme;

	it('should return the correct command prefix', () => {
		expect(memeCommand.prefix).toEqual('meme');
		expect(memeCommand.data.description).toEqual('Gets a random meme');
	});

	it('should call manager with correct parameters', async () => {
		const ctx = {
			interface: {},
		} as unknown as Context;
		const popcordStub = sinon.stub(popcordManager, 'getSFWMeme');
		await memeCommand.execute(ctx);

		expect(popcordStub.calledWith({ ctx })).toBeTruthy;
	});
});
