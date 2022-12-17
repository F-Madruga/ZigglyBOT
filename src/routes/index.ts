import { FastifyInstance } from 'fastify';
import { initPrivateRoutes, PRIVATE_ENDPOINTS_PREFIX } from './private';

export async function initRoutes(fastify: FastifyInstance) {
	fastify.register(initPrivateRoutes, { prefix: PRIVATE_ENDPOINTS_PREFIX });
}
