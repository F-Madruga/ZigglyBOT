import { GetSFWMemeArgs } from '../../../src/managers/popcord-manager';
import * as popcordManager from '../../../src/managers/popcord-manager';
import * as popcordRepository from '../../../src/repositories/popcord-repository';
import sinon from 'ts-sinon';

describe('popcord manager', () => {
	let realResponse: string;
	const ctx: GetSFWMemeArgs = {
		ctx: {
			interaction: {
				reply: (response: string) => {
					realResponse = response;
				},
			},
		},
	} as unknown as GetSFWMemeArgs;

	beforeEach(() => {
		realResponse = '';
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should get a meme', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWMeme')
			.resolves({ success: true, name: 'meme', url: 'meme.png' });

		await popcordManager.getSFWMeme(ctx);

		expect(realResponse).toStrictEqual({ content: 'meme.png' });
	});

	it('should error when no meme is found', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWMeme')
			.resolves({ success: false, name: '', url: '' });

		await popcordManager.getSFWMeme(ctx);

		expect(realResponse).toStrictEqual({ content: 'Something went wrong' });
	});

	it('should get an anime meme', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWAnimeMeme')
			.resolves({ success: true, name: 'meme', url: 'anime-meme.png' });

		await popcordManager.getSFWAnimeMeme(ctx);

		expect(realResponse).toStrictEqual({ content: 'anime-meme.png' });
	});

	it('should error when no anime meme is found', async () => {
		sinon
			.stub(popcordRepository, 'findOneSFWAnimeMeme')
			.resolves({ success: false, name: '', url: '' });

		await popcordManager.getSFWAnimeMeme(ctx);

		expect(realResponse).toStrictEqual({ content: 'Something went wrong' });
	});
});
