import * as wordOfTheDayCommand from '../../../../src/commands/priberam-commands/word-of-the-day-command';
import * as priberamManager from '../../../../src/managers/priberam-manager';
import sinon from 'ts-sinon';
import { MockDiscordContext } from '../../../mocks/discord';

describe('wordoftheday command', () => {
	it('should return the correct command prefix', () => {
		expect(wordOfTheDayCommand.prefix).toEqual('wordoftheday');
		expect(wordOfTheDayCommand.data.description).toEqual('Get priberam word of the day');
	});

	it('should call manager with correct parameters', async () => {
		const priberamManagerStub = sinon.stub(priberamManager, 'getWordOfTheDay');

		const mockCtx = new MockDiscordContext({});
		const ctx = mockCtx.getMocked();

		await wordOfTheDayCommand.execute(ctx);

		expect(priberamManagerStub.calledWith({ ctx })).toBeTruthy;
	});
});
