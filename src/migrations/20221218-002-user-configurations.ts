import { Knex } from 'knex';
import { DbTables } from '../entities/database/db-tables';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.createTable(DbTables.UserConfigurations, (table) => {
		table.uuid('user_uuid').notNullable().primary();
		table.boolean('priberam_word_of_the_day_nickname').notNullable();
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.dropTable(DbTables.UserConfigurations);
}
