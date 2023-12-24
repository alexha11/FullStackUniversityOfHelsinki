const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog-list')
const User = require('../models/user')
const helper = require('./test_helper')

var loginToken = ''

beforeEach(async () => {
    const user = {
        'username': 'thanhduongTest',
        'name': 'abcd',
        'passwordHash': 'abcd123456',
        'notes': []
        
    }
    await User.deleteMany({})
    await User.insertMany(user)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
    
    // const res = await api
    //     .post('/api/login')
    //     .send({
    //         username: 'thanhduongTest',
    //         password: 'abcd123456'
    //     })
    // token = res.body.token 
}, 10000000)

beforeEach(async ( )=> {
    const response = await api
        .post('/api/login')
        .send({
            username: 'thanhduongTest',
            password: 'abcd123456'
        })

    loginToken = response.body.token
    console.log('this one is the one u are looking for' + loginToken)

})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})

test('id is identified', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added to the database', async () => {
    //console.log('this one is the one u are looking for' + loginToken)

    const newBlog = {
        'title': 'DuongDepTrai',
        'author': 'test1',
        'url': 'https://www.youtube.com/watch?v=764HZqyYffU',
        'likes': 24
    }
    await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + loginToken)      
        .send(newBlog)  
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const actualAnswer = await helper.blogsInDB()
    const expectedAnswer = helper.blogs.length + 1
    expect(actualAnswer).toHaveLength(expectedAnswer)

    const titleOfBlog = actualAnswer.map(content => content.title)
    expect(titleOfBlog).toContain('DuongDepTrai')
}) // still some errors for the last one <= do not know why

test('if like is missing, the default will be 0', async () => {
    const newBlog = { 
        'title': 'ThuVanXau',
        'author': 'ThuVan',
        'url': 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
        'likes': null, 
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const actualAnswer = await helper.blogsInDB()
    const expectedAnswer = helper.blogs.length + 1
    expect(actualAnswer).toHaveLength(expectedAnswer)

    const likeOfBlog = actualAnswer.map(content =>  content.likes)
    expect(likeOfBlog).not.toContain(null)
})

test('if title or url are missing, response 400', async () => {
    const newBlog1 = {
        'author': 'test2',
        'url': 'thuvan123',
        'likes': 12
    }
    const newBlog2 = {
        'title': 'testThuVan12423',
        'author': 'test2',
        'likes': 12
    }

    await api 
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)
    await api 
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
})

describe('delete', () => {
    test('can delete a blog', async() => {
        const blogs = await helper.blogsInDB()
        const theFirstBlog = blogs[0]
        //console.log(theFirstBlog)

        await api
            .delete('/api/blogs/' + theFirstBlog.id)
            .expect(204)
        const actualBlogs = await helper.blogsInDB()
        expect(actualBlogs).toHaveLength(helper.blogs.length - 1)

        const titles = actualBlogs.map(blogs => blogs.title)
        expect(titles).not.toContain(theFirstBlog.title)
    })
})

describe('update', () => {
    test('can update a blog', async () => {
        const blogs = await helper.blogsInDB()
        const theFirstBlog = blogs[0]
        const updatedBlog = {
            'author': theFirstBlog.author,
            'title': theFirstBlog.title,
            'url': theFirstBlog.url,
            'likes': 9999999,
        }
        await api
            .put('/api/blogs/' + theFirstBlog.id)
            .send(updatedBlog)
    
        const actualAnsw = await helper.blogsInDB()
        //console.log(actualAnsw)
        const testAns = actualAnsw.find(blog => blog.id === theFirstBlog.id)
        // console.log(testAns)
        expect(testAns.likes).toEqual(9999999)
    })
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