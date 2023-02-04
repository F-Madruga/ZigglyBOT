import * as signUpCommand from '../../../../src/commands/user-commands/sign-up-command';
import sinon from 'ts-sinon';
import * as userManager from '../../../../src/managers/user-manager';
import { MockContext } from '../../../mocks/discord';

describe('user command - signup command', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('data - should return the correct command prefix', () => {
		expect(signUpCommand.prefix).toEqual('signup');
		expect(signUpCommand.data.description).toEqual('Create a new user account');
		expect(signUpCommand.options).toEqual([]);
		expect(signUpCommand.data.options.length).toEqual(0);
	});

	it('execute - should call manager with correct parameters', async () => {
		const popcordManagerStub = sinon.stub(userManager, 'signUp');

		const mockCtx = new MockContext({});
		const ctx = mockCtx.getMock();

		await signUpCommand.execute(ctx);

		expect(popcordManagerStub.getCall(0).args[0]).toStrictEqual({ ctx });
	});
});
