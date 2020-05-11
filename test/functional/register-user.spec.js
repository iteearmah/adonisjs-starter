'use strict'
const Factory = use('Factory')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('Register User')

trait('DatabaseTransactions')
trait('Test/ApiClient')


test('registers a new user and generates a jwt', async ({ assert, client }) => {
  // generate a fake user
  const { username, email, password } = await Factory.model('App/Models/User').make()

  // make api request to register a new user
  const response = await client.post('/register').send({
    username,
    email,
    password
  }).end()


  // expect the status code to be 200
  response.assertStatus(200)
  // assert the email and username are in the response body
  response.assertJSONSubset({
    email,
    username
  })
  // assert the token was in request
  assert.isDefined(response.body.token)
  // assert the user was actually saved in the database
  await User.query().where({ email }).firstOrFail()
})


test('returns an error if user already exists', async ({ assert, client }) => {
  // create a new user
  const { username, email, password } = await Factory.model('App/Models/User').create()
  const response = await client.post('/register').send({ username, email, password }).end()
  // assert the status code is 422
  response.assertStatus(422)
  // get the errors from the response
  const { errors } = response.body
  // assert the error for taken email was returned
  assert.equal(errors[0].message, 'The email has already been taken.')
})

test('returns an error if username is not provided', async ({ assert, client }) => {
  // make a post request to register a user without the username
  const response = await client.post('/register').send({ username: null, email: 'test@email.com', password: 'password' }).end()
  // assert the status code is 422
  response.assertStatus(422)
  // get the errors from the response body
  const { errors } = response.body
 
  // assert the error has one for required username
  assert.equal(errors[0].message, 'The username is required.')
})