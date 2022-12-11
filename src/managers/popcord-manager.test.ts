import { GetSFWMemeArgs } from './popcord-manager';
import * as popcordManager from './popcord-manager';
import * as popcordRepository from '../repositories/popcord-repository';
import sinon from 'ts-sinon';
import nock from 'nock';
import { POPCORD_ENDPOINT } from '../constants';

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
		sinon.restore();
	});

	// it('should get a meme', async () => {
	// 	await popcordManager.getSFWMeme(ctx);
	// 	jest.mock('findOneSFWMeme')
	// 	const repository = sinon
	// 		.stub(popcordRepository, 'findOneSFWMeme')
	// 		.resolves({ success: true, name: 'meme', url: 'meme.png' });

	// 	expect(repository).toBeCalled();
	// 	expect(realResponse).toStrictEqual({ content: 'meme.png' });
	// });

	// it('should error when no meme is found', async () => {
	// 	await popcordManager.getSFWMeme(ctx);
	// 	nock(POPCORD_ENDPOINT).get('/img/sfw/meme').reply(404);

	// 	expect(realResponse).toStrictEqual({ content: 'Something went wrong' });
	// });

	// it('should get an anime meme', async () => {
	// 	await popcordManager.getSFWMeme(ctx);
	// 	nock(POPCORD_ENDPOINT)
	// 		.get('/img/sfw/anime_meme')
	// 		.reply(200, { success: true, name: 'meme', url: 'anime-meme.png' });

	// 	expect(realResponse).toStrictEqual({ content: 'anime-meme.png' });
	// });

	// it('should error when no anime meme is found', async () => {
	// 	await popcordManager.getSFWMeme(ctx);
	// 	nock(POPCORD_ENDPOINT).get('/img/sfw/anime_meme').reply(404);

	// 	expect(realResponse).toStrictEqual({ content: 'Something went wrong' });
	// });
});
