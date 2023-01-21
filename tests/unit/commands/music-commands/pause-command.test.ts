import * as pauseCommand from '../../../../src/commands/music-commands/pause-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';

describe('music command - pause command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(pauseCommand.prefix).toEqual('pause');
		expect(pauseCommand.data.description).toEqual('Pause music');
		expect(pauseCommand.options).toEqual([]);
		expect(pauseCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'pause');

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await pauseCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
