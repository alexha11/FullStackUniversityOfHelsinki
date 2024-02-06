import { useDispatch } from "react-redux"
import { createAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnect = async (event) => {
      event.preventDefault()
      const content = event.target.newContent.value
      event.target.newContent.value = ''
      dispatch(createAnec(content))
      dispatch(setNotification(`you created '${content}'`, 5))

      
    }

    return (
       <div>
          <h2>create new</h2>
          <form onSubmit={addAnect}>
            <div><input name='newContent'/></div>
            <button type='submit'>create</button>
          </form>
       </div> 
    )

}

export default AnecdoteForm