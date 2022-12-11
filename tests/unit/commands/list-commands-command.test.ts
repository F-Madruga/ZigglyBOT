import * as listCommand from '../../../src/commands/list-commands-command';
import { Command } from '../../../src/discord-bot';
import { MockDiscordBot, MockDiscordContext } from '../../mocks/discord';

describe('listcommands command', () => {
	it('should return the correct command prefix', () => {
		expect(listCommand.prefix).toEqual('listcommands');
		expect(listCommand.data.description).toEqual('List all command');
	});

	it('should reply a list of all available commands', async () => {
		const commands = new Map<string, Command>();
		commands.set(listCommand.prefix, listCommand);

		const mockDiscordBot = new MockDiscordBot({ commands });

		const mockCtx = new MockDiscordContext({ discordBot: mockDiscordBot });

		const ctx = mockCtx.getMocked();

		await listCommand.execute(ctx);

		expect(mockCtx.interaction.mockedResults).toStrictEqual({
			content: `1 - **${listCommand.prefix}**: ${listCommand.data.description}\n`,
		});
	});
});
