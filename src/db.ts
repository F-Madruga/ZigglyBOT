import 'reflect-metadata';
import path from 'path';
import { DataSource } from 'typeorm';
import { DATABASE_URL, NodeEnv, NODE_ENV } from './constants';
import { User } from './entities/user';

export const db = new DataSource({
	type: 'postgres',
	url: DATABASE_URL,
	logging: NODE_ENV !== NodeEnv.test,
	dropSchema: NODE_ENV === NodeEnv.test,
	synchronize: NODE_ENV !== NodeEnv.prod,
	migrationsRun: true,
	migrationsTableName: 'migrations',
	migrations: [path.join(__dirname, './migrations/*')],
	entities: [User],
});
