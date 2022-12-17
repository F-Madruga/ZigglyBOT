import { UserConfigurationsRow } from '../entities/database/user-configurations';
import { UserConfigurations } from '../entities/domain/user-configurations';

const usersConfigurations: UserConfigurationsRow[] = [];

export function upsert(userConfigurations: UserConfigurations) {
	const i = usersConfigurations.findIndex(
		(userRow) => userRow.user_uuid === userConfigurations.userUuid,
	);

	if (i > -1) {
		usersConfigurations[i] = transform(userConfigurations);
	}

	usersConfigurations.push(transform(userConfigurations));
}

export function findMany() {
	return usersConfigurations.map(reverseTransform);
}

export function findByUuid(uuid: string) {
	const user = usersConfigurations.find((user) => user.user_uuid === uuid);

	return user ? reverseTransform(user) : undefined;
}

export function findActivePriberamNickName() {
	const users = usersConfigurations.filter(
		(user) => user.priberam_word_of_the_day_nickname === true,
	);

	return users.map(reverseTransform);
}

function transform(userConfigurations: UserConfigurations): UserConfigurationsRow {
	return {
		user_uuid: userConfigurations.userUuid,
		priberam_word_of_the_day_nickname: userConfigurations.priberamWordOfTheDayNickname,
		created_at: userConfigurations.createdAt,
		updated_at: userConfigurations.updatedAt,
	};
}

function reverseTransform(userConfigurationsRow: UserConfigurationsRow): UserConfigurations {
	return {
		userUuid: userConfigurationsRow.user_uuid,
		priberamWordOfTheDayNickname: userConfigurationsRow.priberam_word_of_the_day_nickname,
		createdAt: userConfigurationsRow.created_at,
		updatedAt: userConfigurationsRow.updated_at,
	};
}
