const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog-list')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})

test('id is identified', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

// test('a specific note is within the returned notes', async () => {
//     const response = await api.get('/api/notes')

//     const contents = response.body.map(r => r.content)

//     expect(contents).toContain(
//         'Browser can execute only JavaScript'
//     )
// })

// test('a valid blog can be added ', async () => {
//     const newNote = {
//         content: 'async/await simplifies making async calls',
//         important: true,
//     }

//     await api
//         .post('/api/notes')
//         .send(newNote)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const notesAtEnd = await helper.notesInDb()
//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

//     const contents = notesAtEnd.map(n => n.content)
//     expect(contents).toContain(
//         'async/await simplifies making async calls'
//     )
// })

test('a valid note can be added to the database', async () => {
    const newBlog = {
        'title': 'test',
        'author': 'test1',
        'url': 'https://www.youtube.com/watch?v=764HZqyYffU',
        'likes': 24
    }
    await api
        .post('./api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const answer = await helper.blogsInDB()


})

// test('note without content is not added', async () => {
//     const newNote = {
//         important: true
//     }

//     await api
//         .post('/api/notes')
//         .send(newNote)
//         .expect(400)

//     const notesAtEnd = await helper.notesInDb()

//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
// })

// test('a specific note can be viewed', async () => {
//     const notesAtStart = await helper.notesInDb()

//     const noteToView = notesAtStart[0]

//     const resultNote = await api
//         .get(`/api/notes/${noteToView.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)


//     expect(resultNote.body).toEqual(noteToView)
// })

// test('a note can be deleted', async () => {
//     const notesAtStart = await helper.notesInDb()
//     const noteToDelete = notesAtStart[0]

//     await api
//         .delete(`/api/notes/${noteToDelete.id}`)
//         .expect(204)

//     const notesAtEnd = await helper.notesInDb()

//     expect(notesAtEnd).toHaveLength(
//         helper.initialNotes.length - 1
//     )

//     const contents = notesAtEnd.map(r => r.content)

//     expect(contents).not.toContain(noteToDelete.content)
// })

afterAll(async () => {
    await mongoose.connection.close()
})