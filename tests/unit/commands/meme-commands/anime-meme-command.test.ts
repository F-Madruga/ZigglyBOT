import * as memeCommands from '../../../../src/commands/meme-commands';
import * as popcordManager from '../../../../src/managers/popcord-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('anime meme command', () => {
	const memeCommand = memeCommands.animeMeme;

	it('should return the correct command prefix', () => {
		expect(memeCommand.prefix).toEqual('animememe');
		expect(memeCommand.data.description).toEqual('Gets a random anime meme');
	});

	it('should call manager with correct parameters', async () => {
		const popcordManagerStub = sinon.stub(popcordManager, 'getSFWAnimeMeme');

		const mockCtx = new MockDiscordContext();
		const ctx = mockCtx.getMocked();

		await memeCommand.execute(ctx);

		expect(popcordManagerStub.calledWith({ ctx })).toBeTruthy;
	});
});
