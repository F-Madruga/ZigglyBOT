import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext, MockQueue } from '../../../mocks/discord';

describe('music manager - skip', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should skip successfull', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});

		mockQueue.skip.mockReturnValueOnce(true);
		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.skip({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockQueue.skip.mock.calls).toHaveLength(1);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: `Skipped **${mockQueue.current}**`,
		});
	});

	it('should fail to skip because queue is not playing', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({ playing: false });

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.skip({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'No music is being played',
		});
	});

	it('should fail to skip because queue is not defined', async () => {
		const mockCtx = new MockContext({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(undefined);

		const ctx = mockCtx.getMock();
		await musicManager.skip({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'No music is being played',
		});
	});

	it('should fail to skip something went wrong', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});

		mockQueue.skip.mockReturnValueOnce(false);
		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.skip({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockQueue.skip.mock.calls).toHaveLength(1);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'Something went wrong',
		});
	});
});
