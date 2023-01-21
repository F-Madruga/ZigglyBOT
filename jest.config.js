module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/**/*test.ts'],
	setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	testTimeout: 10000,
	verbose: true,
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
