import 'dotenv-safe/config';

export const { NODE_ENV, LOGGER_LEVEL, DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!NODE_ENV || !LOGGER_LEVEL || !DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
	throw new Error('Missing environment variables');
}

export enum NodeEnv {
	prod = 'prod',
	dev = 'dev',
	test = 'test',
}

export const POPCORD_ENDPOINT = 'https://api-popcord.vercel.app';
