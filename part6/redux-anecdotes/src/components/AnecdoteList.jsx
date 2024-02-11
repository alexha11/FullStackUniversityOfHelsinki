import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { increaseLike } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anec.filter(n => n.content.toLowerCase().includes(state.filterInput.toLowerCase())))
    
    const vote = (id) => {
        console.log('vote', id)
        const anecdoteToChange = anecdotes.find(n => n.id === id)
        dispatch(increaseLike(id, anecdoteToChange))

        dispatch(setNotification(`you voted '${anecdoteToChange.content}'`, 5))
      }
    console.log(anecdotes.filterInput)
    return (
    <div>
      {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList