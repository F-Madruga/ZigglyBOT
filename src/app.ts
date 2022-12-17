import fastify from 'fastify';
import { initRoutes } from './routes';

export default fastify().register(initRoutes);
