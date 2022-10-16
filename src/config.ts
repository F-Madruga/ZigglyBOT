import 'dotenv-safe/config';

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) {
	throw new Error('Missing environment variables');
}

export type DiscordConfig = {
	clientId: string;
	guildId: string;
	discordToken: string;
};

const discordConfig: DiscordConfig = {
	clientId: CLIENT_ID,
	guildId: GUILD_ID,
	discordToken: DISCORD_TOKEN,
};

export default discordConfig;
