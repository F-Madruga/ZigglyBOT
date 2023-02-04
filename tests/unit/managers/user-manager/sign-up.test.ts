import * as userManager from '../../../../src/managers/user-manager';
import * as userRepository from '../../../../src/repositories/user-repository';
import sinon from 'ts-sinon';
import { MockContext } from '../../../mocks/discord';
import { createUser } from '../../../fixtures';

describe('user manager - signUp', () => {
	afterEach(() => {
		sinon.restore();
	});

	it('should sign up a user succesfully', async () => {
		sinon.stub(userRepository, 'findOne').resolves(null);
		const insertStub = sinon.stub(userRepository, 'insert');

		const profileImageUrl = 'avatarURL';
		const mockCtx = new MockContext({});
		mockCtx.interaction.user.avatarURL.mockReturnValueOnce(profileImageUrl);
		const ctx = mockCtx.getMock();

		await userManager.signUp({ ctx });

		expect(mockCtx.interaction.reply.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.reply.mock.calls[0][0]).toStrictEqual({
			content: 'Your account was created',
			ephemeral: true,
		});

		const expectedNewUser = {
			username: mockCtx.interaction.user.username,
			discriminator: mockCtx.interaction.user.discriminator,
			discordId: mockCtx.interaction.user.id,
			profileImageUrl,
		};

		expect(insertStub.getCall(0).args[0]).toStrictEqual({
			db: mockCtx.discordBot.db,
			user: expectedNewUser,
		});
	});

	it('should not create an account because user already exist', async () => {
		const user = createUser({});
		sinon.stub(userRepository, 'findOne').resolves(user);
		const insertStub = sinon.stub(userRepository, 'insert');

		const profileImageUrl = 'avatarURL';
		const mockCtx = new MockContext({});
		mockCtx.interaction.user.avatarURL.mockReturnValueOnce(profileImageUrl);
		const ctx = mockCtx.getMock();

		await userManager.signUp({ ctx });

		expect(mockCtx.interaction.reply.mock.calls).toHaveLength(1);
		expect(mockCtx.interaction.reply.mock.calls[0][0]).toStrictEqual({
			content: 'You already have an account ',
			ephemeral: true,
		});

		expect(insertStub.callCount).toEqual(0);
	});
});
