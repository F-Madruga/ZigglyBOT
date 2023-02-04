import { Context } from '../discord-bot';
import * as userRepository from '../repositories/user-repository';

interface SignUpArgs {
	ctx: Context;
}

export async function signUp({ ctx }: SignUpArgs) {
	const { interaction, discordBot } = ctx;
	const { db } = discordBot;
	const { user } = interaction;

	const newUser = {
		username: user.username,
		discriminator: user.discriminator,
		discordId: user.id,
		profileImageUrl: user.avatarURL() || '',
	};

	const existingUser = await userRepository.findOne({
		db,
		user: {
			discordId: newUser.discordId,
		},
	});

	if (existingUser) {
		return interaction.reply({ content: 'You already have an account', ephemeral: true });
	}

	await userRepository.insert({
		db,
		user: newUser,
	});

	return interaction.reply({ content: 'Your account was created', ephemeral: true });
}
