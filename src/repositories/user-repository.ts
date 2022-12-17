import { UserRow } from '../entities/database/user';
import { User } from '../entities/domain/user';

const users: UserRow[] = [];

export function upsert(user: User) {
	const i = users.findIndex((userRow) => userRow.uuid === user.uuid);

	if (i > -1) {
		users[i] = transform(user);
	}

	users.push(transform(user));
}

export function findMany() {
	return users.map(reverseTransform);
}

export function findByUuid(uuid: string) {
	const user = users.find((user) => user.uuid === uuid);

	return user ? reverseTransform(user) : undefined;
}

export function findDiscordId(discordId: string) {
	const user = users.find((user) => user.discord_id === discordId);

	return user ? reverseTransform(user) : undefined;
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
