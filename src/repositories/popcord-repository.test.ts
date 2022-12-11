import * as popcordRepository from './popcord-repository';
import nock from 'nock';
import { POPCORD_ENDPOINT } from '../constants';

describe('popcord repository', () => {
	it('should return a single meme', async () => {
		const expectedResponse = { success: true, name: 'meme', url: 'test.png' };
		nock(POPCORD_ENDPOINT + '/img/sfw/meme')
			.get('')
			.reply(200, expectedResponse);

		const response = await popcordRepository.findOneSFWMeme();

		expect(response).toStrictEqual(expectedResponse);
	});

	it('should return a single anime meme', async () => {
		const expectedResponse = { success: true, name: 'meme', url: 'test.png' };
		nock(POPCORD_ENDPOINT + '/img/sfw/anime_meme')
			.get('')
			.reply(200, expectedResponse);

		const response = await popcordRepository.findOneSFWAnimeMeme();

		expect(response).toStrictEqual(expectedResponse);
	});
});
