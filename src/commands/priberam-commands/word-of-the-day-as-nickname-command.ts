import { SlashCommandBuilder } from 'discord.js';
import { Context } from '../../discord-bot';
import * as priberamManager from '../../managers/priberam-manager';

export const prefix = 'wordofthedayasnickname';
export const options = [];

export const data = new SlashCommandBuilder()
	.setName(prefix)
	.setDescription('Set priberam word of the day has nickname (refresh everyday)');

export function execute(ctx: Context) {
	return priberamManager.setWordOfTheDayAsNicknameArgs({ ctx });
}
