import { useState } from "react"

const Blog = ({ blog, user, addLikes,  handleBlogService_Delete}) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeButton = (event) => {
    event.preventDefault()
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      user: blog.user.id,
      url: blog.url
    }
    addLikes(blog.id, updatedBlog)
  }

  const handleDeleteButton = (event) => {
    event.preventDefault()
    if(window.confirm('Remove blog ' + blog. title + ' by ' + blog.author)) {
      handleBlogService_Delete(blog.id)
    }
  }

  const authenticateUser = () => {
    //console.log(blog.user.id)
    //console.log('duong ' + user.name)
    return blog.user.id === user.id ? true : false
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}  
      <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
      <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        likes {blog.likes}
        <button onClick={handleLikeButton}>like</button>
        <p>{blog.user.name}</p>
        {authenticateUser() && <button onClick={handleDeleteButton}>remove</button>}
      </div>
    </div>  
    
  )
}

export default Blog