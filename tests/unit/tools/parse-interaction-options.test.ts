import { parseInteractionOptions } from '../../../src/tools/parse-interaction-options';
import { MockInteraction, MockInteractionOptions } from '../../mocks/discord';

describe('parse-interaction-options', () => {
	it('should parse from interaction options succesfully', () => {
		const options = new Map<string, { name: string; type: number; value: any }>();
		options.set('testString', {
			name: 'testString',
			type: 3,
			value: 'test value',
		});
		options.set('testNumber', {
			name: 'testNumber',
			type: 3,
			value: 1,
		});
		options.set('testBoolean', {
			name: 'testBoolean',
			type: 3,
			value: true,
		});

		const interactionOptionsMock = new MockInteractionOptions({ data: options });
		const interactionMock = new MockInteraction({ options: interactionOptionsMock });

		const interaction = interactionMock.getMocked();

		const result = parseInteractionOptions(interaction, [...options.keys()]);

		expect(result).toEqual({
			testString: 'test value',
			testNumber: 1,
			testBoolean: true,
		});
	});
});
