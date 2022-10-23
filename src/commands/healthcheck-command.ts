import { SlashCommandBuilder } from '@discordjs/builders';
import { InteractionReplyOptions } from 'discord.js';
import { Bot, ExecuteArgs, GetCommandArgs } from '../bot';

export const data = new SlashCommandBuilder().setName('healthcheck').setDescription('Replies ok');

interface ExecuteHealthCheckArgs extends ExecuteArgs {}

export function getExecuteArgs(args: GetCommandArgs): ExecuteHealthCheckArgs {
	const {} = args;

	const commandArgs = validateCommand({});

	return commandArgs;
}

export function validateCommand(args: any): ExecuteHealthCheckArgs {
	const {} = args;

	return {};
}

export async function execute(
	args: ExecuteHealthCheckArgs,
	bot: Bot,
): Promise<InteractionReplyOptions> {
	return { content: 'ok' };
}
