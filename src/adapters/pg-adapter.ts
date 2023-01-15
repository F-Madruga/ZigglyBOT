import { FastifyInstance } from 'fastify';
import knex, { Knex } from 'knex';
import { DATABASE_URL } from '../constants';
import { logger } from '../tools/logger';
import path from 'path';

export function getConnection() {
	return knex({
		client: 'pg',
		connection: DATABASE_URL,
	});
}

export function initDatabase(fastify: FastifyInstance) {
	const db = getConnection();
	db.migrate.latest({ directory: path.resolve(__dirname, '../migrations') });
	return fastify.decorate('knex', db);
}

export function getTransaction(): Promise<Knex.Transaction> {
	const connection = getConnection();

	return new Promise<Knex.Transaction>((resolve, reject) => {
		connection
			.transaction((trx) => {
				resolve(trx);
			})
			.catch((error) => reject(error));
	});
}

export async function withinConnection<T>({
	callback,
	transaction,
}: {
	callback: (dbConnection: Knex) => Promise<T>;
	transaction?: Knex.Transaction;
}) {
	try {
		return await callback(getConnection() || transaction);
	} catch (error) {
		logger.error('Database error');
	}
}

export async function withinTransaction<T>({
	callback,
	transaction,
}: {
	callback: (trx: Knex.Transaction) => Promise<T>;
	transaction?: Knex.Transaction;
}) {
	const trx = await getTransaction();
	try {
		const data = await callback(trx);

		await trx.commit();

		return data;
	} catch (error) {
		await trx.rollback(error);
		logger.error('Database error');
	}
}

export async function totalQuery(query: Knex.QueryBuilder): Promise<Knex.QueryBuilder> {
	return query.clone().clearSelect().count('* as count').first();
}
