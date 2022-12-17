import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as priberamManager from '../../managers/priberam-manager';

export const prefix = 'wordoftheday';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Get priberam word of the day');

export function execute(ctx: Context) {
	return priberamManager.handleWordOfTheDayCommand({ ctx });
}
