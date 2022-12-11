import * as popcordRepository from '../../../src/repositories/popcord-repository';
import nock from 'nock';
import { POPCORD_ENDPOINT } from '../../../src/constants';

describe('popcord repository', () => {
	describe('findOneSFWMeme', () => {
		it('should return a single meme', async () => {
			const expectedResponse = { success: true, name: 'meme', url: 'test.png' };

			nock(POPCORD_ENDPOINT + popcordRepository.SFW_ENDPOINT)
				.get('')
				.reply(200, expectedResponse);

			const response = await popcordRepository.findOneSFWMeme();

			expect(response).toStrictEqual(expectedResponse);
		});
	});

	describe('findOneSFWAnimeMeme', () => {
		it('should return a single anime meme', async () => {
			const expectedResponse = { success: true, name: 'meme', url: 'test.png' };

			nock(POPCORD_ENDPOINT + popcordRepository.SFW_ANIME_ENDPOINT)
				.get('')
				.reply(200, expectedResponse);

			const response = await popcordRepository.findOneSFWAnimeMeme();

			expect(response).toStrictEqual(expectedResponse);
		});
	});
});
