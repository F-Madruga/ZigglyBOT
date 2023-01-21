import * as popcordManager from '../../../../src/managers/popcord-manager';
import * as popcordRepository from '../../../../src/repositories/popcord-repository';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';

describe('popcord manager - findOneSFWMeme', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should get a meme', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWMeme')
			.resolves({ success: true, name: 'meme', url: 'meme.png' });

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await popcordManager.getSFWMeme({ ctx });

		expect(mockCtx.interaction.reply.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.reply.mock.calls[0][0]).toStrictEqual({
			content: 'meme.png',
		});
	});

	it('should throw an error when no meme is found', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWMeme')
			.resolves({ success: false, name: '', url: '' });

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await popcordManager.getSFWMeme({ ctx });

		expect(mockCtx.interaction.reply.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.reply.mock.calls[0][0]).toStrictEqual({
			content: 'Something went wrong',
		});
	});
});
