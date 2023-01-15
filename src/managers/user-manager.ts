import { User } from '../entities/domain/user';
import * as userRepository from '../repositories/user-repository';

export function upsert(user: User) {
	return userRepository.upsert({ user });
}

interface FindManyArgs {
	uuids?: string[];
	discordIds?: string[];
	usernames?: string[];
	discriminators?: string[];
}

export function findMany({ uuids, discordIds, usernames, discriminators }: FindManyArgs) {
	return userRepository.findMany({ uuids, discordIds, usernames, discriminators });
}

interface FindOneArgs {
	uuid?: string;
	discordId?: string;
	username?: string;
	discriminator?: string;
}

export function findOne({ uuid, discordId, username, discriminator }: FindOneArgs) {
	return userRepository.findOne({ uuid, discordId, username, discriminator });
}
