import * as animeMemeCommand from '../../../../src/commands/meme-commands/anime-meme-command';
import * as popcordManager from '../../../../src/managers/popcord-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('meme command - animememe command', () => {
	it('data - should return the correct command prefix', () => {
		expect(animeMemeCommand.prefix).toEqual('animememe');
		expect(animeMemeCommand.data.description).toEqual('Gets a random anime meme');
		expect(animeMemeCommand.options).toEqual([]);
		expect(animeMemeCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const popcordManagerStub = sinon.stub(popcordManager, 'getSFWAnimeMeme');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await animeMemeCommand.execute(ctx);

		expect(popcordManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
