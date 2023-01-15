import * as memeCommand from '../../../../src/commands/meme-commands/meme-command';
import * as popcordManager from '../../../../src/managers/popcord-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('meme command - meme command', () => {
	it('date - should return the correct command prefix', () => {
		expect(memeCommand.prefix).toEqual('meme');
		expect(memeCommand.data.description).toEqual('Gets a random meme');
		expect(memeCommand.options).toEqual([]);
		expect(memeCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const popcordManagerStub = sinon.stub(popcordManager, 'getSFWMeme');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await memeCommand.execute(ctx);

		expect(popcordManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
