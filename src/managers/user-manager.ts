import { User } from '../entities/domain/user';
import * as userRepository from '../repositories/user-repository';

export function upsert(user: User) {
	return userRepository.upsert(user);
}

export function findMany() {
	return userRepository.findMany();
}

export function findByUuid(uuid: string) {
	return userRepository.findByUuid(uuid);
}

export function findDiscordId(discordId: string) {
	return userRepository.findDiscordId(discordId);
}
