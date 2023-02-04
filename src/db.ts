import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DATABASE_URL, MIGRATIONS_PATH, NodeEnv, NODE_ENV } from './constants';
import { User } from './entities/user';

export default new DataSource({
	type: 'postgres',
	url: DATABASE_URL,
	logging: NODE_ENV !== NodeEnv.test,
	dropSchema: NODE_ENV === NodeEnv.test,
	synchronize: false,
	migrationsTableName: 'migrations',
	migrations: [MIGRATIONS_PATH],
	entities: [User],
});
