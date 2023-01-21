import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext, MockQueue } from '../../../mocks/discord';

describe('music manager - pause', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should pause successfull', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});

		mockQueue.setPaused.mockReturnValueOnce(true);
		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.pause({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockQueue.setPaused.mock.calls).toHaveLength(1);
		expect(mockQueue.setPaused.mock.calls[0][0]).toStrictEqual(true);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'Music stopped',
		});
	});

	it('should fail to pause because queue is not playing', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({ playing: false });

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.pause({ ctx });

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

	it('should fail to pause because queue is not defined', async () => {
		const mockCtx = new MockContext({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(undefined);

		const ctx = mockCtx.getMock();
		await musicManager.pause({ ctx });

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

	it('should fail to pause something went wrong', async () => {
		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});

		mockQueue.setPaused.mockReturnValueOnce(false);
		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.pause({ ctx });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockQueue.setPaused.mock.calls).toHaveLength(1);
		expect(mockQueue.setPaused.mock.calls[0][0]).toStrictEqual(true);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: 'Something went wrong',
		});
	});
});
