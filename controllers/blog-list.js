const blogsRouter = require('express').Router()
const Blog = require('../models/blog-list')

blogsRouter.get('/', async (request, response) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const data = await Blog.find({}).populate('user', { username: 1, name: 1} )
    response.json(data)
    
})
  
blogsRouter.post('/', async (request, response) => {
    const blogData = request.body

    const blog = new Blog({
        title: blogData.title,
        author: blogData.author,
        url: blogData.url,
        likes: blogData.likes
    })

    if (!blog.likes) {
        blog.likes = 0
    }

    if (!blog.title || !blog.url) {
        response.status(400).end()
    }

    else {
        // blog
        //     .save()
        //     .then(result => {
        //         response.status(201).json(result)
        //     })
        const data = await blog.save()
        response.status(201).json(data)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const data = request.body
    const newBlog = {
        title: data.title,
        author: data.author,
        url: data.url,
        likes: data.likes,
    }
    const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter