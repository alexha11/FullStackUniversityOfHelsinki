import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { NewBlog } from './components/NewBlog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const Notification = ({errorMessage, successMessage}) => {
    if (errorMessage !== null) {
      return (
        <div className='error-message'>
          {errorMessage}
        </div>
      )
    }
    if (successMessage !== null) {
      return (
        <div className='success-message'>
          {successMessage}
        </div>
      )
    }
    return null
  }

  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
      setUsername('')
      setPassword('')

      setSuccessMessage('Login successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {

      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      
      setSuccessMessage('Logout successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Some problems occur when trying to logout your account. Please try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogService_Create = async (newBlog) => {         //using created blogService to create a new blog but missing a new blog
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
      
      setSuccessMessage('a new blog ' + response.title + ' by ' + response.author)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Can not create a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleBlogService_Delete = async (id) => {
    try {
      const removedBlog = await blogService.deleteById(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))

      setSuccessMessage('a blog is removed successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Can not remove the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikes = async(id, updatedBlog) => {
    try {
      await blogService.update(id, updatedBlog)

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    } catch (exception) {
      setErrorMessage('Can not update likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id='username'
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id='password'
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>  
    </div>    
  )

  const blogForm = () => {
    
    return (
      <div>
        <div>
          <p>{user.name} logged in </p>
          <button  onClick={handleLogout}>Logout</button>
        </div>

        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <NewBlog handleBlogService_Create={handleBlogService_Create}/>
        </Togglable>
       
        {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => 
          <Blog key={blog.id} blog = {blog} user={user} addLikes={addLikes} handleBlogService_Delete={handleBlogService_Delete}/>
          )}
      </div>
    )
  }
  
  return(
    <div>
      <h1>Blogs by Thanh Duong</h1>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      {user === null ? (
        <div>
          <p>Please log in to your blog account</p>
          {loginForm()}
        </div>
      ): (
        <div>                  
          {blogForm()}
        </div>
      )}      

    </div>
  )
  // return (
  //   <div>
  //     <h2>blogs</h2>
  //     {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog} />
  //     )}
  //   </div>
  // )
}


export default App