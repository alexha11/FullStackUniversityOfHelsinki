import { useDispatch } from "react-redux"
import { addAnec } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnect = (event) => {
      event.preventDefault()
      const content = event.target.newContent.value
      console.log(content)
      event.target.newContent.value = ''
      dispatch(addAnec(content))
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