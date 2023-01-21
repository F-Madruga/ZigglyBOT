import * as playCommand from '../../../../src/commands/music-commands/play-command';
import * as musicManager from '../../../../src/managers/music-manager';
import * as parseInteractionOptions from '../../../../src/tools/parse-interaction-options';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';

describe('music command - play command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(playCommand.prefix).toEqual('play');
		expect(playCommand.data.description).toEqual('Play music in your voice chat');
		expect(playCommand.options).toEqual(['query']);
		expect(playCommand.data.options.length).toEqual(1);
		expect(playCommand.data.options[0].toJSON().name).toEqual('query');
		expect(playCommand.data.options[0].toJSON().description).toEqual(
			'Link or name of your music',
		);
		expect(playCommand.data.options[0].toJSON().required).toEqual(true);
	});

	it('validateCommandArgs - should throw an error when query is not a string', () => {
		const query = 1;

		try {
			playCommand.validateCommandArgs({ query: query as unknown as string });
		} catch (error) {
			expect(error).toEqual(new Error('Invalid query'));
		}
	});

	it('validateCommandArgs - should throw an error when query is not defined', () => {
		const query = undefined;

		try {
			playCommand.validateCommandArgs({ query: query as unknown as string });
		} catch (error) {
			expect(error).toEqual(new Error('Invalid query'));
		}
	});

	it('execute - should call manager with correct parameters', async () => {
		const query = 'test';
		const musicManagerStub = sinon.stub(musicManager, 'play');
		sinon.stub(parseInteractionOptions, 'parseInteractionOptions').returns({ query });
		sinon.stub(playCommand, 'validateCommandArgs').returns({ query });

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await playCommand.execute(ctx);

		expect(musicManagerStub.getCall(0).args[0]).toStrictEqual({ ctx, query });
	});
});
