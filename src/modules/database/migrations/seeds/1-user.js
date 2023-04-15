exports.seed = async function(knex) {
  const adminUser = {
    firstName: 'ADMIN',
    lastName: 'Admin',
    email: 'admin@admin.com',
    password: '$2b$11$Ht0vFtWZHNh0nOlFr1iLUu2/.p//LlghbIxzckI1bmFjVNDn78tKm', //senha@123
    roles: 'sysAdmin',
    groupId: 1,
    createdDate: new Date(),
    updatedDate: new Date()
  };

  const users = await knex
    .count()
    .from('users')
    .where({ email: adminUser.email })
    .first();

  if (Number(users.count) > 0) return;

  await knex.insert(adminUser).into('users');
};
