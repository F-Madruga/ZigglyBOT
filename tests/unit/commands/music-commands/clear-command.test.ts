import * as clearCommand from '../../../../src/commands/music-commands/clear-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('music command - clear command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(clearCommand.prefix).toEqual('clear');
		expect(clearCommand.data.description).toEqual('Clear music queue');
		expect(clearCommand.options).toEqual([]);
		expect(clearCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'clear');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await clearCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
