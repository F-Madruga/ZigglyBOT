import fastify from 'fastify';
import { initDatabase } from './adapters/pg-adapter';
import { initRoutes } from './routes';

export default fastify().register(initRoutes).register(initDatabase);
