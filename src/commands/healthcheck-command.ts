import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command, CommandArgs } from '../discord-bot';

export const prefix = 'healthcheck';

export const data = new SlashCommandBuilder().setName('healthcheck').setDescription('Replies ok');

export function getArgs(interaction: CommandInteraction, args: CommandArgs): CommandArgs {
	return args;
}

export function validateCommandArgs(args: CommandArgs): CommandArgs {
	return args;
}

export function execute(interaction: CommandInteraction, args: CommandArgs): void {
	return;
}

export function reply(interaction: CommandInteraction, args: CommandArgs, result?: any) {
	return interaction.reply({ content: 'ok' });
}

export function errorHandler(
	error: any,
	interaction: CommandInteraction,
	args?: CommandArgs,
	result?: any,
) {
	return;
}
