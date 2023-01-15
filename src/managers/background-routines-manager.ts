import * as priberamManager from './priberam-manager';
import * as userManager from './user-manager';
import * as userConfigurationsManager from './user-configurations-manager';

export async function updateWordOfTheDay() {
	const wordOfTheDay = await priberamManager.getWordOfTheDay();

	if (!wordOfTheDay) {
		return;
	}

	const usersConfigurations = await userConfigurationsManager.findActivePriberamNickName();
	const users = await usersConfigurations.map(async (userConfigurations) =>
		userManager.findOne({ uuid: userConfigurations.userUuid }),
	);

	return users;
}
