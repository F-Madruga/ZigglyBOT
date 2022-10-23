import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, ValidateCommandArgs } from '../bot';

export const data = new SlashCommandBuilder().setName('healthcheck').setDescription('Replies ok');

interface ExecuteHealthCheckArgs extends ExecuteArgs {}

export function validateCommand(args: ValidateCommandArgs): ExecuteHealthCheckArgs {
	const { bot } = args;
	return { bot };
}

export async function execute(args: ExecuteHealthCheckArgs): Promise<InteractionReplyOptions> {
	return { content: 'ok' };
}
