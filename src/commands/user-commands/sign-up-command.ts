import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as userManager from '../../managers/user-manager';

export const prefix = 'signup';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Create a new user account');

export async function execute(ctx: Context) {
	return userManager.signUp({ ctx });
}
