import 'dotenv-safe/config';

export const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
	throw new Error('Missing environment variables');
}
