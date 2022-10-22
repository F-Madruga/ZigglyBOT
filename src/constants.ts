import 'dotenv-safe/config';

export const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) {
	throw new Error('Missing environment variables');
}
