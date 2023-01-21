import * as popcordManager from '../../../../src/managers/popcord-manager';
import * as popcordRepository from '../../../../src/repositories/popcord-repository';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';

describe('popcord manager - findOneSFWAnimeMeme', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should get an anime meme', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWAnimeMeme')
			.resolves({ success: true, name: 'meme', url: 'anime-meme.png' });

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await popcordManager.getSFWAnimeMeme({ ctx });

		expect(mockCtx.interaction.reply.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.reply.mock.calls[0][0]).toStrictEqual({
			content: 'anime-meme.png',
		});
	});

	it('should thrown an error when no anime meme is found', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWAnimeMeme')
			.resolves({ success: false, name: '', url: '' });

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await popcordManager.getSFWAnimeMeme({ ctx });

		expect(mockCtx.interaction.reply.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.reply.mock.calls[0][0]).toStrictEqual({
			content: 'Something went wrong',
		});
	});
});
