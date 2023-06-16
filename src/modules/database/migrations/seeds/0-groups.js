exports.seed = async function(knex) {
  // Inserts seed entries
  await knex('groups').insert([
    { id: 1, name: 'IFSP', createdDate: new Date(), updatedDate: new Date() },
    { id: 2, name: 'Grupo 1', createdDate: new Date(), updatedDate: new Date() },
    { id: 3, name: 'Movksh', createdDate: new Date(), updatedDate: new Date() }
  ]);
};
