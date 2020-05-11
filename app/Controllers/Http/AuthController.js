'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator')
class AuthController {

    async register({ request, auth, response }) {

        // get the user data from request
        const { username, email, password } = request.all()

        // create a validator with validation rules
        const validation = await validate({ username, email }, {
            email: 'unique:users',
            username: 'required'
        }, {
            required: 'The {{ field }} is required.',
            unique: 'The email has already been taken.'
        })

        // check if validation fails
        if (validation.fails()) { return response.status(422).json({ errors: validation.messages() }) }
        // create user
        const user = await User.create({ username, email, password })

        //generate token for user;
        const token = await auth.generate(user)

        Object.assign(user, token)

        return response.json(user)
    }

    async login({ request, auth, response }) {

        let { email, password } = request.all();

        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let token = await auth.generate(user)

                return response.json({token})
            }


        }
        catch (e) {
            console.log(e)
            return response.json({ message: 'You are not registered!' })
        }
    }
    async getPosts({ request, response }) {
        let posts = await Post.query().with('user').fetch()

        return response.json(posts)
    }

}

module.exports = AuthController