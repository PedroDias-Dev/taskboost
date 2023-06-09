exports.up = async function(knex) {
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
      .unsigned()
      .nullable()
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');
    table.string('status', 50).notNullable();
    table.boolean('isPublic').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('goals');
};
