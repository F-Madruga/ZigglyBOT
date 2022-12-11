import nock from 'nock';

beforeEach(() => {
	jest.resetModules();
	jest.resetAllMocks();
	nock.cleanAll();
});
