import { withinConnection } from '../adapters/pg-adapter';
import { DbTables } from '../entities/database/db-tables';
import { UserRow } from '../entities/database/user';
import { User } from '../entities/domain/user';
import { isDefined } from '../tools/is';

interface UpsertArgs {
	user: User;
}

export function upsert({ user }: UpsertArgs) {
	return withinConnection({
		transaction: undefined,
		callback: async (dbConnection) => {
			return dbConnection.table(DbTables.Users).upsert(transform(user));
		},
	});
}

interface FindManyArgs {
	uuids?: string[];
	discordIds?: string[];
	usernames?: string[];
	discriminators?: string[];
}

export function findMany({
	uuids,
	discordIds,
	usernames,
	discriminators,
}: FindManyArgs): Promise<User[] | undefined> {
	return withinConnection({
		callback: async (dbConnection) => {
			const query = dbConnection.table(DbTables.Users).select('*');

			isDefined(uuids, (uuid) => {
				(uuids || [])?.length > 1 ? query.whereIn('uuid', uuid) : query.where('uuid', uuid);
			});

			isDefined(discordIds, (discordId) => {
				(discordIds || [])?.length > 1
					? query.whereIn('discord_id', discordId)
					: query.where('discord_id', discordId);
			});

			isDefined(usernames, (username) => {
				(usernames || [])?.length > 1
					? query.whereIn('username', username)
					: query.where('username', username);
			});

			isDefined(usernames, (username) => {
				(usernames || [])?.length > 1
					? query.whereIn('username', username)
					: query.where('username', username);
			});

			isDefined(discriminators, (discriminator) => {
				(discriminators || [])?.length > 1
					? query.whereIn('discriminator', discriminator)
					: query.where('discriminator', discriminator);
			});

			const result = await query;

			return result ? result.map(reverseTransform) : result;
		},
	});
}

interface FindOneArgs {
	uuid?: string;
	discordId?: string;
	username?: string;
	discriminator?: string;
}

export function findOne({
	uuid,
	discordId,
	username,
	discriminator,
}: FindOneArgs): Promise<User | undefined> {
	return withinConnection({
		callback: async (dbConnection) => {
			const query = dbConnection.table(DbTables.Users).select('*').first();

			isDefined(uuid, (uuid) => {
				query.where('uuid', uuid);
			});

			isDefined(discordId, (discordId) => {
				query.where('discord_id', discordId);
			});

			isDefined(username, (username) => {
				query.where('username', username);
			});

			isDefined(username, (username) => {
				query.where('username', username);
			});

			isDefined(discriminator, (discriminator) => {
				query.where('discriminator', discriminator);
			});

			const result = await query;

			return result ? reverseTransform(result) : result;
		},
	});
}

function transform(user: User): UserRow {
	return {
		uuid: user.uuid,
		discord_id: user.discordId,
		username: user.username,
		discriminator: user.discriminator,
		created_at: user.createdAt,
		updated_at: user.updatedAt,
	};
}

function reverseTransform(userRow: UserRow): User {
	return {
		uuid: userRow.uuid,
		discordId: userRow.discord_id,
		username: userRow.username,
		discriminator: userRow.discriminator,
		createdAt: userRow.created_at,
		updatedAt: userRow.updated_at,
	};
}
