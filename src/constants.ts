import 'dotenv-safe/config';
import path from 'path';

export const { NODE_ENV, LOGGER_LEVEL, DISCORD_TOKEN, CLIENT_ID, GUILD_ID, DATABASE_URL } =
	process.env;

if (!NODE_ENV || !LOGGER_LEVEL || !DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID || !DATABASE_URL) {
	throw new Error('Missing environment variables');
}

export enum NodeEnv {
	prod = 'prod',
	dev = 'dev',
	test = 'test',
}

export const POPCORD_ENDPOINT = 'https://api-popcord.vercel.app';
export const MIGRATIONS_PATH = path.join(__dirname, './migration/*');
