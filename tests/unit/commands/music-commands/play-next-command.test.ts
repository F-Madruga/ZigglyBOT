import * as playNextCommand from '../../../../src/commands/music-commands/play-next-command';
import * as musicManager from '../../../../src/managers/music-manager';
import * as parseInteractionOptions from '../../../../src/tools/parse-interaction-options';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('music command - playnext command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(playNextCommand.prefix).toEqual('playnext');
		expect(playNextCommand.data.description).toEqual(
			'Set music to play next in your voice chat',
		);
		expect(playNextCommand.options).toEqual(['query']);
		expect(playNextCommand.data.options.length).toEqual(1);
		expect(playNextCommand.data.options[0].toJSON().name).toEqual('query');
		expect(playNextCommand.data.options[0].toJSON().description).toEqual(
			'Link or name of your music',
		);
		expect(playNextCommand.data.options[0].toJSON().required).toEqual(true);
	});

	it('validateCommandArgs - should throw an error when query is not a string', () => {
		const query = 1;

		try {
			playNextCommand.validateCommandArgs({ query: query as unknown as string });
		} catch (error) {
			expect(error).toEqual(new Error('Invalid query'));
		}
	});

	it('validateCommandArgs - should throw an error when query is not defined', () => {
		const query = undefined;

		try {
			playNextCommand.validateCommandArgs({ query: query as unknown as string });
		} catch (error) {
			expect(error).toEqual(new Error('Invalid query'));
		}
	});

	it('execute - should call manager with correct parameters', async () => {
		const query = 'test';
		const musicManagerStub = sinon.stub(musicManager, 'playNext');
		sinon.stub(parseInteractionOptions, 'parseInteractionOptions').returns({ query });
		sinon.stub(playNextCommand, 'validateCommandArgs').returns({ query });

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await playNextCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx, query });
	});
});
