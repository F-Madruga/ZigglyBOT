import * as animeMeme from '../../../../src/commands/meme-commands/anime-meme-command';
import * as popcordManager from '../../../../src/managers/popcord-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('animememe command', () => {
	it('should return the correct command prefix', () => {
		expect(animeMeme.prefix).toEqual('animememe');
		expect(animeMeme.data.description).toEqual('Gets a random anime meme');
	});

	it('should call manager with correct parameters', async () => {
		const popcordManagerStub = sinon.stub(popcordManager, 'getSFWAnimeMeme');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await animeMeme.execute(ctx);

		expect(popcordManagerStub.calledWith({ ctx })).toBeTruthy;
	});
});
