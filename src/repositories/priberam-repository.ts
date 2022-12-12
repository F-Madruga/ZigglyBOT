import Parser from 'rss-parser';
import { PRIBERAM_WORD_OF_THE_DAY_ENDPOINT } from '../constants';

export async function findWordOfTheDay(): Promise<PriberamWordOfTheDay | undefined> {
	const parser = new Parser();

	const feed = await parser.parseURL(PRIBERAM_WORD_OF_THE_DAY_ENDPOINT);

	if (!feed.items.length) {
		return;
	}

	const word = feed.items[0].title;
	const url = feed.items[0].link;

	if (!word || !url) {
		return;
	}

	return {
		word,
		url: url.toString(),
	};
}
