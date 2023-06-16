exports.up = async function(knex) {
  await knex.schema.createTable('groups', table => {
    table.increments('id').primary();
    table.string('name', 150).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('groups');
};
