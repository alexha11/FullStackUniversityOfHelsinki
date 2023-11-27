const blogsRouter = require('express').Router()
const Blog = require('../models/blog-list')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})
  
blogsRouter.post('/', (request, response) => {
    const blogData = request.body

    const blog = new Blog({
        title: blogData.title,
        author: blogData.author,
        url: blogData.url,
        likes: blogData.likes
    })

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter