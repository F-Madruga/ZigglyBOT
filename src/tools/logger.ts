import pino from 'pino';
import { LOGGER_LEVEL } from '../constants';

export const logger = pino({
	name: 'zigglybot',
	level: LOGGER_LEVEL,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
});
