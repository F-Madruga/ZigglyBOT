import * as healthcheckCommand from '../../../src/commands/healthcheck-command';
import { MockDiscordContext } from '../../mocks/discord';

describe('healthcheck command', () => {
	it('data - should return the correct command prefix', () => {
		expect(healthcheckCommand.prefix).toEqual('healthcheck');
		expect(healthcheckCommand.data.description).toEqual('Replies ok');
		expect(healthcheckCommand.options).toEqual([]);
		expect(healthcheckCommand.data.options.length).toEqual(0);
	});

	it('execute - should reply ok', async () => {
		const mockCtx = new MockDiscordContext({});

		const ctx = mockCtx.getMocked();

		await healthcheckCommand.execute(ctx);

		expect(mockCtx.interaction.mockedResults).toStrictEqual({
			content: 'ok',
		});
	});
});
