import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anec.filter(n => n.content.toLowerCase().includes(state.filterInput.toLowerCase())))

    const vote = (id) => {
        console.log('vote', id)
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