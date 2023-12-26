import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  
  const [errorMessage, setErrorMessage] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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
      console.log(user)
      setUsername('')
      setPassword('')
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
      //setNotification('Logout successful', 'success')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      resetInputFields()
    } catch (exception) {
     // setNotification('Logout failed', 'error')
    }
  }

  const Notification = ({message}) => {
    return message === null ? null : (
      <div>
        {message}
      </div>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in </p>
        <button  onClick={handleLogout}>Logout</button>
      </div>
      {blogs.map(blog => 
        <Blog key={blog.id} blog = {blog}/>
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