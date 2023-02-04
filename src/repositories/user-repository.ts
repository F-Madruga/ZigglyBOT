import { BaseEntity, DataSource } from 'typeorm';
import { User } from '../entities/user';
import { isDefined } from '../tools/is';

interface InsertArgs {
	db: DataSource;
	user: Omit<User, 'uuid' | 'createdAt' | 'updatedAt' | keyof BaseEntity>;
}

export async function insert({ db, user }: InsertArgs): Promise<User> {
	const query = db.createQueryBuilder().insert().into(User).values(user).returning('*');

	const result = await query.execute();

	return result.raw;
}

interface FindOneArgs {
	db: DataSource;
	user: Partial<User>;
}

export async function findOne({ db, user }: FindOneArgs): Promise<User | null> {
	const query = db
		.createQueryBuilder()
		.select('user')
		.from(User, 'user')
		.orderBy('user.created_at', 'DESC');

	isDefined(user.uuid, (uuid) => query.andWhere('user.uuid = :uuid', { uuid }));
	isDefined(user.username, (username) =>
		query.andWhere('user.username = :username', { username }),
	);
	isDefined(user.discriminator, (discriminator) =>
		query.andWhere('user.discriminator = :discriminator', { discriminator }),
	);
	isDefined(user.discordId, (discordId) =>
		query.andWhere('user.discord_id = :discordId', { discordId }),
	);
	isDefined(user.profileImageUrl, (profileImageUrl) =>
		query.andWhere('user.profile_image_url = :profileImageUrl', { profileImageUrl }),
	);
	isDefined(user.createdAt, (createdAt) =>
		query.andWhere('user.created_at = :createdAt', { createdAt }),
	);
	isDefined(user.updatedAt, (updatedAt) =>
		query.andWhere('user.updated_at = :updatedAt', { updatedAt }),
	);

	const result = await query.getOne();

	return result;
}
