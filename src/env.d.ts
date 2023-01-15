namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		SERVER_PORT: number;
		DATABASE_URL: string;
		LOGGER_LEVEL: string;
		DISCORD_TOKEN: string;
		CLIENT_ID: string;
		GUILD_ID: string;
	}
}
