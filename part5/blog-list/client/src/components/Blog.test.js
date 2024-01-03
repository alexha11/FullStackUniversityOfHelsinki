import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { NewBlog } from './NewBlog'

const blog = {
    title:  "thanhduong11",
    author: "thanhduong",
    user: {
        username: "thanhduong11",
        name: "thanhduong",
        id: "657710464f804627692af017"
    },
    url: "https://www.youtube.com/watch?v=764HZqyYffU",
    likes: "10000",
    id: "657710644f804627692af01d"
}
const user = blog.user

describe('test for blogs', () => {
    test('renders the title and author of a blog', () => {
        
        render(<Blog blog={blog} user={user}/>)
        const author = screen.getByText('thanhduong11 thanhduong')
        expect(author).toBeDefined()
    })

    test('show blog\'s url and number of likes when clicking the button calls event handler once', async () => {

        //const mockHandler = jest.fn()

        render(
            <Blog blog={blog} user={user}/>
        )

        const user1 = userEvent.setup()
        const button = screen.getByText('view')
        await user1.click(button)
        
        const url = screen.getByText('https://www.youtube.com/watch?v=764HZqyYffU')
        const like = screen.getByText('likes 10000')

        expect(url).toBeDefined()
        expect(like).toBeDefined()
    })

    test('add likes clicked twice if pressing the button twice', async () => {

        const mockHandler = jest.fn()

        render(
            <Blog blog={blog} user={user} addLikes={mockHandler}/>
        )

        const user1 = userEvent.setup()
        const button = screen.getByText('like')
        await user1.click(button)
        await user1.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
        
    })
})


describe('test for the new blog form', () => {
    test('<BlogForm/> test handBlogService_Create is working allright', async() => {
        const handleBlogService_Create = jest.fn()
        const user = userEvent.setup()

        render(<NewBlog handleBlogService_Create={handleBlogService_Create}/>)

        const inputs = screen.getAllByRole('textbox')
        const createButton = screen.getByText('create')

        await user.type(inputs[0], 'testing a form..')
        await user.type(inputs[1], 'test')
        await user.type(inputs[2], 'facebook')
        await user.click(createButton)

        expect(handleBlogService_Create.mock.calls).toHaveLength(1)
        expect(handleBlogService_Create.mock.calls[0][0].title).toBe('testing a form..')
        expect(handleBlogService_Create.mock.calls[0][0].author).toBe('test')
        expect(handleBlogService_Create.mock.calls[0][0].url).toBe('facebook')

    })
})