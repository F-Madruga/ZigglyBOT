import { CommandInteraction, InteractionReplyOptions } from 'discord.js';
import { Bot } from '../bot';
import { Command, CustomCommand } from '../entities/custom-command';
import * as customCommandsRepository from '../repositories/custom-command-repository';

interface CreateArgs {
	bot: Bot;
	interaction: CommandInteraction;
	command: string;
	commands: string[];
}

export function create(args: CreateArgs): string {
	const { commands, command, bot, interaction } = args;

	// Command can't be a CRUD of a custom command

	const validateCommands = commands.map((command) => {
		const { prefix, options } = parseCommand(command);

		const requiredInteractionPropertiesOptions = getRequiredInteractionProperties(
			bot,
			prefix,
			interaction,
		);

		const commandArgs = {
			...options,
			...requiredInteractionPropertiesOptions,
		};

		bot.commands[prefix].validateCommand(commandArgs);

		return {
			prefix,
			options,
		};
	});

	customCommandsRepository.createOne({
		command: {
			name: command,
			commands: validateCommands,
		},
	});

	return `Command **${command}** created with success`;
}

function parseCommand(command: string): Command {
	const commandData = command.split(' ');

	const prefix = commandData[0].trim();
	const options: any = {};

	if (commandData.length > 1) {
		const args = commandData.slice(1).join(' ');
		const argsData = args.split(':');

		for (let i = 0; i < argsData.length; i += 2) {
			options[argsData[i].trim()] = argsData[i + 1].trim();
		}
	}

	return {
		prefix,
		options,
	};
}

function getRequiredInteractionProperties(bot: Bot, commandName: string, interaction: any) {
	const requiredInteractionPropertiesOptions: any = {};
	const requiredInteractionProperties: Set<string> =
		bot.commands[commandName].requiredInteractionProperties;

	if (requiredInteractionProperties) {
		requiredInteractionProperties.forEach((interactionProperty) => {
			requiredInteractionPropertiesOptions[interactionProperty] =
				interaction[interactionProperty];
		});
	}

	return requiredInteractionPropertiesOptions;
}

interface RunArgs {
	interaction: CommandInteraction;
	bot: Bot;
	command: string;
}

export function run(args: RunArgs): string {
	const { command, interaction, bot } = args;

	const customCommand = getByName({
		command,
	});

	let reply: string = `Command **${command}** executed.`;

	customCommand.commands.forEach(async (subCommand) => {
		const requiredInteractionPropertiesOptions = getRequiredInteractionProperties(
			bot,
			subCommand.prefix,
			interaction,
		);

		const executeArgs = {
			...(subCommand.options ? subCommand.options : {}),
			...requiredInteractionPropertiesOptions,
		};

		const commandReply: InteractionReplyOptions = await bot.commands[subCommand.prefix].execute(
			executeArgs,
			bot,
		);

		reply = reply.concat(` ${commandReply.content}`);
	});

	return reply;
}

interface GetByNameArgs {
	command: string;
}

export function getByName(args: GetByNameArgs): CustomCommand {
	const { command } = args;

	const customCommand = customCommandsRepository.getByName({ name: command });

	if (!customCommand) {
		throw new Error(`Command ${command} does not exists`);
	}

	return customCommand;
}
