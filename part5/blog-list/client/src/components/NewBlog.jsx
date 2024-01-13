import { useState } from "react";
import PropTypes from 'prop-types'

export const NewBlog = ({handleBlogService_Create}) => {     //dont understand why It doesnt work when only use export default
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = (event) => {
        event.preventDefault()
        handleBlogService_Create({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    //value => assigning the variable appears in the fill text
    //name => to use in other application later, should be the same to the value

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    title:
                    <input  
                        id='title'
                        type="text"
                        value={title}
                        name="title"
                        onChange= {({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div> 
                <div>
                    url:
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />    
                </div> 
                <button id='createButton' type="submit">create</button>
            </form>
        </div>
    )
}

NewBlog.propTypes = {
    handleBlogService_Create: PropTypes.func.isRequired
}

export default {NewBlog}