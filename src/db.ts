import 'reflect-metadata';
import path from 'path';
import { DataSource } from 'typeorm';
import { DATABASE_URL, NodeEnv, NODE_ENV } from './constants';
import { User } from './entities/user';

export default new DataSource({
	type: 'postgres',
	url: DATABASE_URL,
	logging: NODE_ENV !== NodeEnv.test,
	dropSchema: NODE_ENV === NodeEnv.test,
	synchronize: false,
	migrationsTableName: 'migrations',
	migrations: [path.join(__dirname, './migration/*')],
	entities: [User],
});
