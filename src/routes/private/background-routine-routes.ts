import { FastifyInstance } from 'fastify';
import * as backgroundRoutinesManager from '../../managers/background-routines-manager';

export const BACKGROUN_ROUTINES_ENDPOINTS_PREFIX = '/background-routines';

export async function initBackgroundRoutinesRoutes(fastify: FastifyInstance) {
	fastify.put('/', async () => {
		await backgroundRoutinesManager.updateWordOfTheDay();
	});
}
