const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('duong', 10)
        const user = new User({username: 'root', passwordHash})
        await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDB()
    
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            passwordHash: 'salainen',
            note: []
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('ensure an invalid users are not created', async () => {
        const newUser1 = {
            name: 'thanhduong',
            passwordHash: 'abcd1233245',
            note: []
        }
        await api 
            .post('/api/users')
            .send(newUser1)
            .expect(400)

        const newUser2 = {
            name: 'thanhduong',
            passwordHash: 'a',
            note: []
        }
        await api 
            .post('/api/users')
            .send(newUser2)
            .expect(400)
        
        const dataAtTheEnd = await helper.usersInDB()
        expect(dataAtTheEnd).toHaveLength(1)
    })
    
})

afterAll(async() => {
    await mongoose.connection.close()
})