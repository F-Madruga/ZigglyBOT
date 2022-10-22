type Command = {
	prefix: string;
	options: any;
};

type CustomCommand = {
	name: string;
	commands: string[];
};

const customCommands: CustomCommand[] = [];

interface CreateOneArgs {
	command: CustomCommand;
}

export function createOne(args: CreateOneArgs) {
	const { command } = args;

	customCommands.push(command);
}

export function getMany() {
	return customCommands;
}

interface GetByNameArgs {
	name: string;
}

export function getByName(args: GetByNameArgs) {
	const { name } = args;
	return customCommands.find((command) => command.name === name);
}
