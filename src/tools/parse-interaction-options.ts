import { CommandInteraction } from 'discord.js';

export function parseInteractionOptions(interaction: CommandInteraction, options: string[]): any {
	const parsedOptions: any = {};

	options.forEach((option) => (parsedOptions[option] = interaction.options.get(option)!.value));

	return parsedOptions;
}
