import * as listCommandsCommand from '../../../src/commands/list-commands-command';
import { Command } from '../../../src/discord-bot';
import { MockDiscordBot, MockDiscordContext } from '../../mocks/discord';

describe('listcommands command', () => {
	it('data - should return the correct command prefix', () => {
		expect(listCommandsCommand.prefix).toEqual('listcommands');
		expect(listCommandsCommand.data.description).toEqual('List all command');
		expect(listCommandsCommand.options).toEqual([]);
		expect(listCommandsCommand.data.options.length).toEqual(0);
	});

	it('execute - should reply a list of all available commands', async () => {
		const commands = new Map<string, Command>();
		commands.set(listCommandsCommand.prefix, listCommandsCommand);

		const mockDiscordBot = new MockDiscordBot({ commands });

		const mockCtx = new MockDiscordContext({ discordBot: mockDiscordBot });

		const ctx = mockCtx.getMocked();

		await listCommandsCommand.execute(ctx);

		expect(mockCtx.interaction.mockedResults).toStrictEqual({
			content: `1 - **${listCommandsCommand.prefix}**: ${listCommandsCommand.data.description}\n`,
		});
	});
});
