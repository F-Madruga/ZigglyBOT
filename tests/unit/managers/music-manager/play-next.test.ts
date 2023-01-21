import * as musicManager from '../../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext, MockQueue, MockTrack } from '../../../mocks/discord';

describe('music manager - playnext', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should playnext successfull', async () => {
		const query = 'test play next';

		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});
		const mockTrack = new MockTrack({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);
		mockCtx.discordBot.player.search.mockResolvedValueOnce({ tracks: [mockTrack] });

		const ctx = mockCtx.getMock();
		await musicManager.playNext({ ctx, query });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockQueue.insert.mock.calls).toHaveLength(1);
		expect(mockQueue.insert.mock.calls[0][0]).toStrictEqual(mockTrack);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: `Loading track **${mockTrack.title}**`,
		});
	});

	it('should fail to playnext because queue is not playing', async () => {
		const query = 'test play next';

		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({ playing: false });

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);

		const ctx = mockCtx.getMock();
		await musicManager.playNext({ ctx, query });

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

	it('should fail to playnext because queue is not defined', async () => {
		const query = 'test play next';

		const mockCtx = new MockContext({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(undefined);

		const ctx = mockCtx.getMock();
		await musicManager.playNext({ ctx, query });

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

	it('should fail to search track', async () => {
		const query = 'test play next';

		const mockCtx = new MockContext({});
		const mockQueue = new MockQueue({});

		mockCtx.discordBot.player.getQueue.mockReturnValueOnce(mockQueue);
		mockCtx.discordBot.player.search.mockResolvedValueOnce({ tracks: [] });

		const ctx = mockCtx.getMock();
		await musicManager.playNext({ ctx, query });

		expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

		expect(mockCtx.discordBot.player.getQueue.mock.calls).toHaveLength(1);
		expect(mockCtx.discordBot.player.getQueue.mock.calls[0][0]).toStrictEqual(
			mockCtx.discordBot.config.guildId,
		);

		expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
			content: `Track **${query}** not found`,
		});
	});
});
