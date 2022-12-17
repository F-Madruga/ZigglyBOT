import { UserConfigurations } from '../entities/domain/user-configurations';
import * as userConfigurationsRepository from '../repositories/user-configurations-repository';

export function upsert(userConfigurations: UserConfigurations) {
	return userConfigurationsRepository.upsert(userConfigurations);
}

export function findByUuid(uuid: string) {
	return userConfigurationsRepository.findByUuid(uuid);
}

export function findMany() {
	return userConfigurationsRepository.findMany();
}

export function findActivePriberamNickName() {
	return userConfigurationsRepository.findActivePriberamNickName();
}
