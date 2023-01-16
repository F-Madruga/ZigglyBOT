import * as stopCommand from '../../../../src/commands/music-commands/stop-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('music command - stop command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(stopCommand.prefix).toEqual('stop');
		expect(stopCommand.data.description).toEqual('Stop music');
		expect(stopCommand.options).toEqual([]);
		expect(stopCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'stop');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await stopCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
