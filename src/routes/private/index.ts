import { FastifyInstance } from 'fastify';
import { initBackgroundRoutinesRoutes } from './background-routine-routes';

export const PRIVATE_ENDPOINTS_PREFIX = '/api/private/';

export async function initPrivateRoutes(fastify: FastifyInstance) {
	fastify.register(initBackgroundRoutinesRoutes);
}
