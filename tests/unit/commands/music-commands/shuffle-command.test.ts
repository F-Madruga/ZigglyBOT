import * as shuffleCommand from '../../../../src/commands/music-commands/shuffle-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';

describe('music command - shuffle command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(shuffleCommand.prefix).toEqual('shuffle');
		expect(shuffleCommand.data.description).toEqual('Shuffle the queue');
		expect(shuffleCommand.options).toEqual([]);
		expect(shuffleCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'shuffle');

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await shuffleCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
