import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext, MockQueue } from '../../../mocks/discord';

describe('music manager - clear', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should clear successfull', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.clear({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockQueue.clear.mock.calls).toHaveLength(1);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'Queue cleared',
		});
	});

	it('should fail to clear because queue is not playing', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({ playing: false });

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.clear({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'No music in the queue',
		});
	});

	it('should fail to clear because queue is not defined', async () => {
		const mockCtx = new MockContext({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(undefined);

		const ctx = mockCtx.getMock();
		await musicManager.clear({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'No music in the queue',
		});
	});
});
