import { Knex } from 'knex';
import { DbTables } from '../entities/database/db-tables';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.createTable(DbTables.Users, (table) => {
		table.uuid('uuid').notNullable().primary();
		table.text('discord_id').notNullable();
		table.text('username').notNullable();
		table.text('discriminator').notNullable();
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
	return knex.schema.dropTable(DbTables.Users);
}
