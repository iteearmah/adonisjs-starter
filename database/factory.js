'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async(faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
  }
})

Factory.blueprint('Adonis/Acl/Role', (faker) => {
  return {
    slug: 'admin',
    name: 'Admin',
    description: 'manage administration privileges'
  }
})