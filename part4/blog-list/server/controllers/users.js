const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, passwordHash } = request.body
    console.log(username)
    console.log(name)
    console.log(passwordHash)
    
    
    if(!passwordHash) {
        return response.status(400).json({
            error: 'password missing'
        })
    }
    if(passwordHash.length <= 2) {
        return response.status(400).json({
            error: 'the length of password should be more than 2'
        })
    }
   
    const saltRounds = 10
    const password = await bcrypt.hash(passwordHash, saltRounds)
    console.log(password)
    const user = new User({
        username: username,
        name: name,
        passwordHash: password,
    })

    
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1})

    //.populate('notes', { content: 1, important: 1 })
    response.json(users)
})

// usersRouter.delete('/', async(req, res) => {
//     const users = await User.find({})
//     const usersID = users.map(x => x.id)
//     usersID.map(id => {await User.findByIdAndDelete(id)})

// })

module.exports = usersRouter