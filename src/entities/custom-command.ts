export type Command = {
	prefix: string;
	options?: any;
};

export type CustomCommand = {
	name: string;
	commands: Command[];
};
