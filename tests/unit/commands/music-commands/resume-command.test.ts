import * as resumeCommand from '../../../../src/commands/music-commands/resume-command';
import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('music command - resume command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(resumeCommand.prefix).toEqual('resume');
		expect(resumeCommand.data.description).toEqual('Resume current music');
	});

	it('execute - should call manager with correct parameters', async () => {
		const musicManagerStub = sinon.stub(musicManager, 'resume');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await resumeCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
