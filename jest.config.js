module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/**/*test.ts'],
	setupFilesAfterEnv: ['./tests/jest.setup.ts'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	verbose: true,
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
