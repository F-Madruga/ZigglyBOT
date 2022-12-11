import fetch from 'node-fetch';
import { POPCORD_ENDPOINT } from '../constants';

const SFW_ENDPOINT = '/img/sfw/meme';
const SFW_ANIME_ENDPOINT = '/img/sfw/anime_meme';

export async function findOneSFWMeme(): Promise<PopcordResponse> {
	const response = await fetch(POPCORD_ENDPOINT + SFW_ENDPOINT, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});

	return response.json();
}

export async function findOneSFWAnimeMeme(): Promise<PopcordResponse> {
	const response = await fetch(POPCORD_ENDPOINT + SFW_ANIME_ENDPOINT, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});

	return response.json();
}
