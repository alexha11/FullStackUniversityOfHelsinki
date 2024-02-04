import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anec.filter(n => n.content.toLowerCase().includes(state.filterInput.toLowerCase())))
    
    const vote = (id) => {
        console.log('vote', id)
        const anecdoteToChange = anecdotes.find(n => n.id === id)
        dispatch(setNotification("you voted '" + anecdoteToChange.content + "'"))
        setTimeout(() => {
          dispatch(removeNotification())
  
        }, 5000)
        dispatch(addVote(id))
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