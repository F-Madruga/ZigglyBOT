import * as skipCommand from '../../../../src/commands/music-commands/skip-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('music command - skip command', () => {
	it('data - should return the correct command prefix', () => {
		expect(skipCommand.prefix).toEqual('skip');
		expect(skipCommand.data.description).toEqual('Skip the current music');
		expect(skipCommand.options).toEqual([]);
		expect(skipCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'skip');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await skipCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
