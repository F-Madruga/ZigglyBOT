import * as backCommand from '../../../../src/commands/music-commands/back-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';

describe('music command - back command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(backCommand.prefix).toEqual('back');
		expect(backCommand.data.description).toEqual('Play the previous music');
		expect(backCommand.options).toEqual([]);
		expect(backCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'back');

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await backCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
