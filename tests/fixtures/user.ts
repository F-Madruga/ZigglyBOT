import { User } from '../../src/entities/user';

export function createUser({
	uuid = 'uuid',
	username = 'username',
	discriminator = 'discriminator',
	discordId = 'discordId',
	profileImageUrl = 'profileImageUrl',
	createdAt = new Date('07/21/2021 04:24:37'),
	updatedAt = new Date('01/04/2022 01:10:05'),
}: Partial<User>) {
	return {
		uuid,
		username,
		discriminator,
		discordId,
		profileImageUrl,
		createdAt,
		updatedAt,
	} as User;
}
