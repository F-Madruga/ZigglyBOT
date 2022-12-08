import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command, CommandArgs } from '../discord-bot';

const prefix = 'healthcheck';

const data = new SlashCommandBuilder().setName('healthcheck').setDescription('Replies ok');

function getArgs(interaction: CommandInteraction, args: CommandArgs): CommandArgs {
	return args;
}

function validateCommandArgs(args: CommandArgs): CommandArgs {
	return args;
}

function execute(interaction: CommandInteraction, args: CommandArgs) {
	return;
}

function reply(interaction: CommandInteraction, args: CommandArgs) {
	return interaction.reply({ content: 'ok' });
}

function errorHandler(
	error: any,
	interaction: CommandInteraction,
	args?: CommandArgs,
	result?: any,
) {
	return;
}

export const command: Command = {
	prefix,
	data,
	getArgs,
	validateCommandArgs,
	execute,
	reply,
	errorHandler,
};
