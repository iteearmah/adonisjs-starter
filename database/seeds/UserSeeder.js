'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run() {
    const role = await Factory.model('Adonis/Acl/Role').create()
    const user = await Factory
      .model('App/Models/User')
      .create()
    await user.roles().attach([role.id])

    /* const roleAdmin = new Role()
    roleAdmin.name = 'Admin'
    roleAdmin.slug = 'admin'
    roleAdmin.description = 'manage administration privileges'
    await roleAdmin.save()

    const roleEditor = new Role()
    roleEditor.name = 'Editor'
    roleEditor.slug = 'editor'
    roleEditor.description = 'manage editor privileges'
    await roleEditor.save() */
  }
}

module.exports = UserSeeder
