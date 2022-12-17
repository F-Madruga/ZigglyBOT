import 'dotenv-safe/config';

export const { NODE_ENV, LOGGER_LEVEL, DISCORD_TOKEN, CLIENT_ID, GUILD_ID, SERVER_PORT } =
	process.env;

if (!NODE_ENV || !LOGGER_LEVEL || !DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID || !SERVER_PORT) {
	throw new Error('Missing environment variables');
}

export enum NodeEnv {
	prod = 'prod',
	dev = 'dev',
	test = 'test',
}

export const POPCORD_ENDPOINT = 'https://api-popcord.vercel.app';

export const PRIBERAM_WORD_OF_THE_DAY_ENDPOINT = 'https://dicionario.priberam.org/DoDiaRSS.aspx';
