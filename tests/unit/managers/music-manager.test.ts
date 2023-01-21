import * as musicManager from '../../../src/managers/music-manager';
import sinon from 'ts-sinon';
import { MockContext, MockMember, MockQueue, MockTrack } from '../../mocks/discord';
import { MockGuild } from '../../mocks/discord/guild';

describe('music-manager', () => {
	afterEach(() => {
		sinon.restore();
	});

	describe('play', () => {
		it('should play successfull', async () => {
			const query = 'test';

			const mockCtx = new MockContext({});
			const mockMember = new MockMember({});
			const mockGuild = new MockGuild({});
			const mockQueue = new MockQueue({ connection: false });
			const mockTrack = new MockTrack({});

			mockGuild.members.fetch.mockResolvedValueOnce(mockMember);
			mockCtx.discordBot.client.guilds.fetch.mockResolvedValueOnce(mockGuild);
			mockCtx.discordBot.player.createQueue.mockReturnValueOnce(mockQueue);
			mockCtx.discordBot.player.search.mockResolvedValueOnce({ tracks: [mockTrack] });

			const ctx = mockCtx.getMock();
			await musicManager.play({ ctx, query });

			expect(mockCtx.discordBot.client.guilds.fetch.mock.calls).toHaveLength(1);
			expect(mockCtx.discordBot.client.guilds.fetch.mock.calls[0][0]).toStrictEqual(
				mockCtx.discordBot.config.guildId,
			);

			expect(mockGuild.members.fetch.mock.calls).toHaveLength(1);
			expect(mockGuild.members.fetch.mock.calls[0][0]).toStrictEqual(
				mockCtx.interaction.user.id,
			);

			expect(mockCtx.interaction.deferReply.mock.calls).toHaveLength(1);

			expect(mockCtx.discordBot.player.createQueue.mock.calls).toHaveLength(1);
			expect(mockCtx.discordBot.player.createQueue.mock.calls[0][0]).toStrictEqual(mockGuild);
			expect(mockCtx.discordBot.player.createQueue.mock.calls[0][1]).toStrictEqual({
				metadata: {
					channel: mockCtx.interaction.channel,
				},
			});

			expect(mockQueue.connect.mock.calls).toHaveLength(1);
			expect(mockQueue.connect.mock.calls[0][0]).toStrictEqual(mockMember.voice.channel);

			expect(mockCtx.discordBot.player.search.mock.calls).toHaveLength(1);
			expect(mockCtx.discordBot.player.search.mock.calls[0][0]).toStrictEqual(query);
			expect(mockCtx.discordBot.player.search.mock.calls[0][1]).toStrictEqual({
				requestedBy: mockCtx.interaction.user,
			});

			expect(mockCtx.interaction.followUp.mock.calls).toHaveLength(1);
			expect(mockCtx.interaction.followUp.mock.calls[0][0]).toStrictEqual({
				content: `Loading track **${'test'}**`,
			});

			expect(mockQueue.play.mock.calls).toHaveLength(1);
			expect(mockQueue.play.mock.calls[0][0]).toStrictEqual(mockTrack);
		});
	});

	describe('pause', () => {});

	describe('clear', () => {});

	describe('playNext', () => {});

	describe('resume', () => {});

	describe('shuffle', () => {});

	describe('skip', () => {});

	describe('stop', () => {});
});
