import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  // create goals table
  await knex.schema.createTable('goals', table => {
    table.increments('id').primary();
    table.string('title', 150).notNullable();
    table.string('description', 500).nullable();
    table.string('fileUrl', 500).nullable();
    table
      .integer('userId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('groupId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');
    table.string('status', 50).notNullable();
    table.boolean('isPublic').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('goals');
}
