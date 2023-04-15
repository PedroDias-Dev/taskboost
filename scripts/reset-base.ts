// eslint-disable-next-line @typescript-eslint/no-require-imports
const knex = require('knex');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('../knexfile');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const objection = require('objection');

const resetDatabase = async () => {
  const connection = knex(config[process.env.NODE_ENV]);

  objection.Model.knex(connection);

  await connection.migrate.rollback(undefined, true);

  await connection.migrate.latest();
  await connection.seed.run();

  await connection.destroy();

  console.log('DATABASE RESETED');
};

resetDatabase();
