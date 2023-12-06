const blogsRouter = require('express').Router()
const Blog = require('../models/blog-list')

blogsRouter.get('/', async (request, response) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const data = await Blog.find({})
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

module.exports = blogsRouter